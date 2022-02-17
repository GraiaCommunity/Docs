<template>
  <div class="outer" :class="{ 'outer-right': onright }">
    <div class="avatar">
      <img v-if="avatar" :src="avatar" class="no-zoom" />
      <div v-else class="avatar-text">{{ name[0] }}</div>
    </div>
    <div class="inner" :class="{ 'inner-left': !onright, 'inner-right': onright }">
      <div class="circle circle1" :class="{ 'circle1-left': !onright, 'circle1-right': onright }"></div>
      <div class="circle circle2" :class="{ 'circle2-left': !onright, 'circle2-right': onright }"></div>
      <div class="name" :class="{ 'name-right': onright }">{{ name }}</div>
      <div class="message" :class="{ 'message-left': !onright, 'message-right': onright }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    avatar: String,
    onright: Boolean,
  },
}
</script>

<style scoped>
.outer {
  display: flex;
  margin: 12px 0;
}
.outer-right {
  flex-direction: row-reverse;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  overflow: hidden;
  z-index: 3;
  flex-shrink: 0;
}
.avatar-text {
  background: var(--c-bg);
  text-align: center;
  line-height: 36px;
  font-size: 24px;
  font-weight: 600;
}
.inner {
  display: flex;
  flex-direction: column;
  position: relative;
}
.inner-left {
  margin-left: 6px;
}
.inner-right {
  margin-right: 6px;
}
.name {
  font-size: 12px;
  z-index: 3;
  margin: 0 6px;
}
.name-right {
  text-align: right;
}
.message {
  background: var(--c-bg);
  font-size: 14px;
  margin-top: 4px;
  padding: 8px 12px;
  border-radius: 12px;
  z-index: 3;
}
.message-left {
  margin-right: 42px;
}
.message-right {
  margin-left: 42px;
}
.circle {
  position: absolute;
  border-radius: 50%;
}
.circle1 {
  top: 6px;
  width: 34px;
  height: 34px;
  background: var(--c-bg);
  z-index: 1;
}
.circle1-left {
  left: -10px;
}
.circle1-right {
  right: -10px;
}
.circle2 {
  top: -27px;
  width: 60px;
  height: 60px;
  background: var(--c-details-bg);
  z-index: 2;
}
.circle2-left {
  left: -20px;
}
.circle2-right {
  right: -20px;
}
</style>
