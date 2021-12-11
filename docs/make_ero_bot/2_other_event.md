---
id: other_event
title: 2.别戳了
---

# 不要再戳了~

:::danger
本文档需要大幅度修改
:::

在看了[上一篇](1_hello_ero)后，你应该已经得到了一个**每发送一次消息就会嚷嚷要涩图的机器人**  
当然，一个在每一条消息后面都会嚷嚷要涩图的机器人还是太诡异了  
而且，QQ并不只有群消息这一种事件，比如，戳一戳
所以下面教大家如何用戳一戳触发

:::warning
`NudgeEvent`需要`Mirai`的登陆协议是`ANDROID_PHONE/IPAD/MACOS`中的一种  
`ANDROID_PAD/ANDROID_WATCH`协议由于腾讯服务器的原因并不能接受`EudgeEvent`
:::

```python
...
#from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent
...

#@bcc.receiver(GroupMessage)
@bcc.receiver(NudgeEvent)
async def getup(app: Ariadne):
    await app.sendGroupMessage(114514, MessageChain.create("别错我，好痒"))
...
```
接下来，让我们好好讲解一些关于`Event`的那些事

## `Event`是什么
在QQ对话中，充满了无数多的事件: 接收到消息，管理禁言了某个人，管理开启了解除禁言，你的头衔更改了，开启了全体禁言......  
而这些事件就是`Event`   <Curtain>废话，事件的英文不就是Event吗</Curtain>
::: tip
`Graia-Ariadne`定义的所有事件都可以在`graia.ariadne.event`中找到
:::

## 关于`Dispatcher`
参数解析器(Dispatcher)，

## 关于`BroadcastControl`
`graia-ariadne`定义了许许多多的`EventClass`, 每当其接收到其中的Event的时候(假设是GroupMessage)，就会通过`graia-broadcast`来进行事件广播  
而你的异步函数`setu`因为提前通过`@bcc.receiver(GroupMessage)`注册了事件，就会被调用  
而在调用之前，Broadcast会根据你函数所需要的Args去通过EventClass的`catch`方法来获取  
假设catch办法并不能满足该函数的需求，就会直接报错


在这里给各位介绍一些常见的Event可以获取的Args  
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

# 群内有人被解除禁言
@bcc.receiver(MemberUnmuteEvent)
async def test(app: Ariadne, group: Group, target: Member):
...
```