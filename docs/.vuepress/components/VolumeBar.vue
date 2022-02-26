<template>
  <p v-if="front_word" id="volume-front">{{ front_word }}</p>
  <span id="volume-bar">
    <div class="volume">
      <input
        id="range"
        type="range"
        min="0"
        max="100"
        value="100"
        oninput='
          var range = document.getElementById("range");
          range.style.backgroundSize = `${range.value}% 100%`;
          for (let i of document.getElementsByTagName("audio")) {
            i.volume = range.value / 100;
          };
          document.getElementById("volume-num").innerHTML = `${value}%`;'
      />
      <p id="volume-num">100%</p>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    front_word: String
  },
}
</script>

<style scoped>
#volume-bar {
  display: inline-block;
  vertical-align: middle;
  width: 50%;
  height: 1rem;
}
#volume-num {
  padding: 0.1rem 0.3rem;
  margin-left: 4px;
  width: 46px;
  font-size: 0.9rem;
  text-align: right;
  background: var(--c-bg-lighter);
  border-radius: 5px;
}
#volume-front {
    display: inline-block;
    margin-right: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}
.volume {
  display: flex;
  height: 1rem;
  align-items: center;
}
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
  background: linear-gradient(var(--c-text), var(--c-text)) no-repeat;
  background-color: var(--c-bg-arrow);
  background-size: 100% 100%;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
/*轨道设计*/
input[type="range"]::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 10px; /*将轨道设为圆角的*/
  padding-bottom: 0.3rem;
}
input[type="range"]::-moz-range-track {
  height: 5px;
  border-radius: 10px; /*将轨道设为圆角的*/
}
/*删除内框*/
input[type="range"]:focus {
  outline: none;
}
/*滑块*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  margin-top: -0.3rem; /*使滑块超出轨道部分的偏移量相等*/
  background: var(--c-text);
  border-radius: 50%; /*外观设置为圆形*/
}
input[type="range"]::-moz-range-thumb {
  height: 1rem;
  width: 1rem;
  margin-top: -0.3rem; /*使滑块超出轨道部分的偏移量相等*/
  background: var(--c-text);
  border-radius: 50%; /*外观设置为圆形*/
}
/*Firefox用*/
input[type="range"]::-moz-range-progress {
  background: linear-gradient(var(--c-text), var(--c-text)) no-repeat;
  height: 13px;
  border-radius: 10px;
}
</style>
