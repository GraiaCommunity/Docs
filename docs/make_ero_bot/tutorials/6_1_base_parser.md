# 6.1 基础消息链处理器

::: tsukkomi
本章全是例子，还都是照抄官方文档的~开摆！

P.s. 一些变量名称为了与本文档其他章节统一而）
:::

假设你的需求很简答  
那么我相信，这些基础消息链应该就够用了

::: tip
假设你想要理解这些处理器的原理  
你可以先去看一看[第九章](./9_not_everyone_have_st.md)
:::

- `DetectPrefix`: 检测前缀是否符合
- `DetextSuffix`: 检测后缀是否符合
- `MentionMe`: 消息中有 At bot 或有 Bot 姓名/群昵称
- `Mention`: 消息中有 At 某人或有某人姓名/群昵称
- `ContainKeyword`: 检测消息链是否包含指定关键字
- `MatchContent`: 检测消息链是否与对应消息链相等
- `MatchRegex`: 检测消息链是否匹配指定正则表达式

::: tip
以上这些“消息链处理器”位于 `graia.ariadne.message.parser.base` 中
:::

## DetectPrefix

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@bcc.receiver(GroupMessage, decorators=[DetectPrefix("涩")])
async def on_message(app: Ariadne, group: Group, message: MessageChain):
    # 此时的 message 事实上还是有前面的 "涩"
    await app.sendGroupMessage(group, MessageChain.create("涩？涩什么"))
    ...
```

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@bcc.receiver(GroupMessage)
async def on_message(app: Ariadne, group: Group, message: MessageChain = DetectPrefix("涩")):
    # 此时的 message 就没有 "涩" 了
    await app.sendGroupMessage(group, message + MessageChain.create("？很涩吗"))
    ...
```

::: tip
`Quote` 和 `Source` 虽然会在 `Plain("涩")` 的前面  
但是并不会被去掉哦<Curtain>只有"涩"消失的世界完成了</Curtain>
:::

## DetectSuffix

```python
# 消息必须以 "涩" 开头
# 如 "这个好涩"
@bcc.receiver(GroupMessage, decorators=[DetectSuffix("好涩")])
async def on_message(message: MessageChain):
    # 此时的 message 事实上后面还是有 "好涩"
    ...
```

```python
# 消息必须以 "涩" 开头
# 如 "这个好涩"
@bcc.receiver(GroupMessage)
async def on_message(message: MessageChain = DetectSuffix("好涩")):
    # 此时的 message 就没有 "好涩" 了
    ...
```

::: tip
`Quote` 和 `Source` 虽然会在 `Plain("涩")` 的前面  
但是并不会被去掉哦<Curtain>只有"涩"消失的世界完成了</Curtain>
:::

## MentionMe

```python
# "@EroEroBot 在吗" "EroEroBot 在吗" "EroEroBot，帮我涩涩"
# 要求名字/At在最前面
@bcc.receiver(GroupMessage, decorators=[MentionMe()]) # 注意要实例化
async def on_mention_me(app: Ariadne, group: Group, member: Member):
    await app.sendGroupMessage(group, MessageChain.create(At(member.id), "叫我？"))
```

## Mention

```python
# "Graiax 人呢" "Graiax，今晚一起去涩涩"
# 要求名字/At在最前面
@bcc.receiver(..., decorators=[Mention(target=...)]) # target: int | str  
# int: 用户 QQ 号，str: 用户的名字
async def on_mention(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, MessageChain.create("你找我主人有什么事吗"))
    ...
```

## ContainKeyword

```python
# "今晚一起涩涩吗" "让我涩涩你"
@bcc.receiver(..., decorators=[ContainKeyword(keyword="涩涩")])
async def on_contain_keyword(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, MessageChain.create("好欸，涩涩"))
    ...
```

## MatchContent

```python
# "[图片]" <- 你控制台天天见的啦
@bcc.receiver(..., decorators=[MatchContent(content="[图片]")])
# 当 content 为 str 时，将会与MessageChain.asDisplay()进行比较，当 content 为 MessageChain 时，将会与 MessageChain 进行比较
async def on_match_content(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, MessageChain.create("哦，发了什么图片，让我康康！"))
    ...
```

## MatchRegex

```python
# "1" "2" "114514"
@bcc.receiver(..., decorators=[MatchRegex(regex=r"\d+")]) # regex 参数为 regex 表达式
async def on_match_regex(app: Ariadne, group: Group, message: MessageChain):
    await app.sendGroupMessage(group, MessageChain.create("发数字干什么，是神秘钥匙吗？"))
    ...
```

::: interlink
**相关链接:** <https://graia.readthedocs.io/basic/base-parser/>
:::
