<!-- Author: I Love Study <1450069615@qq.com> -->
<!-- Co-Author: Redlnn <w731347477@gmail.com> -->

<template>
  <div class="volume-bar">
    <span class="captions"><slot>普普通通的音量条：</slot></span>
    <input
      ref="input"
      type="range"
      min="0"
      max="100"
      value="100"
      :style="{ '--volume': volume + '%' }"
      :oninput="onInput"
    />
    <p ref="volumeNum" class="volume-num">100%</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      volume: 100,
    }
  },
  methods: {
    onInput: function () {
      const input = this.$refs.input as HTMLInputElement
      this.volume = parseInt(input.value)
      for (const i of document.getElementsByTagName('audio')) {
        i.volume = this.volume / 100
      }
      ;(this.$refs.volumeNum as HTMLElement).innerHTML = `${input.value}%`
    },
  },
})
</script>

<style scoped lang="scss">
*,
*::after,
*::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
}

.volume-num {
  padding: 0.1rem 0.3rem;
  margin-left: 4px;
  width: 48px;
  font-size: 0.9rem;
  text-align: right;
  background: var(--c-bg-lighter);
  border-radius: 5px;
}

.volume-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1em 0;
  height: 1rem;
}

@media (min-width: 600px) {
  .volume-bar {
    width: 80%;
  }
}

@media (min-width: 1060px) {
  .volume-bar {
    width: 60%;
  }
}

/* Input */
input {
  appearance: none;
  -webkit-appearance: none;
  padding: 0 10px;
  display: block;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  margin: 17px 0;
  border-radius: 1px;
  height: 1rem;
  flex: 1;
  &:focus {
    outline: none;
  }
  /* Webkit | Track */
  &::-webkit-slider-runnable-track {
    background: linear-gradient(#3eaf7c, #3eaf7c) no-repeat;
    background-color: var(--c-bg-arrow);
    background-size: var(--volume) 100%;
  }
  /* Webkit | Thumb */
  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    border: none;
    border-radius: 50%;
    height: 3px;
    width: 3px;
    background-color: #3eaf7c;
    transform: scale(4.5, 4.5);
    transition: box-shadow 0.3s cubic-bezier(0.5, -0.8, 0.5, 1.8);
  }
  /* Webkit | Hover */
  &::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 1.5px #3eaf7c33;
  }

  /* Webkit | Active */
  &::-webkit-slider-thumb:active {
    box-shadow: 0 0 0 2px #3eaf7c66;
  }

  /* Moz | Track */
  &::-moz-range-track {
    background-color: var(--c-bg-arrow);
  }

  /* Moz | Thumb */
  &::-moz-range-thumb {
    appearance: none;
    -moz-appearance: none;
    border: none;
    border-radius: 50%;
    height: 3px;
    width: 3px;
    background-color: #3eaf7c;
    transform: scale(4.5, 4.5);
    transition: box-shadow 0.3s cubic-bezier(0.5, -0.8, 0.5, 1.8);
  }

  /* Moz | Progress */
  &::-moz-range-progress {
    border-radius: 1px;
    height: 3px;
    background-color: #3eaf7c;
  }

  /* Moz | Hover */
  &::-moz-range-thumb:hover {
    box-shadow: 0 0 0 1.5px #3eaf7c33;
  }

  /* Moz | Active */
  &::-moz-range-thumb:active {
    box-shadow: 0 0 0 2px #3eaf7c66 !important;
  }

  &::-moz-focus-outer {
    border: none;
  }
}
</style>
