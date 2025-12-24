<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">MoneyShyft</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-600">Welcome, {{ authStore.fullName }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Dashboard</h2>
        <p class="text-gray-600">Welcome to MoneyShyft! Your budgeting journey starts here.</p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link
            to="/accounts"
            class="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-gray-900">Accounts</h3>
            <p class="text-sm text-gray-600 mt-1">Manage your accounts</p>
          </router-link>

          <router-link
            to="/transactions"
            class="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-gray-900">Transactions</h3>
            <p class="text-sm text-gray-600 mt-1">Track your spending</p>
          </router-link>

          <router-link
            to="/budget"
            class="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-gray-900">Budget</h3>
            <p class="text-sm text-gray-600 mt-1">Allocate your money</p>
          </router-link>

          <router-link
            to="/goals"
            class="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
          >
            <h3 class="font-semibold text-gray-900">Goals</h3>
            <p class="text-sm text-gray-600 mt-1">Save for what matters</p>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  await authStore.logout();
  router.push('/login');
}
</script>
