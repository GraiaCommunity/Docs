# 请问今天你想要怎么样的涩图

## 情景导入

让我们回顾一下至今我们学习的所有东西，假设你曾经看过友商的代码，想必曾今看到过这样子的对话：

<ChatWindow title="Graia Framework Community">
  <ChatMsg name="GraiaX" onright>天气</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">你想查询哪个城市的天气呢？</ChatMsg>
  <ChatMsg name="GraiaX" onright>学园都市</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">学园都市的天气是...</ChatMsg>
</ChatWindow>

::: tip
其实原例子是**上海**而不是[**学园都市**](https://zh.moegirl.org.cn/%E5%AD%A6%E5%9B%AD%E9%83%BD%E5%B8%82)来着。
:::

之前我们学到的，叫做回复（reply），即一问一答的形式，而上面这种呢，则叫流程（flow），即一个功能多次问答的形式。

::: warning
我不怎么建议你去将 `Ariadne` 跟友商的代码进行对比，`Ariadne` 跟友商从整体思路上就已经有所不同了。
:::

虽然说这个例子挺好的，但不太符合我们对 EroEroBot 的设定（<Curtain>啥，这玩意儿还有设定？</Curtain>），
所以我们稍稍改了一下：

<ChatWindow title="Graia Framework Community">
  <ChatMsg name="GraiaX" onright>涩图来</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">你想要什么 tag 的涩图</ChatMsg>
  <ChatMsg name="GraiaX" onright>死库水</ChatMsg>
  <ChatImg name="EroEroBot" avatar="/avatar/ero.webp" src="/images/guide/high_DIO.webp"></ChatImg>
  <ChatMsg name="GraiaX" onright>草</ChatMsg>
</ChatWindow>

::: tip
根据[萌娘百科具有"死库水"属性的典型角色](https://zh.moegirl.org.cn/死库水#具有本属性的典型角色)，确实有 DIO（<Curtain>虽然说跟我这个一样使用黑幕包裹着的</Curtain>）。
:::

## 举个栗子

首先这个功能其实应该叫做**中断控制**，在以前我们每次使用都需要获取 BCC
的 `InterruptControl`，然后调用 BCC 的相关方法并创建一个 Waiter 才能实现中断的功能，现在
Ariadne 提供了 `FunctionWaiter` 和 `EventWaiter` 两个便捷的类，可以让我们更方便的使用。

这两个类都位于 `graia.ariadne.util.interrupt` 中，这里我们只介绍 `FunctionWaiter`
的用法，下面以一个加机器人好友时向机器人管理员询问是否通过的例子来说明这个 `FunctionWaiter` 的用法：

```python{23-33,35-37}
from graia.ariadne.util.interrupt import FunctionWaiter

ADMIN = 1145141  # Bot 管理员的 QQ 号

@channel.use(ListenerSchema(listening_events=[NewFriendRequestEvent]))
async def new_friend(app: Ariadne, event: NewFriendRequestEvent):
    source_group: Optional[int] = event.source_group
    groupname = '未知'
    if source_group:
        group = await app.get_group(source_group)
        groupname = group.name if group is not None else '未知'

    await app.send_friend_message(
        ADMIN,
        MessageChain(
            Plain(f'收到添加好友事件\nQQ：{event.supplicant}\n昵称：{event.nickname}\n'),
            Plain(f'来自群：{groupname}({source_group})\n') if source_group else Plain('\n来自好友搜索\n'),
            Plain(event.message) if event.message else Plain('无附加信息'),
            Plain('\n\n是否同意申请？请在10分钟内发送“同意”或“拒绝”，否则自动同意'),
        ),
    )

    async def waiter(waiter_friend: Friend, waiter_message: MessageChain) -> Optional[tuple[bool, int]]:
        # 之所以把这个 waiter 放在 new_friend 里面，是因为我们需要用到 app
        # 假如不需要 app 或者 打算通过传参等其他方式获取 app，那也可以放在外面
        if waiter_friend.id in basic_cfg.admin.admins:
            saying = waiter_message.display
            if saying == '同意':
                return True, waiter_friend.id
            elif saying == '拒绝':
                return False, waiter_friend.id
            else:
                await app.send_friend_message(waiter_friend, MessageChain(Plain('请发送同意或拒绝')))

    try:
        result, admin = await FunctionWaiter(waiter, [FriendMessage]).wait(timeout=600)
    except asyncio.exceptions.TimeoutError:
        await event.reject('由于超时未审核，你已被拒绝添加好友')  # 自动拒绝好友请求
        await app.send_friend_message(
            ADMIN,
            MessageChain(Plain(f'由于超时未审核，已自动拒绝 {event.nickname}({event.supplicant}) 的好友请求')),
        )
        return

    if result:
        await event.accept()  # 同意好友请求
        await app.send_friend_message(
            ADMIN,
            MessageChain(Plain(f'Bot 管理员 {admin} 已同意 {event.nickname}({event.supplicant}) 的好友请求')),
        )
    else:
        await event.reject('Bot 管理员拒绝了你的好友请求')  # 拒绝好友请求
        await app.send_friend_message(
            ADMIN,
            MessageChain(Plain(f'Bot 管理员 {admin} 已拒绝 {event.nickname}({event.supplicant}) 的好友请求')),
        )
```

::: warning
上面的代码来自 [redbot](https://github.com/Redlnn/redbot/blob/master/core_modules/bot_manage.py)，且有已知
BUG，所以不建议照搬。
:::

## 超时取消

假如你不想 `FunctionWaiter.wait` 永久等待下去，希望他在一段时间后自动取消的话，
你可以在调用 `FunctionWaiter.wait` 的时候传入一个 `timeout` 参数，
当 `timeout` 参数被指定时，`FunctionWaiter.wait` 将自动使用 `asyncio.wait_for` 来等待。

::: warning
默认情况下，`timeout` 是没有被指定的，因此若你的 waiter 设定了一些条件才会返回非 `None` 值，
那么当这些条件没有被满足时，`FunctionWaiter.wait` 将永远等待下去。  
（虽然这样并不会影响 bot 的正常运行，但可能过了很久以后，
你所设定的条件突然被满足而使得你的 bot 突然说了一句莫名其妙的话，
就会显得很奇怪）

因此推荐你在调用 `FunctionWaiter.wait` 的时候指定一个 `timeout` 参数
:::

当等待了你所指定的超时时长且 waiter 没有返回非 `None` 值后，
`asyncio.wait_for` 将会抛出一个 `asyncio.exceptions.TimeoutError` 异常，
通过捕捉这个异常，可以知道等待超时并作出相应的处理了。

```python{2}
try:
    result, admin = await FunctionWaiter(waiter, [FriendMessage]).wait(timeout=600)
except asyncio.exceptions.TimeoutError:
```

::: tip
在 Python 中，`try...except` 是非常灵活的，

你可以在 `except` 块后使用 `else` 块来指定未发生异常时的处理方式。
（当然你也可以在 `except` 块中使用 `return`、`break`、`continue` 等方法而不是 `else` 块来避开不应被执行的部分）

除了 `else` 块外，你也可以指定一个 `finally` 块，该块表示无论是否发生错误，均会执行。
（假如发生了错误，会在 `except` 块执行完毕后再执行 `finally` 块中的内容）
:::

## 高级用法 & 原理讲解

<details>
<summary style="cursor: pointer">点击展开</summary>

### 通过一个类创建 `Waiter`

```python
import asyncio

from graia.ariadne.message.parser.base import MatchContent
from graia.broadcast.interrupt import InterruptControl
from graia.broadcast.interrupt.waiter import Waiter
from graia.saya import Channel, Saya

saya = Saya.current()
channel = Channel.current()
inc = InterruptControl(saya.broadcast)  # type: ignore


class SetuTagWaiter(Waiter.create([GroupMessage])):
    "涩图 tag 接收器"

    def __init__(self, group: Union[Group, int], member: Union[Member, int]):
        self.group = group if isinstance(group, int) else group.id
        self.member = member if isinstance(member, int) else member.id

    async def detected_event(self, group: Group, member: Member, message: MessageChain):
        if self.group == group.id and self.member == member.id:
            return message


async def setu(tag: List[str]) -> bytes:
    # 都说了，涩图 api 可是至宝，怎么可能轻易给你
    return Path("src/dio.jpg").read_bytes()


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("涩图来")],
    )
)
async def ero(app: Ariadne, group: Group, member: Member, message: MessageChain):
    await app.send_message(group, MessageChain("你想要什么 tag 的涩图"))
    try:
        ret_msg = await inc.wait(SetuTagWaiter(group, member), timeout=10)  # 强烈建议设置超时时间否则将可能会永远等待
    except asyncio.TimeoutError:
        await app.send_message(group, MessageChain("你说话了吗？"))
    else:
        await app.send_message(
            group,
            MessageChain(
                Plain(f"涩图 tag: {ret_msg.asDisplay()}"),
                Image(data_bytes=Path("data", "imgs", "graiax.png").read_bytes()),
            ),
        )
```

### 通过函数创建 `Waiter`

你觉不觉得，仅仅是为了一个 `Waiter` 而大费周章的创建一个类太麻烦了，那么事实上，你也可以通过创建局部函数来达到相同效果哦。

```python
from graia.ariadne.message.parser.base import MatchContent
from graia.broadcast.interrupt import InterruptControl
from graia.broadcast.interrupt.waiter import Waiter

saya = Saya.current()
channel = Channel.current()
inc = InterruptControl(saya.broadcast)  # type: ignore


async def setu(tag: List[str]) -> bytes:
    # 都说了，涩图 api 可是至宝，怎么可能轻易给你
    return Path("src/dio.jpg").read_bytes()


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("涩图来")]
    )
)
async def ero(app: Ariadne, group: Group, member: Member, message: MessageChain):
    await app.send_message(group, MessageChain("你想要什么 tag 的涩图"))

    @Waiter.create_using_function([GroupMessage])
    async def setu_tag_waiter(g: Group, m: Member, msg: MessageChain):
        if group.id == g.id and member.id == m.id:
            return msg

    ret_msg = await inc.wait(setu_tag_waiter, timeout=10)  # 强烈建议设置超时时间否则将可能会永远等待
    await app.send_message(
        group,
        MessageChain(Image(data_bytes=await setu(ret_msg.split()))),  # 这里的括号多得离谱是吧
    )
```

::: tsukkomi
事实上，因为相关文档的缺失，
通过创建局部函数来创建 `Waiter` 的方法在很长一段时间，
都被社区成员认为是唯一构建 `Waiter` 的办法，
直到该章节被创建……
:::

### 原理讲解

首先我们先把目光着重放在这个 `SetuTagWaiter` 上面：

```python
class SetuTagWaiter(Waiter.create([GroupMessage])):
    "涩图 tag 接收器"

    def __init__(self, group: Union[Group, int], member: Union[Member, int]):
        self.group = group if isinstance(group, int) else group.id
        self.member = member if isinstance(member, int) else member.id

    async def detected_event(group: Group, member: Member, message: MessageChain):
        if self.group == group.id and self.member == member.id:
            return message
```

首先是第一行的 `Waiter.create([GroupMessage])`，假设我们翻阅过其文档，就会知道，
在这里传递的消息，其实跟我们一般填写在 `Listener` 里面的参数是一样的。

```python
def create(
    cls,
    listening_events: List[Type[Dispatchable]],
    using_dispatchers: List[T_Dispatcher] = None,
    using_decorators: List[Decorator] = None,
    priority: int = 15,  # 默认情况下都是需要高于默认 16 的监听吧...
    block_propagation: bool = False,
) -> Type["Waiter"]:
```

事实上，`Waiter` 的原理很简单。

当你调用 `inc.wait` 的时候，BCC 内将会新增一个 `Listener`，其行为跟其他 `Listener` 一模一样，
但是不一样的是，当这个 `Listener` 的返回值不为 `None` 时，该 `Listener` 将会自动删除。

::: tip
假设你真的很想返回一个 `None`，你可以从 `graia.broadcast.entities.signatures` 中导入 `Force`，
然后返回 `Force(None)`。
:::

关于 `Listener` 构建时候的参数我们应该扯了挺多的了，不过有几个参数我们在之前并没有扯到，
那就是 `priority` 和 `block_propagation`。

#### 优先级（priority）

事实上，每一个 Listener 都有其优先级，事实上，你可以通过调节优先级数字来调整。

比如说只有在优先级为 15 的 Listener 处理完，优先级为 16 的 Listener 才会开始运行。

::: tip

- `Listener` 的默认优先级是 16
- `Waiter` 的默认优先级是 15

在统一优先级的情况下，函数将会通过交给 `asyncio.gather` 处理。
:::

::: warning
由于使用了 Saya，本小节可能较为突兀（该部分写的时候没有使用 Saya）。  
此处的 **Listener** 可以理解为 **ListenerSchema**，
其本来所指为 `@bcc.reciver` 里的 **Listener**（即事件监听器）
:::

#### ExecutionStop 与 PropagationCancelled 的故事

回想一下[第 11 章](./depend.md)的内容，你应该还记得 `ExecutionStop` 这个错误吧。

> 在 `broadcast` 接到 `ExecutionStop` 错误之后，将会中断这个 `Listener` 的运行。

事实上，除了 `ExecutionStop`，还有一个特殊的错误，叫做 `PropagationCancelled`。
这个错误跟 `ExecutionStop` 一样，在该错误被抛出之后，就会停止该 `Listener` 的运行。
不过不同的是，这个错误将会阻止所有优先级在他后面的 `Listener` 运行。

正是因为这样，出现了这个骚操作：

::: tip
你在 `Listener` 里面报 `PropagationCancelled`，也会阻止后面优先级的 `Listener` 运行。
:::

而 `Waiter.create` 的 `block_propagation` 就是 `PropagationCancelled` 的开关。
假设 `block_propagation` 为 True，则当接收到所需要的消息的时候，就会抛出 `PropagationCancelled` 错误。

</details>

::: interlink
**EroEroBot:** 本章完整示例可在 [EroEroBot/modules/interrupt_control.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/interrupt_control.py) 找到。

**相关链接:** <https://graia.readthedocs.io/ariadne/extra/broadcast/interrupt/>
:::
