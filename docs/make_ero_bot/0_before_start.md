---
id: before_start
title: 0. 开始之前你需要知道的
---

# 开始之前

## 1. 这教程正经吗
正经，我说的

## 2. 我是应该先看官方的文档还是这个
事实上，我还是比较推荐先去看官方文档的  
该教程的目的在于**通过一些实际的应用场景**来向你介绍一些关于 `Ariadne` 的使用方法  
正是因为这个实际的应用场景，所以受限于教程的应用场景  
很多东西的讲解可能只是走一个过场，并不能介绍清楚框架的**方方面面**  
该教程是作为官方文档的**辅助**  
多看文档desu
:::tip
官方文档链接在文档右上角有哦  
（假设你是手机端就是左上角）
:::

## 3. 关于 Mirai 环境
请容许我先介绍一下 <Curtain>虽然说不知道已经说了多少遍了</Curtain>  
[`mirai`](https://github.com/mamoe/mirai)，是一个高性能，高可扩展性的 QQ 协议库  
[`mirai-console`](https://github.com/mamoe/mirai-console): 一个基于 `mirai` 开发的插件式可扩展开发平台  
[`mirai-api-http`](https://github.com/project-mirai/mirai-api-http): 一个 `mirai-console` 插件(简称 mah)，在 `Graia-Ariadne` 和 `mirai` 之间提供了交互方式
  
简单来说，`Graia-Ariadne` 是通过 `mirai-api-http` 与 `mirai` 进行连接，从而间接连接到 QQ 客户端  
如果你只下载了 `Graia-Ariadne` 而没有配置好 `mirai-api-http` ，那并不能运行  
所以，假设你想要使用，就必须先把 `mirai` 和 `mirai-api-http` 连接好  
至于配置方法，我向您推荐[Ariadne 官方文档关于 mah 的配置方法](https://graia.readthedocs.io/appendix/mah-install/)

## 4. 关于安装 Poetry
注：假设你不想用 `poetry` ，你可直接跳过  
本教程将会使用 `poetry` 来管理项目依赖关系  
在这里先放上 poetry 官方推荐的安装方法
```bash
# osx / linux / bashonwindows 
curl -sSL https://install.python-poetry.org | python -
# windows powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

## 5. 关于风控
在使用机器人的时候，你可能会遇到这些问题：
- 明明显示消息发送成功了，但是群友们 / 朋友没有接收到机器人发送的消息
- 在登录的时候， `Mirai` 报错，报错内容是 `该账号已经封禁`
- ......

以上发生的这类事件，我们一般称之为 `风控`  

被风控一般有如下原因：
- 你机器人所管理的账号被多人举报了
- 你发的涩图实在是太涩了
- 你机器人发送消息过于不像人(如高频率消息等)
- 你机器人发送的内容跟传销的一样
- ......

风控一直都是 QQ 机器人开发者们十分头疼的问题了  
不管是刚开始的新手还是老手，在风控面前人人平等  
所以，当你遇到这个问题的时候，无能狂怒并不能帮你解决这个问题  
你需要做的，只有积极配合，耐心的等待，或者换一个号（虽然刚注册的账号更容易封禁）

::: tip
当你遇到什么 bug 的时候，最好搞清楚是哪里的 bug  
再向那边的仓库提交 issue <Curtain type="tip">腾讯的 bug 例外，因为你压根没地方提交 issue</Curtain>
:::

## 6. 关于涩图机器人
1. 为了防止~~作者写文档写一半跑去看别的网站~~教程飞了，该文档不会有符合碳基生物审美的涩图
2. 本教程不单单会将思维局限于"发涩图"这件事上，还会有其他有趣的小功能 <Curtain>虽然浓度都不低</Curtain>  
3. 不建议用真·涩图测试机器人，极有可能被风控 <Curtain>涩图发给我就好</Curtain>  

## 7. 最近怎么没有更新
现在唯一可以知道的是，笔者出现在的最后一段监控的，ta 在听的，是一首名为"Untitled"的曲子

## 8. 当你遇到不会的东西的时候
![](/images/0_baidu.webp)