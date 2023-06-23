<template>
  <header class="profile container">
    <!-- 切換主題 -->
    <i class="change-theme ri-moon-line" v-if="!isDarkMode" @click="toggleTheme"></i>
    <i class="change-theme ri-sun-line" v-else @click="toggleTheme"></i>

    <!-- 個人資訊 -->
    <div class="profile-wrapper grid">
      <div class="content">
        <div class="border">
          <div class="portrait">
            <img src="@/assets/images/Portrait.png" alt="個人照" />
          </div>
        </div>

        <h1 class="name">熊伯祥 Oliver ✋🏻</h1>
        <h2 class="job">前端工程師 Frontend Developer</h2>

        <ul class="link-wrapper">
          <li class="link linkedin">
            <a href="https://www.linkedin.com/in/%E7%86%8A%E4%BC%AF%E7%A5%A5/" target="_blank">
              <i class="ri-linkedin-box-fill"></i>
            </a>
          </li>
          <li class="link medium">
            <a href="https://medium.com/@aaabear320" target="_blank">
              <i class="ri-medium-fill"></i>
            </a>
          </li>
          <li class="link github">
            <a href="https://github.com/bear320" target="_blank">
              <i class="ri-github-fill"></i>
            </a>
          </li>
        </ul>
      </div>

      <!-- 數據統計 -->
      <div class="statistics-wrapper grid">
        <div class="info" v-for="item in statistics" :key="item.id">
          <h3 class="number" v-cloak>{{ item.data }}</h3>
          <p class="desc">{{ item.desc }}</p>
        </div>
      </div>

      <!-- 履歷＆聯繫方式 -->
      <div class="btn-wrapper">
        <a :href="resumeURL" target="_blank" class="btn">
          查看履歷
          <i class="ri-external-link-line"></i>
        </a>
        <div class="small-btn-wrapper">
          <a href="tel:+886-960779920" class="btn btn-small btn-gray">
            <i class="ri-phone-line"></i>
          </a>
          <a href="javascript:;" class="btn btn-small btn-gray" @click="() => {}">
            <i class="ri-mail-line"></i>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- 標籤頁 -->
  <main class="main">
    <section class="container tabs-wrapper">
      <!-- 標籤 -->
      <div class="tabs">
        <span
          v-for="tab in tabList"
          :key="tab.id"
          class="tab"
          :class="{ active: currentTab === tab.enum }"
          @click="currentTab = tab.enum"
        >
          {{ tab.title }}
        </span>
      </div>

      <!-- 內容 -->
      <transition-group>
        <component
          v-show="currentTab === item.tab"
          v-for="(item, index) in tabContent"
          :key="index"
          :is="item.component"
        ></component>
      </transition-group>
    </section>
  </main>

  <footer class="footer container">
    <span class="copy-right"> &#169; Oliver Xiong. All rights reserved. </span>
  </footer>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, type Component, markRaw } from 'vue';
import AboutTab from '@/components/AboutTab.vue';
import ProjectsTab from '@/components/ProjectsTab.vue';
import SkillsTab from '@/components/SkillsTab.vue';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '@/firebase';

/* --------------- 主題 --------------- */

// 現在主題
const isDarkMode = ref<boolean>(false);

// 切換主題
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

/* --------------- 統計數據 --------------- */

type Statistics = {
  id: number;
  desc: string;
  data: string;
};

