<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
const random = Math.floor(Math.random() * 5) + 1;
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">
        <p v-if="random === 1">
          <strong>TIPS: </strong>你知道吗，遇到不会的可以看<RouterLink
            to="/make_ero_bot/before/Q&A.html#_9-当你遇到不会的东西的时候"
            >这个</RouterLink
          >
        </p>
        <p v-else-if="random === 2">
          <strong>TIPS: </strong>涩图机器人文档真的没有涩图
        </p>
        <p v-else-if="random === 3">
          <strong>TIPS: </strong>你瞎了？试试深色模式
        </p>
        <p v-else-if="random === 4">
          <strong>TIPS: </strong>阿祖，别刷新了，阿妈叫你洗碗了
        </p>
        <p v-else-if="random === 5">
          <strong>TIPS: </strong>都几点了，还在看，赶快睡觉
        </p>
      </div>
    </template>
  </ParentLayout>
</template>

<style lang="css">
.my-footer {
  text-align: center;
  margin: 0 2em;
}
</style>