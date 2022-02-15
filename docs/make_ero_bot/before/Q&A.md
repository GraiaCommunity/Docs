# 0. 开始之前你需要知道的一些事

## 1. 这教程正经吗

正经，我说的

## 2. 我是应该先看官方的文档还是这个

事实上，我还是比较推荐先去看官方文档的

该教程的目的在于**通过一些实际的应用场景**来向你介绍一些关于 `Ariadne` 的使用方法  
正是因为专注于实际的应用场景，所以也仅受限于本教程所预设的应用场景

本教程很多东西的讲解可能只是走一个过场，并不能介绍清楚框架的**方方面面**，仅作为官方文档的**辅助**  
就像瑞士军刀一样，我通过一些例子来帮助你理解功能，但是我不会介绍其的所有功能

多看文档desu

::: tip
官方文档链接在文档右上角有哦  
（假设你是手机端就是左上角）
:::

## 3. 关于 Mirai 环境

请容许我先介绍一下<Curtain>虽然说不知道已经说了多少遍了</Curtain>

- [`mirai`](https://github.com/mamoe/mirai)，是一个高性能，高可扩展性的 QQ 协议库
- [`mirai-console`](https://github.com/mamoe/mirai-console): 一个基于 `mirai` 开发的插件式可扩展开发平台
- [`mirai-api-http`](https://github.com/project-mirai/mirai-api-http): 一个 `mirai-console` 插件(简称 mah)，在 `graia-ariadne` 和 `mirai` 之间提供了交互方式

简单来说，`graia-ariadne` 是通过 `mirai-api-http` 与 `mirai` 间接连接到 QQ 服务器的

如果只下载了 `graia-ariadne` 而没有配置好 `mirai-api-http` ，则无法启动 `graia-ariadne`。所以，想要使用 `graia-ariadne`，就必须先把 `mirai` 和 `mirai-api-http` 连接好

配置 `mirai` 和 `mirai-api-http` 的方法，推荐您阅读[Ariadne 官方文档关于 mah 的配置方法](https://graia.readthedocs.io/appendix/mah-install/)

## 4. 关于 Poetry

本教程将会使用 `poetry` 来管理项目依赖关系  

### 4.1 Poetry 是什么

> Poetry 是 Python 中用于**依赖管理**和**打包**的工具。它允许您声明项目所依赖的库，并将为您管理（安装/更新）它们。

说白了，他能够跟 pip 一样安装扩展  
但是，他通知还能帮你**管理**你已经安装的扩展  
（比如升级所有依赖什么的）

### 4.2 为什么我们想要使用 Poetry

当你写的机器人拥有越来越多功能的时候，代码所需要的第三方库也会越来越多  
（比如用来作图的 Pillow / PIL，用来做图标的 matplotlib）  
举个例子，这是 `graia-ariadne 0.5.2.post1` 的依赖

```bash
graia-ariadne==0.5.2.post1
  - aiohttp [required: >=3.7.4,<4.0.0]
    - async-timeout [required: >=3.0,<4.0]
    - attrs [required: >=17.3.0]
    - chardet [required: >=2.0,<5.0]
    - multidict [required: >=4.5,<7.0]
    - typing-extensions [required: >=3.6.5]
    - yarl [required: >=1.0,<2.0]
      - idna [required: >=2.0]
      - multidict [required: >=4.0]
  - graia-broadcast [required: >=0.15.2,<0.16.0]
  - loguru [required: >=0.6,<0.7]
    - colorama [required: >=0.3.4]
    - win32-setctime [required: >=1.0.0]
  - prompt-toolkit [required: >=3.0.24,<4.0.0]
    - wcwidth [required: Any]
  - pydantic [required: >=1.8.2,<2.0.0]
    - typing-extensions [required: >=3.7.4.3]
  - typing-extensions [required: >=4.0.0,<5.0.0]
  - yarl [required: >=1.7,<2.0]
    - idna [required: >=2.0]
    - multidict [required: >=4.0]
```

你以为你只安装了一个库，实际上你安装了17个库  
当你后面想要把你的机器人在别的电脑里运行的时候  
一切都太迟了，你完全不知道你到底需要哪个库，不需要哪个库  
甚至升级（pip更行库并不会自动升级依赖）

### 4.3 Poetry 的安装

```bash
# osx / linux / bashonwindows
curl -sSL https://install.python-poetry.org | python3 -
```

```powershell
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
- 你机器人发送的内容跟传销一样
- ......

风控一直都是 QQ 机器人开发者们十分头疼的问题  
不管是刚开始的新手还是老手，风控面前人人平等  
所以，当你遇到这个问题的时候，无能狂怒并不能帮你解决这个问题  
你需要做的，只有积极配合，耐心地等待，或者换一个号（虽然刚注册的账号更容易封禁）

::: tip
当你遇到什么 bug 的时候，最好搞清楚是哪里的 bug  
再向那边的仓库提交 issue <Curtain type="tip">腾讯的 bug 例外，因为你压根没地方提交 issue</Curtain>
:::

## 6. 关于涩图机器人

1. 为了防止~~作者写文档写一半跑去看别的网站~~教程飞了，该文档不会有符合碳基生物审美的涩图
2. 本教程不单单会将思维局限于"发涩图"这件事上，还会有其他有趣的小功能<Curtain>虽然浓度都不低</Curtain>
3. 不建议用真·涩图测试机器人，极有可能被风控<Curtain>涩图发给我就好</Curtain>

## 7. 最近怎么没有更新

现在唯一可以知道的是，笔者出现在的最后一段监控的，ta 在听的，是一首名为 `Untitled` 的曲子

## 8. 这文档浓度怎么这么高

当你思考到这个问题的时候，就说明，你的浓度也不低

## 9. 当你遇到不会的东西的时候

![baidu](/images/before/0_baidu.webp)
