import { ref } from 'vue';
import { defineStore } from 'pinia';

// enum: Tab
enum Tab {
  about = 'about',
  projects = 'projects',
  skills = 'skills'
}

export const useAppStore = defineStore('app', () => {
  const currentTab = ref<Tab>(Tab.about);
  const isDarkMode = ref<boolean>(false);
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
  }
  return { currentTab, isDarkMode, toggleTheme };
});
