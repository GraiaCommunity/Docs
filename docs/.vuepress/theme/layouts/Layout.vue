<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue' // eslint-disable-line
</script>

<template>
  <ParentLayout>
    <template #page-content-bottom>
      <div
        class="theme-default-content"
        style="
          padding-bottom: 0;
          text-align: center;
          margin-top: 50px;
          padding-bottom: 0;
        "
      >
        <div>
          <p class="tips">
            <strong>Tip: </strong>
            <span>{{ random }}</span>
          </p>
        </div>
      </div>
    </template>
    <template #page-bottom>
      <div
        class="theme-default-content"
        style="text-align: center; color: var(--c-text-quote)"
      >
        <div class="ccbyncsa">
          本文档使用
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh"
            target="_blank"
          >
            CC BY-NC-SA 4.0
          </a>
          协议进行共享，详情见
          <a href="https://github.com/GraiaCommunity/Docs" target="_blank"
            >README</a
          >。
        </div>
      </div>
    </template>
  </ParentLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      randomMsg: [
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
        '塔塔开，一自摸塔塔开',
        '如果文档看不懂，那么你没有看懂文档',
        '要来试一试下一代的新玩具 Avilla 吗',
        '你这 bot 是金子做的还是服务器是金子做的',
        'fut.set_result("KEEP_ALIVE")',
        '欢迎来到 GraiaX！这里是治疗低血压的最好的地方',
        '年轻的开发者哟，你掉的是这个 VSCode 还是 PyCharm 呢',
        '因为社区都去写自己的 bot 了，所以文档咕了',
        '因为社区都去打音游了，所以文档咕了',
        '因为社区都去真寻群看热闹了，所以文档咕了',
        '因为社区都想咕咕咕，所以文档咕了',
        'Literal[2122222222111221212111111111112]',
        'ModuleNotFoundError: No module named \'graiax\'',
        '看看你的 type checker',
        '什么超级魔法',
        'async def f(): time.sleep(10)',
        '不要以为加个 async 就是异步了',
        '你让 rf 给 alconna 加个 feature 不就行了',
        '好康，是新魔法哦',
        '[其他消息]',
        '基操勿6',
        '不是 excel？？不是 excel？？',
        '新人欢迎我们',
        '泻药，阿巴阿巴阿巴',
        '你问问北大美少女',
        '魔女.怒()',
        '今天魔女不在家？',
        '欢迎来到 graia.icu',
        'A60曾经说过，有人对着ABot发情',        
      ],
      random: '',
    }
  },
  mounted() {
    const randomNum = Math.floor(Math.random() * this.randomMsg.length)
    this.random = this.randomMsg[randomNum]
  },
})
</script>

<!-- 此处的 scoped 不生效，注意 css 名在其他位置是否重复 -->
<style scope lang="scss">
.ccbyncsa,
.tips {
  margin: 8px auto;
}
</style>
