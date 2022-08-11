<!--
FROM: https://github.com/vuepress/vuepress-next/blob/main/packages/%40vuepress/theme-default/src/client/components/global/CodeGroupItem.vue
Last Sync: 2022-08-09 22:55
-->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeGroupItem',
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>
