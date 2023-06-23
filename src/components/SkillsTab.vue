<template>
  <section class="views">
    <div class="skills grid">
      <!-- 設計 -->
      <div class="skill-block">
        <h3 class="title">圖形設計與設計工具</h3>
        <div class="skill-wrap">
          <div class="skill-data" v-for="(skill, index) in design" :key="index">
            <i class="ri-checkbox-circle-line"></i>
            <div>
              <h3 class="skill-name">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- 前端 -->
      <div class="skill-block">
        <h3 class="title">前端開發</h3>
        <div class="skill-wrap">
          <div class="skill-data" v-for="(skill, index) in frontend" :key="index">
            <i class="ri-checkbox-circle-line"></i>
            <div>
              <h3 class="skill-name">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- 後端 -->
      <div class="skill-block">
        <h3 class="title">後端開發</h3>
        <div class="skill-wrap">
          <div class="skill-data" v-for="(skill, index) in backend" :key="index">
            <i class="ri-checkbox-circle-line"></i>
            <div>
              <h3 class="skill-name">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- 開發工具 -->
      <div class="skill-block">
        <h3 class="title">開發工具</h3>
        <div class="skill-wrap">
          <div class="skill-data" v-for="(skill, index) in development" :key="index">
            <i class="ri-checkbox-circle-line"></i>
            <div>
              <h3 class="skill-name">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- 語言 -->
      <div class="skill-block">
        <h3 class="title">語言</h3>
        <div class="skill-wrap">
          <div class="skill-data" v-for="(skill, index) in language" :key="index">
            <i class="ri-checkbox-circle-line"></i>
            <div>
              <h3 class="skill-name">{{ skill }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const design = reactive<string[]>([
  'UI/UX',
  'Wireframe',
  'Mockup',
  'Figma',
  'Photoshop',
  'Illustrator',
  'InDesign'
]);

const frontend = reactive<string[]>([
  'HTML',
  'CSS/SASS',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'Vite',
  'Nuxt3',
  'Axios',
  'Bootstrap',
  'Naive UI'
]);

const backend = reactive<string[]>(['Node.js', 'Express', 'PHP', 'MySQL', 'Firebase']);

const development = reactive<string[]>(['Git', 'Github', 'VS Code', 'Command Line', 'NPM']);

const language = reactive<string[]>(['中文', '英文', '德文', '泰文']);
</script>

<style lang="scss" scoped>
@import '@/assets/sass/style.scss';

.views {
  .skills {
    justify-content: center;
    row-gap: 3.5rem;

    @include min(776) {
      grid-template-columns: repeat(2, 332px);
      column-gap: 3rem;
    }

    .skill-block {
      .title {
        font-size: var(--h3-font-size);
        text-align: center;
        margin-bottom: 1.5rem;

        @include min(992) {
          font-size: var(--normal-font-size);
          margin-bottom: 2.5rem;
        }
      }

      .skill-wrap {
        display: grid;
        grid-template-columns: minmax(105px, 110px) minmax(105px, 110px);
        justify-content: center;
        column-gap: 3rem;
        row-gap: 2rem;

        @include max(320) {
          column-gap: 1rem;
        }

        .skill-data {
          display: flex;
          column-gap: 0.5rem;

          i {
            font-size: 1rem;
            color: var(--first-color);
          }

          .skill-name {
            font-size: var(--normal-font-size);
            font-weight: 500;
            line-height: 18px;
          }

          .skill-level {
            font-size: var(--smaller-font-size);
          }
        }
      }
    }
  }
}
</style>
