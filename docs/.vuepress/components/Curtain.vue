<!-- Author: I Love Study <1450069615@qq.com> -->

<template>
  <span
    :title="title"
    class="heimu"
    :style="`--text: var(--c-${type}-text); --bg: var(--c-${type}-bg)`"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Curtain',
  props: {
    title: {
      type: String,
      default: '你知道的太多了',
    },
    type: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.heimu {
  background-color: var(--text, var(--c-text));
  color: var(--text, var(--c-text));
  text-shadow: none;
  border-radius: 3px;
  padding: 2px 5px; /* 尽量与 code 标签的样式保持一致提升观感 */
  margin: 0 3px;
  transition: color 0.13s linear;

  &:deep() {
    code {
      padding: 0.1rem 0.25rem;
      background-color: var(--text, var(--c-text));
      color: var(--text, var(--c-text));
    }
    a {
      color: var(--text, var(--c-text));
    }
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--bg, var(--c-bg));

    &:deep() code {
      background-color: var(--bg, var(--c-bg));
      color: var(--text, var(--c-text));
    }

    &:deep() a {
      color: var(--c-text-accent);
    }
  }
}
</style>
