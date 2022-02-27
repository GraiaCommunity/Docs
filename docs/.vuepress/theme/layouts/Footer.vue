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
        // '你知道吗，遇到不会的可以看看<a href="/make_ero_bot/before/Q&A.html">这一章</a>的第9节', 等解决了vue模板问题再用
        '涩图机器人文档真的没有涩图',
        '你瞎了？试试深色模式',
        '阿祖，别刷新了，阿妈叫你洗碗了',
        '都几点了，还在看，赶快睡觉',
        '据不完全统计，社区有半数以上的人玩音游',
        'sdıʇ ǝsɹǝʌǝɹ ɐ sı sıɥʇ',
        '建议每天撸码先来一句 poetry update，享受最新 bug',
        '你是过来看文档的还是看 TIPS 的',
        'Loading 是停不下来的',
        '切记，撸码要适度',
        '请大声喊出我的名字吧！',
        '撸码与 duang 不可兼得',
        '不要停下来啊（指写文档）',
        '可能抄到最后你会发现，大家的机器人重合度高的离谱',
        'ariadne 跟 sagiri-bot 的关系，有点像是 59 跟 59改',
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
