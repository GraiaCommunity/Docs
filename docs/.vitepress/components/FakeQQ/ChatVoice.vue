<template>
  <section>
    <div class="message">
      <div
        class="message-container"
        :class="[onright ? 'message-container--self message-container--align-right' : '']"
      >
        <span class="avatar-span">
          <div
            v-if="avatar"
            class="avatar message-container__avatar"
            :style="{ backgroundImage: `url(${avatar})` }"
          ></div>
          <div v-else class="avatar message-container__avatar text-avatar">
            <span>{{ name[0] }}</span>
          </div>
        </span>
        <div class="user-name text-ellipsis">
          <span class="text-ellipsis">{{ name }}</span>
          <div
            class="q-tag member-role-tag"
            v-if="tag"
            :style="{ backgroundColor: tagBgColor, color: tagColor }"
          >
            {{ tag }}
          </div>
        </div>
        <div class="message-content__wrapper">
          <div
            class="msg-content-container mix-message__container ptt-message"
            :class="[onright ? 'container--self' : 'container--others']"
            :onclick="playVoice"
          >
            <div class="ptt-message__inner">
              <div class="ptt-element">
                <div class="ptt-element__top-area">
                  <div class="ptt-element__button">
                    <i class="q-icon">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 13.1783V2.82167C4 2.03258 4.87115 1.55437 5.53688 1.97801L13.6742 7.15634C14.2917 7.54929 14.2917 8.45071 13.6742 8.84366L5.53688 14.022C4.87115 14.4456 4 13.9674 4 13.1783Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </i>
                  </div>
                  <audio
                    ref="audio"
                    :src="audio"
                    @ended="reset"
                    @loadedmetadata="onLoadedmetadata"
                  ></audio>
                  <div class="ptt-element__progress">
                    <span
                      v-for="line in getLineCount(duration)"
                      :key="line.id"
                      ref="voice-line"
                      class="ptt-element__progress-item"
                      :style="{ height: `${getRndInteger(30, 60)}%` }"
                    ></span>
                  </div>
                  <div class="ptt-element__duration">
                    <span>{{ formatedDuration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatVoice',
  props: {
    name: { type: String, required: true },
    avatar: String,
    tag: String,
    tagBgColor: String,
    tagColor: String,
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
      num = num / 1.2
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
    getRndInteger: function (min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min
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
