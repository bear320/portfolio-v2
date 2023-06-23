<template>
  <section class="views">
    <div class="intro grid">
      <!-- 學歷 -->
      <div class="intro-block">
        <h3 class="title">求學經歷</h3>
        <div class="intro-wrap">
          <div class="intro-data" v-for="(item, index) in education" :key="index">
            <div class="dotAndLine">
              <span class="dot"></span>
              <span class="line"></span>
            </div>
            <div class="intro-content">
              <h3 class="intro-title">{{ item.department }}</h3>
              <p>{{ item.institution }}</p>
              <p><i class="ri-calendar-line"></i>{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 工作經驗 -->
      <div class="intro-block">
        <h3 class="title">工作經歷</h3>
        <div class="intro-wrap">
          <div class="intro-data" v-for="(item, index) in experience" :key="index">
            <div class="dotAndLine">
              <span class="dot"></span>
              <span class="line"></span>
            </div>
            <div class="intro-content">
              <h3 class="intro-title">{{ item.title }}</h3>
              <p>{{ item.employer }}</p>
              <p><i class="ri-calendar-line"></i>{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// type: Edu
type Education = {
  department: string;
  institution: string;
  time: string;
};

// 學歷
const education = reactive<Education[]>([
  {
    department: '前端工程師專業技術養成班',
    institution: '緯育 TibaMe',
    time: '2022.08 ‒ 2023.01'
  },
  {
    department: '應用德語系 (文學士)',
    institution: '國立高雄科技大學',
    time: '2016.09 ‒ 2020.06'
  },
  {
    department: '普通科',
    institution: '國立中科實驗高級中學',
    time: '2013.09 - 2016.06'
  }
]);

// type: Job
type Job = {
  title: string;
  employer: string;
  time: string;
};

// 工作經驗
const experience = reactive<Job[]>([
  { title: '前端工程師 (Vue.js)', employer: 'MiNDnodeAir 脈動心聯', time: '2023.04 - 現在' },
  { title: '項目協調員 & 德文翻譯', employer: 'ProLINK Translation', time: '2021.12 ‒ 2022.04' },
  { title: '秘書助理', employer: '國立高雄科技大學 應用德語系', time: '2018.09 ‒ 2020.01' },
  { title: '實習生', employer: '雲山水 有熊的森林', time: '2018.07 ‒ 2018.08' }
]);
</script>

<style lang="scss" scoped>
@import '@/assets/sass/style.scss';

.views {
  .intro {
    justify-content: center;
    row-gap: 3.5rem;

    @include min(776) {
      grid-template-columns: repeat(2, 332px);
      column-gap: 3rem;
    }

    .intro-block {
      .title {
        font-size: var(--h3-font-size);
        text-align: center;
        margin-bottom: 1.5rem;

        @include min(992) {
          font-size: var(--normal-font-size);
          margin-bottom: 2.5rem;
        }
      }

      .intro-wrap {
        display: grid;
        grid-template-columns: 280px;
        justify-content: center;

        @include max(320) {
          grid-template-columns: 265px;
        }

        .intro-data {
          display: flex;
          column-gap: 0.5rem;
          padding: 1rem;

          @include max(320) {
            padding: 1rem 0;
          }

          .dotAndLine {
            position: relative;
            width: 3rem;

            @include max(320) {
              width: 2rem;
            }

            .dot {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              background-color: var(--first-color);
            }

            .line {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0.15rem;
              height: calc(100% + 2rem);
              background-color: var(--first-color);
            }
          }

          &:first-child {
            padding-top: 0;
          }

          &:last-child {
            padding-bottom: 0;

            .dotAndLine {
              .line {
                display: none;
              }
            }
          }

          .intro-content {
            display: flex;
            flex-direction: column;
            row-gap: 0.5rem;

            .intro-title {
              font-size: var(--normal-font-size);
              font-weight: 500;
              line-height: 18px;
            }

            p {
              font-size: var(--smaller-font-size);

              &:last-child {
                display: flex;
                column-gap: 0.35rem;
                align-items: center;

                i {
                  font-size: 1rem;
                  color: var(--first-color);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
