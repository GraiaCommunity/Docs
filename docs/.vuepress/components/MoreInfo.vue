<template>
  <span class="text">
    {{ words }}
    <span class="mbox" style="width:200px">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    words: String,
  },
};
</script>

<style scoped>
.text .mbox {
    position: absolute;
	background-color: var(--c-details-bg);
	display: none;
}
.text:hover .mbox {
	display: block;
}
</style>