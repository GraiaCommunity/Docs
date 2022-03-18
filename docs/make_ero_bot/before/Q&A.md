# 0. 开始之前你需要知道的一些事

## 1. 这教程正经吗

正经，我说的

## 2. 我是应该先看官方的文档还是这个

一个简单的类比: 这个文档就相当于 [`Python 官方教程`](https://docs.python.org/zh-cn/3/tutorial/index.html),
而官方文档更像 [`Python 语言参考`](https://docs.python.org/zh-cn/3/reference/index.html)

该教程的目的在于**通过一些实际的应用场景**来向你介绍一些关于 `Ariadne` 的使用方法  
正是因为专注于实际的应用场景，所以也仅受限于本教程所预设的应用场景

官方文档可以深入地介绍 `Ariadne` 所有的特性, 但是在通俗性上肯定无法像这个文档做得那么好。
同时, 官方文档中会不时穿插一些 “实现原理”。
就使用而言, 这些解释并不必要，但是对于你理解 `Ariadne` 的工作原理与行为会有很大帮助。

本教程很多东西的讲解可能只是走一个过场，并不能介绍清楚框架的**方方面面**，仅作为官方文档的**辅助**  
就像瑞士军刀一样，我通过一些例子来帮助你理解功能，但是我不会介绍其的所有功能

所以，推荐你按照这篇文档循序渐进地了解 `Ariadne` 的强大功能，
同时你随时可以参考官方文档来进一步了解你所困惑的地方。

::: tip
官方文档链接在文档右上角有哦  
（假设你是手机端就是左上角）

同时，每篇文章下方都会有对应的官方文档链接，
里面对本篇运用到的特性进行了详细介绍
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
但是，他还能帮你**管理**你已经安装的扩展  
（比如升级所有依赖什么的）

### 4.2 为什么我们想要使用 Poetry

当你写的机器人拥有越来越多功能的时候，代码所需要的第三方库也会越来越多  
（比如用来作图的 Pillow / PIL，用来做图标的 matplotlib）  
举个例子，这是 `graia-ariadne 0.6.1 [full]` 的依赖

``` txt
graia-ariadne 0.6.1 Another elegant Python QQ Bot framework for mirai and mirai-api-http v2.
├── aiohttp >=3.7.4,<4.0.0
│   ├── aiodns *
│   │   └── pycares >=4.0.0
│   │       └── cffi >=1.5.0
│   │           └── pycparser *
│   ├── aiosignal >=1.1.2
│   │   └── frozenlist >=1.1.0
│   ├── async-timeout >=4.0.0a3,<5.0
│   ├── attrs >=17.3.0
│   ├── brotli *
│   ├── cchardet *
│   ├── charset-normalizer >=2.0,<3.0
│   ├── frozenlist >=1.1.1 (circular dependency aborted here)
│   ├── multidict >=4.5,<7.0
│   └── yarl >=1.0,<2.0
│       ├── idna >=2.0
│       └── multidict >=4.0 (circular dependency aborted here)
├── arclet-alconna >=0.6,<0.7
├── fastapi >=0.74.1,<0.75.0
│   ├── pydantic >=1.6.2,<1.7 || >1.7,<1.7.1 || >1.7.1,<1.7.2 || >1.7.2,<1.7.3 || >1.7.3,<1.8 || >1.8,<1.8.1 || >1.8.1,<2.0.0
│   │   └── typing-extensions >=3.7.4.3
│   └── starlette 0.17.1
│       └── anyio >=3.0.0,<4
│           ├── idna >=2.8
│           └── sniffio >=1.1
├── graia-broadcast 0.16.1
├── graia-saya >=0.0.14,<0.0.15
│   ├── graia-broadcast >=0.12.1
│   └── loguru >=0.5.3,<0.7
│       ├── colorama >=0.3.4
│       └── win32-setctime >=1.0.0
├── graia-scheduler >=0.0.6,<0.0.7
│   ├── croniter >=1.0.0,<2.0.0
│   │   └── python-dateutil *
│   │       └── six >=1.5
│   └── graia-broadcast >=0.12.1
├── loguru >=0.6,<0.7
│   ├── colorama >=0.3.4
│   └── win32-setctime >=1.0.0
├── prompt-toolkit >=3.0.24,<4.0.0
│   └── wcwidth *
├── pydantic >=1.8.2,<2.0.0
│   └── typing-extensions >=3.7.4.3
├── typing-extensions >=4.0.0,<5.0.0
├── ujson >=5.1.0,<6.0.0
├── uvicorn >=0.17.5,<0.18.0
│   ├── asgiref >=3.4.0
│   ├── click >=7.0
│   │   └── colorama *
│   ├── colorama >=0.4 (circular dependency aborted here)
│   ├── h11 >=0.8
│   ├── httptools >=0.2.0,<0.4.0
│   ├── python-dotenv >=0.13
│   ├── pyyaml >=5.1
│   ├── uvloop >=0.14.0,<0.15.0 || >0.15.0,<0.15.1 || >0.15.1
│   ├── watchgod >=0.6
│   └── websockets >=10.0
└── yarl >=1.7,<2.0
    ├── idna >=2.0
    └── multidict >=4.0
```

你以为你只安装了一个库，实际上你安装了……安装了……总之安装了好多好多个库  
当你后面想要把你的机器人在别的电脑里运行的时候  
一切都太迟了，你完全不知道你到底需要哪个库，不需要哪个库  
甚至升级（pip更行库并不会自动升级依赖）

### 4.3 为什么不用 `pip` + `venv`

就如开头所说，相比于 `pip` + `venv`，`poetry` 还能帮你**管理**你已经安装的扩展。
我知道肯定有一部分人会认为「不要最求最新版，容易出 bug」，
但是吧，最新版同时也会解决一些 bug。

例如早些时候的 v4<sup>[[注]](../appendix/terms.md)</sup> 的时候，
就有出现很多「因为 `pydantic` 版本没有更新而导致出现 bug 」的事情。

### 4.4 为什么不用 `conda` 或 `pdm`

~~啊对对对（开摆）~~ 因为社区内大部分机器人（甚至于 `GraiaProject` 旗下所有项目）都是使用 `poetry`，
所以我们也向各位推荐 `poetry`。

当然，假设你已经懂得如何用 `conda` 或 `pdm` 之类的依赖管理工具来管理你的项目，那用他们来管理 graia 项目是再好不过的
只是我们不会为了其他的依赖管理工具来写怎么配置之类的。

### 4.5 Poetry 的安装

:::: code-group
::: code-group-item 使用官方脚本
``` bash
# osx / linux / bashonwindows
curl -sSL https://install.python-poetry.org | python3 -
```

``` powershell
# windows powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```
:::
::: code-group-item 使用 pipx

``` bash
# 如果没有安装 pipx
pip install pipx

pipx install poetry
```

::: warning
我们不推荐你直接用 `pip` 安装 `poetry`, 因为 `poetry` 的大量依赖大概率会污染你的机器环境。
:::
:::

::::

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

## 9. 当你遇到问题的时候

鉴于 QQ Bot 社区的特殊性，我们建议你遵循以下步骤：

1. 立刻查看 [官方文档](https://graia.readthedocs.io)

2. 如果你发现官方文档没有提及。。。

    1. 如果模块以 `graia` 开头，立刻到 [交流群](https://jq.qq.com/?_wv=1027&k=VXp6plBD) 里问（可以 `@群菜鸡`，不行就 `@群菜块`）

    2. 否则，去翻对应的文档（或者 `Stack Overflow` 之类的地方，同时善用搜索引擎）~~（不过请远离CSDN）~~

    ~~如果以 `arclet` 开头立刻在群里 `@[Arclet]RF`~~

::: warning
**请学会到群里提问，因为你提的问题有一定概率是我们的潜在 bug**

不过请先确认你的 Python 版本与 Graia 版本是受到支持的 (Python 3.8+, Graia 0.6+)
:::

![baidu](/images/before/0_baidu.webp)
