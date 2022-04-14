# 开始之前你需要知道的一些事

## 1. 这教程正经吗

正经，我说的

## 2. 什么是 `Ariadne`

`Ariadne`（又称为 `v4p / v4+`）为 Graia Project 的一个子项目，
其是一个基于 Mirai API HTTP v2 的优雅且完备的 Python QQ 自动化框架，
也是本文档目前使用所使用的 QQ 框架。

同时 Graia Project 还有 `Application Mirai` (称为`v4`) 与
`Avilla` （称为`v5`）。目前，v4 已经停止更新，v5 仍处于 WIP 状态，因此建议停止使用 v4。

## 3. 什么是 `BroadcastControl`

以下是关于 `BroadcastControl` 的~~超简单~~介绍：

首先，我们知道，安装 Ariadne 时会同时安装一个名为 `graia-broadcast` 的依赖，
这就是 `BroadcastControl` （`graia-broadcast` 是他的包名）。

无论是 v4、v4p、v5 都将 Broadcast Control（以下简称为
`BCC`）用于用户接口的构造以及各式事件的广播。

而 `Graia Project`的主要贡献者 `GreyElaina` 则称其为 **魔剑** 。
<Curtain>我们有时候也称 GreyElaina 为魔女（此处的`女`字并不指性别）</Curtain>

::: warning 来自魔女的警告
魔女本人称本节剩余部分存在较多错误，因此仅供辅助理解。
:::

本小节会介绍`BroadcastControl` 的部分原理（或称 **BCC** 与 **Broadcast**，下同），以及 **Ariadne** 是如何与 **BCC** 协调工作的（部分），
但并不会完全跟你讲清楚（本教程也不会讲清楚）**BCC** 的核心工作原理。

首先，**BCC** 中定义了 **Dispatchable** 类和 **BaseDispatcher** 类，每一个 **Dispatchable** 类或继承自其的类都有一个名为 **Dispatcher** 的类变量/子类
（参数解析器。若为类变量，则该变量的值为一个继承自 **BaseDispatcher** 的类）。

`Ariadne` 中定义了许许多多继承自 **Dispatchable** 的 **EventClass**（事件类），
每当其接收到其中定义的 **Event**（事件，如 `GroupMessage`）时，**Ariadne** 就会通过 **BCC** 进行广播。

在我们的 Bot 中，异步函数 `setu()` 通过 `@channel.use(ListenerSchema(listening_events=[GroupMessage]))` 修饰器注册了 `GroupMessage` 事件，就会在接收到对应事件的广播时被调用。

继承自 **Dispatcher** 的类中一般需要定义一个名为 `catch` 的方法，在 `setu()` 被调用时，
**BCC** 会使用 `catch` 方法为该函数所需要的参数（如：`member: Member`、`event: GroupMessage` 等）赋值，
若无法满足该函数的参数需求，则会引发 `RequirementCrash` 异常。

::: tsukkomi 别打我
希望你看完这一小节后，还能认识“类”这个字以及 Dispatchable 和 Dispatcher 这两个单词。
:::

### 3.2 `Event` 是什么

在 QQ 中，充满了无数多的事件，如: 接收到消息、管理禁言了某个人、管理开启了解除禁言、你的头衔被更改了、开启了全体禁言等等……

而这些事件，就是 `Event`（<Curtain>废话，事件的英文不就是 Event 吗</Curtain>）。

::: tip
`graia-ariadne` 定义的所有事件均可在 `graia.ariadne.event` 中找到，你也可以通过自己的学习写出自己需要的事件。
:::

在 **BCC** 中，任何类的实例都可以拿来当事件广播，前提是他们声明了 `Dispatcher`。

### 3.3 关于 `Dispatcher`

让我们重新看一下上面例子中实现一个监听函数（Listener）的定义：

```python
async def getup(app: Ariadne, group: Group):
```

该函数需要「类型为 `Ariadne` 的 `app`」和「类型为 `Group` 的 `group`」两个参数，
而参数解析器（Dispatcher），就会通过**参数名**或**参数类型**为其赋值，通过这项特性，
`graia-ariadne` 就可以为监听不同事件的不同的函数所需要的参数赋值。

