# Saya Util —— 来点好用的缩写

::: tip
这章属于 [东西要分类好](../guide/saya.md) 的进阶，你最好现在那一章看完了再看这个

你可能已经在本章之外的地方见过相关内容了（如[Alconna —— 外 星 来 客](../guide/message_parser/alconna.md)）。
:::

按多数人的口味，类似 `channel.use(...)` 的写法其实并不方便，甚至看起来会很丑（死亡缩进kana）。

别担心，这里有更好的写法！

::: danger 警告
**Saya Util** 目前仅适用于替代 `graia.saya.builtin.broadcast.ListenerSchema` 与 `graia.schedule.saya.SchedulerSchema`。

如果你需要使用其他例如 `ConsoleSchema` 等元信息模板（Schema，在[此处](../guide/saya.md#saya-是什么)提及过），
那么你目前仍需要以 `@channel.use(...)` 的方法使用。
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

from graiax,shortcut.saya import listen, dispatch, decorate


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

`graia.ariadne.util.saya` 也写有相同的 **Saya Util** 组件，
但自 `graia-saya` 0.0.17 版本后，请尽量从 `graiax.shortcut.saya` 导入 **Saya Util**。

:::

## 安装

若你需要新版 **Saya Util**，请以如下命令安装：

:::: code-group
::: code-group-item poetry

```bash
poetry add graiax-shortcut>=0.2.0
```

:::
::: code-group-item pdm

```bash
pdm add graiax-shortcut>=0.2.0
```

:::
::: code-group-item pip

```bash
pip install graiax-shortcut>=0.2.0
```

:::
::::

## 使用方法

**Saya Util** 与 `channel.use` 一样，需要以装饰器的方式附加在事件处理器（就是你的函数啦~）上。
但是其相对 **ListenerSchema** 或 **SchedulerSchema** 会更加简洁，增加了代码可读性。

::: warning 注意事项
**Saya Util** 本质上是对当前的 **Channel** 的重复使用。
因此，在同一函数/方法上多次使用相同类型的 **Saya Util** 组件实际上是在为同一个 **ListenerSchema** 进行追加。
:::

### `listen`

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

::: warning

**listen** 组件存在时其必须置于顶层，否则会产生预期外行为：

```py
@listen(GroupMessage)  # 顶层
@dispatch(...)
async def xxx(): ...
```

:::

### `dispatch`

**dispatch** 组件负责指定处理器上的调度器，对应 **ListenerSchema** 的 `inline_dispatchers` 或 **SchedulerSchema** 的 `dispatchers`。

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

### `decorate`

**decorate** 组件负责指定处理器上的装饰器，对应 **ListenerSchema** 与 **SchedulerSchema** 的 `decorators`。

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

### `priority`

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
还支持传入一系列事件类型，以代表当前优先级仅对指定的事件类型有效，其余事件按默认优先级（16）处理，例如：

```py
@priority(8, GroupMessage, FriendMessage)
```

::: danger 提醒
**设置指定事件的优先级**这个特性需要 `graia-broadcast` 在 **0.18.0** 及以上版本的支持。
:::

关于事件监听器的**优先级**概念，请参考[官方文档](https://graia.readthedocs.io/broadcast/advance/event-propagation-and-priority/)。

### `schedule`

**schedule** 组件负责增加一个调度任务，对应于 **SchedulerSchema** 的 `timer` 和 `cancelable`。

即：

```py
@schedule(every_minute())
async def xxx(): ...
# 等价于
@channel.use(
    SchedulerSchema(
        timer=every_minute()
    )
)
async def xxx(): ...
```

::: warning

**schedule** 组件存在时其必须置于顶层，否则会产生预期外行为：

```py
@schedule(every_minute())  # 顶层
@dispatch(...)
async def xxx(): ...
```

:::

### `every`

**every** 是便捷使用 **SchedulerSchema** 的组件，作为 `every_custom_xxx` 与 `SchedulerSchema` 的一同使用。

即：
```python
@every(30, "second")
async def xxx(): ...
# 等价于
@channel.use(
    SchedulerSchema(
        timer=every_custom_seconds(30)
    )
)
async def xxx(): ...
```

::: warning

**every** 组件存在时其必须置于顶层，否则会产生预期外行为：

```py
@every(30, "second")  # 顶层
@dispatch(...)
async def xxx(): ...
```

:::


### `crontab`

**crontab** 是便捷使用 **SchedulerSchema** 的组件，作为 `crontabify` 与 `SchedulerSchema` 的一同使用。

即：
```python
@crontab("* * * * 1")
async def xxx(): ...
# 等价于
@channel.use(
    SchedulerSchema(
        timer=crontabify("* * * * 1")
    )
)
async def xxx(): ...
```

::: warning

**crontab** 组件存在时其必须置于顶层，否则会产生预期外行为：

```py
@crontab("* * * * 1")  # 顶层
@dispatch(...)
async def xxx(): ...
```

:::
