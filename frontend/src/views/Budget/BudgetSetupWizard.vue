<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Progress Bar -->
      <div class="mb-8 bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-600">Step {{ wizardStore.currentStep + 1 }} of 9</span>
          <button
            v-if="wizardStore.currentStep > 0 && wizardStore.currentStep < 8"
            @click="skipWizard"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip for now
          </button>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-primary-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <!-- Wizard Steps -->
      <transition name="fade" mode="out-in">
        <WizardWelcome
          v-if="wizardStore.currentStep === 0"
          @next="wizardStore.nextStep"
          @skip="skipWizard"
        />
        <WizardIncome
          v-else-if="wizardStore.currentStep === 1"
          @next="handleIncomeNext"
          @back="wizardStore.prevStep"
        />
        <WizardHousing
          v-else-if="wizardStore.currentStep === 2"
          @next="handleHousingNext"
          @back="wizardStore.prevStep"
        />
        <WizardTransportation
          v-else-if="wizardStore.currentStep === 3"
          @next="handleTransportationNext"
          @back="wizardStore.prevStep"
        />
        <WizardUtilities
          v-else-if="wizardStore.currentStep === 4"
          @next="handleUtilitiesNext"
          @back="wizardStore.prevStep"
        />
        <WizardDebt
          v-else-if="wizardStore.currentStep === 5"
          @next="handleDebtNext"
          @back="wizardStore.prevStep"
        />
        <WizardFlexible
          v-else-if="wizardStore.currentStep === 6"
          @next="handleFlexibleNext"
          @back="wizardStore.prevStep"
        />
        <WizardReview
          v-else-if="wizardStore.currentStep === 7"
          :answers="wizardStore.answers"
          @next="handleReviewNext"
          @back="wizardStore.prevStep"
        />
        <WizardComplete
          v-else-if="wizardStore.currentStep === 8"
          @done="completeWizard"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useWizardStore } from '@/stores/wizard';
import { useIncomeStore } from '@/stores/income';
import { useCategoriesStore } from '@/stores/categories';
import { useBudgetsStore } from '@/stores/budgets';
import { useDebtsStore } from '@/stores/debts';

// Import wizard step components
import WizardWelcome from '@/components/wizard/WizardWelcome.vue';
import WizardIncome from '@/components/wizard/WizardIncome.vue';
import WizardHousing from '@/components/wizard/WizardHousing.vue';
import WizardTransportation from '@/components/wizard/WizardTransportation.vue';
import WizardUtilities from '@/components/wizard/WizardUtilities.vue';
import WizardDebt from '@/components/wizard/WizardDebt.vue';
import WizardFlexible from '@/components/wizard/WizardFlexible.vue';
import WizardReview from '@/components/wizard/WizardReview.vue';
import WizardComplete from '@/components/wizard/WizardComplete.vue';

const router = useRouter();
const wizardStore = useWizardStore();
const incomeStore = useIncomeStore();
const categoriesStore = useCategoriesStore();
const budgetsStore = useBudgetsStore();
const debtsStore = useDebtsStore();

const progressPercent = computed(() => {
  return ((wizardStore.currentStep + 1) / 9) * 100;
});

function skipWizard() {
  if (confirm('Are you sure you want to skip setup? You can always set up your budget manually later.')) {
    router.push('/budget');
  }
}

async function handleIncomeNext(data: any) {
  wizardStore.updateAnswers({ income_sources: data.sources });
  wizardStore.nextStep();
}

async function handleHousingNext(data: any) {
  wizardStore.updateAnswers(data);
  wizardStore.nextStep();
}

async function handleTransportationNext(data: any) {
  wizardStore.updateAnswers(data);
  wizardStore.nextStep();
}

async function handleUtilitiesNext(data: any) {
  wizardStore.updateAnswers(data);
  wizardStore.nextStep();
}

async function handleDebtNext(data: any) {
  wizardStore.updateAnswers(data);
  wizardStore.nextStep();
}

async function handleFlexibleNext(data: any) {
  wizardStore.updateAnswers(data);
  wizardStore.nextStep();
}

async function handleReviewNext() {
  // Create everything!
  await createBudgetFromWizard();
  wizardStore.nextStep();
}

