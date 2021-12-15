---
id: other_event
title: 2.别戳了
---

# 不要再戳了~

在看了[上一篇](1_hello_ero)后，你应该已经得到了一个**每发送一次消息就会嚷嚷要涩图的机器人**  
当然，一个在每一条消息后面都会嚷嚷要涩图的机器人还是太诡异了  
而且，QQ并不只有群消息这一种事件，比如，戳一戳
所以下面教大家如何用戳一戳触发

:::warning
`NudgeEvent`需要`Mirai`的登陆协议是`ANDROID_PHONE/IPAD/MACOS`中的一种  
`ANDROID_PAD/ANDROID_WATCH`协议由于腾讯服务器的原因并不能接收到`NudgeEvent`
:::

```python
...
#from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent
...

#@bcc.receiver(GroupMessage)
@bcc.receiver(NudgeEvent)
async def getup(app: Ariadne, event: NudgeEvent):
    to = event.group if event.context_type == "group" else event.friend_id
    await app.sendMessage(to, MessageChain.create("别戳我，好痒"))
...
```
<ChatPanel title="GraiaX-Community">
  <p align="center" style="font-size:0.5em">GraiaX <span style="display: inline-block; width: 1.5em; height: 1.5em;-webkit-mask:url(/images/2_poke.webp) no-repeat; -webkit-mask-size: 100% 100%;mask:url(/images/2_poke.webp) no-repeat; mask-size: 100% 100%;background:var(--c-text)"/> 戳了戳 EroEroBot 的 腰部</p>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">别戳我，好痒</ChatMessage>
</ChatPanel>

接下来，让我们好好讲解一下

## 关于 `BroadcastControl` 的超简单介绍

[>_<]: 这里很需要找个人改一下，我不会

`Graia-Ariadne` 使用了 `Graia-Broadcast` 作为其事件广播的工具  
`Graia Project` 的主要构造者 `GreyElaina` 称其为 利刃

当然，本篇教程并不会跟你完全讲清楚这是个啥，不过还是会或多或少涉及到一点

`graia-ariadne`定义了许许多多的`EventClass`, 每当其接收到其中的Event的时候(假设是GroupMessage)，就会通过`graia-broadcast`来进行事件广播  
而你的异步函数`setu`因为提前通过`@bcc.receiver(GroupMessage)`注册了事件，就会被调用  
而在调用之前，Broadcast会根据你函数所需要的参数去通过 `Dispatcher`进行解析
假设catch办法并不能满足该函数的需求，就会直接`raise RequirementCrash`


## `Event` 是什么
在QQ对话中，充满了无数多的事件: 接收到消息，管理禁言了某个人，管理开启了解除禁言，你的头衔更改了，开启了全体禁言......  
而这些事件就是`Event`   <Curtain>废话，事件的英文不就是Event吗</Curtain>
::: tip
`Graia-Ariadne`定义的所有事件都可以在`graia.ariadne.event`中找到
:::

在 BCC (即BroadcastControl，下同) 中，任何类的实例都可以拿来当事件广播，前提是他们声明了 `Dispatcher`



## 关于`Dispatcher`

让我们重新看一下上面例子中监听函数(Listener)定义
```python
async def getup(app: Ariadne, group: Group):
```
该函数需要 `app` 和 `group` 两个参数，而参数解析器(Dispatcher)，就是用来解析你需要什么参数的  
`Graia-Ariadne` 通过这项特性，提供了特别多的参数解析  
当然，如果你不喜欢这样子，也可以不用各事件提供的参数解析，像这样
```python
@bcc.receiver(GroupMessage)
async def test(event: GroupMessage):
    group = event.group
    ...
```
:::: details 一些比较常用的事件所支持的扩展
::: tip  
你可以直接通过查看各Event源码下的docstring来了解每个event的支持的Args  
(你永远可以相信GraiaProject旗下的项目docstring)  
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
