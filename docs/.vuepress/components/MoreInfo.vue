<template>
  <span class="text" v-if="link">
  <span class="mbox" style="width: 200px">
  <div style="height: 1.4em"></div>
  <slot></slot>
  </span><a>{{ words }}</a>
  </span>
  <span class="text" v-else>
  <span class="mbox" style="width: 200px">
  <div style="height: 1.4em"></div>
  <slot></slot>
  </span>{{ words }}
  </span>
</template>

<script>
export default {
  props: {
    words: String,
    link: Boolean,
  },
};
</script>

<style scoped>
.mbox {
  position: absolute;
  z-index: 22;
  display: none;
}
.text:hover .mbox {
  display: inline;
}
</style>