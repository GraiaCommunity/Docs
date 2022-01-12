---
id: 7_setu_tag
title: 7. 来点 xxx 涩图
---

# 来点 xxx 涩图

[>_<]: 真的好多东西啊，好难写，哭唧唧

:::danger 警告
因为文档作者本人也没有完全搞懂每一种消息适配器  
所以这篇文档大概是这个情况  
进度 <progress value="20" max="100"></progress> 20%  
下面你将看到：  
- 戛然而止的句子
- 除了例子什么都没有的组件介绍
- 明明说了下面讲解一下原理但是却什么没有的谎言
- 只有"敬请期待"的模块介绍
:::

在看了之前的教程，你应该写出了一个简单的涩图机器人
```python
...
@bcc.receiver(GroupMessage)
async def ero(app: Ariadne, group: Group, message: MessageChain):
    if message.asDisplay() == "涩图来":
        session = adapter_ctx.get().session
        async with session.get("https://api.ixiaowai.cn/api/api.php") as r:
            data = await r.read()
        await app.sendGroupMessage(group, MessageChain.create(
            Image(data_bytes=data)
        ))
...
```
不过说句实在话，用 `if` 来判断实在有点难受  
（比如缩进太多，那你匹配 `涩图来 %涩图tag%` 什么的）  
什么？你都有解决办法？
```python
# 缩进
if message.asDisplay() != "涩图来": return

# 匹配"涩图来 %涩图tag%"
if message.startswith("涩图来"):
    message.removeprefix("涩图来")
```
我不管，反正就是有点难受啦 o(≧口≦)o  
所以，今天给各位介绍一下 Ariadne 中的消息匹配器**们**

## Detectxxx
这是最简单的模块，只需要举个例子就可以说明完
```python
from graia.ariadne.message.parser.base import DetectPrefix, DetectSuffix

@bcc.receiver(GroupMessage)
async def who(app: Ariadne, group: Group, tag: MessageChain = DetectPrefix("我是")):
    await app.sendGroupMessage(group, MessageChain.create("你是") + tag)

@bcc.receiver(GroupMessage)
async def baka(app: Ariadne, group: Group, tag: MessageChain = DetectSuffix("是谁")):
    await app.sendGroupMessage(group, tag + MessageChain.create("是笨蛋"))
```
<ChatPanel title="GraiaX-Community">
  <ChatMessage name="GraiaX" onright>我是GraiaX</ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">你是GraiaX</ChatMessage>
  <ChatMessage name="GraiaX" onright>GraiaX是谁</ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">GraiaX是笨蛋</ChatMessage>
</ChatPanel>

用法就这么简单，不过嘛，还有一点点小问题  
就是当你想要匹配 `涩图来 %涩图tag%` 的时候，你的谨慎

:::tip
这个模块实际上用了 `graia-broadcast` 中参数修饰器的属性  
假设你特别想知道原理，可以看看[这里](https://autumn-psi.vercel.app/docs/broadcast/basic/decorator)
:::


## Twilight
`Twilight`, 是 `graia-ariadne` 所使用的消息链匹配工具之一  
我们就直接通过例子来向各位讲解如何使用 `Twilight`

:::: code-group
::: code-group-item 0.5.0 +
```python
...
from graia.ariadne.message.parser.twilight import Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight.from_command("涩图来")]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="/Graiax/EroEroBot/eropic.jpg")))
```
:::
::: code-group-item 0.5.0 -
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
::::
这个就是 Twilight 最简单的运用了

下面我们来介绍一下 Twilight(0.5.0+)

### 1. Twilight 是什么
`Twilight` 是 Ariadne 使用的一种标准消息链匹配工具（有点类似于 v4 的 Kanata，但其增加了类似 argparse 的操作）
:::tip
其实 `Twilight` 这个名字是取自于 `My little Pony` 中的 `Twilight Sparkle`
<Curtain type="tip">来点暮光闪闪涩图<Curtain type="tip"> 人不能，至少不应该</Curtain></Curtain>
<div style="height:1em"></div>
:::

## Alconna
敬请期待

## Commander
:::warning
该模块还在 WIP 阶段
:::
敬请期待

## Literature
:::warning
这玩意儿已经不受支持了  
所以不要用该模块  
<Curtain type="warning">写上来只是告诉你有这个玩意儿罢了</Curtain>
<div style="height:1em"></div>
:::

<style>
progress {
    -webkit-appearance: none;
    background: var(--c-danger);
    border: 0;
    border-radius: 3px;
}

progress::-webkit-progress-bar{
    background-color: var(--c-danger);
    border-radius: 3px;
}

progress::-webkit-progress-value{
    background-color: var(--c-danger-title);
    border-radius: 3px;
}

progress::-moz-progress-bar{
    background-color: var(--c-danger-title);
    border-radius: 3px;
}
</style>