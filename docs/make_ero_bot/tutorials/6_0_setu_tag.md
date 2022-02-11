# 6. 来点 xxx 涩图

[>_<]: 真的好多东西啊，好难写，哭唧唧

::: danger 警告
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
        async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
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