async function createBudgetFromWizard() {
  const answers = wizardStore.answers;
  const currentMonth = new Date().toISOString().slice(0, 7);

  try {
    // 1. Create income sources
    if (answers.income_sources && answers.income_sources.length > 0) {
      for (const source of answers.income_sources) {
        await incomeStore.createIncomeSource({
          name: source.name,
          monthly_amount: source.amount,
        });
      }
    }

    // 2. Create Fixed Expenses section and categories
    const fixedSection = await categoriesStore.createSection({
      name: 'Fixed Expenses',
      type: 'fixed',
    });

    // Housing
    if (answers.housing_type === 'rent' && answers.housing_amount) {
      const rentCat = await categoriesStore.createCategory({
        section_id: fixedSection.id,
        name: 'Rent',
      });
      await budgetsStore.setAllocation(currentMonth, {
        category_id: rentCat.id,
        allocated_amount: answers.housing_amount,
        rollup_mode: false,
      });
    } else if (answers.housing_type === 'own' && answers.housing_amount) {
      const mortgageCat = await categoriesStore.createCategory({
        section_id: fixedSection.id,
        name: 'Mortgage',
      });
      await budgetsStore.setAllocation(currentMonth, {
        category_id: mortgageCat.id,
        allocated_amount: answers.housing_amount,
        rollup_mode: false,
      });
    }

    // Car payments (multiple cars)
    if (answers.has_car_payment && answers.car_payments) {
      for (const payment of answers.car_payments) {
        const carCat = await categoriesStore.createCategory({
          section_id: fixedSection.id,
          name: `Car Payment - ${payment.name}`,
        });
        await budgetsStore.setAllocation(currentMonth, {
          category_id: carCat.id,
          allocated_amount: payment.amount,
          rollup_mode: false,
        });
      }
    }

    // Car insurance (multiple vehicles)
    if (answers.has_car_insurance && answers.car_insurance_payments) {
      for (const insurance of answers.car_insurance_payments) {
        const insuranceCat = await categoriesStore.createCategory({
          section_id: fixedSection.id,
          name: `Car Insurance - ${insurance.name}`,
        });
        await budgetsStore.setAllocation(currentMonth, {
          category_id: insuranceCat.id,
          allocated_amount: insurance.amount,
          rollup_mode: false,
        });
      }
    }

    // Utilities
    if (answers.utilities_estimate) {
      const utilitiesCat = await categoriesStore.createCategory({
        section_id: fixedSection.id,
        name: 'Utilities',
      });
      await budgetsStore.setAllocation(currentMonth, {
        category_id: utilitiesCat.id,
        allocated_amount: answers.utilities_estimate,
        rollup_mode: false,
      });
    }

    // Internet & Phone
    if (answers.internet_phone_estimate) {
      const internetCat = await categoriesStore.createCategory({
        section_id: fixedSection.id,
        name: 'Internet & Phone',
      });
      await budgetsStore.setAllocation(currentMonth, {
        category_id: internetCat.id,
        allocated_amount: answers.internet_phone_estimate,
        rollup_mode: false,
      });
    }

    // 3. Create Debt Records using Debt Tracker
    // Credit card debts
    if (answers.has_credit_card_debt && answers.credit_card_debts && answers.credit_card_debts.length > 0) {
      for (const debt of answers.credit_card_debts) {
        await debtsStore.createDebt({
          name: debt.name,
          debt_type: debt.debt_type as 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other',
          current_balance: debt.current_balance,
          original_balance: debt.current_balance, // Set original to current for new debts
          interest_rate: debt.interest_rate,
          minimum_payment: debt.minimum_payment,
        });
      }
    }

    // Other debts
    if (answers.has_other_debt && answers.other_debts && answers.other_debts.length > 0) {
      for (const debt of answers.other_debts) {
        await debtsStore.createDebt({
          name: debt.name,
          debt_type: debt.debt_type as 'credit_card' | 'auto_loan' | 'student_loan' | 'personal_loan' | 'medical' | 'other',
          current_balance: debt.current_balance,
          original_balance: debt.current_balance, // Set original to current for new debts
          interest_rate: debt.interest_rate,
          minimum_payment: debt.minimum_payment,
        });
      }
    }

    // OPTIONALLY: Create a budget section for debt payments tracking
    // Calculate total minimum payments from all debts
    const totalDebtPayments = [
      ...(answers.credit_card_debts || []),
      ...(answers.other_debts || [])
    ].reduce((sum, debt) => sum + debt.minimum_payment, 0);

    if (totalDebtPayments > 0) {
      const debtSection = await categoriesStore.createSection({
        name: 'Debt Payments',
        type: 'debt',
      });

      // Create a single category for all debt payments
      const debtCat = await categoriesStore.createCategory({
        section_id: debtSection.id,
        name: 'Minimum Debt Payments',
      });

      await budgetsStore.setAllocation(currentMonth, {
        category_id: debtCat.id,
        allocated_amount: totalDebtPayments,
        rollup_mode: false,
      });
    }

    // 4. Create Flexible Spending section
    const flexSection = await categoriesStore.createSection({
      name: 'Flexible Spending',
      type: 'flexible',
    });

    // Create categories for tracking
    await categoriesStore.createCategory({
      section_id: flexSection.id,
      name: 'Groceries',
    });
    await categoriesStore.createCategory({
      section_id: flexSection.id,
      name: 'Dining Out',
    });
    await categoriesStore.createCategory({
      section_id: flexSection.id,
      name: 'Entertainment',
    });

    // Calculate flexible spending amount
    const flexTotal = (answers.groceries_estimate || 0) +
                      (answers.dining_out_estimate || 0) +
                      (answers.entertainment_estimate || 0);

    if (flexTotal > 0) {
      await budgetsStore.setAllocation(currentMonth, {
        section_id: flexSection.id,
        allocated_amount: flexTotal,
        rollup_mode: true,
      });
    }

    // Refresh budget to show everything
    await budgetsStore.fetchBudgetSummary(currentMonth);
  } catch (error) {
    console.error('Error creating budget from wizard:', error);
    alert('There was an error creating your budget. Please try again.');
  }
}

function completeWizard() {
  wizardStore.markComplete();
  router.push('/budget');
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
