# 5. 来点网上的涩图

::: danger
本章**可能还没完成**，还有部分地方**需要斟酌**
:::

::: warning
由于各种原因，我们在此并不能使用**超赞的涩图库**
<br><Curtain type="warning">这种东西可是至宝，怎么会轻易给你 o(´^ ｀)o</Curtain>
:::

先来介绍一下安装

::: tip
虽然说 `graia-ariadne` 的依赖项里面是有 `aiohttp` 的，
但是为了让你能够记得你用了什么库，我们还是建议你写一下
:::

```bash
poetry add aiohttp
# 👇假设你想要极致的速度
poetry add aiohttp[speedups]
```

然后介绍一下 aiohttp 最简单的用吧(<ゝω・)～☆

```python
import asyncio
from pathlib import Path

import aiohttp


async def very_simple_example():
    #注：这里为了教学，故意让 api 返回 json 形式
    ero_url = "https://www.bing.com/HPImageArchive.aspx?format=js&n=1"
    async with aiohttp.ClientSession() as session:
        async with session.get(ero_url) as r:
            ret = await r.json()
        pic_url = "https://cn.bing.com" + ret["images"][0]["url"]
        async with session.get(pic_url) as r:
            pic = await r.read()

    #将二进制数据储存在这里面
    Path("./Graiax/EroEroBot/eropic.jpg").write_bytes(pic)


asyncio.run(very_simple_example())
```

让我们先整一个与上面相似的使用的 `requests` 办法方便下一小节举例：

```python
from pathlib import Path

import requests


def very_simple_example():
    ero_url = "https://www.bing.com/HPImageArchive.aspx?format=js&n=1"
    ss = requests.session()
    ret = ss.get(ero_url).json()
    pic_url = "https://cn.bing.com" + ret["images"][0]["url"]
    pic = ss.get(pic_url).content
    Path("./Graiax/EroEroBot/eropic.jpg").write_bytes(pic)

very_simple_example()
```

## 5.1 为啥要用 aiohttp

::: tip
这里并发使用的是 aiohttp 只是因为 Ariadne 本身就有 aiohttp，不用装额外的库。
你也可以使用 `httpx` 等支持并发的库，效果也是相同的。
:::

在此之前，我们再加一个问题，
我们在每次构建 Listener 的时候都像下面这样，你可以找找，与一般的 Python 的函数构造方法有什么不同：

```python
async def test(app: Ariadne): ...
```

~~易得~~，相比于一般的函数构造方法，我们会在 `def` 的前面加上 `async`，这是为什么呢？  
~~其实我也在寻找着这个答案。~~

首先，让我们再次搬出 [Graia Ariadne 官方文档关于 asyncio 的介绍](https://graia.readthedocs.io/appendix/asyncio-intro/)（进行一个鱼的摸）

简单说一下，`async / await` 关键字就是为了 `asyncio` 而诞生的，
而 asyncio，就是是用来编写**并发**代码（有时候也叫异步或协程）的库。

什么？连并发是什么意思都不懂？

举个例子，你干饭干到一半，别人敲你门，你放下碗筷去开门，开完门继续吃饭。
这就是一个并发的例子，你在这个时间段干了“干饭”和“开门”两件事情，并且不是说干饭的时候就不回去开门了。
但是在任意一瞬间，你只干了“干饭”和“开门”中的一件事情。
这就是典型<sup style="font-size:0.5em">(吗)</sup>的并发

为了实现这种“能在干一件事情干到一半的时候能去处理另一件事”的能力，`graia-ariadne` 也使用 aiohttp 以保证并发的高效性，
而 aiohttp 即是一个异步请求库，能够保证你在请求发送完，等待网站回复的时候干别的事情。

::: warning
注意一下，**并不是说把一个函数前面加上 `async` 就是异步了**

```python
async def test():
    r = requests.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg")
```

你要是写出了这种东西，还是速速 remake （指重看 asyncio 文档）吧
:::

## 5.2 直接使用 Ariadne 自带的 session 进行请求

在上面我们提到了，Ariadne 也使用了 aiohttp，而使用 aiohttp 一般需要先获取一个 session，
那么我们能不能直接白嫖 Ariadne 的 session 呢？

Of course you can

```python
from graia.ariadne import get_running
from graia.ariadne.adapter import Adapter
...


@bcc.receiver(GroupMessage)
async def test(app: Ariadne):
    session = get_running(Adapter).session
    async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
        data = await r.read()
```

如此即可，而且这样做有一个好处，那就是**不用在每次请求的时候都创建一个会话**

在[aiohttp 官方文档的这里](https://docs.aiohttp.org/en/stable/client_quickstart.html#make-a-request)有一个 Note 👇  
**不要为每一个请求都创造一个会话。 (Don’t create a session per request.)**

假设你直接调用 Ariadne 本身的会话（session），那你机器人的性能会好一点（当然这好的一点点你可能都感觉不到）。

不过这样做也有一定的有缺点 —— **降低了代码移植效率**。  
假设你想要将你的代码放到其他地方（比如 v5），那你移植的时候，就需要更改获取 session 的代码。

至于要不要用 Ariadne 自带的 session，就是你的选择了。
