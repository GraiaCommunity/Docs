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
  <div class="fakeqq-message" :class="[onright ? 'right' : 'left']">
    <div
      v-if="avatar"
      :style="{ 'background-image': `url(${avatar})` }"
      class="fakeqq-message__avatar"
    ></div>
    <div v-else class="fakeqq-message__avatar">
      <span class="fakeqq-message__text-avatar">{{ name[0] }}</span>
    </div>
    <div class="fakeqq-message__content">
      <div class="fakeqq-message__name">{{ name }}</div>
      <a ref="file" target="_blank" style="text-decoration: none; color: var(--vp-c-text-1)">
        <div class="fakeqq-message__bubble" style="cursor: pointer">
          <div class="fakeqq-message__bubble-arrow"></div>
          <div class="fakeqq-file__content">
            <div class="fakeqq-file__info">
              <div class="fakeqq-file__name">{{ filename }}</div>
              <div class="fakeqq-file__size">{{ filesize }}</div>
            </div>
            <div class="fakeqq-file__icon">
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
    onright: Boolean
  },
  mounted() {
    if (this.href) {
      const file = this.$refs.file as HTMLAnchorElement
      file.href = this.href
    }
  }
})
</script>
