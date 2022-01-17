# 10. 不是所有人都能看涩图

::: warning
本篇章还没写完，敬请期待
:::

众所周知，这涩图，十分的珍贵，应该让管理员先看  
所以，你写出了这样的代码

```python
@bcc.receiver(GroupMessage)
async def setu(app: Ariadne, member: Member, group: Group, ):
    if member.permission != MemberPerm.Member:
        ... # 发涩图
```

这代码，能够正常的运作，很好  
但是到了后面，随着 tx 对涩图的打击力度愈发强大  
涩图愈发的稀缺，所以你的判断条件愈发复杂
