<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="my-footer">
        <p><strong>Tip: </strong><span v-html="random"></span></p>
      </div>
    </template>
  </ParentLayout>
</template>

<script>
export default {
  data() {
    return {
      randomMsg: [
        '你知道吗，遇到不会的可以看看<a href="/make_ero_bot/before/Q&A.html">这一章</a>的第9节',
        '涩图机器人文档真的没有涩图',
        '你瞎了？试试深色模式',
        '阿祖，别刷新了，阿妈叫你洗碗了',
        '都几点了，还在看，赶快睡觉',
      ],
      random: '',
    };
  },
  mounted() {
    var randomNum = Math.floor(Math.random() * this.randomMsg.length);
    this.random = this.randomMsg[randomNum];
  }
};
</script>

<style lang="css">
.my-footer {
  text-align: center;
  margin: 0 2em;
}
</style>
