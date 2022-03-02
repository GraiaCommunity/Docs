# 11. 东西要分类好

::: danger
暂未完工，敬请期待
:::

虽然有点突然，但是，能可以看一下你已经写了多少行代码了吗？
你应该，已经在你的 `main.py` 里面，写了 200+ 行代码了吧。

你是不是以为我现在夸你好棒棒？想多了，你现在再重新阅读一下你的代码。
虽然我并不能像乔瑟夫·乔斯达先生那样预言[你的下一句话是什么](https://zh.moegirl.org.cn/%E4%BD%A0%E7%9A%84%E4%B8%8B%E4%B8%80%E5%8F%A5%E8%AF%9D%E6%98%AF)，
但是我有 70% 的自信认为，你一定会觉得**乱**。

那该怎么办呢？你可以来尝试使用 `graia-saya`！

## `Saya` 是什么

> Saya 的名称取自作品 魔女之旅 中的角色 "沙耶(Saya)"  
> 愿所有人的心中都有一位活泼可爱的炭之魔女.

在说明之前，我们先来聊一聊 Python QQ 机器人中比较知名的框架 —— Nonebot。

Nonebot 就是一个比较典型的插件导入式框架（通过导入不同的插件功能来运行），
而 `Saya`，就能为 `Ariadne` 实现差不多的功能。

下面姑且说一下saya各模块都是什么（现在看不懂也没关系）。

|名称|作用|
|:--:|:--|
Saya Controller<br>(控制器)|负责控制各个模块，分配 Channel，管理模块启停，Behaviour 的注册和调用.
Module Channel<br>(模块容器)|负责对模块服务，收集模块的各式信息，像 模块的名称，作者，长段的描述 之类，并负责包装模块的内容为 Cube，用以 Behaviour 对底层接口的操作.
Cube<br>(内容容器)|对模块提供的内容附加一个由 Schema 实例化来的 metadata，即 "元信息"，用于给 Behaviour 进行处理.
Schema<br>(元信息模板)|用于给模块提供的内容附加不同类型的元信息，给 Behaviour isinstance 处理用.
Behaviour<br>(行为)|根据 Cube 及其元信息，对底层接口(例如 Broadcast，Scheduler 等)进行操作. 包括 allocate 与 uninstall 两个操作.

说白了，每一个模块，都会有一个 `Channel`，用来保存作者信息。而每一个 `Channel`，都会有一个及以上的 `Cube`。
往简单点来说呢，你可以暂时把 `Cube` 当作 `Listener`。

`Schema` 通过你所传递的信息，加上已经出现的 `Behaviour` 行为动作，并将这些信息传递给底层接口（例如 Broadcast）。

## `Saya` 的安装

::: tip
假设你之前用的是 `graia-ariadne[full]` 或 `graia-ariadne[graia]`，你可以直接跳过本小节。
:::

:::: code-group
::: code-group-item poetry

``` bash
poetry add graia-saya
```

:::
::: code-group-item pip

``` bash
pip install graia-saya
```

::::

## 写 `main.py`

### 直接上代码

让我们先回到一切的开始：

``` python
import asyncio

from graia.ariadne.app import Ariadne
from graia.ariadne.model import MiraiSession
from graia.broadcast import Broadcast

app = Ariadne(
    MiraiSession(
        host="http://localhost:8080",
        verify_key="GraiaxVerifyKey",
        account=1919810,
    ),
)
bcc = app.broadcast

...

app.launch_blocking()
```

上图所示，是启动一个 `Ariadne` 实例需要的最小办法。
那么下面，就让我们一起魔改一下：

``` python{15-18,20-21}
import asyncio

from graia.ariadne.app import Ariadne
from graia.ariadne.model import MiraiSession
from graia.saya import Saya
from graia.saya.builtins.broadcast import BroadcastBehaviour

app = Ariadne(
    MiraiSession(
        host="http://localhost:8080",
        verify_key="GraiaxVerifyKey",
        account=1919810,
    ),
)
saya = app.create(Saya)
saya.install_behaviours(
    app.create(BroadcastBehaviour)
)

with saya.module_context():
    saya.require("modules.ero")

app.launch_blocking()
```

我们来着重讲解一下**带高亮的代码**.

### 原理解析

``` python
saya = app.create(Saya)
saya.install_behaviours(
    app.create(BroadcastBehaviour)
)
```

这一步就是创建一个 `saya` 实例，并为其安装 `BroadcastBehaviour`。

``` python
with saya.module_context():
    saya.require("modules.ero")
```

首先这里有一个上下文，注意一下，这个 `with` 上下文处理是很有必要的，你的所有模块导入操作都必须在这个上下文处理器当中。
然后在上下文中导入（`saya.require`）模组 `modules.ero`。

模组的形式可以是如下两种：
:::: code-group
::: code-group-item 单文件模组

``` bash
EroEroBot
├─ main.py
├─ pyproject.toml
└─ modules
   └─ ero.py
```

:::
::: code-group-item 文件夹模组

``` bash
EroEroBot
├─ main.py
├─ pyproject.toml
└─ modules
   └─ ero
      ├─ __init__.py  # 注仅调用 __init__.py 下的内容
      └─ util.py
```

::::

### 导入文件夹里所有模组的例子

当你以后写了更多模组之后，你想必不可能一个一个的去导入，就像下面这样：

``` python
with saya.module_context():
    saya.require("modules.ero1")
    saya.require("modules.ero2")
    ...
```

所以在这里介绍一下用 Python 标准库 `pkgutil` 写的比较简洁的动态导入，代码如下：

``` python
import pkgutil
...

with saya.module_context():
    for module_info in pkgutil.iter_modules(["modules"]):
        if module_info.name.startswith("_"):
            continue
        saya.require("modules." + module_info.name)

app.launch_blocking()
```

::: tip
你不是必须用我这个用法，假设你的模块都放在一个叫 modules 的文件夹里，你可以遍历这个文件夹：

- 对于文件夹模块，直接 `saya.require(f"modules.{模块的文件夹名字}")`
- 对于 `.py` 的单文件模块，直接 `saya.require(f"modules.{模块文件名[:-3]}")`（即 `modules.` 加上去除 `.py` 后剩下的部分）
:::

## 写个 `module`

### 举个栗子

我们以上文的单文件模组 `modules.ero`（即 `modules/ero.py`）为例子：

``` python{9,11}
from graia.ariadne.app import Ariadne
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.model import Group

from graia.saya import Channel
from graia.saya.builtins.broadcast.schema import ListenerSchema

channel = Channel.current()

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def ero(app: Ariadne, group: Group, message: MessageChain):
    await app.sendGroupMessage(group, MessageChain.create(
        f"不要说{message.asDisplay()}，来点涩图"
    ))

```

### 发生了什么

#### `Channel.current()`

``` python
channel = Channel.current()
```

这行代码是帮你获取属于这个模块的 `channel` 实例。
事实上，你可以通过这个 `channel` 中写上一些插件信息，比如：

``` python
channel.name("Ero")
channel.description("发送涩涩！")
channel.author("GraiaX")
```

::: tip
`Saya` 实例也可以通过类似的代码得到：

``` python
saya = Saya.current()
```

然后你可以通过以下代码来获取来获取你导入的所有模块的信息（有可能部分信息会为 `None`）：

``` python
for module, channel in saya.channels.items():
    print(
        f"module: {module}\n"
        f"name:{channel.meta['name']}"
        f"author:{' '.join(channel.meta['author'])}\n"
        f"description:{channel.meta['description']}"
    )
```

:::

#### `Channel.use()`

``` python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
```

你可以将其直接跟 `bcc.receiver` 画上等号，不过不完全相等,
因为其中有一些参数的名称可能有所变化：

``` txt
event -> listening_events # 因为是events，所有要传的是有一个及以上 Event 的 list
dispatchers -> inline_dispatchers
```

## 将 `Scheduler` 也写成模块

首先，我们还要在我们的 `main.py` 加点东西（高亮部分）：

``` python{2,7}
from graia.scheduler import GraiaScheduler
from graia.scheduler.saya.behaviour import GraiaSchedulerBehaviour

sche = GraiaScheduler(loop=loop, broadcast=bcc)
saya.install_behaviours(
    BroadcastBehaviour(bcc),
    GraiaSchedulerBehaviour(sche),
)
```

然后，我们在模组里这么写（注意高亮）：

``` python{5,13}
from graia.ariadne.app import Ariadne
from graia.ariadne.message.chain import MessageChain
from graia.saya import Channel
from graia.scheduler import timers
from graia.scheduler.saya.schema import SchedulerSchema

channel = Channel.current()

channel.name("Wyy")
channel.description("网易云时间提醒器")
channel.author("GraiaX")

@channel.use(SchedulerSchema(timers.crontabify('0 0 * * *')))
async def wyy(app: Ariadne):
    await app.sendGroupMessage(1919810, MessageChain.create("现在是网易云时间"))
```

这样，我们就成功写出了一个每天 0000 准时网易云时间的模组了！

::: interlink
相关链接：<https://graia.readthedocs.io/projects/dev/extra/saya/start/>
:::