// 目前年紀
const currentAge = computed(() => {
  // 月份從 0 開始計算
  const DOB: Date = new Date(1997, 9, 25);
  const now: Date = new Date();
  const diff: number = now.getTime() - DOB.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

// 統計清單
const statistics = reactive<Statistics[]>([
  { id: 1, desc: '工作經驗', data: '2Y+' },
  { id: 2, desc: '完成專案', data: '7+' },
  { id: 3, desc: '目前年紀', data: `${currentAge.value}Y` }
]);

/* --------------- 履歷 --------------- */

// 履歷連結
const resumeURL = ref<string>(
  'https://drive.google.com/file/d/1rlC4dUzS7jXXA0C0Ll0ZLtPQPUNzb5dN/view?usp=sharing'
);

/* --------------- 標籤頁 --------------- */

// enum: Tab
enum Tab {
  about = 'about',
  projects = 'projects',
  skills = 'skills'
}

// 目前標籤
const currentTab = ref<Tab>(Tab.about);

// type: TabList
type TabList = {
  id: number;
  title: string;
  enum: Tab;
};

// 標籤列表
const tabList = reactive<TabList[]>([
  {
    id: 1,
    title: '簡介',
    enum: Tab.about
  },
  {
    id: 2,
    title: '作品集',
    enum: Tab.projects
  },
  {
    id: 3,
    title: '技能',
    enum: Tab.skills
  }
]);

// type: TabContent
type TabContent = {
  id: number;
  tab: Tab;
  component: Component;
};

// 標籤內容
const tabContent = reactive<TabContent[]>([
  { id: 1, tab: Tab.about, component: markRaw(AboutTab) },
  { id: 2, tab: Tab.projects, component: markRaw(ProjectsTab) },
  { id: 3, tab: Tab.skills, component: markRaw(SkillsTab) }
]);
</script>

<style lang="scss" scoped>
@import '@/assets/sass/style.scss';

.profile {
  position: relative;
  padding-top: 3.5rem;

  @include min(992) {
    padding-top: 4rem;
  }

  .profile-wrapper {
    row-gap: 2rem;

    .content {
      display: grid;
      text-align: center;

      .border {
        border: 3.5px solid var(--first-color);
        justify-self: center;
        width: 115px;
        height: 115px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        margin-bottom: 0.75rem;

        @include min(992) {
          width: 135px;
          height: 135px;
          margin-bottom: 1rem;
        }

        .portrait {
          width: 100px;
          height: 100px;
          background: linear-gradient(
            180deg,
            hsla(var(--hue), var(--sat), var(--lig), 1) 0%,
            hsla(var(--hue), var(--sat), var(--lig), 0.2) 100%
          );
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: flex-end;

          @include min(992) {
            width: 120px;
            height: 120px;
          }

          img {
            width: 75px;

            @include min(992) {
              width: 90px;
            }
          }
        }
      }

      .name {
        font-size: var(--h2-font-size);
      }

      .job {
        font-size: var(--smaller-font-size);
        font-weight: 500;
        color: var(--text-color);
        margin-bottom: 1rem;

        @include min(992) {
          margin-bottom: 1.5rem;
        }
      }

      .link-wrapper {
        display: flex;
        justify-content: center;
        column-gap: 0.75rem;

        .link a {
          font-size: 1.25rem;
          color: var(--text-color);
          transition: 0.3s;

          &:hover {
            color: var(--first-color);
          }
        }
      }
    }

    .statistics-wrapper {
      grid-template-columns: repeat(3, max-content);
      justify-content: center;
      column-gap: 2.5rem;

      @include max(320) {
        column-gap: 1.5rem;
      }

      @include min(992) {
        column-gap: 3rem;
      }

      .info {
        text-align: center;

        .number {
          font-size: var(--normal-font-size);
          margin-bottom: 0.25rem;
        }

        .desc {
          font-size: var(--smaller-font-size);
          font-weight: 500;

          @include min(992) {
            font-size: var(--small-font-size);
          }
        }
      }
    }

    .btn-wrapper,
    .small-btn-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-wrapper {
      column-gap: 1rem;

      @include max(320) {
        flex-direction: column;
        row-gap: 1rem;
      }

      @include min(992) {
        column-gap: 2rem;
      }

      .small-btn-wrapper {
        column-gap: 0.25rem;

        .btn-gray {
          background-color: var(--text-color-lighten);
          color: var(--title-color);

          &:hover {
            background-color: var(--text-color-light);
          }
        }
      }
    }
  }
}

.main {
  .tabs-wrapper {
    .tabs {
      margin: 2rem 0 2.5rem;
      background-color: var(--text-color-lighten);
      padding: 0.375rem;
      border-radius: 0.75rem;
      display: flex;
      justify-content: space-between;
      column-gap: 0.5rem;

      @include min(576) {
        width: 332px;
        margin: 3rem auto;
      }

      .tab {
        width: 100%;
        height: 100%;
        padding: 1rem;
        text-align: center;
        font-size: var(--small-font-size);
        font-family: var(--body-font);
        font-weight: 500;
        border-radius: 0.75rem;
        color: var(--title-color);
        background-color: transparent;
        cursor: pointer;
        transition: 0.3s;

        &.active,
        &:hover {
          background-color: var(--body-color);
        }
      }
    }
  }
}

.footer {
  .copy-right {
    display: block;
    margin: 2.5rem 0 2rem;
    text-align: center;
    font-size: var(--smaller-font-size);
    color: var(--text-color-light);

    @include min(992) {
      margin: 4.5rem 0 2.5rem;
    }
  }
}

// Scroll Bar
::-webkit-scrollbar {
  width: 0.6rem;
  border-radius: 0.5rem;
  background-color: hsl(var(--hue), 8%, 66%);
}

::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: hsl(var(--hue), 8%, 54%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--hue), 8%, 44%);
}
</style>
