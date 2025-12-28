<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Mobile: Hamburger Button -->
        <button
          v-if="authStore.isAuthenticated"
          @click="showMobileMenu = true"
          class="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          aria-label="Open navigation menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-primary-600">MoneyShyft</h1>
        </div>

        <!-- Desktop: Horizontal Navigation -->
        <nav v-if="authStore.isAuthenticated" class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(item.path)
              ? 'bg-primary-100 text-primary-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
          >
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center gap-4">
          <span v-if="authStore.user" class="text-sm text-gray-700 hidden sm:inline">
            {{ authStore.fullName }}
          </span>
          <button
            v-if="authStore.isAuthenticated"
            @click="handleLogout"
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="drawer">
      <div
        v-if="showMobileMenu"
        class="fixed inset-0 z-50 lg:hidden"
        @click.self="showMobileMenu = false"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="showMobileMenu = false"></div>

        <!-- Drawer -->
        <div class="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
          <!-- Drawer Header -->
          <div class="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 class="text-xl font-bold text-primary-600">MoneyShyft</h2>
            <button
              @click="showMobileMenu = false"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              aria-label="Close menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Items -->
          <nav class="flex-1 overflow-y-auto p-4">
            <div class="space-y-1">
              <router-link
                v-for="item in navItems"
                :key="item.name"
                :to="item.path"
                @click="showMobileMenu = false"
                class="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                :class="isActive(item.path)
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'"
              >
                <span class="text-2xl">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </router-link>
            </div>
          </nav>

          <!-- Drawer Footer -->
          <div class="p-4 border-t border-gray-200">
            <div class="flex items-center gap-3 px-4 py-2 text-sm text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ authStore.fullName }}</span>
            </div>
            <button
              @click="handleLogoutAndClose"
              class="w-full mt-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const showMobileMenu = ref(false);

const navItems = [
  { name: 'dashboard', label: 'Dashboard', icon: '📊', path: '/' },
  { name: 'accounts', label: 'Accounts', icon: '💰', path: '/accounts' },
  { name: 'transactions', label: 'Transactions', icon: '📝', path: '/transactions' },
  { name: 'budget', label: 'Budget', icon: '📈', path: '/budget' },
  { name: 'debts', label: 'Debts', icon: '💳', path: '/debts' },
  { name: 'goals', label: 'Goals', icon: '🎯', path: '/goals' },
];

function isActive(path: string): boolean {
  return route.path === path || (path !== '/' && route.path.startsWith(path));
}

async function handleLogout() {
  await authStore.logout();
  router.push('/login');
}

async function handleLogoutAndClose() {
  showMobileMenu.value = false;
  await handleLogout();
}
</script>

<style scoped>
/* Drawer slide transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .absolute:not(.bg-black\/50),
.drawer-leave-active .absolute:not(.bg-black\/50) {
  transition: transform 0.3s ease;
}

.drawer-enter-from .absolute:not(.bg-black\/50) {
  transform: translateX(-100%);
}

.drawer-leave-to .absolute:not(.bg-black\/50) {
  transform: translateX(-100%);
}
</style>
