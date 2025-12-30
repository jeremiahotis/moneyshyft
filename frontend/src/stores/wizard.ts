import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WizardAnswers } from '@/types';

export const useWizardStore = defineStore('wizard', () => {
  // State
  const currentStep = ref(0);
  const answers = ref<Partial<WizardAnswers>>({
    income_sources: [],
    credit_card_debts: [],
    other_debts: [],
  });
  const isCompleted = ref(false);

  // Actions
  function setStep(step: number): void {
    currentStep.value = step;
  }

  function nextStep(): void {
    currentStep.value++;
  }

  function prevStep(): void {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  }

  function updateAnswers(data: Partial<WizardAnswers>): void {
    answers.value = { ...answers.value, ...data };
  }

  function reset(): void {
    currentStep.value = 0;
    answers.value = {
      income_sources: [],
      credit_card_debts: [],
      other_debts: [],
    };
    isCompleted.value = false;
  }

  function markComplete(): void {
    isCompleted.value = true;
  }

  return {
    currentStep,
    answers,
    isCompleted,
    setStep,
    nextStep,
    prevStep,
    updateAnswers,
    reset,
    markComplete,
  };
});
