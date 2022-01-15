---
id: 8_leave_no_evidence
title: 8. 看完了吗，我撤回了
---

# 看完了吗，我撤回了

::: danger
本文档有点混乱，可能需要重排版
:::

通过之前的栏目，想必大家都已经懂了怎么合理的发送~~涩图~~消息了  
不过，当你哪一天闲的没事干，翻历史记录的时候  
你发现，群里的图片历史记录，除了群友发的弔图，就只剩下机器人发的涩图了  
你很清楚，在这种情况下，明眼人一眼就能看出来涩图 bot 的身份  
牙白 desu 捏，必须给想个法子

## 撤回消息

为了确保**涩图**能够传承下去，我们需要懂得撤回涩图  
那涩图怎么撤回呢？怎么才能知道你要撤回的是哪一条消息呢？

第一个问题其实挺好解决的  
假设你真的会无聊翻阅 `Ariadne` 的 `docstring` 的话，你应该很快就会知道撤回的方法是

```python
app.recallMessage()  # 实际使用时请不要忘记 await
```

但问题是，该怎么样才能他知道，你要撤回的消息是什么呢？

### Source —— 消息的识别ID

再将这些之前，现给大家扯点别的  
假设（是的，又是假设）你还记得[第3章](3_ero_comes.html#_4-怎么操作-messagechain)曾经介绍过的`MessageChain.onlyContains`方法  
就会发现很诡异的事情

```python
@bcc.receive(GroupMessage)
async def test(app: Ariadne, message: MessageChain):
    print(message.onlyContains(Plain))
```

```bash
2022-01-14 00:42:38.651 | INFO     | graia.ariadne.model:log_group_message:106 - 114514: [GraiaX-Community(1919810)] GraiaX(10086) -> '测试'
False
```

`False`?! 明明只有测试两个字，但是却显示了False  
会不会是 onlyContains 方法的问题呢？  

```python
>>> msg = MessageChain.create("测试")
>>> msg.onlyContains(Plain)
True
```

看起来并不是 onlyContains 的问题哦  
那是什么问题呢？  

这时要就要让我们仔细地看一下我们接收到的 MessageChain 了

```python
@bcc.receiver(GroupMessage)
async def test(app: Ariadne, message: MessageChain):
    print(message.__repr__())
```

```python
# 输出结果如下
MessageChain([Source(id=1366023, time=datetime.datetime(2022, 1, 13, 16, 42, 38, tzinfo=datetime.timezone.utc)), Plain(text='测试')])
```

你会惊奇的发现，你接收到的消息中，除了代表着文本的 Plain，在最前面还有一个 Source  
而且，不只是纯文本，所有消息的最开始，都会有着这个 `Source` 元素  
而这，就是每一条消息独立的消息 ID （每个群、每个私聊会话中的消息 ID 都是独立的）  
再加上 `app.sendGroupMessage()` 的返回值 `BotMessage` 类型，就是 app.recallMessage()

```python
await app.recallMessage(source)  # 通过 Source 撤回他人的消息
await app.recallMessage(source.id)  # 通过 Source 中的消息 ID 撤回他人的消息
await app.recallMessage(botmessage)  # 通过 BotMessage 撤回 bot 自己发的消息
await app.recallMessage(botmessage.messageId)  # 通过 BotMessage 中的消息 ID 撤回 bot 自己发的消息
```

:::tip
有一个相对简单的获取消息链 ID 的方法
```python
@bcc.receiver(GroupMessage)
async def test(app: Ariadne, message: MessageChain, source: Source):
    if str(message) == "撤回测试":
        await app.recallMessage(source)
```
:::

## 异步延迟

### 情景导入

通过以上理论，你分分钟写出了一个带撤回功能的涩图机器人

```python
@bcc.receiver(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def test(app: Ariadne, message: MessageChain):
    session = adapter_ctx.get().session
    async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
        data = await r.read()
    b_msg = await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=data)))
    time.sleep(120)
    await app.recallMessage(source)
```

这个，确实成功了  
可是当你满怀激动的将你的bot给群友用了之后  
却是这样的局面

<ChatPanel title="GraiaX-Community">
  <p style = "text-align:center; font-size:0.75em">03:38</p>
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">涩图来</ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')"><img height="100" src="/images/8_ero_pic_1.webp"></ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">涩图来</ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">？我涩图呢</ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640"><a>@GraiaX</a> 我涩图呢</ChatMessage>
  <ChatMessage name="GraiaX" onright>涩图来</ChatMessage>
  <ChatMessage name="GraiaX" onright>az?</ChatMessage>
  <p style = "text-align:center; font-size:0.75em">03:40</p>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')"><img height="100" src="/images/8_ero_pic_2.webp"></ChatMessage>
  <p style = "text-align:center; font-size:0.75em">03:42</p>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')"><img height="100" src="/images/8_ero_pic_3.webp"></ChatMessage>
</ChatPanel>

你可以猜一下是什么原因吗

### 关于异步

还记得我们在[第6章](6_ero_from_net.html#为啥要用-aiohttp)讲过，我们为什么要使用异步吗

```python{7}
@bcc.receiver(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def test(app: Ariadne, message: MessageChain):
    session = adapter_ctx.get().session
    async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
        data = await r.read()
    b_msg = await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=data)))
    time.sleep(120)
    await app.recallMessage(source)
```

`time.sleep()` 这个方法就是一种同步办法  
即在 sleep 的这段时间里面**整个程序都会停止不动**  
牙白desu捏，那怎么办？

很简单，实际上，异步标准库 `asyncio` 已经帮你想好这个问题了  
并提供了异步用的休眠函数 `asyncio.sleep()`
你只需要做一下小小的替换就好了（如下）  

```python{7}
@bcc.receiver(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def test(app: Ariadne, message: MessageChain):
    session = adapter_ctx.get().session
    async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
        data = await r.read()
    b_msg = await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=data)))
    await asyncio.sleep(120)
    await app.recallMessage(source)
```
