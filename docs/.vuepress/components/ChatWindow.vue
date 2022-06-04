<!-- Author: Redlnn <w731347477@gmail.com> -->

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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatWindow',
  props: {
    title: String,
  },
})
</script>

<style scoped lang="scss">
.qq-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  border-radius: 6px;
  background-color: var(--c-details-bg);
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
  color: var(--c-text-quote);

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
  background-color: var(--c-bg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.chat-avatar-text {
  text-align: center;
  line-height: 42px;
  font-size: 24px;
  font-weight: bold;
  background: var(--c-bg);
}

.bubble-arrow {
  position: absolute;
  top: 11px;
  border-top: 10px solid var(--c-bg);
  z-index: 100;

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
  background-color: var(--c-bg);

  & > img {
    display: block;

    @media (min-width: 830px) {
      max-width: 300px !important;
    }
    @media (max-width: 830px) {
      max-width: 100% !important;
    }
    max-height: 350px !important;
    margin: 5px 0;
    border-radius: 10px;
  }
}
</style>
