# 6.2 Twilight

`Twilight`，是 `graia-ariadne` 所使用的消息链匹配工具之一  
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
    dispatchers=[Twilight([FullMatch("涩图来")])]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="/Graiax/EroEroBot/eropic.jpg")))
```

:::
::::
这个就是 Twilight 最简单的运用了

下面我们来介绍一下 Twilight(0.5.0+)

## 6.2.1 Twilight 是什么

`Twilight` 是 Ariadne 使用的一种标准消息链匹配工具（有点类似于 v4 的 Kanata，但其增加了类似 argparse 的操作）

::: tip
其实 `Twilight` 这个名字是取自于 `My little Pony` 中的 `Twilight Sparkle`
<Curtain type="tip">来点暮光闪闪涩图<Curtain type="tip"> 人不能，至少不应该</Curtain></Curtain>
<div style="height:1em"></div>
:::

:::interlink
**相关链接：**<https://graia.readthedocs.io/advance/twilight/>
:::
