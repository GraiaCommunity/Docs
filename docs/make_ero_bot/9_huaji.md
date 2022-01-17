# 9. /斜眼笑

::: warning
虽然说 `mirai` 支持了商城表情mirai-api-http
:::

想必大家在 QQ 聊天的时候，或多或少都会用到QQ的一些表情包（如<img src="/images/9_huaji.webp" height=20 style="vertical-align:text-bottom">和<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">）。  
不可否认，这些 QQ 自带的表情符号已经成为 QQ 日常交流中不可缺少的一部分。  
不过，当你想要通过 `Ariadne` 来构造这样充满表情符号的句子时，问题就大的去了：

你的目标：

<ChatPanel>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">来点涩图<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom"></ChatMessage>
</ChatPanel>

你的构造：

```python
MessageChain.create("来点涩图", Face(277))
```

这还算比较好的，但要是你想做到下面的效果呢？

<ChatPanel>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">在新的一年里，祝你<br/>
身<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">体<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">健<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">康<br/>
万<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">事<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">如<img src="/images/9_wangwang.webp" height=20 style="vertical-align:text-bottom">意</ChatMessage>
</ChatPanel>

你的构造：

```python
MessageChain.create(
    "在新的一年里，祝你\n", 
    "身", Face(277), "体", Face(277), "健", Face(277), "康\n",
    "万", Face(277), "事", Face(277), "如", Face(277), "意\n"
    )
```

牙白，牙白，红豆泥牙白desu捏  
那该怎么办好呢？

当然有啊

## Formatter

通俗来讲，`Formatter` 差不多就是一个给 `MessasgeChain` 用的 `str.format`  
使用方法如下

```python
from graia.ariadne.message.formatter import Formatter

Formatter("在新的一年里，祝你"
          "身{doge}体{doge}健{doge}康\n"
          "万{doge}事{doge}如{doge}意").format(doge=Face(277))
```

这样子是不是方便多了？
