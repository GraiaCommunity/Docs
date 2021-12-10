<template>
  <div class="outer">
    <div class="avatar">
      <img v-if="avatar" :src="avatar" />
      <div v-else class="avatar-text">{{ name[0] }}</div>
    </div>
    <div class="inner">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="name">{{ name }}</div>
      <div class="message"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    avatar: String
  }
};
</script>

<style scoped>
.outer {
  display: flex;
  margin: 12px 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 3;
  flex-shrink: 0;
}
.avatar-text {
  background: var(--c-bg);
  text-align: center;
  line-height: 40px;
  font-size: 24px;
  font-weight: 600;
}
.inner {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  position: relative;
}
.name {
  font-size: 12px;
  z-index: 3;
  margin-left: 5px;
}
.message {
  background: var(--c-bg);
  margin-top: 4px;
  padding: 10px;
  border-radius: 12px;
  z-index: 3;
}
.circle1 {
  position: absolute;
  top: 10px;
  left: -10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--c-bg);
  z-index: 1;
}
.circle2 {
  position: absolute;
  top: -23px;
  left: -20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--c-details-bg);
  z-index: 2;
}
</style>
