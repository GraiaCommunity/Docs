<template>
  <span
    v-if="type == ''"
    :title="title"
    class="heimu"
    :style="'--text: var(--c-text);--bg: var(--c-bg)'"
    ><slot></slot
  ></span>
  <span
    v-else
    :title="title"
    class="heimu"
    :style="'--text: var(--c-' + type + '-text);--bg: var(--c-' + type + '-bg)'"
    ><slot></slot
  ></span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "你知道的太多了",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
span.heimu a.external,
span.heimu a.external:visited,
span.heimu a.extiw,
span.heimu a.extiw:visited {
  color: var(--text, var(--c-text));
}
.heimu,
.heimu a,
a .heimu,
.heimu a.new {
  background-color: var(--text, var(--c-text));
  color: var(--text, var(--c-text));
  text-shadow: none;
  border-radius: 3px;
}
body:not(.heimu_toggle_on) .heimu:hover,
body:not(.heimu_toggle_on) .heimu:active,
body:not(.heimu_toggle_on) .heimu.off {
  transition: color 0.13s linear;
  color: var(--bg, var(--c-bg));
}
body:not(.heimu_toggle_on) .heimu:hover a,
body:not(.heimu_toggle_on) a:hover .heimu,
body:not(.heimu_toggle_on) .heimu.off a,
body:not(.heimu_toggle_on) a:hover .heimu.off {
  transition: color 0.13s linear;
  color: var(--bg, var(--c-bg));
}
body:not(.heimu_toggle_on) .heimu.off .new,
body:not(.heimu_toggle_on) .heimu.off .new:hover,
body:not(.heimu_toggle_on) .new:hover .heimu.off,
body:not(.heimu_toggle_on) .heimu.off .new,
body:not(.heimu_toggle_on) .heimu.off .new:hover,
body:not(.heimu_toggle_on) .new:hover .heimu.off {
  transition: color 0.13s linear;
  color: #ba0000;
}
</style>