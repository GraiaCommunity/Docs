# 6.2 Twilight

::: danger
本章还没有写完

本文可能会过时，本文内的内容最后一次更新适用于 Ariadne 0.6.1。
:::

`Twilight`，是 `graia-ariadne` 所使用的消息链匹配工具之一，
我们就直接通过例子来向各位讲解如何使用 `Twilight`：  

:::: code-group
::: code-group-item 0.5.0+

``` python
...
from graia.ariadne.message.parser.twilight import Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight.from_command("涩图来")]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::: code-group-item 0.4.6+

``` python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.twilight import Sparkle, Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight([FullMatch("涩图来")])]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::: code-group-item >=0.3.5,<0.5.0

``` python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.parser import Sparkle
from graia.ariadne.message.parser.twilight import Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight(Sparkle([FullMatch("涩图来")]))]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::::

这个就是 Twilight 最简单的运用了，我猜你一定没看懂，所以下面我们继续来介绍一下 Twilight 以及他到底该怎么用吧~

::: warning
你可能从上面的例子就知道了，Twilight 的使用方法一致在跟随 Ariadne 的版本迭代进行改进。
因此在参照本文或官方文档的内容时，请时刻注意文档适用的 Ariadne 版本以及你自己所使用的 Ariadne 版本。
:::

## 6.2.1 Twilight 是什么

`Twilight` 是 Ariadne 使用的一种标准消息链匹配工具（有点类似于 v4 的 Kanata，但其增加了类似 argparse 的操作）

::: tsukkomi ???
`Twilight` 这个名字取自于 `My little Pony` 中的 `Twilight Sparkle`
<Curtain type="tip">来点暮光闪闪涩图<Curtain type="tip"> 人不能，至少不应该</Curtain></Curtain>
<div style="height:1em"></div>
:::

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<Loading></Loading>

::: interlink
**相关链接：**<https://graia.readthedocs.io/advance/twilight/>
:::
