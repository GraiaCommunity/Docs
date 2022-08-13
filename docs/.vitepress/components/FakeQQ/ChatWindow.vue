<!--
 修改自 https://github.com/Redlnn/Fake-QQ-Chat-Window

 MIT License

 Copyright (c) 2022 Red_lnn

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 @author Red_lnn
 @website https://github.com/Redlnn/Fake-QQ-Chat-Window

-->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatWindow',
  props: {
    title: String,
  },
})
</script>

<template>
  <div class="qq-chat">
    <div v-if="title" class="qq-header">
      <span class="chat-title">{{ title }}</span>
    </div>
    <div class="chat-area">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qq-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  border-radius: 6px;
  background-color: var(--vp-c-bg-mute);
}

.custom-container .qq-chat {
  margin: 16px auto;
}

.qq-header {
  padding: 12px 0;
  font-weight: bold;
  text-align: center;
}
</style>

<style lang="scss">
.chat-item {
  margin-top: 15px;
  margin-bottom: 15px;
}

.left-chat {
  display: flex;
  align-items: flex-start;
}

.right-chat {
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
}

.chat-content {
  display: flex;
  flex-direction: column;
  max-width: 65%;
}

.chat-name {
  margin-bottom: 5px;
  font-size: 12px;
  color: var(--vp-c-text-2);

  .right-chat & {
    text-align: right;
  }
}

.chat-avatar {
  display: inline-block;
  width: 42px;
  height: 42px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.chat-avatar-text {
  text-align: center;
  line-height: 42px;
  font-size: 24px;
  font-weight: bold;
  background: var(--vp-c-bg);
}

.bubble-arrow {
  position: absolute;
  top: 11px;
  border-top: 10px solid var(--vp-c-bg);

  .left-chat & {
    left: -8px;
    border-left: 10px solid transparent;
  }

  .right-chat & {
    right: -8px;
    border-right: 10px solid transparent;
  }
}

.bubble {
  position: relative;
  padding: 12px;
  min-height: 1em;
  min-width: 1em;
  border-radius: 15px;
  overflow-wrap: break-word;
  background-color: var(--vp-c-bg);

  & > img {
    @media (min-width: 830px) {
      max-width: 300px !important;
    }
    @media (max-width: 830px) {
      max-width: 100% !important;
    }
    max-height: 350px !important;
    // margin: 5px 0; // 如果单独一行得单独加这个，同一行有文字的话对齐文字也可以
    border-radius: 10px;
  }

  .right-chat & {
    background-color: #0098fe;
    color: #fff;

    .bubble-arrow {
      border-top-color: #0098fe;
    }

    .chat-quote {
      background-color: #1fa4ff;
    }
  }

  html.dark .right-chat & {
    background-color: var(--vp-c-bg);
    color: #fff;

    .bubble-arrow {
      border-top-color: var(--vp-c-bg);
    }

    .chat-quote {
      background-color: var(--vp-c-bg-mute);
    }
  }
}
</style>
