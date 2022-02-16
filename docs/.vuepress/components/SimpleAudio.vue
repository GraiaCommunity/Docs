<template>
  <button
    style="
      display: inline-block;
      width: 1.8em;
      height: 1.8em;
      -webkit-mask: url(/images/tutorials/4_wifi.svg) no-repeat;
      -webkit-mask-size: 100% 100%;
      mask: url(/images/tutorials/4_wifi.svg) no-repeat;
      mask-size: 100% 100%;
      background: var(--c-text);
      -moz-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
    "
    @click="play"
  />
  <audio :src="audio" :id="audio" @ended="reset"></audio>
</template>

<script>
var tag = false
export default {
  props: {
    audio: String,
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
