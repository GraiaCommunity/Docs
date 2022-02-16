<template>
  <div class="simple-audio" :style="'width:' + time / 1.5 + 'rem'" @click="play">
    <span class="play"></span>
    <audio :src="audio" :id="audio" @ended="reset"></audio>
    <span>{{ time }}'</span>
  </div>
</template>

<script>
var tag = false
export default {
  props: {
    audio: String,
    time: Number,
  },
  methods: {
    play: function () {
      var audio = document.getElementById(this.audio)
      if (tag) {
        audio.pause()
        tag = false
      } else {
        audio.play()
        tag = true
      }
    },
    reset: function () {
      tag = false
    },
  },
}
</script>

<style scoped>
.simple-audio {
  display: flex;
  min-width: 4rem;
  max-width: 18rem;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.play {
  display: inline-block;
  width: 1.1rem;
  height: 1.1rem;
  mask: url(/images/tutorials/4_wifi.svg) no-repeat;
  mask-size: 100% 100%;
  background: var(--c-text);
  -webkit-mask: url(/images/tutorials/4_wifi.svg) no-repeat;
  -webkit-mask-size: 100% 100%;
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
</style>
