---
id: bot-start
title: 2.我启动了，来点涩图
---

:::danger
本文档需要大幅度修改
:::

在看了[上一篇](1-hello-ero)后，你应该已经得到了一个**每发送一次消息就会嚷嚷要涩图的机器人**  
当然，一个在每一条消息后面都会嚷嚷要涩图的机器人还是太烦人了  
能不能在机器人启动的时候说要涩图，而不是每收到一条消息就要涩图呢？当然可以

```python
...
#from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.lifecycle import ApplicationLaunched
...

#@bcc.receiver(GroupMessage)
@bcc.receiver(ApplicationLaunched)
async def getup(app: Ariadne):
    await app.sendGroupMessage(114514, MessageChain.create("你好，我起床了，有涩图看吗"))
...
```

从上面的代码，我们可以看到，我们将接收的消息类型从`GroupMessage`变成了`ApplicationLaunched`  
然后，现在我们就可以好好聊一聊关于Event的事情了 

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