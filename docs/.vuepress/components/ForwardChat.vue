<!-- FROM: https://github.com/Redlnn/Fake-QQ-Chat-Window -->

<template>
  <div class="chat-item" :class="[onright ? 'right-chat' : 'left-chat']">
    <div
      :style="{ 'background-image': `url(${avatar})` }"
      class="chat-avatar"
    ></div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <div class="bubble">
        <div class="bubble-arrow"></div>
        <div class="forward-title">{{ title }}的聊天记录</div>
        <div class="forward-content">
          <div v-for="content in contents" :key="contents.indexOf(content)">
            {{ content }}
          </div>
        </div>
        <div class="forward-count">
          查看{{ counts ? counts : contents.length }}条转发消息
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForwardChat',
  props: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    contents: { type: Array, required: true },
    counts: { type: [Number, String], default: 0 },
    onright: Boolean,
  },
})
</script>

<style scoped lang="scss">
.bubble {
  min-width: 180px;
  padding-bottom: 5px;
  border-bottom: 1.8em solid #f7f7f7;
  overflow-wrap: break-word;
}

html.dark .bubble {
  border-bottom: 1.8em solid #141617;
}

.forward-title {
  margin-bottom: 5px;
}

.forward-content,
.forward-count {
  color: var(--c-text-quote);
  font-size: 0.8em;
  word-break: break-all;
}

.forward-count {
  position: absolute;
  bottom: -1.8em;
}
</style>
