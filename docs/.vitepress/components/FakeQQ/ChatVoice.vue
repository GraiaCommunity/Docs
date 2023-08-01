<!--
 修改自 https://github.com/Redlnn/Fake-QQ-Chat-Window

 MIT License

 Copyright (c) 2023 Red_lnn

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
      <div class="fakeqq-message__bubble" :onclick="playVoice" style="cursor: pointer">
        <div class="fakeqq-message__bubble-arrow"></div>
        <div class="fakeqq-voice">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="26" />
            <path
              d="M35.5,25.324,20.512,14.575a1,1,0,0,0-1.589.815v21.5a1,1,0,0,0,1.589.816L35.5,26.955a1,1,0,0,0,.237-1.394A.988.988,0,0,0,35.5,25.324Z"
            />
          </svg>
          <audio ref="audio" :src="audio" @ended="reset" @loadedmetadata="onLoadedmetadata"></audio>
          <span class="fakeqq-voice__bar">
            <span
              v-for="line in getLineCount(duration)"
              :key="line.id"
              ref="voice-line"
              class="fakeqq-coice__bar-line"
            ></span>
          </span>
          {{ formatedDuration }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatVoice',
  props: {
    name: { type: String, required: true },
    avatar: String,
    audio: { type: String, required: true },
    onright: Boolean
  },
  data() {
    return {
      playFlag: false,
      duration: 10,
      formatedDuration: ''
    }
  },
  methods: {
    getLineCount: function (num: number) {
      const lineArray = []
      num = num / 1.5
      if (num < 5) return [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
      for (let i = 0; i <= num; i++) {
        if (i >= 25) {
          break
        }
        lineArray.push({ id: i })
      }
      return lineArray
    },
    reset: function () {
      this.playFlag = false
    },
    onLoadedmetadata: function () {
      const audioElem = this.$refs.audio as HTMLAudioElement
      this.duration = Math.round(audioElem.duration)
      const m = Math.floor(audioElem.duration / 60)
      const s = Math.round(audioElem.duration % 60)
      this.formatedDuration = m > 0 ? `${m}'${s}"` : `${s}"`
    },
    sleep: (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async playVoice() {
      const audioElem = this.$refs.audio as HTMLAudioElement
      const lines = this.$refs['voice-line'] as NodeListOf<HTMLElement>
      if (this.playFlag) {
        audioElem.pause()
        audioElem.currentTime = 0
        lines.forEach((line) => {
          line.style.backgroundColor = 'var(--vp-c-text-1)'
        })
        this.playFlag = false
      } else {
        audioElem.play()
        this.playFlag = true
        lines.forEach((line) => {
          line.style.backgroundColor = '#999999'
        })
        for (let index = 0; index < lines.length; index++) {
          if (audioElem.paused) return
          await this.sleep((this.duration * 1000) / lines.length).then(() => {
            lines[index].style.backgroundColor = 'var(--vp-c-text-1)'
          })
        }
      }
    }
  }
})
</script>