::: tip
在 `GroupMessage` 中，一般只会判断类型，就是说
像是这种

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def getup(eroerobot: Ariadne, house: Group)
    ...
```

也是可以的哦（不过不要想着）
:::

当然，如果你不喜欢这样子，也可以不用各事件提供的参数解析，像这样

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def test(event: GroupMessage):
    group = event.group
    ...
```

:::: details 一些比较常用的事件所支持的扩展
::: tip
你可以直接通过查看各 Event 源码下的 docstring 来了解每个 event 的支持的 Args  
(你永远可以相信 GraiaProject 旗下的项目 docstring)  
:::

```python
# 群消息
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def test(app: Ariadne, group: Group, member: Member, message: MessageChain, source: Source):
    ...

# 临时消息
@bcc.receiver(TempMessage)
async def test(app: Ariadne, group: Group, member: Member, message: MessageChain, source: Source):
    ...

# 朋友消息
@bcc.receiver(FriendMessage)
async def test(app: Ariadne, friend: Friend, message: MessageChain, source: Source):
    ...

# 群内有人被禁言
@bcc.receiver(MemberMuteEvent)
async def test(app: Ariadne, group: Group, target: Member):
    ...

# 群内有人被解除禁言
@bcc.receiver(MemberUnmuteEvent)
async def test(app: Ariadne, group: Group, target: Member):
    ...
```

::::

## 4. 我是应该先看官方的文档还是这个

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

## 5. 关于 Mirai 环境

请容许我先介绍一下<Curtain>虽然说不知道已经说了多少遍了</Curtain>

