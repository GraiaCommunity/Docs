# 11. 哦嗨哟，欧尼酱

::: danger
本文档还没有写完
:::

::: danger DANGER 二次元浓度爆表了<div style="height:0.5em"></div>
:::

想必每一个二刺螈都曾今都会幻想过  
每天早上**女仆/只存在于美好幻想的可爱妹妹**叫你起床吧

然后，自从你学习了如何写出一个机器人脚本  
就想，能不能通过机器人脚本来间接实现这个幻想呢

<ChatPanel title="GraiaX-Community">
<p style = "text-align:center; font-size:0.75em">07:30</p>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')"><a>@GraiaX</a></ChatMessage>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')">
    <SimpleAudio audio="/voices/11_欧尼酱快起床.mp3"></SimpleAudio> <span style="margin-right:20px;"></span>7'
  </ChatMessage>
  <p style = "text-align:center; font-size:0.75em">11:30</p>
  <ChatMessage name="GraiaX" onright>哦嗨哟</ChatMessage>
</ChatPanel>

想想就得劲 <Curtain>虽然一个At跟语音八成不能成功叫你起床</Curtain>  
那么，就开始我们今天的艺术创想吧(bushi)

## 什么是 `Graia-Scheduler`

`Graia-Scheduler`是一个基于 asyncio, 设计简洁, 代码简单的计划任务库  

## 安装

::: tip
假设你之前用的是 `graia-ariadne[full]`，你可以直接跳过
:::

:::: code-group
::: code-group-item poetry

``` bash
poetry add graia-scheduler
```

:::
::: code-group-item pip

```bash
pip install graia-scheduler
```

::::

## 初始化

在你的代码中加入这些

```python
from graia.scheduler import GraiaScheduler
...
sche = GraiaScheduler(loop=loop, broadcast=bcc)
```

### 一个最简单的例子

以**每分钟都在群里发垃圾消息的机器人**为例子

```python
from graia.scheduler import timers

@shce.schedule(timers.every_minute())
async def every_minute_speaking(app: Ariadne):
    await app.sendGroupMessage(1919810, MessageChain.create("我又来了"))
```
