<template>
  <span
    :title="title"
    class="heimu"
    :style="'--text: var(--c-' + type + '-text);' + '--bg: var(--c-' + type + '-bg)'"
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
}
</script>

<style scoped>
.heimu,
.heimu a,
a .heimu {
  background-color: var(--text, var(--c-text));
  color: var(--text, var(--c-text));
  text-shadow: none;
  border-radius: 3px;
  padding: 2px 5px; /* 尽量与 code 标签的样式保持一致提升观感 */
  margin: 0 3px;
  /*font-size: 0.85em;  要是黑幕跟其他字体不一样大，就没那味了啊 */
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
