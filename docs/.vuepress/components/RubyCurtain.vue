<template>
  <ruby>
    <slot></slot>
    <rp>(</rp>
    <rt>
      <curtain :title="title" :type="type">{{ up }}</curtain>
    </rt>
    <rp>)</rp>
  </ruby>
</template>

<script>
export default {
  props: {
    up: String,
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
rt .heimu {
  height: 100px;
  font-size: 1em;
  padding-bottom: 0 !important;
}
</style>
