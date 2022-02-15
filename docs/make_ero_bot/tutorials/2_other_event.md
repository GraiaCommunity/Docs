# 2. 不要再戳了~

在看了[上一篇](./1_hello_ero.md)后，你应该已经得到了一个**每发送一次消息就会嚷嚷要涩图的机器人**  
不过，一个在每条消息后面都会嚷嚷要涩图的机器人还是太诡异了（？）  
并且，QQ 除了群消息外还有其他类型的事件，如戳一戳  
因此下面教大家如何使用戳一戳事件（`NudgeEvent`）

::: warning
此处的“戳一戳”所指的是手机 QQ 客户端中**双击头像**的功能，而不是私聊发送戳一戳表情（对应 PC 的**窗口抖动**）

接收 NudgeEvent 需要 Mirai 使用如下3种登陆协议中的一种：

- ANDROID_PHONE
- IPAD
- MACOS
:::

以下是一段示例代码（不完整，请自行插入到合适的地方，注释为与群消息事件的对比）

```python
...
#from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent
...

#@bcc.receiver(GroupMessage)
@bcc.receiver(NudgeEvent)
async def getup(app: Ariadne, event: NudgeEvent):
    if event.context_type == "group":
        await app.sendGroupMessage(event.group_id, MessageChain.create("别戳我，好痒"))
    else:
        await app.sendFriendMessage(event.friend_id, MessageChain.create("别戳我，好痒"))
...
```

此时运行机器人，然后在群里戳一下他，你就会得到如下结果

<ChatPanel title="GraiaCommunity">
  <p align="center" style="font-size:0.5em">GraiaX <span style="display: inline-block; width: 1.5em; height: 1.5em;-webkit-mask:url(/images/tutorials/2_poke.webp) no-repeat; -webkit-mask-size: 100% 100%;mask:url(/images/tutorials/2_poke.webp) no-repeat; mask-size: 100% 100%;background:var(--c-text)"/> 戳了戳 EroEroBot 的 腰部</p>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">别戳我，好痒</ChatMessage>
</ChatPanel>

## 2.1 关于 `BroadcastControl` 的超简单介绍

[>_<]: 这里很需要找个人改一下，我不会

`Graia-Ariadne` 使用了 `Graia-Broadcast` 作为其事件广播的工具，`Graia Project` 的主要构造者
<ruby>
  `GreyElaina` <rp>(</rp><rt><span lang="ja">灰の魔女</span></rt><rp>)</rp>
</ruby>
称其为
<ruby>
  魔剑 <rp>(</rp><rt><span lang="ja">魔剣</span></rt><rp>)</rp>
</ruby>

不过，本篇教程并不会完全跟你讲清楚这是什么，仅或多或少涉及部分

`graia-ariadne` 定义了许许多多的 `EventClass`（事件类），每当其接收到其中定义的 Event （事件，如 `GroupMessage`）时，就会通过 `graia-broadcast` 来进行事件广播。

因为你的异步函数 `setu` 提前通过 `@bcc.receiver(GroupMessage)` 注册了该事件，就会在接收到对应的事件广播时被调用。  

在 Ariadne 调用之前，Broadcast 会通过 `Dispatcher` 解析你的函数所需要的参数（如：`member: Member`、`event: GroupMessage` 等），假设 `EventClass` 中搞得 `catch` 办法无法满足该函数的参数需求，就会直接 `raise RequirementCrash`

## 2.2 `Event` 是什么

在 QQ 对话中，充满了无数多的事件，如: 接收到消息、管理禁言了某个人、管理开启了解除禁言、你的头衔被更改了、开启了全体禁言等等……  
而这些事件就是 `Event`<Curtain>废话，事件的英文不就是 Event 吗</Curtain>

::: tip
`graia-ariadne` 定义的所有事件都可以在 `graia.ariadne.event` 中找到
:::

在 BCC (即 BroadcastControl，下同) 中，任何类的实例都可以拿来当事件广播，前提是他们声明了 `Dispatcher`

## 2.3 关于 `Dispatcher`

让我们重新看一下上面例子中监听函数(Listener)定义

```python
async def getup(app: Ariadne, group: Group):
```

该函数需要 `app` 和 `group` 两个参数，而参数解析器(Dispatcher)，就是用来解析你需要什么参数的，`graia-ariadne` 通过这项特性，提供了特别多的参数解析。

当然，如果你不喜欢这样子，也可以不用各事件提供的参数解析，像这样

```python
@bcc.receiver(GroupMessage)
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
@bcc.receiver(GroupMessage)
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

::: interlink
**相关链接:** <https://graia.readthedocs.io/basic/params/>
:::
