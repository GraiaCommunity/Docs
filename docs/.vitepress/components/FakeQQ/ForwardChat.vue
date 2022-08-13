<!--
 修改自 https://github.com/Redlnn/Fake-QQ-Chat-Window

 MIT License

 Copyright (c) 2022 Red_lnn

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 @author Red_lnn
 @website https://github.com/Redlnn/Fake-QQ-Chat-Window

-->

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
  min-width: 230px;
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
  bottom: -2.1em;
}
</style>
