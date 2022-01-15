---
id: 3-ero-comes
title: 3.涩图来
---

# 涩图来

::: danger
本文档**可能**还没有写完
:::

在之前的教程中，我们教会了大家怎么接收到各种类型的消息(如被禁言的时候)，但之前的教程并不能让我们**在群友要看涩图的时候发涩图**，而是**群友在干了什么事情的时候都在索取涩图**

在这一篇章，我们将会教大家如何**发涩图**

我们来回顾一下，在我们的[第一篇](1_hello_ero)中是通过什么办法来发送的消息

```python
await app.sendGroupMessage(group, MessageChain.create(
    f"不要说{message.asDisplay()}，来点涩图"
))
```

相信大家肯定会对其中的 `MessageChain` 很感兴趣  
这是什么，这个怎么用，怎么通过这个发送图片什么的  
今天就来讲讲 MessageChain

## 1. 什么是 MessageChain

首先要明确一点，QQ 消息并不只有纯文本，还可以包括了如 At, 图片等消息
而消息链(MessageChain)正是为了能够适应 QQ 这种富文本消息所诞生的产物

## 2. 什么是元素

像是"@xxx"， "图片"， "App消息", 就是 MessageChain 的元素  
所有元素都可在 `graia.ariadne.message.element` 中找到  
以下是常见的元素

```python
At(114514)  # @114514
AtAll()  # @全体成员
Poke(PokeMethods.ChuoYiChuo)  # 戳一戳方法
Image(path=...)  # 图片，这个我们后面的篇章还会提及
Face
```

## 3. 怎么构建 MessageChain

我们先来康康 MessageChain 的三种构建办法

```python
MessageChain.create([Plain("你好")])
MessageChain.create(Plain("你好"))
MessageChain.create("你好")
```

这三种办法都是调用 `create` 方法进行构建  
第一种办法先用文本元素 `Plain` 来构建一个文本消息，并将文本消息装在一个 list 中  
第二种办法是不传递列表，直接传入任意数量的元素进去  
第三种就更直接了，直接传入纯字符串进行构建(该方法仅支持纯文本)  

第一种办法最基本的构建办法，也是之前 v4(我们称 graia-application-mirai 为 v4)唯一合法的构建方法  
而剩余两种办法是 `graia-ariadne` 新增的办法，以帮助用户能够更加简单的创建消息链  
当然，实际上 `create` 办法并没有严格限定方法就必须是这三类中的一类，他们可以任意组合  
比如如下的骚操作

```python
MessageChain.create("你好", At(1919810), [Plain(", 你是不是喜欢"), At(114514)])
```

::: warning 注意一下
这只是举例，千万不要在你的业务代码中写出这么离谱的玩意儿  
<Curtain type="warning">否则<MoreInfo words="蓝玻璃块"><img src="/images/3_BGB_watching.webp"></MoreInfo>大概率会提刀撒了你</Curtain><Curtain type="warning">撒日朗</Curtain>
<div style="height:1em"></div>
:::

## 4. 怎么操作 MessageChain

说实话，就像 Python 的 str 一样， MessageChain 提供的方法有亿点点多  
这边推荐你去看一下这两篇官方教程  
~~ 这个社区文档作者就是逊啦，都不教的 ~~  

- [Ariadne 文档 消息链：基础](https://graia.readthedocs.io/basic/msg-chain/)  
- [Ariadne 文档 消息链：进阶](https://graia.readthedocs.io/advance/msg-chain/)  

当然我们这边就给各位提供一些简简单单的例子

```python
# 消息中是否有 AtAll Element
AtAll in message
# 有没有人 At 机器人
At(app.account) in message
# 消息里是不是只有文字（这里有个坑，详细请看第8章）
message.onlyContains(Plain)
# 获取消息链中所有的图片
message[Image]
# 快速合并两个 MessageChain 元素
MessageChain.create("ApplePen") + MessageChain.create("PineapplePen") == MessageChain.create("ApplePenPineapplePen")
# 过滤一遍消息链让其只有 Plain 和 At
message.include(At, Plain)
```

## 5. 怎么把 MessageChain 变成其他形式

虽然 `MessageChain` 这种格式极大程度的方便了使用者进行操作，  
但是很明显，在某些情况下，这玩意儿还是没有普通的字符串好使（比如格式化输出的时候）

当然，Ariadne 还是方法将 `MessageChain` 转换为普通的 `str`

### 1. `asDisplay()` 方法

这个应该是最简单，也是你最容易理解的办法，还记得最开始例子中的消息日志吗

```bash
2021-12-03 10:49:45.350 | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
2021-12-03 10:49:45.478 | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
```

事实上，消息日志所显示的，就是 `asDisplay()` 方法的返回值。  
这种办法返回的字符串比较容易让人看得舒服  
不过很多消息链所承载的消息都会被消除（如图片消息直接变成"[图片]"）  
::: tip
事实上，`message.asDisplay()` 跟 `str(message)` 是一样的
:::

### 2. `asPersistentString()` 方法

首先，先给各位上一个英语课  

**persistent** adj. 持久的  

所以，顾名思义，这个方法就是 ` 用于持久化保存 `  
这种办法可以将消息链所承载的**所有信息**变成字符串的形式  
比如下面这样

```python
>>> message = MessageChain.create("你好", At(114514, display="先辈"))
>>> message.asDisplay()
'你好@先辈'
>>> message.asPersistentString()
'你好[mirai:At:{"target":114514,"display":"\\u5148\\u8f88"}]'
```

虽然说储存了所有的消息，但是可读性大大降低了，所以该方法一般用于储存数据

::: tip
当你使用该方法保存图片信息的时候，事实上只会保存该图片的 url，并不会保存其二进制信息  
而且该链接会在过一段时间后就失效（别问我为什么，你问腾讯）  
所以，要想储存其二进制信息，需要添加一个参数

```python
MessageChain.asPersistentString(binary=True)
```

这样子，保存的时候就会将图片下载下来并保存了(音频同理)
:::

### 3. `asMappingString()` 方法

为了方便说明，我们直接举例子吧

```python
>>> message.asMappingString()
('你好\x021_At\x03', {1: At(target=114514, display='先辈')})
```

这个办法其实很简答  
说白了就是将所有非 Plain 的消息全都用别的字符串代替  
然后用一个字典储存被替换成字符串的元素
