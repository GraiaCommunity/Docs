<script setup>
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div class="custom-footer">
        <div class="custom-footer-container">
          <p><strong>Tip: </strong><span v-html="random"></span></p>
        </div>
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

<!-- 此处的 scoped 不生效，注意 css 名在其他位置是否重复 -->
<style scope>
.custom-footer {
  display: flex;
  justify-content: center;
}

/* 保持与文章区域宽度及边距一致 */
.custom-footer-container {
  width: var(--content-width);
  text-align: center;
  padding: 0 2.5rem;
}

@media (max-width: 959px) {
  .custom-footer-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (max-width: 419px) {
  .custom-footer-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.custom-footer-container > hr {
  margin-bottom: 1.5rem;
}

.custom-footer-container > p {
  margin: 0;
}
</style>
