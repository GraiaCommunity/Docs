<!-- Author: I Love Study <1450069615@qq.com> -->

<template>
  <span v-if="link" class="text">
    <span class="mbox" :style="{ width: width }">
      <div style="height: 1.4em"></div>
      <slot></slot>
    </span>
    <a>{{ words }}</a>
  </span>
  <span v-else class="text">
    <span class="mbox" :style="{ width: width }">
      <div style="height: 1.4em"></div>
      <slot></slot> </span
    >{{ words }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MoreInfo',
  props: {
    words: String,
    link: Boolean,
    width: {
      type: String,
      default: '200px',
    },
  },
})
</script>

<style scoped lang="scss">
.mbox {
  position: absolute;
  z-index: 22;
  display: none;
}

.text:hover .mbox {
  display: inline;
}
</style>
