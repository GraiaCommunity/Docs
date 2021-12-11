<template>
  <span :title="title" class="curtain"><slot></slot></span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "你知道的太多了"
    }
  }
};
</script>

<style scoped>
@keyframes curtainFadeOut {
  0% {
    background: var(--c-text);
  }
  100% {
    background: none;
  }
}
@keyframes curtainFadeIn {
  0% {
    background: none;
  }
  100% {
    background: var(--c-text);
  }
}
.curtain {
  margin-left: 0;
  margin-right: 0;
  background: var(--c-text);
  border-radius: 3px;
  animation: curtainFadeIn 0.1s ease-in-out;
}
.curtain:hover {
  background: none;
  animation: curtainFadeOut 0.1s ease-in-out;
}
.curtain,
.curtain a,
a .curtain {
  color: var(--c-text);
  text-shadow: none;
}
.curtain code,
code .curtain {
  padding: 0rem 0.4rem;
  color: var(--c-text);
  background-color: var(--c-text);
  border-radius: 3px;
}
.curtain code:hover,
code .curtain:hover {
  padding: 0.2rem 0.4rem;
  color: #f0615c;
  background-color: rgba(175, 184, 193, 0.2);
}
</style>