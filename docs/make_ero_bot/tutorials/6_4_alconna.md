# 6.4 Alconna

::: tsukkomi 注
因为是外星来客，所以研究需要久一点也是合理的嘛
:::

`Alconna`， 全称 [`Arclet-Alconna`](https://github.com/ArcletProject/Alconna)，
是由 [`Arclet Project`](https://github.com/ArcletProject) 维护的一个功能强大的 **命令** 解析器，
简单一点来讲就是 `click` 的高级版 (bushi）。

::: tip TIPS

1. `Alconna` 由两个[`尼希语`](http://tieba.baidu.com/p/7268094994) 单词组成， `alco` 和 `conna`
2. `ArcletProject` 是一个新生社区，欢迎各位来交流♂

:::

## 6.4.0 凡事都要先安装

::: tip
假设你之前安装 Ariadne 时用的是以下3种选项中的一种，那么你可以直接跳过本小节。

- `graia-ariadne[full]`
- `graia-ariadne[alconna]`
- `graia-ariadne[graia,alconna]`
:::

:::: code-group
::: code-group-item poetry

``` bash
# 顺便选一个输进去就完事了
poetry add arclet-alconna
poetry add graia-ariadne[alconna]
```

:::
::: code-group-item pip

``` bash
# 顺便选一个输进去就完事了
pip install arclet-alconna
pip install graia-ariadne[alconna]
```

::::

## 6.4.1 为什么是外星来客 (大雾)

设想我们要给机器人加一个搜索涩图的指令，

```txt
.setu搜索 <content>
```

然后你给加上了很多的选项，并且某个选项会影响其他几个选项的有效性

```txt
--page <count>
--tags <tags>
--illust <illust_name>
--click <scope>
```

如果使用 twilight 去做，选项之间的处理会比较复杂

这个时候，~~天空一声巨响，Alconna 闪亮登场~~，我们可以使用 `Alconna` 来实现我们想要的功能：

``` python
from arclet.alconna import Alconna
SetuFind = Alconna.from_string(
  ".setu搜索 <content> #在p站中搜索条件达成的插图并返回",
  "--page <count:int:1> #在所有搜索结果中指定页数",
  "--tags <*tags:str> #指定插图的标签，可以使用逗号分隔多个标签",
  "--illust <illust_name:str> #指定插图画师",
  "--click <min:int:1> <max:int> #设定插图的点赞数范围"
)
```

::: tip
为了方便入门，这里没有选择 `Alconna` 标准的构造方式, 而是更加方便的`koishi-like`方式。
:::

如此，命令就创建好了。

接下来，在你的机器人中添加一个 `.setu搜索` 命令：  
（**此处版本号为 `Alconna` 的版本号，非 `Ariadne` 的版本号**）

:::: code-group
::: code-group-item 0.6.0 -

``` python
...
from graia.ariadne.message.parser.alconna import AlconnaDispatcher, Arpamar

@bcc.receiver(GroupMessage, dispatchers=[AlconnaDispatcher(alconna=SetuFind)])
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

:::
::: code-group-item 0.6.0 +

``` python
...
from graia.ariadne.message.parser.alconna import AlconnaDispatcher, Arpamar

@bcc.receiver(GroupMessage, dispatchers=[AlconnaDispatcher(alconna=SetuFind, reply_help=True)])
async def ero(app: Ariadne, group: Group, result: Arpamar):
    content = result.content
    page = result.options.get("page")
    tags  = result.options.get("tags")
    illust  = result.options.get("illust")
    click = result.options.get("click")
    ...  # setu搜索的处理部分
...
```

:::
::::

准备就绪，对着你的机器人~~发情~~发号施令吧：

<ChatPanel title="聊天记录">
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">.setu搜索 白面鸮 --tags ntr sole-male --page 1 </ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">工口发生~</ChatMessage>
  <ChatMessage name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">草</ChatMessage>
  <ChatMessage name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">草</ChatMessage>
  <ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">草</ChatMessage>
</ChatPanel>

::: tip

在未来的更新后, 你可以通过`reply_help`参数来开启自动回复帮助信息的功能:

<ChatPanel title="聊天记录">
<ChatMessage name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">.setu搜索 --help</ChatMessage>
<ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">.setu搜索 &lt;content:WildMatch&gt;<br>
在p站中搜索条件达成的插图并返回<br>可用的选项有:<br>
# 在所有搜索结果中指定页数<br>  --page &lt;count, default=1&gt;<br>
# 指定插图的标签，可以使用空格分隔多个标签<br>  --tags &lt;*tags&gt;<br>
# 指定插图画师<br>  --illust &lt;illust_name&gt;<br>
# 设定插图的点赞数范围<br>  --click &lt;min, default=1&gt; &lt;max&gt;</ChatMessage>
<ChatMessage name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">好</ChatMessage>
</ChatPanel>

:::

## 6.4.2 直面灾厄

_~~左：莱塔尼亚权杖 右：荒地龙舌兰~~_

要想写好一个 `Alconna`，你首先需要理清楚自己的**命令结构**

一般，你需要把命令分为四个部分:

1. 命令名称：作为一个命令的标识符
2. 命令分隔符：一般是空格, 作为参数之间的区分符号
3. 命令参数：一个命令所需求的主要参数, 可以为空
4. 命令选项：为命令添加额外的解释参数, 或以此选择命令的不同功能

::: tip
是的, Alconna负责的并不是**消息链解析**, 而是**命令解析**.
~~虽然说Alconna的实现攘括了消息链解析的功能~~
:::

在上述例子中, `.setu搜索`是命令名称, `<content>`是命令参数, 而剩下的`page`, `tags`都是命令选项.

一个命令可以没有命令参数, 但一定要有命令名称, 这样才称得上健全!

::: tip
关于`koishi-like`的命令参数, 请详细阅读[命令参数](https://arcletproject.github.io/docs/alconna/basic/alconna-args) 与
[参数编写规则](https://arcletproject.github.io/docs/alconna/constructs/koishi-like#%E7%BC%96%E5%86%99%E8%A7%84%E5%88%99)
来编写
:::

## 6.4.3 竟然是整活

### 元素匹配

一定要记住, Alconna是支持元素匹配的(Plain元素或Source等元素除外)

所以, 如果你要写一个以图搜图的功能, 这么写就好了:

```python
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import Image

pic_search = Alconna(
    headers=["EroBot ", "!"],
    command="找图",
    main_args=Args["img":Image]
)
```

### 不规则命令

你可以在`command`中塞正则表达式, 其在头部解析后会将匹配结果返回

类似`.r100`或者`查询XX人品`的指令, 这么写就好了:

```python
from arclet.alconna import Alconna, AnyDigit, Arpamar
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
dice = Alconna(command=f".r{AnyDigit}")

@bcc.receiver(GroupMessage, dispatchers=[AlconnaDispatcher(alconna=dice)])
async def roll_dice(app: Ariadne, group: Group, result: Arpamar):
    dice_count = result.header
    print(dice_count)
    ...
```

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<Loading></Loading>

::: interlink
**相关链接：**  
<https://graia.readthedocs.io/advance/alconna/quickstart/>  
<https://arcletproject.github.io/docs/alconna/tutorial>
:::
