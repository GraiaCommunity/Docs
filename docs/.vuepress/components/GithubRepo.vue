<template>
  <div class="repo" align="left">
    <div class="repo-content">
      <div class="repo-title">
        <svg
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          data-view-component="true"
          class="repo-svg"
        >
          <path
            fill-rule="evenodd"
            d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
          />
        </svg>
        <a :href="`https://github.com/${user}/${repo}`">{{ user }}/{{ repo }}</a>
      </div>
      <p
        class="repo-description"
      >&#9889; <slot>No description here!</slot></p>
      <p class="repo-meta">
        <span class="repo-meta-lang">
          <span class="repo-meta-lang-ico" style="background-color: #3572a5"></span>
          Python ←.← 废话
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    repo: String,
  },
}
</script>

<style scoped>
.repo {
  display: inline-block;
  width: 350px;
  margin: 0.5em;
  padding: 16px;
  /* border: 1px solid #d0d7de; */
  border-radius: 6px;
  background-color: var(--c-tip-bg);
}
@media (max-width: 959px) {
  .repo {
    max-width: calc(100% - 2rem);
  }
}
@media (max-width: 419px) {
  .repo {
    max-width: calc(100% - 1.5rem);
  }
}
.repo-content {
  display: flex;
  flex-direction: column;
}
.repo-svg {
  display: inline-block;
  overflow: visible !important;
  vertical-align: text-bottom;
  fill: currentColor;
}
.repo-title {
  display: flex;
  align-items: flex-end;
}
.repo-title > svg {
  margin-right: 4px;
}
.repo-title > a {
  word-break: break-word;
  font-weight: 600;
  margin-right: 4px;
  color: var(--c-tip);
}
.repo-description {
  flex: 1 0 auto;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 12px;
  color: var(--c-text-light);
}
.repo-meta {
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 12px;
}
.repo-meta * {
  color: var(--c-text-light);
}
.repo-meta-lang {
  display: inline-block;
  margin-right: 16px;
}
.repo-meta-lang-ico {
  display: inline-block;
  position: relative;
  top: 1px;
  width: 12px;
  height: 12px;
  border: 1px solid var(--color-primer-border-contrast);
  border-radius: 50%;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
