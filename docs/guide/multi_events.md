# 谁在找我

::: warning
以下使用场景，只能在 `graia-saya` 模块中才有所体现
假设
:::

我们来仔细对比一下 `graia-saya` 与 `BCC` 中对于 listener 的用法

``` python
# BCC
@bcc.receiver(GroupMessage)
# saya
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
```

你会发现，`channel.use` 传入的事件是一个 `List[Events]`，
而不像 `bcc.receiver` 一样，是一个 `Events`。

事实上，`BCC` 的广播确实是支持多类型的<Curtain>虽然 bcc.receiver 不行</Curtain>

::: tip
以下例子全部都只能在 `saya` 中使用。
假设你用的是 `bcc.receiver`，还是跳过这一章节吧。
:::

## 举个例子

``` python
from typing import Union
...

@channel.use(ListenerSchema(listening_events=[GroupMessage, NudgeEvent]))
async def hello(app: Ariadne, group: Group, member: Member, event: Union[GroupMessage, NudgeEvent])
    if isinstance(event, NudgeEvent) or At(app.account) in event.messageChain:
        await app.send_message(group, MessageChain("找我干肾么"))
```

<Loading></Loading>
