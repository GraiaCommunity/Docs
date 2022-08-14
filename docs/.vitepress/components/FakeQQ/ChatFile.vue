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
      v-if="avatar"
      :style="{ 'background-image': `url(${avatar})` }"
      class="chat-avatar"
    ></div>
    <div v-else class="chat-avatar">
      <span class="chat-avatar-text">{{ name[0] }}</span>
    </div>
    <div class="chat-content">
      <div class="chat-name">{{ name }}</div>
      <a
        ref="file"
        target="_blank"
        style="text-decoration: none; color: var(--vp-c-text-1)"
      >
        <div class="bubble" style="cursor: pointer">
          <div class="bubble-arrow"></div>
          <div class="file-content">
            <div class="fileinfo">
              <div class="filename">{{ filename }}</div>
              <div class="filesize">{{ filesize }}</div>
            </div>
            <div class="fileicon">
              <img :src="fileicon" />
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatFile',
  props: {
    name: { type: String, required: true },
    avatar: String,
    filename: { type: String, required: true },
    filesize: { type: String, required: true },
    fileicon: { type: String, required: true },
    href: { type: String, default: '' },
    onright: Boolean,
  },
  mounted() {
    if (this.href) {
      const file = this.$refs.file as HTMLAnchorElement
      file.href = this.href
    }
  },
})
</script>

<style scoped lang="scss">
.file-content {
  display: flex;
  justify-content: space-between;
  height: 60px;
  width: 180px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.fileinfo {
  width: 120px;
}

.filename {
  overflow: hidden;
  display: -webkit-box; // 虽然是 webkit 但火狐也可以用
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.filesize {
  margin-top: 3px;
  color: #999;
  font-size: 13px;
}

.fileicon {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.fileicon img {
  max-height: 100%;
  border-radius: 3px;
}
</style>
