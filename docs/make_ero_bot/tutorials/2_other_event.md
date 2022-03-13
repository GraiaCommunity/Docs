# 2. 不要再戳了~

在看了[上一节](./1_hello_ero.md)后，你应该已经得到了一个**每发送一次消息就会嚷嚷要涩图的机器人**。

不过，一个在每条消息后面都会嚷嚷要涩图的机器人还是太诡异了<Curtain>不是吗？</Curtain>。
而事实上 ，QQ 除了群消息外还有其他类型的事件，如戳一戳、消息撤回等等等等……

下面教大家如何使用戳一戳事件（`NudgeEvent`）

:::: warning
此处的“戳一戳”所指的是手机 QQ 客户端中**双击头像**的功能，而不是私聊发送戳一戳表情（对应 PC 的**窗口抖动**）

接收 NudgeEvent 需要 Mirai 使用如下3种登陆协议中的一种：

- ANDROID_PHONE
- IPAD
- MACOS

即使你不需要“戳一戳”这个功能，我们也**十分建议**你使用以上三种登陆协议。
因为他们是现阶段支持功能最多的协议。

::::

以下是一段示例代码（不完整，请自行插入到合适的地方，注释为与群消息事件的对比）

``` python
...
# from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent
...


# @bcc.receiver(GroupMessage)
@bcc.receiver(NudgeEvent)
async def getup(app: Ariadne, event: NudgeEvent):
    if event.context_type == "group":
        await app.sendGroupMessage(
            event.group_id,
            MessageChain.create("别戳我，好痒")
        )
    else:
        await app.sendFriendMessage(
            event.friend_id,
            MessageChain.create("别戳我，好痒")
        )
...
```

此时运行机器人，然后在群里戳一下他，你就会得到如下结果

<ChatWindow title="Graia Framework Community">
  <ChatToast>GraiaX 👉 戳了戳 EroEroBot 的腰</ChatToast>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">别戳我，好痒</ChatMsg>
</ChatWindow>

## 2.1 关于 `BroadcastControl` 的超简单介绍

[>_<]: 这里很需要找个人改一下，我不会

`Graia-Ariadne` 使用 `Graia-Broadcast` 作为事件广播的工具。

`Graia Project` 的主要构造者
<ruby> `GreyElaina` <rp>(</rp><rt><span lang="ja">灰の魔女</span></rt><rp>)</rp></ruby>
则称其为
<ruby><b> 魔剑 </b><rp>(</rp><rt><span lang="ja">魔剣</span></rt><rp>)</rp></ruby>。

本小节会介绍`Graia-Broadcast` 的部分原理（或称 **BCC** 与 **Broadcast**，下同），以及 **Ariadne** 是如何与 **BCC** 协调工作的（部分），
但并不会完全跟你讲清楚（本教程也不会讲清楚）**BCC** 的核心工作原理。

首先，**BCC** 中定义了 **Dispatchable** 类和 **BaseDispatcher** 类，每一个 **Dispatchable** 类或继承自其的类都有一个名为 **Dispatcher** 的类变量/子类
（参数解析器。若为类变量，则该变量的值为一个继承自 **BaseDispatcher** 的类）。

`Graia-Ariadne` 定义了许许多多继承自 **Dispatchable** 的 **EventClass**（事件类），
每当其接收到其中定义的 **Event**（事件，如 `GroupMessage`）时，**Ariadne** 就会通过 **BCC** 进行广播。

在我们的 Bot 中，异步函数 `setu()` 通过 `@bcc.receiver(GroupMessage)` 修饰器注册了 `GroupMessage` 事件，就会在接收到对应事件的广播时被调用。

继承自 **Dispatcher** 的类中一般需要定义一个名为 `catch` 的方法，在 `setu()` 被调用时，
**BCC** 会使用 `catch` 方法为该函数所需要的参数（如：`member: Member`、`event: GroupMessage` 等）赋值，
若无法满足该函数的参数需求，则会引发 `RequirementCrash` 异常。

::: warning 别打我
希望你看完这一小节后，还能认识“类”这个字以及 Dispatchable 和 Dispatcher 这两个单词。
:::

## 2.2 `Event` 是什么

在 QQ 中，充满了无数多的事件，如: 接收到消息、管理禁言了某个人、管理开启了解除禁言、你的头衔被更改了、开启了全体禁言等等……

而这些事件，就是 `Event`（<Curtain>废话，事件的英文不就是 Event 吗</Curtain>）。

::: tip
`graia-ariadne` 定义的所有事件均可在 `graia.ariadne.event` 中找到，你也可以通过自己的学习写出自己需要的事件。
:::

在 **BCC** 中，任何类的实例都可以拿来当事件广播，前提是他们声明了 `Dispatcher`。

## 2.3 关于 `Dispatcher`

让我们重新看一下上面例子中实现一个监听函数（Listener）的定义：

``` python
async def getup(app: Ariadne, group: Group):
```

该函数需要【类型为 `Ariadne` 的 `app`】和【类型为 `Group` 的`group` 】两个参数，
而参数解析器（Dispatcher），就会通过**参数名**或**参数类型**为其赋值，通过这项特性，
`graia-ariadne` 就可以为监听不同事件的不同的函数所需要的参数赋值。

当然，如果你不喜欢这样子，也可以不用各事件提供的参数解析，像这样

``` python
@bcc.receiver(GroupMessage)
async def test(event: GroupMessage):
    group = event.group
    ...
```

:::: details 一些比较常用的事件所支持的扩展
::: tip
你可以直接通过查看各 Event 源码下的 docstring 来了解每个 event 的支持的 Args  
(你永远可以相信 GraiaProject 旗下的项目 docstring)  
:::

``` python
# 群消息
@bcc.receiver(GroupMessage)
async def test(app: Ariadne, group: Group, member: Member, message: MessageChain, source: Source):
    ...

# 临时消息
@bcc.receiver(TempMessage)
async def test(app: Ariadne, group: Group, member: Member, message: MessageChain, source: Source):
    ...

# 朋友消息
@bcc.receiver(FriendMessage)
async def test(app: Ariadne, friend: Friend, message: MessageChain, source: Source):
    ...

# 群内有人被禁言
@bcc.receiver(MemberMuteEvent)
async def test(app: Ariadne, group: Group, target: Member):
    ...

# 群内有人被解除禁言
@bcc.receiver(MemberUnmuteEvent)
async def test(app: Ariadne, group: Group, target: Member):
    ...
```

::::

::: interlink
**相关链接:** <https://graia.readthedocs.io/basic/params/>
:::
