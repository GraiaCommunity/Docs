<template>
  <section>
    <div class="message">
      <div
        class="message-container"
        :class="[onright ? 'message-container--self message-container--align-right' : '']"
      >
        <span class="avatar-span">
          <div
            v-if="avatar"
            class="avatar message-container__avatar"
            :style="{ backgroundImage: `url(${avatar})` }"
          ></div>
          <div v-else class="avatar message-container__avatar text-avatar">
            <span>{{ name[0] }}</span>
          </div>
        </span>
        <div class="user-name text-ellipsis">
          <span class="text-ellipsis">{{ name }}</span>
          <div
            class="q-tag member-role-tag"
            v-if="tag"
            :style="{ backgroundColor: tagBgColor, color: tagColor }"
          >
            {{ tag }}
          </div>
        </div>
        <div class="message-content__wrapper">
          <div class="forward-msg">
            <div class="fwd-title text-ellipsis">{{ title }}的聊天记录</div>
            <div
              v-for="content in contents"
              :key="contents.indexOf(content)"
              class="fwd-content text-ellipsis"
            >
              {{ content }}
            </div>
            <div class="count">查看{{ contents.length }}条转发消息</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForwardChat',
  props: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    title: { type: String, required: true },
    tag: String,
    tagBgColor: String,
    tagColor: String,
    contents: { type: Array, required: true },
    onright: Boolean
  }
})
</script>
