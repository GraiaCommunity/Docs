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
这就是典型(?)的并发

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

