<template>
  <div class="reply-element no-copy reply-element--self">
    <div class="reply-title">
      <div class="reply-info">
        <span class="text-ellipsis">{{ name }}</span>
      </div>
    </div>
    <div class="reply-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatQuote',
  props: {
    name: { type: String, required: true }
  }
})
</script>
