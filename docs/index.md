---
layout: home

title: 主页

hero:
    name: Nonebot 社区文档
    text: NonebotX Docs
    tagline: Documentation by community of Graia Project
    image:
      src: https://v2.nonebot.dev/logo.png
      alt: Nonebot
    actions:
        - theme: brand
          text: 快速开始
          link: https://v2.nonebot.dev/docs/
        - theme: alt
          text: 友商社区の文档
          link: /before/
        - theme: brand
          text: 还没写完的重构文档
          link: https://dev-docs.graiax.cn/
        - theme: alt
          text: Nonebot2 官方文档
          link: https://v2.nonebot.dev/

features:
    - title: 简洁而强大
      details: 化繁为简，Graia Framework(划掉) Nonebot 2 通过将复杂的底层简单化，只需几行代码，便可创造无限可能。
    - title: 框架式开发
      details: Graia Framework(划掉) Nonebot 2  借鉴了多种机器人框架的设计，并在其基础上创造出更多独有设计，帮助开发者更快更好地创作。
    - title: 富有表现性
      details: 借助 Graia Framework(划掉) Nonebot 2  的各种特性，你不必懊恼于网络通信，只需要有无限的想法就能实现你想要的一切。

footer: MIT Licensed | Copyright © 2022 Graia Community
---

<div class="home"><div class="container">

::: warning 注意
本文档所属项目为 Graia Community 自主发起，与 Graia Project 无任何直属关系。
本文档内容不代表 Graia Project 维护者的任何意图与目的，其由社区共同进行维护。
:::

::: interlink 镜像地址列表
默认: <https://graiax.cn>  
A60: <https://graiax.aunly.cn>  
Netlify: <https://graiax-doc.netlify.app>
:::

</div></div>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  padding: 0 24px;

  .container {
    width: 100%;
    max-width: 1152px;
  }

  .container > div {
    margin: 16px 0;
  }
}

@media (min-width: 640px) {
  .home {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .home {
    padding: 0 64px;
  }
}
</style>
