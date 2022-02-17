<template>
  <div
    class="simple-audio"
    :style="'width:' + duration / 1.5 + 'rem'"
    @click="play"
  >
    <div class="player-symbol" :class="{ 'on-play': isActive }">
      <div class="player-circle first"></div>
      <div class="player-circle second"></div>
      <div class="player-circle third"></div>
    </div>
    <audio
      :src="audio"
      :id="audio"
      @ended="reset"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <span>{{ f_duration }}</span>
  </div>
</template>

<script>
var tag = false;
export default {
  props: {
    audio: String,
  },
  data() {
    return {
      isActive: false,
      duration: 0,
      f_duration: "123",
    };
  },
  methods: {
    play: function () {
      var audio = document.getElementById(this.audio);
      if (tag) {
        audio.pause();
        this.isActive = false;
        tag = false;
      } else {
        audio.play();
        this.isActive = true;
        tag = true;
      }
    },
    reset: function () {
      this.isActive = false;
      tag = false;
    },
    onLoadedmetadata: function () {
      var audio = document.getElementById(this.audio);
      this.duration = audio.duration;
      var m = Math.floor(audio.duration / 60);
      var s = Math.round(audio.duration % 60);
      this.f_duration = m > 0 ? `${m}'${s}"` : `${s}"`;
    },
  },
};
</script>

<style scoped>
.simple-audio {
  display: flex;
  min-width: 4rem;
  max-width: 15vw;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.player-symbol {
  width: 1.1rem;
  height: 1.1rem;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(135deg);
}

.player-circle {
  border: 2px solid #999999;
  border-radius: 50%;
  position: relative;
}

.player-circle.first {
  left: 13px;
  top: 13px;
  width: 5px;
  height: 5px;
}

.player-circle.second {
  width: 25px;
  height: 25px;
  left: 7px;
  top: -2px;
}

.player-circle.third {
  width: 40px;
  height: 40px;
  top: -37px;
  left: 2px;
}

.player-symbol.on-play .second {
  animation: fadeInOut 1s infinite 0.2s;
}

.player-symbol.on-play .third {
  animation: fadeInOut 1s infinite 0.4s;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
