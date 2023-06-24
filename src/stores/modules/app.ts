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
  const isLoading = ref<boolean>(false);
  const isShowModalEmail = ref<boolean>(false);
  function toggleTheme() {
    // 透過 localStorage 獲取先前主題
    const previousTheme = localStorage.getItem('isDarkMode');

    // 如果 localStorage 有相關紀錄，則依該紀錄設定 isDarkMode
    if (previousTheme !== null) {
      isDarkMode.value = previousTheme === 'true' ? true : false;
    }

    // 切換模式
    isDarkMode.value = !isDarkMode.value;

    // 操作 body 之 class
    document.body.classList.toggle('dark-theme');

    // 將目前主題儲存至 localStorage
    localStorage.setItem('isDarkMode', isDarkMode.value === true ? 'true' : 'false');
  }
  return { currentTab, isDarkMode, isLoading, isShowModalEmail, toggleTheme };
});
