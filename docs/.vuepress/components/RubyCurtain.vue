<template>
    <ruby>
        <slot></slot>
        <rp>(</rp><rt>
            <curtain :title="title" :type="type" style="height: 100px；">{{up}}</curtain>
        </rt><rp>)</rp>
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
    }
  },
};
</script>

<style scoped>
rt .heimu {
  padding-bottom: 0 !important;
}
</style>
