<!--
 Author: I Love Study <1450069615@qq.com>
 Co-Author: Redlnn <w731347477@gmail.com>
-->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Curtain',
  props: {
    title: {
      type: String,
      default: '你知道的太多了',
    },
  },
})
</script>

<template>
  <span :title="title" class="heimu">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.heimu {
  background-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
  text-shadow: none;
  border-radius: 3px;
  padding: 2px 5px; /* 尽量与 code 标签的样式保持一致提升观感 */
  margin: 0 3px;
  transition: color 0.13s linear;
  html.dark & {
    background-color: #e3e3e3;
    color: #e3e3e3;
  }

  &:deep() {
    code {
      padding: 0.1rem 0.25rem;
      background-color: var(--vp-c-text-1);
      color: var(--vp-c-text-1);
      html.dark & {
        background-color: #e3e3e3;
        color: #e3e3e3;
      }
    }
    a {
      color: var(--vp-c-text-1);
      html.dark & {
        color: #e3e3e3;
      }
    }
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--vp-c-bg) !important;

    &:deep() code {
      background-color: var(--vp-c-bg) !important;
      color: var(--vp-c-text-1) !important;
    }

    html.dark &:deep() a,
    &:deep() a {
      color: var(--vp-c-bg);
      text-decoration: underline;
    }
  }
}
</style>
