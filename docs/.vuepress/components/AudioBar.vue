<template>
  <input
    id="range"
    type="range"
    min="0"
    max="100"
    value="100"
    oninput='
      var range = document.getElementById("range");
      range.style.backgroundSize = `${range.value}%, 100%`;
      for (let i of document.getElementsByTagName("audio")) {
        i.volume = range.value / 100;
      };
      document.getElementById("volume").innerHTML = `${value}%`;'
  />
  <p id="volume" style="display: inline; margin-left: 10px">100%</p>
</template>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 50%;
  border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
  background: linear-gradient(var(--c-text), var(--c-text)) no-repeat;
  background-size: 100% 100%;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
/*轨道设计*/
input[type="range"]::-webkit-slider-runnable-track {
  height: 15px;
  border-radius: 10px; /*将轨道设为圆角的*/
  box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112;
}
input[type="range"]::-moz-range-track {
  height: 17px;
  border-radius: 10px; /*将轨道设为圆角的*/
  box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112;
}
/*删除内框*/
input[type="range"]:focus {
  outline: none;
}
/*滑块*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
  background: var(--c-text);
  border-radius: 50%; /*外观设置为圆形*/
}
input[type="range"]::-moz-range-thumb {
  height: 25px;
  width: 25px;
  margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
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