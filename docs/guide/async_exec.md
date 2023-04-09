# 异步画~~涩~~图

:::danger
知道拼积木吗？现在这一章差不多可以认为是零件乱放。
:::

:::danger
蓝玻璃块（`Ariadne`的主要维护者）认为现在这个功能是重复造轮子  
该功能已经在[`Unsync`](https://pypi.org/project/unsync/)中实现  
:::

在看了那么多篇文档，想必你已经做了一个**带有 Pillow / PIL 的制图**的模组吧~

但是，你有没有发现，随着你制图功能被调用的越来越多，你的 bot 又双叒叕卡了。

可能会吓得你赶紧去寻找问题出现的原因，随着你不断的收集数据及测试，
你最终会发现，原来是你的制图功能用时太久了。
太久也就算了，关键是在制图期间，**任何其他代码都在等待**。

:::warning
以下办法通常情况下并不能帮你解决**制图慢**的问题，  
只是将这个办法从同步变成了异步（即治标不治本）。

假设你真的想要加快制图的速度，
并且愿意牺牲一点点撸码体验，  
那么建议你去试试 `opencv-python` 之类的库。<br /><curtain> opencv-python 的使用方法虽然一点也不 Pythonic，但就速度与内存占用而言比 Pillow 猛多了</curtain>
:::

## 快速实例

::::code-group
:::code-group-item 原来的

```python
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG


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
:::code-group-item 用 io_bound

```python
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG
from graia.ariadne.util.async_exec import io_bound, cpu_bound


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
:::code-group-item 用 asyncio.to_thread

```python
import asyncio
from io import BytesIO

# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了
from PIL import Image as IMG


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

:::tip
`io_bound` 跟 `asyncio.to_thread` 除了使用方法可能有所不同外，本质其实没有多大区别。
不过假设你使用的是 `Python3.8`，那就没有 `asyncio.to_thread`
:::

## 这是什么？

## GIL 是什么？
GIL ，既全局解释器锁(Global Interpreter Lock)，为了保证线程安全而导入的解释器锁

### 为什么引入 GIL ？
Python 的内存回收机制在加载资源时，会对资源做标记，对应一些数字，这些数字代表这个资源还能被线程调用多少次，当数字归零时自动释放。

在没有GIL锁的情况下，Python可以允许多线程运行，但是这可能会造成一些问题。  

比如，当两个线程同时调用到一个资源，会出现两种情况  

1.这个资源的标记值为1， 1-2=-1 ，导致 Python 无法释放这些资源，因为他们的值不等于0。  

2.这个资源标记值刚好为2，两个线程调用，标记值 =2-2=0 ，资源被 Python 强制释放掉了。  

情况 1 会造成内存泄漏，情况 2 可能会造成程序崩溃。  

再比如 Python 上运行着8个线程。  

这些线程都在向其他线程请求资源，但是大家都没有资源，只能一直等待，形成死锁。  

无论是哪种情况都不是我们希望看到的。  


GIL 锁的引入正好解决了这个问题。  

这样解释器只能允许持有 GIL 许可的代码进入线程运行，当线程完成任务或者达到一定时间就释放掉它的 GIL 许可，终止线程
同时 Python 有一些 C 语言库，也是严重依赖 GIL 特性，这样可以直接在 Python 上调用他们
## 应该什么时候用？

先说结论

- 如果你的函数造成的延迟你**几乎感觉不到**，那你就直接用
- 如果你的函数是 **io 密集型** 或者是在运行途中可以 **释放 GIL 锁**，那你就用 `io_bound`
- 如果你的函数是 **cpu 密集型** 且运行途中 **不可以释放 GIL 锁**，那你就用 `cpu_bound`

然后我们来仔细讲一讲

<p align="center" style="font-size: 30px"><strong>Moyuing~</strong></p>

<loading />

:::interlink
**相关链接:** <https://graia.readthedocs.io/ariadne/extra/async-exec/>
:::
