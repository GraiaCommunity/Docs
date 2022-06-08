# 异步画~~涩~~图

::: danger
知道拼积木吗？现在这一章差不多可以认为是零件乱放。
:::

在看了那么多篇文档以及 [其他 bot](../appendix/awesome_bot.md) 的源码，
想必你已经做了一个**带有 Pillow / PIL 的制图**的模组吧~

但是，你有没有发现，随着你制图功能被调用的越来越多，你的 bot 又双叒叕卡了。

可能会吓得你赶紧去寻找问题出现的原因，随着你不断的收集数据及测试，
你最终会发现，原来是你的制图功能用时太久了。
太久也就算了，关键是在制图期间，**任何其他代码都在等待**。

:::warning
以下办法通常情况下并不能帮你解决**制图慢**的问题，  
只是将这个办法从同步变成了异步（即治标不治本）。

假设你真的想要加快制图的速度，
并且愿意牺牲一点点撸码体验，  
那么建议你去试试 `opencv-python` 之类的库。<br/><Curtain type="warning"> opencv-python 的使用方法虽然一点也不 Pythonic，但就速度与内存占用而言比 Pillow 猛多了</Curtain>
:::

## 快速实例

:::: code-group
::: code-group-item 原来的

```python
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG
...


def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = make_pic()
    await app.send_message(group, MessageChain(Image(pic)))

```

:::
::: code-group-item 用 io_bound

```python
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG
from graia.ariadne.util.async_exec import io_bound, cpu_bound
...


@io_bound
def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = await make_pic()
    await app.send_message(group, MessageChain(Image(pic)))
```

:::
::: code-group-item 用 asyncio.to_thread

```python
import asyncio
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG
...


def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = await asyncio.to_thread(make_pic())
    await app.send_message(group, MessageChain(Image(pic)))
```

:::
::::

::: tip
`io_bound` 跟 `asyncio.to_thread` 除了使用方法可能有所不同外，本质其实没有多大区别
:::

<p align="center" style="font-size: 30px"><strong>Moyuing~</strong></p>

<Loading></Loading>

::: interlink
**相关链接:** <https://graia.readthedocs.io/extra/async-exec/>
:::
