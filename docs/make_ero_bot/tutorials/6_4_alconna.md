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
from arclet.alconna import AlconnaString
SetuFind = AlconnaString(
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
（**此处版本号为 `Ariadne` 的版本号，非 `Alconna` 的版本号**）

:::: code-group
::: code-group-item 0.6.1 -

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
::: code-group-item 0.6.1 +

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

::: tip

在`Ariadne` 0.6.2以上版本, 若不传入`reply_help`, 则`AlconnaDispatcher`会广播一个`AlconnaHelpMessage`事件

你可以通过监听该事件来自定义命令帮助行为

:::

## 6.4.2 直面灾厄

~~左：莱塔尼亚权杖 右：荒地龙舌兰~~

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

若用一个类来比喻的话, 命令参数就是`__init__`方法的参数, 命令名称就是`Class.__name__`, 命令选项则是该类下的所有类方法.

::: tip
`Alconna` 0.7.1 中加入了`Fire-Like`的构造方法, 支持把传入的对象转换为`Alconna`命令

```python
from arclet.alconna import AlconnaFire

def test_func(name: str, sender_id: int):
    print(f"Hello! [{sender_id}]{name}")

alc = AlconnaFire(test_func)
```

:::

## 6.4.3 亮出你的本事吧! 外星人

> **「やってみせろよ、ウチュウジンー！」**

### 创建 Alconna

以下将展示Alconna创建的5种方式:

:::: code-group
::: code-group-item typical

``` python
...
from arclet.alconna import Args
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
...

alc = Alconna(command="我要涩图", main_args=Args["count":int])

@bcc.receiver(
    GroupMessage, 
    dispatchers=[AlconnaDispatcher(alconna=alc)]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item String

``` python
...
from arclet.alconna import AlconnaString
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
...

@bcc.receiver(
    GroupMessage, 
    dispatchers=[
        AlconnaDispatcher(alconna=AlconnaString("我要涩图 <count:int>"))
    ]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Format

``` python
...
from arclet.alconna import AlconnaFormat
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
...

@bcc.receiver(
    GroupMessage, 
    dispatchers=[
        AlconnaDispatcher(
            alconna=AlconnaFormat("我要涩图 {count}", {"count": int})
        )
    ]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Decorate

``` python
...
from arclet.alconna import AlconnaDecorate
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
...

cli = AlconnaDecorate(loop=loop)
@cli.build_command("我要涩图")
@cli.argument(Args["count":int])
def setu(count: int):
    ...

@bcc.receiver(
    GroupMessage, 
    dispatchers=[AlconnaDispatcher(alconna=setu.command)]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Fire

``` python
...
from arclet.alconna import AlconnaFire
from graia.ariadne.message.parser.alconna import AlconnaDispatcher
...

def 我要涩图(count: int):  # 请避免中文命名
    ...

@bcc.receiver(
    GroupMessage, 
    dispatchers=[AlconnaDispatcher(alconna=AlconnaFire(我要涩图))]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::::

### 代码解析

上面的代码中展示了五种 Alconna 的创建方式

下面我们说说其中的`typical`方法与`String`方法

#### 标准形式: 直接使用 `Alconna()`

在**标准形式**中, 你需要传入较多的命令组件, 但同时其可以清晰的表达命令结构.

目前的命令组件有`Option`, `Subcommand`与`Args`

这样创建的 Alconna 实例又长什么样呢？让我们来看一看：

```python
>>> Alconna(
...     command="我要涩图",
...     options=[
...         Option("--from", Args["*tag":str])    
...     ],
...     main_args=Args["count":int]
... )
<ALC.Alconna::我要涩图 with 2 options; args=Args('count': '(\-?\d+)')>
```

`command`传入的便是命令名称,`main_args`是命令参数 ,`options`则是命令选项

`Args`是命令参数的载体, 通过"键-值-默认"传入一系列参数. 具体食用方法我们后面会讲到

:::tip
为什么会有两个option呢? 因为所有的Alconna都内置了`--help`这个选项
::

#### Koishi-like: 使用 `AlconnaString()`

在**koishi-like**方法中, 你可以用类似`koishi`中编写命令的格式来构造Alconna

在上面的例子中，我们可以给他输入这样一串字符串：`我要涩图 2 从 纯爱 兽耳`

这条字符串的意思就是，我们需要一条命令，
该命令以“**我要涩图**”作为前缀，同时他还需要一个参数，其以`count`为名字, 并且类型为`int`,
然后还需要一个选项, 其名称为”**--from**“, 需要不定个参数, 其以`tag`为名字, 并且每个参数类型为`str`

于是我们就得到了如下的 Alconna 实例：

``` python
>>> AlconnaString("我要涩图 <count:int>", "--from <*tag:str>")
<ALC.Alconna::我要涩图 with 2 options; args=Args('count': '(\-?\d+)')>
```

可以看到，我们的 `<count:int>` 变成了 `Args['count':int]`。

::: tip
关于`koishi-like`的命令参数, 请详细阅读[命令参数](https://arcletproject.github.io/docs/alconna/basic/alconna-args) 与
[参数编写规则](https://arcletproject.github.io/docs/alconna/constructs/koishi-like#%E7%BC%96%E5%86%99%E8%A7%84%E5%88%99)
来编写
:::

## 6.4.4 总会有参数的

> **「何とでもなるはずだパラメータ！」**

### Args

`Args`在Alconna中有非常重要的地位, 有一半的bug皆因其引发(迫真)

通常以`Args[key1:var1:default1, key2:var2, ...]`的方式构造一个Args

其中, key一定是字符串, 而var一般为参数的类型, default为具体的值

### var

var 可以是以下几类:

- 存在于`arclet.alconna.types.check_list`中的类型/字符串, 用以替换为预制好的ArgPattern
- 字符串, 会转换为正则表达式
- 列表, 其中可存放ArgPattern、类型或者任意参数值, 如字符串或者数字
- Union、Optional、etc. 会尝试转换为List[Type]
- 一般的类型, 其会尝试比较传入参数的类型是否与其相关
- AnyParam，AllParam, 作为泛匹配的标识符

内置的类型检查包括int、str、float、bool、'url'、'ip'、'email'

:::tip
若想增加类型检查, 我们可以通过`arclet.alconna.types.add_check`传入自己的ArgPattern：

```python
>>> add_check(ArgPattern("app", PatternToken.REGEX_TRANSFORM, Ariadne, lambda x: app))
```

或通过`arclet.alconna.types.ObjectPattern`并传入一个类型来向check_list中注册检查类型：

```python
ObjectPattern(Image, limit=("url",))
```

:::

### key

`key`的作用是用以标记解析出来的参数并存放于Arpamar中, 以方便用户调用.

其有两种特殊前缀, 为 `*xxx` 与 `!xxx`

`*` 前缀表示当前参数为可变长参数, 类似函数中的`*args`, 可以传入0至任意个参数.
`!` 前缀表示该处传入的参数应不是规定的类型, 或不在指定的值中.

### Arpamar

<Loading></Loading>

## 6.4.5 居然是整活？

> **「コッケイナだと！」**

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
