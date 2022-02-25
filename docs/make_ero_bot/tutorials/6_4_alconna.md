# 6.4 Alconna

::: tsukkomi 注
因为是外星来客，所以研究需要久一点也是合理的嘛
:::

`Alconna`， 全称 [`Arclet-Alconna`](https://github.com/ArcletProject/Alconna)  
是由 [`Arclet Project`](https://github.com/ArcletProject) 维护的一个功能强大的 **命令** 解析器  
简单一点来讲就是 `click` 的高级版 (bushi

::: tip
`Alconna` 由两个[`尼希语`](http://tieba.baidu.com/p/7268094994) 单词组成， `alco` 和 `conna`
:::

:::tip
`ArcletProject` 是一个新生社区, 欢迎各位来交流♂
:::

## 6.4.1 为什么是 外星来客 (大雾)

设想我们要给机器人加一个搜索涩图的指令，

``` bash
.setu搜索 <content>
```

然后你给加上了很多的选项，并且某个选项会影响其他几个选项的有效性

``` bash
--page <count>
--tags <tags>
--illust <illust_name>
--click <scope>
```

如果使用 twilight 去做，选项之间的处理会比较复杂

这个时候, ~~天空一声巨响, Alconna 闪亮登场~~ 我们可以使用 `Alconna` 来实现我们的功能

```python
from arclet.alconna import Alconna
SetuFind = Alconna.from_string(
  ".setu搜索 <content> #在p站中搜索条件达成的插图并返回",
  "--page <count:int:1> #在所有搜索结果中指定页数",
  "--tags <*tags:str> #指定插图的标签, 可以使用逗号分隔多个标签",
  "--illust <illust_name:str> #指定插图画师",
  "--click <min:int:1> <max:int> #设定插图的点赞数范围"
)
```

::: tip
为了方便入门, 这里没有选择 `Alconna` 标准的构造方式
:::

如此，命令就创建好了

接下来, 在你的机器人中添加一个 `.setu搜索` 命令

```python
...
from graia.ariadne.message.parser.alconna import AlconnaDispatcher, Arpamar

@bcc.receiver(GroupMessage, dispatchers=[AlconnaDispatcher(SetuFind)])
async def ero(app: Ariadne, group: Group, result: Arpamar):
    if result.matched:
        content = result.content
        page = result.options.get("page")
        tags  = result.options.get("tags")
        illust  = result.options.get("illust")
        click = result.options.get("click")
        ...  # setu搜索的处理部分
    
...
```

准备就绪, 对着你的机器人~~发情~~发号施令吧

<ChatPanel title="聊天记录">
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">.setu搜索 白面鸮 --tags ntr sole-male --page 1 </ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">工口发生~</ChatMessage>
  <ChatMessage name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">草</ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">草</ChatMessage>
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">草</ChatMessage>
</ChatPanel>

## 6.4.2 直面灾厄

_~~左: 莱塔尼亚权杖 右: 荒地龙舌兰~~_

要想写好一个 `Alconna`, 你首先需要理清楚自己的**命令结构**

一般, 你需要把命令分为四个部分:

1. 命令名称: 作为一个命令的标识符
2. 命令分隔符: 一般是空格
3. 命令参数: 命令需要的参数（？
4. 命令选项: 命令需要的选项（（？

<Loading></Loading>

:::interlink
**相关链接：**<https://arcletproject.github.io/docs/alconna/tutorial>
:::
