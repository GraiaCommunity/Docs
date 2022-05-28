<!-- FROM: https://github.com/Redlnn/Fake-QQ-Chat-Window -->

<template>
  <div class="chat-item chat-toast"><slot></slot></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatToast',
})
</script>

<style scoped lang="scss">
.chat-toast {
  color: var(--c-text-quote);
  font-size: 12px;
  text-align: center;
}
</style>
