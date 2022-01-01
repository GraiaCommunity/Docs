---
id: 6_ero_from_net
title: 6. 来点网上的涩图
---

# 来点网上的涩图

:::danger
本章文档**可能还没写完**，还有部分地方**需要斟酌**
:::

:::warning
由于各种原因，我们在此并不能使用**超赞的涩图库**<Curtain type="warning">这种东西可是至宝，怎么会轻易给你 o(´^｀)o</Curtain>
:::

先来介绍一下安装
```bash
poetry add aiohttp
# ↓假设你想要极致的速度
poetry add aiohttp[speedups]
```

然后介绍一下aiohttp最简单的用吧(<ゝω・)～☆
```python
import asyncio
from pathlib import Path
import aiohttp

async def very_simple_example():
    #注：这里为了教学，故意让api返回json形式
    ero_url = "https://api.ixiaowai.cn/api/api.php?return=json"
    async with aiohttp.ClientSession() as session:
        async with session.get(ero_url) as r:
            ret = await r.json()
        async with session.get(ret["imgurl"]) as r:
            pic = await r.read()
    
    #将二进制数据储存在这里面
    Path("/Graiax/EroEroBot/eropic.jpg").read_bytes(pic)

asyncio.run(very_simple_example())
```

让我们先整一个同等的`requests`办法
```python
from pathlib import Path
import requests

def very_simple_example():
    ero_url = "https://api.ixiaowai.cn/api/api.php?return=json"
    ss = requests.session()
    ret = ss.get(ero_url).json()
    pic = ss.get(ret["imgurl"]).content
    Path("/Graiax/EroEroBot/eropic.jpg").read_bytes(pic)

very_simple_example()
```

## 为啥要用aiohttp
在此之前，我们再加一个问题  
想必你已经注意到了，我们在每次构建Listener的时候
```python
async def test(app: Ariadne):
```
相比于普通的构建函数，我们会在前面加上`async`  
这是为什么？~~我也在寻找着这个答案~~

首先，让我们再次搬出[Graia Ariadne官方文档](https://graia-dev.readthedocs.io/zh_CN/latest/appendix/asyncio-intro/) (进行一个鱼的摸)  
简单说一下，`async/await`关键词就是为了`asyncio`而诞生的  
而asyncio，就是是用来编写**并发**代码的库  
什么？连并发是什么意思都不懂？
举个例子  
你干饭干到一半，别人敲你门，你放下碗筷去开门，开完门继续吃饭  
这就是一个并发的例子  
你在这个时间段干了"干饭"和"开门"两件事情，并且不是说干饭的时候就不回去开门了  
但是在任意瞬间，你只干了"干饭"和"开门"中的一件事情  
这就是典型<sup style="font-size:0.5em">(吗)</sup>的并发

为了保证这种"能在干一件事情干到一半的时候能去处理另一件事"的能力  
`Graia-Ariadne`使用了asyncio以保证并发的高效性
而aiohttp也是一个异步请求库，能够保证你在请求发送完，等待网站回复的时候干别的事情

:::tip
注意一下，**并不是说把一个函数前面加上`async`就是异步了**  
```python
async def test():
    r = requests.get("https://api.ixiaowai.cn/api/api.php")
```
你要是写出了这种东西，还是速速remake(指重看asyncio文档)吧
:::

:::tip
这里并发使用的是aiohttp只是因为Ariadne本身就有aiohttp，不用装额外的库  
你也可以使用`httpx`等支持并发的库，效果也是同样的
:::

## 直接使用Ariadne自带的session进行请求
在上面我们提到了，Ariadne是使用了aiohttp的  
那，我们能不能直接白嫖Ariadne的session呢  
Of course you can  
```python
from graia.ariadne.context import adapter_ctx
...

@bcc.receiver(GroupMessage)
async def test():
    session = adapter_ctx.get().session
    async with session.get("https://api.ixiaowai.cn/api/api.php") as r:
        data = await r.read()
```
这样做有一个好处，那就是**不会在每次请求的时候都创建一个会话**  
在[aiohttp官方文档的这里](https://docs.aiohttp.org/en/stable/client_quickstart.html#make-a-request)有一个note  
不要为每一个请求都创造一个会话(Don’t create a session per request. )  
假设你直接调用Ariadne本身的会话(session), 那你机器人的性能会好一点(当然这好的一点点你可能都感觉不到)  
不过还是有缺点的，那就是**降低了代码移植效率**  
假设你想要将你的代码放到其他地方（比如v5）, 那你移植的时候，就给加上更改session的获取  
至于用不用Ariadne自带的session，就是你的选择了  