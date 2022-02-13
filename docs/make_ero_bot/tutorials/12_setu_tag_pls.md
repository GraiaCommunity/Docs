# 12. 请问今天你想要怎么样的涩图

:::danger
还没写完
:::

## 情景导入

让我们回顾一下至今我们学习的所有东西  
假设你曾经看过友商的代码，想必曾今看到过这样子的对话

<ChatPanel title="GraiaCommunity">
<ChatMessage name="GraiaX" onright>天气</ChatMessage>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">你想查询哪个城市的天气呢？</ChatMessage>
<ChatMessage name="GraiaX" onright>学园都市</ChatMessage>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">学园都市的天气是...</ChatMessage>
</ChatPanel>

:::tip
其实原例子是**上海**而不是[**学园都市**](https://zh.moegirl.org.cn/%E5%AD%A6%E5%9B%AD%E9%83%BD%E5%B8%82)来着
:::

仔细回想一下，好像我们并没有这种类似于这种  
好，现在是专业名词时间

之前我们学到的，叫做回复（reply），即一问一答的形式  
而上面这种呢，则叫流程（flow），即通过多次问答的一种流程

:::warning
我不怎么建议你去将 `Ariadne` 跟友商的代码进行对比  
`Ariadne` 跟友商从整体思路上就已经有所不同了  
:::

虽然说这个例子挺好的，但不太符合我们对 EroEroBot 的设定 <Curtain>啥，这玩意儿还有设定？</Curtain>  
所以我们稍稍改了一下

<ChatPanel title="GraiaCommunity">
<ChatMessage name="GraiaX" onright>涩图来</ChatMessage>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">你想要什么 tag 的涩图</ChatMessage>
<ChatMessage name="GraiaX" onright>死库水</ChatMessage>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')"><img height="250" src="/images/tutorials/12_high_DIO.webp"></ChatMessage>
<ChatMessage name="GraiaX" onright>草</ChatMessage>
</ChatPanel>

:::tip
根据[萌娘百科具有"死库水"属性的典型角色](https://zh.moegirl.org.cn/死库水#具有本属性的典型角色)中  
确实有 DIO <Curtain>虽然说跟我这个一样使用黑幕包裹着的</Curtain>
:::

## 上例子

```python
...
from graia.ariadne.message.parser.base import MatchContent
from graia.broadcast.interrupt import InterruptControl
from graia.broadcast.interrupt.waiter import Waiter
...

class SetuTagWaiter(Waiter):
    listening_events = [GroupMessage]
    using_dispatchers = None
    using_decorators = None
    priority = 15
    block_propagation = False

    def __init__(self, group: Union[Group, int], member: Union[Member, int]):
        self.group = group if isinstance(group, int) else group.id
        self.member = member if isinstance(member, int) else member.id

    async def detected_event(group: Group, member: Member, message: MessageChain):
        if self.group == group.id and self.member == member.id:
            return message

async def setu(tag: List[str]) -> bytes:
    # 都说了，涩图 api 可是至宝，怎么可能轻易给你
    return Path("src/dio.jpg").read_bytes()

@channel.use(ListenerSchema(
    listening_events=[GroupMessage],
    decorators=[MatchContent("涩图来")]
))
async def ero(app: Ariadne, group: Group, member: Member, message: MessageChain):
    await app.sendGroupMessage(group, MessageChain.create("你想要什么 tag 的涩图"))
    inc = InterruptControl(app.broadcast)
    ret_msg = await inc.wait(SetuTagWaiter(group, member))
    await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=await setu(ret_msg.split()))))
```
