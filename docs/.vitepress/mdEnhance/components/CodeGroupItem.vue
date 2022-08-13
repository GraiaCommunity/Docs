<!--
 修改自 VuePress 2
 @src https://github.com/vuepress/vuepress-next/blob/main/packages/%40vuepress/theme-default/src/client/components/global/CodeGroupItem.vue
 @last-updated 2022-8-13
-->

<!--
 The MIT License (MIT)

 Copyright (c) 2018-present, Yuxi (Evan) You

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @author Yuxi (Evan) You
 @website https://github.com/vuepress/vuepress-next
-->


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeGroupItem',
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>
