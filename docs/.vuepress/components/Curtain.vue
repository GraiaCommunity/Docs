<template>
  <span
    :title="title"
    class="heimu"
    :style="
      '--text: var(--c-' + type + '-text);' + '--bg: var(--c-' + type + '-bg)'
    "
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "你知道的太多了",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.heimu,
.heimu a,
a .heimu {
  background-color: var(--text, var(--c-text));
  color: var(--text, var(--c-text));
  text-shadow: none;
  border-radius: 3px;
  padding: .1rem .3rem;
  margin: 0 .2rem;
  font-size: 1rem;
  transition: color 0.13s linear;
}
.heimu:hover,
.heimu:active,
.heimu:hover a,
a:hover .heimu,
.heimu.off a {
  color: var(--bg, var(--c-bg));
}
</style>
