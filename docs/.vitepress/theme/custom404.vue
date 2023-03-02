<script lang="ts" setup>
const a = 1
</script>

<template>
  <div class="not-found">
    <p class="code">404</p>
    <h1 class="title">Oops！页面好像走丢惹~</h1>
    <div class="divider"></div>
    <blockquote class="quote">生活就像海洋，只有意志坚强的人才能到达彼岸。 ——马克思</blockquote>
    <div class="action">
      <a class="link" href="/" aria-label="返回首页"> 返回首页 </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .not-found {
    padding: 96px 32px 168px;
  }
}

.not-found {
  padding: 96px 24px 96px;
  text-align: center;
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  //   letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: border-color 0.25s, color 0.25s;
}

h1,
h2,
h3,
h4,
h5,
h6,
li,
p {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
}
</style>
