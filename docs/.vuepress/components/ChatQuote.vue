<!-- FROM: https://github.com/Redlnn/Fake-QQ-Chat-Window -->

<template>
  <div class="chat-quote">
    <div class="quote-name">{{ name }}{{ time ? '&nbsp;' + time : '' }}</div>
    <div class="quote-content"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatQuote',
  props: {
    name: { type: String, required: true },
    time: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.chat-quote {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  font-size: 0.85em;
}

html.dark .chat-quote {
  background-color: var(--c-bg-lighter);
}

.quote-name {
  margin-bottom: 3px;
}

.quote-content:deep() > img {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: 180px;
  max-height: 200px;
  border-radius: 10px;
}
</style>
