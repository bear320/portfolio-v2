<template>
  <section class="email-wrapper" ref="target">
    <button type="button" class="close" @click="appStore.isShowModalEmail = false">
      <i class="ri-close-line"></i>
    </button>

    <!-- 寄信表單 -->
    <form class="form">
      <h2>與我聯繫</h2>
      <div class="input-item">
        <label for="sender">姓名</label>
        <input
          type="text"
          name="sender"
          id="sender"
          v-model.trim="payload.sender"
          placeholder="請輸入您的姓名（必填）"
          required
        />
      </div>
      <div class="input-item">
        <label for="email">信箱</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="payload.email"
          placeholder="請輸入您的信箱（必填）"
          required
        />
      </div>
      <div class="input-item">
        <label for="subject">主旨</label>
        <input
          type="text"
          name="subject"
          id="subject"
          v-model.trim="payload.subject"
          placeholder="請輸入信件主旨（必填）"
          required
        />
      </div>
      <div class="input-item">
        <label for="msg">內容</label>
        <textarea
          name="msg"
          id="msg"
          v-model.trim="payload.msg"
          placeholder="請輸入信件內容（必填）"
          required
        ></textarea>
      </div>
      <span v-if="statusMsg !== ''" class="error-msg">
        <strong>{{ statusMsg }}</strong>
      </span>
      <!-- <input type="submit" value="寄送信件" @click.prevent="" /> -->
      <button class="btn-send" @click.prevent="handleSend">
        <i class="ri-mail-send-line"></i> 傳送
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useAppStore } from '@/stores';
import { onClickOutside } from '@vueuse/core';
import emailjs from '@emailjs/browser';

// store
const appStore = useAppStore();

// ref: target
const target = ref<null>(null);

// 點擊燈箱外面關閉
onClickOutside(target, () => (appStore.isShowModalEmail = false));

// type: Email
type Email = {
  sender: string;
  email: string;
  subject: string;
  msg: string;
};

// 信件資料
const payload = reactive<Email>({
  sender: '',
  email: '',
  subject: '',
  msg: ''
});

// 錯誤訊息
const statusMsg = ref<string>('');

// 寄出信件
const handleSend = () => {
  // 清空錯誤訊息
  statusMsg.value = '';

  // 驗證任一信件表格不可為空
  if (
    payload.sender === '' ||
    payload.email === '' ||
    payload.subject === '' ||
    payload.msg === ''
  ) {
    statusMsg.value = '* 姓名、信箱、主旨、內容不可為空！';
    return;
  }

  // 驗證信箱格式
  const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  if (payload.email.search(emailRule) === -1) {
    statusMsg.value = '* 信箱格式錯誤！';
    return;
  }

  // 寄信
  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      payload,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(
      (res) => {
        statusMsg.value = '* 寄送成功，視窗將自動關閉！';
        setTimeout(() => {
          appStore.isShowModalEmail = false;
        }, 3000);
      },
      (error) => {
        statusMsg.value = '* 寄送失敗，請再次嘗試！';
      }
    );
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/style.scss';

.email-wrapper {
  max-width: 768px;
  width: calc(100% - 3rem);
  background-color: var(--body-color);
  box-shadow: 0 0 15px 0 var(--text-color);
  border-radius: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @include max(500) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .close {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    @include max(500) {
      top: 0.5rem;
      right: 0.5rem;
    }

    i {
      font-size: 1.75rem;
      color: var(--text-color);

      @include max(500) {
        font-size: 1.5rem;
      }
    }
  }

  .form {
    padding: 2.5rem 2rem 1.5rem;
    width: calc(100vw - 2rem);

    @include max(500) {
      padding: 2.5rem 1.5rem 1.5rem;
    }

    h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: var(--h2-font-size);
      color: var(--title-color);
    }

    .input-item {
      position: relative;
      margin-bottom: 1.5rem;
      display: grid;
      grid-template-columns: 100%;

      label {
        position: absolute;
        top: -0.5rem;
        left: 0.75rem;
        font-size: var(--small-font-size);
        background-color: var(--body-color);
        color: var(--first-color);
        padding: 0 0.25rem;
      }

      input,
      textarea {
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1.5px solid var(--first-color);
        outline: none;
        font-size: var(--normal-font-size);
        color: var(--text-color);
        background-color: var(--body-color);

        &::placeholder {
          color: var(--text-color-light);
        }
      }

      textarea {
        resize: none;
        height: 10rem;

        @include max(500) {
          height: 15rem;
        }

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    .error-msg {
      display: block;
      margin-bottom: 0.75rem;
      text-align: center;
      font-size: var(--small-font-size);
    }

    .btn-send {
      padding: 0.75rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      font-size: var(--normal-font-size);
      background-color: var(--first-color);
      color: var(--body-color);
      display: block;
      margin: auto;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
