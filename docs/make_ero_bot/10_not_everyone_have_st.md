# 10. 不是所有人都能看涩图

## 情景导入

众所周知，这涩图，十分的珍贵，应该让管理员先看  
所以，你写出了这样的代码

```python
@bcc.receiver(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def setu(app: Ariadne, member: Member, group: Group):
    if member.permission != MemberPerm.Member:
        ... # 发涩图
```

这代码，能够正常的运作，很好  
但是到了后面，随着 tx 对涩图的打击力度愈发强大  
涩图愈发的稀缺，所以你的判断条件愈发复杂  
你的判断条件也愈发复杂

```python
@bcc.receiver(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def setu(app: Ariadne, member: Member, group: Group):
    if group.id not in [114514, 1919810]:
        await app.sendGroupMessage(group, MessageChain.create("对不起，该群并不能发涩图"))
    elif member.id not in [114514, 1919810]:
        await app.sendGroupMessage(group, MessageChain.create(At(member.id), "对不起，您的权限并不够"))
    elif frequency(group, member) >= 10: # 频率判断，详细实现略
        await app.sendGroupMessage(group, MessageChain.create(At(member.id), "你太快了，能不能持久点"))
    else:
        async with aiohttp.request("GET", "https://setu.example.com/limit") as r:
            is_max = (await r.json())["is_limit"]
        if is_max:
            await app.sendGroupMessage(group, MessageChain.create(At(member.id), "对不起，今天的涩图已经达到上限了哦"))
        else:
            ... # 获取涩图
            await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=setu)))
```

这种时候问题就大的去了，主要体现在下面几个方面

1. 很乱，在第一眼看过去的时候完全不知道怎么回事
2. 代码重复性极高，但即使做成函数调用，也依然会需要 if 语句
3. 代码有点难修改，需要搞清楚各种 if..else.. 关系

那该怎么办？你可以试试 `Depend`

```python
from graia.broadcast.builtin.decorators import Depend
from graia.broadcast.exceptions import ExecutionStop

def check_group(*groups: int):
    async def check_group_deco(app: Ariadne, group: Group):
        if group.id not in groups:
            await app.sendGroupMessage(group, MessageChain.create("对不起，该群并不能发涩图"))
            raise ExecutionStop
    return Depend(check_group_deco)

def check_member(*members: int):
    async def check_member_deco(app: Ariadne, group: Group, member: Member):
        if member.id not in members:
            await app.sendGroupMessage(group, MessageChain.create(At(member.id), "对不起，您的权限并不够"))
            raise ExecutionStop
    return Depend(check_member_deco)

def check_frequency(max_frequency: int):
    async def check_frequency_deco(app: Ariadne, group: Group, member: Member):
        if frequency(member.id) >= max_frequency:
            await app.sendGroupMessage(group, MessageChain.create(At(member.id), "你太快了，能不能持久点"))
            raise ExecutionStop
    return Depend(check_frequency_deco)

@bcc.receiver(GroupMessage,
              decorators=[
                  check_group(114514, 1919810),
                  check_member(114514, 1919810),
                  check_frequency(10),
              ],
              dispatchers=[Twilight.from_command("涩图来")])
async def setu(app: Ariadne, group: Group):
    async with aiohttp.request("GET", "https://setu.example.com/limit") as r:
        is_max = (await r.json())["is_limit"]
    if is_max:
        await app.sendGroupMessage(group, MessageChain.create(At(member.id), "对不起，今天的涩图已经达到上限了哦"))
    else:
        ... # 获取涩图
        await app.sendGroupMessage(group, MessageChain.create(Image(data_bytes=setu)))
```

在第一眼看到这些代码的时候，你是不是满脑子问号  
这不是更长了嘛 kora！  
别急，让我慢慢讲解...

## `Depend` 是什么

`Depend`

:::tip
不要将本文提及的 `decorator` 跟 `Python` 本身语法中的 `decorator` 搞混
:::

## `Depend` 的好处

~~Depend好处都有啥，谁说对了就给他~~

- 判断的函数被分成了几个部分
- 大部分的判断都放在了 `decorators` 参数里面
- `Listener` 所需要的参数只有 `Ariadne` 实例跟 `Group` 实例
- 只需要调整 `Decorator` 顺序就能直接调整判断优先级，而不是改 if..else..

## 怎么用 `Depend` 写一个 `Decorator`

我们先掏出其中的一个 decorator 来详细讲解一下吧

```python
def check_group(*groups: int):
    async def check_group_deco(app: Ariadne, group: Group):
        if group.id not in groups:
            await app.sendGroupMessage(group, MessageChain.create("对不起，该群并不能发涩图"))
            raise ExecutionStop
    return Depend(check_group_deco)
```

首先我们可以看到，我们在 `check_group` 函数中定义了一个 `check_group_deco` 函数  
并且返回了 `Depend(check_group_deco)`

还记得在[第二章](2_other_event#关于-dispatcher)讲过，dispatcher 会解析你所需要的参数吗？  
事实上，Depend 所封装的函数也会被 dispatcher 解析

而`check_group_deco` 这个函数中，当发送消息的群**并不在我们所设定的群**的时候  
将会发送消息，并且抛出 `ExecutionStop`

在 `broadcast` 接到运行错误之后，将会中断这个 `Listener` 的运行

:::tip
事实上，假设你需要 `Depend` 中被修饰函数的返回值，可以这么写

```python
async def check_vip_deco(app: Ariadne, member: Member):
    vip_status = await get_vip(member.id)
    if vip_status is None:
        raise ExecutionStop
    else:
        return vip_status

@bcc.receive(GroupMessage, dispatchers=[Twilight.from_command("涩图来")])
async def setu(app: Ariadne, vip_status = Depend(check_vip_deco)):
    ...
```

:::
