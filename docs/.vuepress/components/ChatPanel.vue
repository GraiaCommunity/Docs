<template>
  <div class="panel">
    <div class="panel-title">{{ title }}</div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style scoped>
.panel {
  background: var(--c-details-bg);
  border-radius: 6px;
  margin: 16px 0;
}
.panel-title {
  font-weight: 600;
  text-align: center;
  padding: 6px;
}
.panel-body {
  padding: 8px 20px;
}
</style>
