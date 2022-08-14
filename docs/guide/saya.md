# 东西要分类好

在前一章我们创建了一个单文件机器人。
但是当机器人的功能越来越复杂的时候，你的这个文件可能会有**上千行**，每次修改都要翻很久。
如此一来，你一定会觉得如果能像玩游戏加 MOD（模组）那样把每一个功能都变为一个模组那该多好。

因此，我们可以按照这个思路，把机器人的每一个功能都分开成一个个模组，
每一个模组都是单独的文件，而要做到这一点就需要借助 `Saya` 了。

直至目前，社区已经有不少基于 `graia-saya` 的模组化机器人，
这种**通过模组来管理机器人各个功能**的方式会对你后面写机器人有很大帮助。
而且，某些模组甚至可以完全可以直接通过**复制粘贴文件**的形式直接装到你的机器人上。

::: danger 警告
从本章之后所有示例都会采用 Saya 模组的形式编写及实现，并可能会省略诸如
`import xxx`、`from xxx import xxx`、`channel = Channel.current()` 等语句。

此外，当介绍**BCC 相关概念**时，可能会使用 BCC 而非 Saya 进行演示。
:::

## `Saya` 是什么

> Saya 也是 Graia Project 的一个项目  
> 她的名称取自作品 魔女之旅 中的角色 "沙耶(Saya)"  
> “愿所有人的心中都有一位活泼可爱的炭之魔女”

在开始之前，我们先来聊一聊 Python QQ 机器人中比较知名的框架 —— Nonebot。

Nonebot 就是一个比较典型的插件导入式框架（通过导入不同的插件功能来运行），
而通过 `Saya`，`Ariadne` 也可以实现类似的功能。

:::: details Saya 的各个组成部分

这部分看不懂也没关系

| 名称 | 作用 |
| :--: | :-- |
| Saya Controller<br>(控制器) | 负责控制各个模组，分配 Channel，管理模组启停，Behaviour 的注册和调用. |
| Module Channel<br>(模组容器) | 负责对模组服务，收集模组的各式信息，像 模组的名称，作者，长段的描述 之类，并负责包装模组的内容为 Cube，用以 Behaviour 对底层接口的操作. |
| Cube<br>(内容容器) | 对模组提供的内容附加一个由 Schema 实例化来的 metadata，即 "元信息"，用于给 Behaviour 进行处理. |
| Schema<br>(元信息模板) | 用于给模组提供的内容附加不同类型的元信息，给 Behaviour isinstance 处理用. |
| Behaviour<br>(行为) | 根据 Cube 及其元信息，对底层接口(例如 Broadcast，Scheduler 等)进行操作. 包括 allocate 与 uninstall 两个操作. |

说白了，每一个模组，都会有一个 `Channel`，用来保存模组相关的信息。而每一个 `Channel`，都会有一个及以上的 `Cube`。
往简单点来说呢，你可以暂时把 `Cube` 当作 BCC 的 `Listener`。

`Schema` 通过你所传递的信息，加上已经出现的 `Behaviour` 行为动作，并将这些信息传递给底层接口（例如 Broadcast）。

::::

## 如何安装 `Saya`

::: tip 注意
在写本章文档的时候，`Graia-Saya` 的版本为 `0.0.16`  
而最新版本为 <img src="https://img.shields.io/pypi/v/graia-saya?color=2970b6&amp;style=flat-square" alt="PyPI版本" style="vertical-align: middle">

假设你之前安装 Ariadne 时用的是以下 3 种选项中的一种，那么你可以直接跳过本小节。

- `graia-ariadne[full]`
- `graia-ariadne[graia]`
- `graia-ariadne[standard]`
:::

:::: code-group
::: code-group-item poetry

```bash
poetry add graia-saya
```

:::
::: code-group-item pip

```bash
pip install graia-saya
```

:::
::::

## 创建一个基础框架

首先，为了降低新人的理解难度，我们直接拿出一个最小实例：

