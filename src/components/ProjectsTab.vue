<template>
  <section class="views">
    <div class="project-wrap grid">
      <article class="project" v-for="project in myProjects" :key="project.id">
        <div class="project-img">
          <img
            :src="project.isHovered ? project.thumbnail : project.cover"
            alt="專案封面"
            class="cover"
            @mouseover.prevent="project.isHovered = true"
            @mouseout.prevent="project.isHovered = false"
            @touchstart.prevent="project.isHovered = true"
            @touchend.prevent="project.isHovered = false"
          />
          <!-- <div
            class="mask"
            @mouseover.prevent="inImg(project.id)"
            @mouseout.prevent="outImg(project.id)"
            @touchstart.prevent="inImg(project.id)"
            @touchend.prevent="outImg(project.id)"
          ></div> -->
        </div>
        <div class="project-content">
          <span class="tag">{{ project.tag }}</span>
          <h3 class="title">{{ project.title }}</h3>
          <div class="project-link-wrap">
            <a :href="project.link" target="_blank" class="project-link btn btn-small">
              <i class="ri-link"></i>
            </a>
            <a :href="project.github" target="_blank" class="project-link btn btn-small">
              <i class="ri-code-s-slash-line"></i>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

// 是否載入完成
const isLoading = ref<boolean>(false);

// type: Project
type Project = {
  id: number;
  tag: string;
  title: string;
  cover: string;
  thumbnail: string;
  link: string;
  github: string;
  isHovered: boolean;
};

// 作品集列表
const myProjects = reactive<Project[]>([]);

// 獲取作品集
const getProjects = async () => {
  isLoading.value = true;

  onSnapshot(collection(db, 'projects'), (querySnapshot) => {
    const firebaseProjects = reactive<Project[]>([]);

    querySnapshot.forEach((doc) => {
      const project = reactive<Project>({
        id: doc.data().id,
        tag: doc.data().tag,
        title: doc.data().title,
        cover: doc.data().cover,
        thumbnail: doc.data().thumbnail,
        link: doc.data().link,
        github: doc.data().github,
        isHovered: false
      });

      firebaseProjects.push(project);
    });

    firebaseProjects.sort((a, b) => a.id - b.id);
    myProjects.splice(0, myProjects.length, ...firebaseProjects);
  });

  isLoading.value = false;
};

onMounted(() => {
  getProjects();
});
</script>

<style lang="scss" scoped>
@import '@/assets/sass/style.scss';

.views {
  .project-wrap {
    @include min(576) {
      grid-template-columns: 332px;
      justify-content: center;
    }

    @include min(776) {
      grid-template-columns: repeat(2, 332px);
    }

    @include min(992) {
      gap: 2rem 3rem;
    }

    .project {
      .project-img {
        position: relative;
        border-radius: 1rem;
        overflow: hidden;

        &:hover {
          outline: 0.75px solid var(--text-color-lighten);

          .mask {
            opacity: 0;
          }
        }

        .cover {
          width: 100%;
          height: 100%;
          vertical-align: top;
          object-fit: cover;
          filter: grayscale(50%);

          &:hover {
            filter: grayscale(0);
          }
        }
      }

      .project-content {
        width: 100%;
        padding: 0.75rem 0.5rem 0;

        .tag {
          font-size: var(--smaller-font-size);
        }

        .title {
          font-size: var(--h3-font-size);
          margin-bottom: 0.75rem;
        }

        .project-link-wrap {
          .project-link {
            padding: 0.5rem;
          }

          .project-link + .project-link {
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
}
</style>
