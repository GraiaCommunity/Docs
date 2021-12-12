<template>
    <ruby>
        <slot></slot>
        <rp>(</rp><rt style="font-size:0.75em">
            <curtain :title="title">{{up}}</curtain>
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
  },
};
</script>