- [`mirai`](https://github.com/mamoe/mirai)，是一个高性能，高可扩展性的 QQ 协议库
- [`mirai-console`](https://github.com/mamoe/mirai-console): 一个基于 `mirai` 开发的插件式可扩展开发平台
- [`mirai-api-http`](https://github.com/project-mirai/mirai-api-http): 一个 `mirai-console` 插件(简称 mah)，在 `Ariadne` 和 `mirai` 之间提供了交互方式

简单来说，`Ariadne` 是通过 `mirai-api-http` 与 `mirai` 间接连接到 QQ 服务器的

如果只下载了 `Ariadne` 而没有配置好 `mirai-api-http` ，则无法启动 `Ariadne`。所以，想要使用 `Ariadne`，就必须先把 `mirai` 和 `mirai-api-http` 连接好

配置 `mirai` 和 `mirai-api-http` 的方法，推荐您阅读[Ariadne 官方文档关于 mah 的配置方法](https://graia.readthedocs.io/appendix/mah-install/)

## 6. 关于 Poetry

本教程将会使用 `poetry` 来管理项目依赖关系

### 6.1 Poetry 是什么

> Poetry 是 Python 中用于**依赖管理**和**打包**的工具。它允许您声明项目所依赖的库，并将为您管理（安装/更新）它们。

说白了，他能够跟 pip 一样安装扩展  
但是，他还能帮你**管理**你已经安装的扩展  
（比如升级所有依赖什么的）

### 6.2 为什么我们想要使用 Poetry

当你写的机器人拥有越来越多功能的时候，代码所需要的第三方库也会越来越多  
（比如用来作图的 Pillow / PIL，用来做图标的 matplotlib）  
举个例子，这是 `graia-ariadne 0.6.12 [standard]` 的依赖

```txt:no-line-numbers
graia-ariadne 0.6.12 Another elegant Python QQ Bot framework for mirai and mirai-api-http v2.
├── aiohttp >=3.7.4,<4.0.0
│   ├── aiosignal >=1.1.2
│   │   └── frozenlist >=1.1.0
│   ├── async-timeout >=4.0.0a3,<5.0
│   ├── attrs >=17.3.0
│   ├── charset-normalizer >=2.0,<3.0
│   ├── frozenlist >=1.1.1 (circular dependency aborted here)
│   ├── multidict >=4.5,<7.0
│   └── yarl >=1.0,<2.0
│       ├── idna >=2.0
│       └── multidict >=4.0 (circular dependency aborted here)
├── arclet-alconna-graia >=0.0.4,<0.0.5
│   ├── arclet-alconna *
│   ├── graia-ariadne * (circular dependency aborted here)
│   └── graia-broadcast *
├── graia-broadcast >=0.16.1,<0.17.0
├── graia-saya >=0.0,<0.1
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
└── yarl >=1.7,<2.0
    ├── idna >=2.0
    └── multidict >=4.0
```

你以为你只安装了一个库，实际上你安装了 25 个库
当你后面想要把你的机器人在别的电脑里运行的时候  
一切都太迟了，你完全不知道你到底需要哪个库，不需要哪个库  
甚至升级（pip 更新库并不会自动升级依赖）

### 6.3 为什么不用 `pip` + `venv`

就如开头所说，相比于 `pip` + `venv`，`poetry` 还能帮你**管理**你已经安装的扩展。
我知道肯定有一部分人会认为「不求最新版，容易出 bug」，
但是吧，最新版同时也会解决一些 bug。

例如早些时候的 v4<sup>[[注]](../appendix/terms.md)</sup> 的时候，
就有出现很多「因为 `pydantic` 版本没有更新而导致出现 bug 」的事情。

### 6.4 为什么不用 `conda` 或 `pdm`

~~啊对对对（开摆）~~ 因为社区内大部分机器人（甚至于 `GraiaProject` 旗下所有项目）都是使用 `poetry`，
所以我们也向各位推荐 `poetry`。

当然，假设你已经懂得如何用 `conda` 或 `pdm` 之类的依赖管理工具来管理你的项目，那用他们来管理 graia 项目是再好不过的
只是我们不会为了其他的依赖管理工具来写怎么配置之类的。

### 6.5 Poetry 的安装

:::: code-group
::: code-group-item 使用官方脚本

```bash
# osx / linux / bashonwindows
curl -sSL https://install.python-poetry.org | python3 -
```

```powershell
# windows powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

::: tip
因为网络的原因，可能你的系统连接到 pypi 的网速大概率是不怎么样的。
而且很可惜，该方法并不能将仓库更改到镜像源。

假设可以，建议你挂个全局 tz 再运行该脚本
:::

:::
::: code-group-item 使用 pipx

```bash
# 如果没有安装 pipx
pip install pipx

pipx install poetry
```

::: warning
我们不推荐你直接用 `pip` 安装 `poetry`, 因为 `poetry` 的大量依赖大概率会污染你的机器环境。
:::
:::

::::

## 7. 关于风控

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

## 8. 关于涩图机器人

1. 为了防止~~作者写文档写一半跑去看别的网站~~教程飞了，该文档不会有符合碳基生物审美的涩图
2. 本教程不单单会将思维局限于"发涩图"这件事上，还会有其他有趣的小功能<Curtain>虽然浓度都不低</Curtain>
3. 不建议用真·涩图测试机器人，极有可能被风控<Curtain>涩图发给我就好</Curtain>

## 9. 这文档浓度怎么这么高

当你思考到这个问题的时候，就说明，你的浓度也不低

## 10. 当你遇到问题的时候

鉴于 QQ Bot 社区的特殊性，我们建议你遵循以下步骤：

1. 立刻查看 [官方文档](https://graia.readthedocs.io)

2. 如果你发现官方文档没有提及。。。

   1. 如果模块以 `graia` 开头，立刻到 [交流群](https://jq.qq.com/?_wv=1027&k=VXp6plBD) 里问（可以 `@群菜鸡`，不行就 `@群菜块`）

   2. 否则，去翻对应的文档（或者 `Stack Overflow` 之类的地方，同时善用搜索引擎）~~（不过请远离 CSDN）~~

   ~~如果以 `arclet` 开头立刻在群里 `@[Arclet]RF`~~

::: warning
**请学会到群里提问，因为你提的问题有一定概率是我们的潜在 bug**

不过请先确认你的 Python 版本与 Graia 版本是受到支持的 (Python 3.8+, Graia 0.6+)
:::
::: warning 注意2
当你在提出问题的时候，请附上**完整的报错**跟**报错部分的代码**。
要不然你只会收获我们的问号。
:::

![baidu](/images/before/baidu.webp)
