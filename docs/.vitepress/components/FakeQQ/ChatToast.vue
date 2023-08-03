<template>
  <div class="message">
    <div class="gray-tip-message">
      <div class="gray-tip-content gray-tip-element"><slot></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChatToast'
})
</script>
