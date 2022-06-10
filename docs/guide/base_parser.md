# 基础消息链处理器

::: tsukkomi
本章全是例子，还都是照抄官方文档的~ ~~开摆！~~

P.s. 一些变量名称为了与本文档其他章节统一而与官方文档有所区别
:::

假设你的需求很简单，那么我相信，这些基础消息链应该就够用了。

::: tip
假设你想要理解这些处理器的原理，你可以先去看一看[第 11 章](./depend.md)
:::

- `DetectPrefix`: 检测前缀是否符合
- `DetextSuffix`: 检测后缀是否符合
- `MentionMe`: 消息中有 At bot 或有 Bot 姓名/群昵称
- `Mention`: 消息中有 At 某人或有某人姓名/群昵称
- `ContainKeyword`: 检测消息链是否包含指定关键字
- `MatchContent`: 检测消息链是否与对应消息链相等
- `MatchRegex`: 检测消息链是否匹配指定正则表达式
- `MatchTemplate`: 检测消息链是否匹配指定模板
- `FuzzyMatch`: 模糊匹配，更推荐使用 FuzzyDispatcher 来进行模糊匹配操作, 因为其具有上下文匹配数量限制
- `FuzzyDispatcher`: 模糊匹配

::: tip
以上这些**消息链处理器**均位于 `graia.ariadne.message.parser.base` 中

冷知识，以下两种用法时一样的，前者使用 BCC，后者使用 Saya。

``` python
# 这两者目的都是一样的
@bcc.receiver(GroupMessage, decorators=[xxx])
async def test():
    ...

@channel.use([GroupMessage], decorators=[xxx])
async def test():
    ...
```

:::

## DetectPrefix

检测前缀，实例化时传入后缀**字符串**即可。

::: tip
`Quote` 和 `Source` 虽然也在消息链里面，  
但是他们并不会被去掉哦<Curtain>只有"涩"消失的世界完成了</Curtain>。
:::

<h3>用法1</h3>

作为 `Decorator`, 放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[DetectPrefix("涩")],
    )
)
async def on_message(app: Ariadne, group: Group, message: MessageChain):
    # 此时的 message 事实上还是有前面的 "涩"
    await app.send_message(group, MessageChain("涩？涩什么"))
    ...
```

<h3>用法2</h3>

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(app: Ariadne, group: Group, message: MessageChain = DetectPrefix("涩")):
    # 此时的 message 就没有 "涩" 了
    await app.send_message(group, message + MessageChain("？很涩吗"))
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(app: Ariadne, group: Group, message: Annotated[MessageChain, DetectPrefix("涩")]):
    # 此时的 message 就没有 "涩" 了
    await app.send_message(group, message + MessageChain("？很涩吗"))
    ...
```

## DetectSuffix

检测后缀，实例化时传入后缀**字符串**即可。

::: tip
`Quote` 和 `Source` 虽然也在消息链里面，  
但是他们并不会被去掉哦<Curtain>只有"涩"消失的世界完成了</Curtain>。
:::

<h3>用法1</h3>

作为 `Decorator`, 放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 消息必须以 "好涩" 结尾
# 如 "这个好涩"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[DetectSuffix("好涩")],
    )
)
async def on_message(message: MessageChain):
    # 此时的 message 事实上后面还是有 "好涩"
    ...
```

<h3>用法2</h3>

```python
# 消息必须以 "好涩" 结尾
# 如 "这个好涩"
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(message: MessageChain = DetectSuffix("好涩")):
    # 此时的 message 就没有 "好涩" 了
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(message: Annotated[MessageChain, DetectSuffix("好涩")]):
    # 此时的 message 就没有 "好涩" 了
    ...
```

## MentionMe

检测在聊天中提到 Bot (At Bot 或以 Bot 群昵称/自己名称 打头)。

<h3>用法1</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# "@EroEroBot 在吗" "EroEroBot 在吗" "EroEroBot，帮我涩涩"
# 要求名字/At在最前面
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MentionMe()],  # 注意要实例化
    )
)
async def on_mention_me(app: Ariadne, group: Group, member: Member):
    await app.send_message(group, MessageChain(At(member.id), "叫我？"))
```

<h3>用法2</h3>

```python
# "@EroEroBot 在吗" "EroEroBot 在吗" "EroEroBot，帮我涩涩"
# 要求名字/At在最前面
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention_me(app: Ariadne, group: Group, member: Member, chain: MessageChain = MentionMe()):
    # 此时的 chain 就没有 "@EroEroBot" 或者 "EroEroBot" 了
    await app.send_message(group, MessageChain(At(member.id), "你叫我", chain, "？"))

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention_me(app: Ariadne, group: Group, member: Member, chain: Annotated[MessageChain, MentionMe()]):
    # 此时的 chain 就没有 "@EroEroBot" 或者 "EroEroBot" 了
    await app.send_message(group, MessageChain(At(member.id), "你叫我", chain, "？"))
```

