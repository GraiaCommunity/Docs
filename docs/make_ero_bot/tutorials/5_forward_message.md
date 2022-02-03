# 5. 好大的奶

::: danger
这篇文档除了例子<Curtain type="danger">与乐子</Curtain>啥也没写
:::

你可能曾经看到过这样的合并消息
<ChatPanel title="GraiaX-Community">
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">
    <div style="width:200px">
      <div style="font-size:1.2em;margin-bottom:5px">群聊的聊天记录</div>
      EroEroBot: [图片]<br/>
      群菜鸮: 好大的奶<br/>
      群菜鸡: 好大的奶<br/>
      <hr/>
      查看4条合并消息<br/>
    </div>
  </ChatMessage>
</ChatPanel>

你很兴奋，想要看一看这奶到底有多大  
但很可惜，也不知道你在可惜什么，当你点开聊天记录的时候，你看到的是这种景象

<ChatPanel title="转发的合并消息">
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')"><img src="/images/tutorials/5_huge_milk.webp"></ChatMessage>
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">好大的奶</ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">好大的奶</ChatMessage>
  <ChatMessage name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">好大的奶</ChatMessage>
</ChatPanel>

不知道是因为你没看到你想要看的东西，还是说你觉得这个奶完全不够大  
反正你发现你被骗了<Curtain>You're Rickrolling</Curtain>  
然后在下一秒，你突发奇想，能不能让机器人也整一个这个来骗人呢？  

**当然可以**，我们现在就通过代码来直接复刻上面的效果

```python
...
import random
from datetime import datetime
from graia.ariadne.message.element import At, Plain, Image, Forward, ForwardNode
...

@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight(Sparkle([FullMatch("好大的奶")]))]
)
async def create_forward(app: Ariadne, member: Member):
    fwd_nodeList = [
        ForwardNode(
            target=member,
            time=datetime.now(),
            message=MessageChain.create(Image(path="big_milk.jpg")),
        )
    ]
    member_list = await app.getMemberList(group)
    for _ in range(3):
        random_member: Member = random.choice(member_list)
        fwd_nodeList.append(
            ForwardNode(
                target=random_member,
                time=datetime.now(),
                message=MessageChain.create("好大的奶"),
            )
        )
    message = MessageChain.create(Forward(nodeList=fwd_nodeList))
    await app.sendGroupMessage(group, message)
```

因为比较简单，所以我们直接随便讲一讲参数就好了

```python
ForwardNode(
    target=member,  # 发送者的信息(Member / Friend / Stranger 都行)
    time=datetime.now(),  # 发送时间
    message=MessageChain.create(Image(path="big_milk.jpg")),  # 发送的消息链
)
```

::: danger 注意
通过上面的例子你一定意识到了一个很严肃的问题：  
**你可以自己无中生有生成消息链然后传播出去**  
请不要通过该方法**传播谣言**  
要不然我就要用我的靴子狠狠的踢你的屁股
:::
