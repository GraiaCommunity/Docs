# 如何快速搜图

就在今天（2022年5月17日），一则合并消息传遍了整个 QQ 群

<ChatWindow title="转发的合并消息（有部分删减）">
  <ChatMsg name="LIAN-小明">隔壁群的机器人已经可以识别本子了</ChatMsg>
  <ChatMsg name="LIAN-小明">好家伙 黄油也能识别</ChatMsg>
  <ChatMsg name="LIAN-小明">咱们群不行啊 叫群主也搞一个这种高科技的机器人才行</ChatMsg>
</ChatWindow>

看起来，这个合并消息很大程度激发了大家对于 QQ 机器人的乐趣

所以，我决定现在在这里再新加一节叫你如何制作**搜涩图**的机器人

## 0. 先做一个能用的机器人

假设你并没有看过该文档的其他章节，
那请先到[目录](./guide/README.md)，
跟着我们的教程看完「从零开始的~~异世界~~涩图机器人教程」的前三章。

## 1. 申请一个 saucenao 的 apikey

根据我们对这次事件的核心机器人 [真寻bot](https://github.com/HibiKier/zhenxun_bot) 的解析，
我们可以知道，机器人的搜图功能事实上是通过调用 [Saucenao](saucenao.com) 的 api 来实现的。
所以，让我们先注册一个 apikey

::: tip
你可能很好奇为什么这里没有图  
因为是特别篇章嘛，写的有点急，嘿嘿
:::

1. 打开 [Saucenao](saucenao.com)，点击右下角的 `Account`
2. 在 `Register` 中注册你的账号
3. 注册登录成功后，点击个人页面左上角的 `api`
4. 然后在那一大串英文中出现的 `api key` 就是我们需要的东西啦

## 2. 安装 `saucenao-api`

:::: code-group
::: code-group-item poetry

```bash
poetry add saucenao-api
```

:::
::: code-group-item pip

```bash
pip install saucenao-api
```

::::

## 3. 在插件文件夹里创建一个新的插件并且粘贴一下代码

::: tip
以下代码参考了 [Abot-graia](https://github.com/djkcyl/ABot-Graia)

~~听我说👂👂👂谢谢你🙏🙏🙏因为有你👉👉👉温暖了四季🌈🌈🌈~~
:::

``` python
from graia.ariadne.app import Ariadne
from graia.ariadne.event.message import GroupMessage
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.message.element import *
from graia.ariadne.message.parser.twilight import Twilight, FullMatch, ElementMatch, ElementResult
from graia.ariadne.model import Group, Member
from graia.saya import Channel
from graia.saya.builtins.broadcast.schema import ListenerSchema
from saucenao_api import AIOSauceNao
from saucenao_api.errors import SauceNaoApiError

channel = Channel.current()

channel.name("Saucenao")
channel.description("以图搜图")
channel.author("I_love_study")

apikey = "xxx" # 请输你自己的，谢谢


@channel.use(
    ListenerSchema(listening_events=[GroupMessage],
                   inline_dispatchers=[
                       Twilight([
                           FullMatch("以图搜番"),
                           FullMatch("\n", optional=True),
                           "img" @ ElementMatch(Image, optional=True),
                       ]),
                   ]))
async def saucenao(app: Ariadne, group: Group, member: Member, img: ElementResult, source: Source):
    await app.sendGroupMessage(group, MessageChain.create("正在搜索，请稍后"), quote=source.id)
    async with AIOSauceNao(apikey, numres=3) as snao:
        try:
            results = await snao.from_url(img.result.url)
        except SauceNaoApiError as e:
            await app.sendMessage(group, MessageChain.create("搜索失败desu"))
            return

    fwd_nodeList = []
    for results in results.results:
        if len(results.urls) == 0:
            continue
        urls = "\n".join(results.urls)
        fwd_nodeList.append(
            ForwardNode(
                target=app.account,
                senderName="爷",
                time=datetime.now(),
                message=MessageChain.create(
                    f"相似度：{results.similarity}%\n标题：{results.title}\n节点名：{results.index_name}\n链接：{urls}"
                )))

    if len(fwd_nodeList) == 0:
        await app.sendMessage(group, MessageChain.create("未找到有价值的数据"), quote=source.id)
    else:
        await app.sendMessage(group, MessageChain.create(Forward(nodeList=fwd_nodeList)))
```

这样，你的搜图机器人就做好力

<ChatWindow title="转发的合并消息">
  <ChatMsg name="爷">以图搜番<img src="/images/guide/ero_pic_1.webp"/></ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp"><ChatQuote name="爷">以图搜番</ChatQuote>正在搜索，请稍后</ChatMsg>
  <ForwardChat
    name="EroEroBot"
    avatar="/avatar/ero.webp"
    title="群聊"
    :contents="[
      '爷: 相似度：96.87% ...',
      '爷: 相似度：95.54% ...',
      '爷: 相似度：87.62% ...'
    ]"
    counts="3" />
</ChatWindow>

## 4. 背后原理

假设你真的很想知道这些东西背后的原理，你可以直接参考以下章节

- [好大的奶](./guide/forward_message.md) —— 合并消息的构建与解析
- [来点网络上的涩图](./image_from_internet.md) —— `aiohttp` 的超简单运用
- [Twilight](./twilight.md) —— `Kanata` 的精神续作