```python{15,25-26}
import pkgutil

from creart import create
from graia.ariadne.app import Ariadne
from graia.ariadne.connection.config import (
    HttpClientConfig,
    WebsocketClientConfig,
    config,
)
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.model import Group
from graia.saya import Saya

saya = create(Saya)
app = Ariadne(
    connection=config(
        114514,  # 你的机器人的 qq 号
        "GraiaxVerifyKey",  # 填入你的 mirai-api-http 配置中的 verifyKey
        # 以下两行（不含注释）里的 host 参数的地址
        # 是你的 mirai-api-http 地址中的地址与端口
        # 他们默认为 "http://localhost:8080"
        # 如果你 mirai-api-http 的地址与端口也是 localhost:8080
        # 就可以删掉这两行，否则需要修改为 mirai-api-http 的地址与端口
        HttpClientConfig(host="http://11.45.1.4:19810"),
        WebsocketClientConfig(host="http://11.45.1.4:19810"),
    ),
)

with saya.module_context():
    saya.require("modules.ero")

app.launch_blocking()
```

我们来讲解一下**高亮部分**，感兴趣的话可以展开以下内容阅读。

:::: details 原理解析

```python
saya = create(Saya)

with saya.module_context():
    saya.require("modules.ero")
```

首先我们使用 [creart](https://github.com/GraiaProject/creart) 的 create 创建了一个 `Saya` 实例。然后在下方有一个上下文，需要注意的是，这个 `with`
的上下文处理是很有必要的，你的所有导入模组操作都必须在这个上下文处理器当中。

::: interlink
什么？你不认识 `with` 语句？那你可以去学学噢~  
要是你想去学的话，你可以看看[这篇来自 Python 官方的文档](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with)（中文）。
:::
::::

在这段代码中，我们在上下文中使用 `saya.require` 导入了一个名为 `modules.ero` 的模组。

而事实上模组的形式可以是如下两种：
:::: code-group
::: code-group-item 单文件模组

```txt
EroEroBot
├─ main.py
├─ pyproject.toml
└─ modules
   └─ ero.py
```

:::
::: code-group-item 文件夹模组

```txt
EroEroBot
├─ main.py
├─ pyproject.toml
└─ modules
   └─ ero
      ├─ __init__.py  # 注仅调用 __init__.py 下的内容
      └─ util.py
```

::::

::: interlink EroEroBot
本章完整示例可在 [EroEroBot/main-saya.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/main-saya.py) 找到。  
你可以在[此处](https://github.com/GraiaCommunity/EroEroBot/releases/tag/release)下载预配置好的模板（不定期更新）。

**提示:** 如果上面的文件结构表达方式你看得不是很懂的话，你可以点进去 [EroEroBot 的仓库](https://github.com/GraiaCommunity/EroEroBot/)进行参考
:::

### 如何使进行动态导入

当你以后写了更多模组之后，你想必不可能一个一个的去导入，就像下面这样：

```python
with saya.module_context():
    saya.require("modules.ero1")
    saya.require("modules.ero2")
    ...
```

假设你将你的所有模组都放到了同一个文件夹中，那么在这里介绍一种使用 Python 标准库 `pkgutil` 的比较简洁的动态导入方法，代码如下：

```python
import pkgutil
...

with saya.module_context():
    for module_info in pkgutil.iter_modules(["modules"]):
        if module_info.name.startswith("_"):
            # 假设模组是以 `_` 开头的，就不去导入
            # 根据 Python 标准，这类模组算是私有函数
            continue
        saya.require(f"modules.{module_info.name}")

app.launch_blocking()
```

::: tip
你不是必须用我这个用法，假设你的模组都放在一个叫 modules 的文件夹里，你可以使用 `os.walk` 之类的函数遍历这个文件夹：

- 对于文件夹模组，直接 `saya.require(f"modules.{模组的文件夹名字}")`
- 对于 `.py` 的单文件模组，直接 `saya.require(f"modules.{模组文件名[:-3]}")`（即 `modules.` 加上去除 `.py` 后剩下的部分）

**注意：以上举例的 `模组的文件夹名字`, `模组文件名` 都是你自己定义的变量，请不要写出 `saya.require(f"modules.{ero}")` 这样的代码**
:::

### 把他们组合起来

前面啰里啰唆讲了一大堆，想必你一定有点不耐烦，那么就直接给你一个完整的最小实例吧：

```python
import pkgutil

from creart import create
from graia.ariadne.app import Ariadne
from graia.ariadne.connection.config import (
    HttpClientConfig,
    WebsocketClientConfig,
    config,
)
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.model import Group
from graia.saya import Saya

saya = create(Saya)
app = Ariadne(
    connection=config(
        114514,  # 你的机器人的 qq 号
        "GraiaxVerifyKey",  # 填入你的 mirai-api-http 配置中的 verifyKey
        # 以下两行（不含注释）里的 host 参数的地址
        # 是你的 mirai-api-http 地址中的地址与端口
        # 他们默认为 "http://localhost:8080"
        # 如果你 mirai-api-http 的地址与端口也是 localhost:8080
        # 就可以删掉这两行，否则需要修改为 mirai-api-http 的地址与端口
        HttpClientConfig(host="http://11.45.1.4:19810"),
        WebsocketClientConfig(host="http://11.45.1.4:19810"),
    ),
)

with saya.module_context():
    for module_info in pkgutil.iter_modules(["modules"]):
        saya.require(f"modules.{module_info.name}")

app.launch_blocking()
```

## 写个 `module`

::: danger 警告
使用 Saya 进行模块加载后，不可以将所有代码全部堆在同一个文件里！！！
<br><Curtain>啊我的上帝，老伙计，我发誓，你要是这么做，我就要狠狠地踢你的屁股了！</Curtain>
<br><Curtain>单文件 Bot 是坏文明 desu~</Curtain>

（相信你不会想功能多了以后一个文件几千行的）
:::

**举个栗子**

我们以上文代码中提及的 `modules.ero`（即 `modules/ero.py`）为例子，
将上一章例子中的回复功能提取为一个单文件模组：

```python{9,12}
from graia.ariadne.app import Ariadne
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.model import Group

from graia.saya import Channel
from graia.saya.builtins.broadcast.schema import ListenerSchema

channel = Channel.current()


@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def setu(app: Ariadne, group: Group, message: MessageChain):
    if message.display == "你好":
         await app.send_message(
            group,
            MessageChain(f"不要说{message.display}，来点涩图"),
         )
```

你可能会觉得这一串比之前要长不少，但是当你模组多了之后这样反而更整洁噢。

:::: details 发生了什么？

下面就来看看这个模组中各部分代码的用途吧~

<p style="font-size: 20px; margin: 32px 0 0; letter-spacing: -0.01em; line-height: 28px"><b>Channel.current()</b></p>

```python
channel = Channel.current()
```

这一行是帮你获取属于这个模组的 `channel` 实例。
事实上，你可以通过这个 `channel` 中写上一些信息，比如：

```python
channel.name("Ero")
channel.description("发送涩涩！")
channel.author("GraiaX")
```

此外，`Saya` 实例也可以通过类似的代码得到：

```python
saya = Saya.current()
```

然后你可以通过以下代码来获取来获取你导入的所有模组的信息（有可能部分信息会为 `None`）：

```python
for module, channel in saya.channels.items():
    print(
        f"module: {module}\n"
        f"name:{channel.meta['name']}\n"
        f"author:{' '.join(channel.meta['author'])}\n"
        f"description:{channel.meta['description']}"
    )
```

<p style="font-size: 20px; margin: 32px 0 0; letter-spacing: -0.01em; line-height: 28px"><b>Channel.use()</b></p>

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
```

你可以将其直接跟 `bcc.receiver` 画上约等号,
因为其中有一些参数的名称可能有所变化：

```txt
event -> listening_events  # 因为是events，所有要传的是有一个及以上 Event 的 list
dispatchers -> inline_dispatchers
```

::::

## Saya Util —— 来点好用的缩写

::: tip
你可能已经在本章之外的地方见过相关内容了（如[Alconna —— 外 星 来 客](/guide/message_parser/alconna.md)）。
:::

按多数人的口味，类似 `channel.use(...)` 的写法其实并不方便，甚至看起来会很丑（死亡缩进kana）。

别担心，这里有更好的写法！

::: danger 警告
**Saya Util** 目前仅适用于替代 `graia.saya.builtin.broadcast.ListenerSchema`。

如果你需要使用其他例如 `ScheduleSchema`、`ConsoleSchema` 等元信息模板（Schema，在[此处](#saya-是什么)提及过），那么你目前仍需要以 `@channel.use(...)` 的方法使用。
:::

以下面的代码为例：

```python{14-20}
from graia.ariadne.app import Ariadne
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.message.parser.base import DetectPrefix
from graia.ariadne.util.cooldown import CoolDown
from graia.ariadne.model import Group

from graia.saya import Channel
from graia.saya.builtins.broadcast.schema import ListenerSchema

channel = Channel.current()


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[CoolDown(0.1)],
        decorators=[DetectPrefix("你好")]
    )
)
async def setu(app: Ariadne, group: Group, message: MessageChain):
    await app.send_message(
        group,
        MessageChain(f"不要说{message.display}，来点涩图"),
    )
```

是不是看着比较头疼？不如试试下面的写法！

```python{8, 11-13}
from graia.ariadne.app import Ariadne
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.message.parser.base import DetectPrefix
from graia.ariadne.util.cooldown import CoolDown
from graia.ariadne.model import Group

from graia.ariadne.util.saya import listen, dispatch, decorate


@listen(GroupMessage)
@dispatch(CoolDown(0.1))
@decorate(DetectPrefix("你好"))
async def setu(app: Ariadne, group: Group, message: MessageChain):
    await app.send_message(
        group,
        MessageChain(f"不要说{message.display}，来点涩图"),
    )
```

是不是感觉焕然一新？

::: tip
其实更推荐从 `graiax.shortcut.saya` 导入 **Saya Util**，
它与从 `graia.ariadne.util.saya` 导入的效果是一样的。
:::

### 使用方法

**Saya Util** 与 `channel.use` 一样，需要以装饰器的方式附加在事件处理器（就是你的函数啦~）上。
但是其相对 **ListenerSchema** 会更加简洁，增加了代码可读性。

::: warning 注意事项
**Saya Util** 本质上是对当前的 **Channel** 的重复使用。
因此，在同一函数/方法上多次使用相同类型的 **Saya Util** 组件实际上是在为同一个 **ListenerSchema** 进行追加。
:::

#### `listen`

**listen** 组件负责指定监听的事件，对应于 **ListenerSchema** 的 `listening_events`。

即：

```py
@listen(GroupMessage, FriendMessage)
async def xxx(): ...
# 等价于
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage, FriendMessage],
    )
)
async def xxx(): ...
```

当同时监听多个事件时，也可以把不同的事件使用两个 **listen** 分开写，如：

```py
@listen(GroupMessage)
@listen(FriendMessage)
async def xxx(): ...
```

#### `dispatch`

**dispatch** 组件负责指定处理器上的调度器，对应 **ListenerSchema** 的 `inline_dispatchers`。

```py
@dispatch(Twilight.from_command(...), AlconnaDispatcher(...))
async def xxx(): ...
# 等价于
@channel.use(
    ListenerSchema(
        ...
        inline_dispatchers=[Twilight.from_command(...), AlconnaDispatcher(...)],
    )
)
async def xxx(): ...
```

当同时使用多个调度器时，也可以把不同的调度器使用两个 **dispatch** 分开写，如：

```py
@dispatch(Twilight.from_command(...))
@dispatch(AlconnaDispatcher(...))
```

#### `decorate`

**decorate** 组件负责指定处理器上的装饰器，对应 **ListenerSchema** 的 `decorators`。

```py
@decorate(Depend(...), MentionMe())
async def xxx(): ...
# 等价于
@channel.use(
    ListenerSchema(
        ...
        decorators=[Depend(...), MentionMe()],
    )
)
async def xxx(): ...
```

除了[**无头装饰器**](https://graia.readthedocs.io/broadcast/advance/headless-decorator/)以外，
`decorate` 亦支持对已有参数附加装饰器，你可以以此安全地通过类型检查。

- 仅针对单个参数添加装饰器时：

  ```py
  @decorate("name", DetectSuffix(...))
  ```

- 需要对多个参数添加装饰器时：

  ```py
  @decorate({"foo": Depend(...), "bar": MatchTemplate(...)})
  ```

#### `priority`

`priority` 组件负责指定优先级，对应 **ListenerSchema** 的 `priority`。

```py
@priority(8)
async def xxx(): ...
# 等价于
@channel.use(
    ListenerSchema(
        ...
        priority=8,
    )
)
async def xxx(): ...
```

除了传入 `int` 作为该监听器的优先级外，`priority`
还支持传入一系列事件类型，以代表当前优先级仅对指定的事件有效，其余事件按默认优先级（16）处理，例如：

```py
@priority(8, GroupMessage, FriendMessage)
```

::: danger 提醒
**设置指定事件的优先级**这个特性需要 `graia-broadcast` 在 **0.18.0** 及以上版本的支持。
:::

关于事件监听器的**优先级**概念，请参考[官方文档](https://graia.readthedocs.io/broadcast/advance/event-propagation-and-priority/)。

::: interlink
相关链接：  
<https://graia.readthedocs.io/ariadne/extra/saya/start>
<https://graia.readthedocs.io/saya>
<https://graia.readthedocs.io/broadcast/advance/event-propagation-and-priority>
:::
