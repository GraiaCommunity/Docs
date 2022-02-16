# 10. 哦嗨哟，欧尼酱

::: danger
本文档还没有写完<Curtain type="danger">且二次元浓度爆表了</Curtain>
:::

想必每一个二刺螈都曾今都会幻想过  
每天早上**女仆/只存在于美好幻想的可爱妹妹**叫你起床吧

然后，自从你学习了如何写出一个机器人脚本  
就想，能不能通过机器人脚本来间接实现这个幻想呢

懂得都懂 <VolumeBar></VolumeBar>

<ChatPanel title="GraiaCommunity">
<p style = "text-align:center; font-size:0.75em">07:30</p>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')"><a>@GraiaX</a> おはよう</ChatMessage>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')">
    <SimpleAudio audio="/voices/11_欧尼酱快起床.mp3" time=7></SimpleAudio>
  </ChatMessage>
  <p style = "text-align:center; font-size:0.75em">11:30</p>
  <ChatMessage name="GraiaX" onright>哦嗨哟</ChatMessage>
</ChatPanel>

::: tip
你可能会问上面这位叫你起床的是谁  
这位是 [Hanser](https://zh.moegirl.org.cn/Hanser)，B站账号是[这个](https://space.bilibili.com/11073)  
:::

想想就得劲<Curtain>虽然一个 At 跟语音八成不能成功叫你起床</Curtain>  
那么，就开始我们今天的艺术创想吧(bushi)

## 什么是 `Graia-Scheduler`

`Graia-Scheduler`是一个基于 asyncio，设计简洁，代码简单的计划任务库

## 安装 `Graia-Scheduler`

::: tip
假设你之前用的是 `graia-ariadne[full]`，你可以直接跳过
:::

:::: code-group
::: code-group-item poetry

```bash
poetry add graia-scheduler
```

:::
::: code-group-item pip

```bash
pip install graia-scheduler
```

::::

## 初始化 `Graia-Scheduler`

在你的代码中加入这些

```python
from graia.scheduler import GraiaScheduler
...
sche = app.create(GraiaScheduler)
```

## 一个最简单的例子

以**每分钟都在群里发垃圾消息的机器人**为例子

```python
from graia.scheduler import timers

@sche.schedule(timers.every_minute())
async def every_minute_speaking(app: Ariadne):
    await app.sendGroupMessage(1919810, MessageChain.create("我又来了"))
```

## 通过 crontab 来设定时间

在上面的例子中，你一定会发现，timers 中绝大多数 timer 都是**每隔一段间隔后触发**的一种模式  
这明显跟我们**让机器人每天早上7点半准时叫我们起床**相违背  
难道我们还要每天掐着点算什么时候启动机器人吗？

当然不是，有一个特殊的 timer 可以解决这个问题，那就是 `timers.crontabify`
该方法支持传入一个 `crontab` 时间格式来进行时间计算  
`crontab` 具体语法你可以看一下[菜鸟教程对 crontab 的讲解](https://www.runoob.com/linux/linux-comm-crontab.html)

> 假设你是在例如树莓派什么的地方运行，最好先检查一下你有没有设置好时区  
> 否则你的机器人可能会在协调世界时的早上7点半（北京时间15点半）叫你起床

::: tip
看清楚了，方法是 `timers.crontabify` 而不是 `timers.croniter`

事实上，`graia-scheduler` 所使用的 crontab 语法分析库支持将**秒**作为第六个参数导入，如

```python
#每天7点30分30秒发送消息
@sche.schedule(timers.crontabify("30 7 * * * 30"))
```

:::

<ChatPanel title="GraiaCommunity">
<p style = "text-align:center; font-size:0.75em">07:30</p>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')"><a>@GraiaX</a></ChatMessage>
  <ChatMessage name="Hanser" :avatar="$withBase('/avatar/hanser.webp')">
    <SimpleAudio audio="/voices/11_起床搬砖辣.mp3" time=14></SimpleAudio>
  </ChatMessage>
</ChatPanel>

:::interlink
**相关链接：**<https://graia.readthedocs.io/extra/scheduler/>
:::
