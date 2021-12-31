---
id: 3-ero-comes
title: 3.涩图来
---

# 涩图来

:::danger
本文档**可能**还没有写完
:::


在之前的教程中，我们教会了大家怎么接收到各种类型的消息(如被禁言的时候)  
但之前的教程并不能让我们**在群友要看涩图的时候发涩图**，而是**群友在干了什么事情的时候都在索取涩图**
而在这一篇章，我们将会教大家如何**发涩图**

## MessageChain
我们来回顾一下，在我们的[第一篇](1_hello_ero)中是通过什么办法来发送的消息
```python
await app.sendGroupMessage(group, MessageChain.create(
    f"不要说{message.asDisplay()}，来点涩图"
))
```
相信大家肯定会对其中的`MessageChain`很感兴趣  
这是什么，这个怎么用，怎么通过这个发送图片什么的  
今天就来讲讲MessageChain
### 1. 什么是MessageChain
首先要明确一点，QQ消息并不只有纯文本，还可以包括了如At, 图片等消息
而消息链(MessageChain)正是为了能够适应QQ这种富文本消息所诞生的产物

### 2. 什么是元素
像是"@xxx"， "图片"， "App消息", 就是MessageChain的元素  
所有元素都可在`graia.ariadne.message.element`中找到  
以下是常见的元素
```python
At(114514) # @114514
AtAll() # @全体成员
Poke(PokeMethods.ChuoYiChuo) # 戳一戳方法
Image(path=...) # 图片，这个我们后面的篇章还会提及
Face
```

### 3. 怎么构建MessageChain
我们先来康康MessageChain的三种构建办法
```python
MessageChain.create([Plain("你好")])
MessageChain.create(Plain("你好"))
MessageChain.create("你好")
```
这三种办法都是调用`create`方法进行构建  
第一种办法先用文本元素`Plain`来构建一个文本消息，并将文本消息装在一个list中  
第二种办法是不传递列表，直接传入任意数量的元素进去  
第三种就更直接了，直接传入纯字符串进行构建(该方法仅支持纯文本)  

第一种办法最基本的构建办法，也是之前v4(我们称graia-application-mirai为v4)唯一合法的构建方法  
而剩余两种办法是`graia-ariadne`新增的办法，以帮助用户能够更加简单的创建消息链  
当然，实际上`create`办法并没有严格限定方法就必须是这三类中的一类，他们可以任意组合  
比如如下的骚操作  
```python
MessageChain.create("你好", At(1919810), [Plain(", 你是不是喜欢"), At(114514)])
```
:::danger 注意一下
这只是举例，千万不要在你的业务代码中写出这么离谱的玩意儿  
<Curtain type="danger">否则 <MoreInfo words="蓝玻璃块"><img src="/images/3_BGB_watching.webp"></MoreInfo>大概率会提刀撒了你</Curtain><Curtain type="danger">撒日朗</Curtain>
<div style="height:1em"></div>
:::

### 4. 怎么操作MessageChain
说实话，就像 Python 的 str 一样， MessageChain 提供的方法有亿点点多  
这边推荐你去看一下这两篇官方教程  
~~这个社区文档作者就是逊啦，都不教的~~  
[Ariadne 文档 消息链: 基础](https://graia.readthedocs.io/basic/msg-chain/)  
[Ariadne 文档 消息链: 进阶](https://graia.readthedocs.io/advance/msg-chain/)  

当然我们这边就给各位提供一些简简单单的例子
```python
# 消息中是否有AtAll Element
AtAll in message
# 有没有人At机器人
At(app.account) in message
# 获取消息链中所有的图片
message[Image]
# 快速合并两个message
MessageChain.create("ApplePen") + MessageChain.create("PineapplePen") == MessageChain.create("ApplePenPineapplePen")
# 过滤一遍消息链让其只有Plain和At
message.include(At, Plain)
```


## Twilight的简单运用
`Twilight`, 是`graia-ariadne`所使用的消息链匹配工具之一(是的，之一)  
我们就直接通过例子来向各位讲解如何使用`Twilight`

:::: code-group
::: code-group-item 0.5.0   -
```python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.twilight import Sparkle, Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight(Sparkle([FullMatch("涩图来")]))]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="/Graiax/EroEroBot/eropic.jpg")))
```
:::
::: code-group-item 0.5.0 +
```python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.twilight import Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight([FullMatch("涩图来")])]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="/Graiax/EroEroBot/eropic.jpg")))
```
:::
这个就是Twilight最简单的运用了
:::tip
虽然这些括号套娃套的有亿点点多，但习惯就好
:::