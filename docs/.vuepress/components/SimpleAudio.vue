<template>
  <div class="simple-audio" :style="'width:' + time / 1.5 + 'rem'" @click="play">
    <div class="player-symbol" id="player">
            <div class="player-circle first"></div>
            <div class="player-circle second"></div>
            <div class="player-circle third"></div>
    </div>
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
      var player = document.getElementById("player")
      if (tag) {
        audio.pause()
        player.className = "player-symbol"
        tag = false
      } else {
        audio.play()
        player.className = "player-symbol on-play"
        tag = true
      }
    },
    reset: function () {
      document.getElementById("player").className = "player-symbol"
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

 .player-symbol {
  width: 1.1rem;
  height: 1.1rem;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(135deg);
}

.player-circle {
  border: 3px solid #999999;
  border-radius: 50%;
  position: relative;
}

.player-circle.first {
  left: 13px;
  top: 13px;
  width: 5px;
  height: 5px;
  background: #cccccc;
}

.player-circle.second {
  width: 25px;
  height: 25px;
  left: 7px;
  top: -5px;
}

.player-circle.third {
  width: 40px;
  height: 40px;
  top: -42px;
  left: 1px;
}

.player-symbol.on-play .second{
  animation: fadeInOut 1s infinite 0.2s;
}

.player-symbol.on-play .third{
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