## Mention

检测在聊天中提到指定的人 (At 指定的人 或以 指定的人 群昵称/名称打头)。

<h3>用法1</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# "Graiax 人呢" "Graiax，今晚一起去涩涩"
# 要求名字/At在最前面
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[Mention(target=...)],  # target: int | str
    )
)
# int: 用户 QQ 号，str: 用户的名字
async def on_mention(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("你找我主人有什么事吗"))
    ...
```

<h3>用法2</h3>

```python
"Graiax 一起去涩涩"
# 要求名字/At在最前面
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention(app: Ariadne, group: Group, chain: MessageChain = Mention(target=...)):
    # 这时的 chain 就没有 "@Graiax" 或者 "Graiax" 了
    await app.send_message(group, MessageChain("你要找我主人", chain, "吗"))
    # 会发送 "你要找我主人一起去涩涩吗"
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention(app: Ariadne, group: Group, chain: Annotated[MessageChain, Mention(target=...)]):
    await app.send_message(group, MessageChain("你要找我主人", chain, "吗"))
    ...
```

## ContainKeyword

检测消息链是否包含指定关键字。

<h3>用法</h3>

```python
# "今晚一起涩涩吗" "让我涩涩你"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[ContainKeyword(keyword="涩涩")],
    )
)
async def on_contain_keyword(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("好欸，涩涩"))
    ...
```

## MatchContent

检测消息链是否与对应消息链相等。

::: warning
注意 Image 等元素的特殊对比规则。
:::

<h3>用法</h3>

```python
# "[图片]" <- 你控制台天天见的啦
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent(content="[图片]")],
    )
)
# 当 content 为 str 时，将会与 MessageChain.display 进行比较，当 content 为 MessageChain 时，将会与 MessageChain 进行比较
async def on_match_content(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("哦，发了什么图片，让我康康！"))
    ...
```

## MatchRegex

检测消息链是否匹配指定正则表达式。

::: warning
注意 `[]` 等特殊字符, 因为是使用 `MessageChain.display` 结果作为匹配源的。
:::

<h3>用法</h3>

```python
# "1" "2" "114514"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchRegex(regex=r"\d+")],  # regex 参数为 regex 表达式
    )
)
async def on_match_regex(app: Ariadne, group: Group, message: MessageChain):
    await app.send_message(group, MessageChain("发数字干什么，是神秘钥匙吗？"))
    ...
```

## MatchTemplate

检测消息链是否匹配指定模板。

遇到元素实例则检测是否相等，遇到元素类型则检测类型是否匹配。

`Plain` 实例与类型会被自动拼接起来

<h3>用法</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 需要 "*搜图 [图片]" 才能匹配 (*为任意多字符)
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchTemplate([Plain, Plain("搜图"), Image])],
    )
)
async def on_match_regex(chain: MessageChain):  # 不会改动消息链
    ...
```

## FuzzyMatch

`FuzzyMatch` 启用了 **模糊匹配** 能力，就算用户打错字了也能识别 (当然中文匹配不大行）

这个只能做一下初筛，所以更建议使用 `FuzzyDispatcher` 哦.

<h3>用法</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[FuzzyMatch("来张涩图", min_rate=0.8)], # min_rate 限定了最低匹配阈值
    )
)
async def on_fuzzy_match(app: Ariadne, group: Group, chain: MessageChain):  # 不会改动消息链
    if chain.display != "来张涩图":
        await app.send_message(group, MessageChain("你大概想说，“来张涩图”？"))
        return
    ...
```

## FuzzyDispatcher

`FuzzyDispatcher` 提供了更强大的模糊匹配支持，包括：

- 只允许匹配率最高的进行响应
- 获取实际的匹配率

让我们试试吧！

<h3>用法</h3>

放到 `bcc.receiver` 的 `dispatchers` 里。

```python
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        dispatchers=[FuzzyDispatcher("来一张涩图", min_rate=0.6)], # min_rate 限定了最低匹配阈值
    )
)
async def on_fuzzy_match(app: Ariadne, group: Group, chain: MessageChain, rate: float):
    # 获取实际匹配率必须准确使用 `rate: float` 标注
    if rate < 0.8:
        await app.send_message(group, MessageChain("你大概想说，“来一张涩图”？"))
        return
    ... # 我们就假定 rate >= 0.8 是对的吧
```

::: interlink
**相关链接:** <https://graia.readthedocs.io/basic/base-parser/>
:::
