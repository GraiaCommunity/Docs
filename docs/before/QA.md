# 开始之前你需要知道的一些事

## 1. 我应该先看官方文档还是社区文档？

一个简单的类比: 本文档就相当于[`Python 官方教程`](https://docs.python.org/zh-cn/3/tutorial/index.html),
而官方文档更像 [`Python 语言参考`](https://docs.python.org/zh-cn/3/reference/index.html)

该教程的目的在于**通过一些实际的应用场景**来向你介绍一些关于
**Ariadne** 的使用方法正是因为专注于实际的应用场景，所以也仅受限于本教程所预设的应用场景

官方文档可以深入地介绍 **Ariadne** 所有的特性, 但是在通俗性上肯定无法像这个文档做得那么好。
同时, 官方文档中会不时穿插一些 “实现原理”，就使用而言, 这些解释并不必要。

本文档不会详细介绍技术细节，仅作为官方文档的**辅助**，
就像瑞士军刀一样，通过一些例子来帮助你发现 Ariadne 常用的功能。

:::warning

- 当你遇到不懂且文档没有给出解释的技术名词时，请尝试结合例子来自行理解。
- 本文档也不会介绍 Ariadne 的所有功能

:::

所以，推荐你先初略浏览一下官方文档，了解 **Graia Project**
都有哪些子项目，同时简单了解一下 Ariadne 都有哪些功能（因为本文档目前是基于 Ariadne 的），
之后再阅读本文档，帮你从理论转换为实际使用的功能。

当然，你也可以直接阅读本文档，遇到不清楚的内容再查阅官方文档，阅读时请善用搜索功能。

## 2. 什么是 `Ariadne`

:::interlink
官方文档：<https://graia.cn/ariadne/>
:::

**Ariadne** 为 **Graia Project** 的一个子项目，
是一个基于 Mirai API HTTP v2 的优雅且完备的 Python QQ 自动化框架，
也是本文档目前使用所使用的 QQ 框架。

除此之外 **Graia Project** 还有 `Application Mirai` 与
`Avilla` 两个框架，前者目前已经停止更新与支持，后者仍处于 WIP 状态。

## 3. 什么是 `BroadcastControl`

:::interlink
官方文档：<https://graia.cn/broadcast/>
:::

以下是关于 `BroadcastControl` 的简单介绍：

Broadcast Control（后续简称为 `BCC`）用于 Ariadne 的用户接口构造以及各式事件广播。ta 的作者 **GreyElaina** 称其为 **魔剑** 。
<curtain>我们有时候会称 GreyElaina 为魔女（此处的`女`字并不指性别）</curtain>

**BCC** 中有两种基本元素：Dispatcher（参数解析器）、Decorator（参数装饰器）。

我们常用的元素为 Dispatcher，比如监听的事件本身就是一种 Dispatcher，除此之外消息匹配（消息链解析器）也是一种 Dispatcher，他们可以作为额外的 Dispatcher 传入。

在 QQ 中，充满了无数多的事件，如: 收到消息、管理禁言了某个人、管理开启了解除禁言、你的头衔被更改了、管理开启了全体禁言等等……

Ariadne 定义的所有事件均可在 `graia.ariadne.event` 中找到，你也可以通过自己的学习写出自己需要的事件。

在 **BCC** 中，任何类的实例都可以拿来当事件广播，前提是他们声明了 `Dispatcher`。

## 4. 关于 Mirai

请容许我先介绍一下<curtain>（虽然说不知道已经说了多少遍了）</curtain>：

- [Mirai](https://github.com/mamoe/mirai)，是一个高性能，高可扩展性的 QQ 协议库
- [Mirai Console](https://github.com/mamoe/mirai-console): 一个基于 **Mirai** 开发的插件式可扩展开发平台
- [Mirai Api Http](https://github.com/project-mirai/mirai-api-http): 一个 **Mirai Console**
  插件（Graia 社区常简称为 **mah**），在 **Ariadne** 和 **Mirai** 之间提供了交互方式
- [Mirai Console Loader](https://github.com/iTXTech/mirai-console-loader): Mirai 及 Mirai Console 的启动器

简单来说，`Ariadne` 是通过 `mirai-api-http` 与 **`mirai`** 间接连接到 QQ 服务器的。

如果只下载了 `Ariadne` 而没有配置好 `mirai-api-http` ，则无法正常使用
`Ariadne`。所以，想要使用 `Ariadne`，就必须先把配置好 **`mirai`** 的自动登录以及 `mirai-api-http`。

配置 **`mirai`** 和 `mirai-api-http` 的方法，我们在 [Mirai 的安装与配置](./install_mirai.md) 一章中所有提及。
当然，你也可以阅读[Ariadne 官方文档关于 mah 的配置方法](https://graia.readthedocs.io/ariadne/appendix/mah-install/)。

## 5. 关于风控

在使用机器人的时候，你可能会遇到这些问题：

- 明明显示消息发送成功了，但是群友们 / 朋友没有接收到机器人发送的消息
- 在登录的时候， **Mirai** 报错，报错内容涉及“该账号已经封禁”等
- ……

以上发生的这类事件，我们一般称之为 `风控`

被风控一般有如下原因：

- 你机器人所管理的账号被多人举报了
- 你发的涩图实在是太涩了
- 你机器人发送消息过于不像人(如高频率消息等)
- 你机器人发送的内容跟传销一样
- ……

风控一直都是 QQ 机器人开发者们十分头疼的问题  
不管是刚开始的新手还是老手，风控面前人人平等  
所以，当你遇到这个问题的时候，无能狂怒并不能帮你解决这个问题  
你需要做的，只有积极配合，耐心地等待，或者换一个号（虽然刚注册的账号更容易封禁）

::: tip
当你遇到什么 bug 的时候，最好搞清楚是哪里的 bug  
再向那边的仓库提交 issue <curtain>腾讯的 bug 例外，因为你压根没地方提交 issue</curtain>
:::

## 6. Python 包管理器的选择

你可能听说过 [Conda](https://conda.io/)、[Poetry](https://python-poetry.org/)，Conda 是一个用于管理 Python 依赖和多版本 Python
的一个常用工具，经常出现在深度学习相关的领域，他同时也具备创建虚拟环境的功能。

为了隔绝不同 Python 项目的依赖，我们常常需要使用一种叫做**虚拟环境**（Virtual Environment）的方法，而
Conda 和 Poetry 都可以用于创建和管理虚拟环境。

假如你的设备中有深度学习项目且正在使用 Conda，那么请根据你的经验或其他教程自行创建虚拟环境。
需要注意的是，任意依赖管理器（有时也称包管理器）不要互相混用或套娃。

Conda 具备管理多 Python 版本，安装非 pip 包的功能，正常来说写一个机器人也不需要这些功能，
因此我们可以选择像 Poetry 这种单纯的依赖管理器，但是 Poetry
的依赖解析速度较慢，不遵守 PEP 规范，因此我们更建议使用 [PDM](https://pdm.fming.dev/)。

:::danger ~~异端~~
是的，不推荐直接使用 pip（希望你不会因此炸掉系统环境和其他项目），  
也不推荐自己直接用 virtualenv 或 venv。
:::

## 当你遇到问题的时候

鉴于 QQ Bot 社区的特殊性，我们建议你遵循以下步骤：

1. 查看 [官方文档](https://graia.readthedocs.io/ariadne)
2. 如果你发现官方文档没有提及……
   1. 如果模块名以 `graia` 或 `graiax` 开头，立刻到 [交流群](https://jq.qq.com/?_wv=1027&k=VXp6plBD) 里问
   2. 否则，去翻对应的文档（或者 `Stack Overflow` 之类的地方，同时善用搜索引擎 <curtain>不过请远离 CSDN</curtain>）
      ~~如果以 `arclet` 开头立刻在群里 `@[Arclet]RF`~~

::: warning

1. **请学会到群里提问，因为你提的问题有一定概率是我们的潜在 bug**
   不过请先确认你的 Python 版本与 Graia 版本是受到支持的 (Python 3.8+, Graia Ariadne 0.7.15+)
2. 当你在提出问题的时候，请附上**完整的报错**跟**报错部分的代码**。
   要不然你只会收获我们的问号。
:::

<div id="baidu"></div>

![baidu](/images/before/baidu.webp)
