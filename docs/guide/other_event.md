# 不要再戳了~

在看了前两章后，你应该已经得到了一个**每发送一次"你好"就会嚷嚷要涩图的机器人**。

不过，这样还是有点太诡异了<Curtain>不是吗？</Curtain>。
事实上，QQ 除了群消息外还有其他类型的事件，如戳一戳、消息撤回等等等等……

下面教大家如何使用戳一戳事件（`NudgeEvent`）

:::: warning
此处的“戳一戳”所指的是手机 QQ 客户端中**双击头像**的功能，而不是私聊发送戳一戳表情（对应 PC 的**窗口抖动**）

接收 NudgeEvent 需要 Mirai 使用如下 3 种登陆协议中的一种：

- ANDROID_PHONE
- IPAD
- MACOS

即使你不需要“戳一戳”这个功能，我们也**十分建议**你使用以上三种登陆协议。
因为他们是现阶段支持功能最多的协议。

关于如何设置协议，你可以看看[这里](../before/install_mirai.md#关于账号协议问题)
::::

以下是一段示例代码：（注释为与群消息事件的对比）

::: danger 警告
为了防止部分读者日常叛逆，再次说明，从章开始，如无特殊说明，所有示例代码均使用 Saya 的方式编写。  
使用 Saya 进行模块加载后，不可以将所有代码全部堆在同一个文件里！！！
:::

<CodeGroup>
<CodeGroupItem title="Python <= 3.9">

``` python
# 本部分示例不完整，请自行补充
# 本部分示例需使用 Saya 进行加载
# from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent


# 此处注释的意思是用法类比，不是说这里可以用 GroupMessage
# @channel.use(ListenerSchema(listening_events=[GroupMessage]))
@channel.use(ListenerSchema(listening_events=[NudgeEvent]))
async def getup(app: Ariadne, event: NudgeEvent):
    if event.context_type == "group":
        await app.send_group_message(
            event.group_id,
            MessageChain("你不要光天化日之下在这里戳我啊")
        )
    elif event.context_type == "friend":
        await app.send_friend_message(
            event.friend_id,
            MessageChain("别戳我，好痒！")
        )
    else:
        return
```

</CodeGroupItem>
<CodeGroupItem title="Python >= 3.10">

``` python
# 本部分示例不完整，请自行补充
# 本部分示例需使用 Saya 进行加载
# 本部分示例使用 Python 3.10 引入的 match...case...语法
# from graia.ariadne.event.message import GroupMessage
from graia.ariadne.event.mirai import NudgeEvent


# 此处注释的意思是用法类比，不是说这里可以用 GroupMessage
# @channel.use(ListenerSchema(listening_events=[GroupMessage]))
@channel.use(ListenerSchema(listening_events=[NudgeEvent]))
async def getup(app: Ariadne, event: NudgeEvent):
    match event.context_type:
        case "group":
            await app.send_group_message(
                event.group_id,
                MessageChain("你不要光天化日之下在这里戳我啊")
            )
        case "friend":
            await app.send_friend_message(
                event.friend_id,
                MessageChain("别戳我，好痒！")
            )
        case _:
            return
```

</CodeGroupItem>
</CodeGroup>

::: tip

1. 对于 **NudgeEvent** 应使用 `event: NudgeEvent` 获取事件实例来获得相关信息
2. 此处之所以使用 `sendGroupMessage` 和 `sendFriendMessage` 是因为 `event.target` 的类型为 `int`，而 `sendMessage` 所需参数的类型为 `Union[MessageEvent, Group, Friend, Member]` 不包含 `int`

:::

此时运行机器人，然后在群里戳一下他，你就会得到如下结果

<ChatWindow title="Graia Framework Community">
  <ChatToast>GraiaX 👉 戳了戳 EroEroBot 的腰</ChatToast>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">你不要光天化日之下在这里戳我啊</ChatMsg>
</ChatWindow>

::: tip
有关什么是 Broadcast，各种 Event 又是什么，请参阅[这里](../before/Q&A.html#_3-%E4%BB%80%E4%B9%88%E6%98%AF-broadcastcontrol)
:::

::: warning
如果你并没有看见 Python 控制台输出 `NudgeEvent` 事件的相关信息，请不要慌张。
因为 `Ariadne` 的 log 默认状态下只会输出 `MessageEvent`。
:::

::: interlink
**EroEroBot:** 本章完整示例可在 [EroEroBot/modules/other_event.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/other_event.py) 找到。

**相关链接:** <https://graia.readthedocs.io/basic/params/>
:::
