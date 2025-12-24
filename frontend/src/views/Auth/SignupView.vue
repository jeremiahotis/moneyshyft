<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900">MoneyShyft</h1>
        <p class="mt-2 text-sm text-gray-600">Create your account</p>
      </div>

      <form @submit.prevent="handleSignup" class="mt-8 space-y-6">
        <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <strong>Error:</strong> {{ authStore.error }}
        </div>
        <div v-if="validationError" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <strong>Validation Error:</strong> {{ validationError }}
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="8"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <p class="mt-1 text-xs text-gray-500">At least 8 characters</p>
        </div>

        <div>
          <label for="householdName" class="block text-sm font-medium text-gray-700">Household Name (Optional)</label>
          <input
            id="householdName"
            v-model="householdName"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="e.g., Smith Family"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.isLoading">Creating account...</span>
          <span v-else>Sign up</span>
        </button>

        <div class="text-center">
          <router-link to="/login" class="text-sm text-primary-600 hover:text-primary-700">
            Already have an account? Log in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const householdName = ref('');
const validationError = ref('');

async function handleSignup() {
  validationError.value = '';
  authStore.clearError();

  // Frontend validation
  if (password.value.length < 8) {
    validationError.value = 'Password must be at least 8 characters long';
    return;
  }

  try {
    await authStore.signup({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      householdName: householdName.value || undefined,
    });
    router.push('/');
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.response?.data?.details) {
      validationError.value = error.response.data.details.map((d: any) => d.message).join(', ');
    }
  }
}
</script>
