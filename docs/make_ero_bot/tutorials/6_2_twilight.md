# 6.2 Twilight

::: danger
本章还没有写完

本章可能会过时，本章所适用的 Ariadne 版本请参考第一小节。
:::

## 6.2.1 Twilight 是什么

`Twilight` 是 Ariadne 使用的一种标准消息链匹配工具。（有点类似于 v4 的 Kanata，但其增加了类似 argparse 的操作）

::: tsukkomi ???
`Twilight` 这个名字取自于 `My little Pony` 中的 `Twilight Sparkle`。

Friendship is magic!

<Curtain type="tip">来点暮光闪闪涩图<Curtain type="tip"> 人不能，至少不应该</Curtain></Curtain>
<div style="height:1em"></div>
:::

## 6.2.2 快速开始

废话不多说，我们就直接通过例子来向各位讲解如何使用 `Twilight`：

:::: code-group
::: code-group-item >=0.5.0

``` python
...
from graia.ariadne.message.parser.twilight import Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight.from_command("涩图来")]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::: code-group-item >=0.4.6

``` python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.twilight import Sparkle, Twilight
...
@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight([FullMatch("涩图来")])]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::: code-group-item >=0.3.5,<0.5.0

``` python
...
from graia.ariadne.message.parser.pattern import FullMatch
from graia.ariadne.message.parser.parser import Sparkle
from graia.ariadne.message.parser.twilight import Twilight
...

@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight(Sparkle([FullMatch("涩图来")]))]
)
async def test(app: Ariadne, group: Group):
    await app.sendGroupMessage(group, Message.create(Image(path="./Graiax/EroEroBot/eropic.jpg")))
```

:::
::::

这个就是 Twilight 最简单的运用了，我猜你一定没看懂，所以下面我们继续来介绍一下 Twilight 以及他到底该怎么用吧~

::: warning
你可能从上面的例子就知道了，Twilight 的使用方法一致在跟随 Ariadne 的版本迭代进行改进。
因此在参照本文或官方文档的内容时，请时刻注意文档适用的 Ariadne 版本以及你自己所使用的 Ariadne 版本。

如无特殊标注，本章中例子的适用范围均为 `^0.6.0`（即 `>=0.6.0, <0.7.0`）。
:::

### 原理分析

所以 Twilight 的实现原理是什么，
为什么它可以在匹配成功的时候才调用我们的函数呢（在上面的例子就是当收到的消息为 `涩图来` 的时候才会发送图片）？

这就得说一说 Dispatcher 了。

先看看 Twilight 的定义：

``` python
class Twilight(Generic[T_Sparkle], BaseDispatcher):
    """暮光"""
```

从本质上来说，Twilight 是一种 Dispatcher，他继承了 BCC 的 BaseDispatcher 类。  
当他作为 Dispatcher 传给 BCC 时，假设 BCC 接收到了我们指定的事件（如：GroupMessage），
BCC 就会把 GroupMessage 中的消息链交给 Twilight 进行解析，当 Twilight 解析失败的时候，
他就会抛出 `ExecutionStop` 错误，然后 BCC 捕获到该错误就不会调用我们注册的函数了。

## 6.2.3 创建 Twilight

以下演示 Twilight 的两种创建方法：

::: warning
下面代码中的匹配参数是强行创造需求，无实际意义。
:::

:::: code-group
::: code-group-item from_command

``` python
...
from graia.ariadne.message.parser.twilight import Sparkle, Twilight
...

@bcc.receiver(
    GroupMessage,
    dispatchers=[Twilight.from_command("涩图来 {at} {any}")]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Match

``` python
...
from graia.ariadne.message.element import At
from graia.ariadne.message.parser.twilight import (
    FullMatch,
    SpacePolicy,
    Twilight,
    WildcardMatch,
)
...

@bcc.receiver(
    GroupMessage,
    dispatchers=[
        Twilight(
            [
                FullMatch("涩图来").space(SpacePolicy.FORCE),
                "at" @ ElementMatch(At).space(SpacePolicy.FORCE),
                "any" @ WildcardMatch()
            ]
        )
    ]
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::::

### 代码解析

上面的代码中展示了两种 Twilight 的创建方式，下面我们分别说说这两种创建方式具体发生了什么。

#### `Twilight.from_command()` 方法

`from_command` 顾名思义，就是从命令模板中生成 Twilight。
在上面的例子中，我们给他输入了这样一串字符串：`涩图来 {at} {any}`

怎么样，是不是觉得一目了然？
这条字符串的意思就是，我们需要一条命令，
该命令以“**涩图来**”作为前缀，同时他还需要两个参数，其中一个名为 `at`，另一个名为 `any`。

于是我们就得到了如下的 Twilight 实例：

``` python
>>> Twilight.from_command('涩图来 {at} {any}')
<Twilight: [ParamMatch('PARAM', space='FORCE', flags=), ParamMatch('PARAM', space='NOSPACE', flags=)]>
```

可以看到，我们的 `{at}` 和 `{any}` 变成了两个 `ParamMatch`，而什么是 `ParamMatch` 呢？请看后面一节。

#### 直接使用 `Twilight()`

在这个这个例子中，没有使用任何 Twilight 的方法，而是直接传入了一个含有多个 Match 的列表来实例化了一个 Twilight 类，
同时传入了3个 **XxxxxMatch**，并且其中的 `FullMatch` 和 `ElementMatch` 都各自有一个 `.space()`。

并且，`ElementMatch` 和 `WildcardMatch` 前面各有一个 `"at" @` 或 `"any" @`，
这又是在干什么呢？其实，他们是用来指定参数名称的，具体作用我们后面会讲到。

那么这样创建的 Twilight 实例又长什么样呢？让我们来看一看：

```python
>>> Twilight(
...     [
...         FullMatch("涩图来").space(SpacePolicy.FORCE),
...         "at" @ ElementMatch(At).space(SpacePolicy.FORCE),
...         "any" @ WildcardMatch()
...     ]
... )
<Twilight: [ElementMatch(<class 'graia.ariadne.message.element.At'>, space='FORCE', flags=), WildcardMatch('.*', space='PRESERVE', flags=)]>
```

有个问题，刚刚我们使用 `Twilight.from_command()` 生成的 Twilight 中有两个 `ParamMatch`，
`ParamMatch`、`ElementMatch`、`FullMatch`、`WildcardMatch` 这几个玩意都是
**XxxxxMatch** 这样的格式，**XxxxxMatch** 到底是什么？下一节我们就来好好讲一讲。

## 6.3 XxxxxMatch?

::: tip
下面部分内容来自 Ariadne 官方文档。

本章所有需要 import 的类出消息元素（Elemen）外，  
均来自 `graia.ariadne.message.parser.twilight` 中。
:::

想必你已经迫不及待了吧，首先，解答一下刚刚提出的问题 **XxxxxMatch** 到底是什么？

**Match** 是一类组成 Twilight 的基本元素，他是 Twilight 的基础，
用来表示我们需要匹配的各种参数，如文本、消息元素等等，
通过不同组合的 **Match**，就可以让我们轻松地匹配我们想要的东西了。

::: tsukkomi
~~好像说了什么，又好像没说的样子~~
:::

那么就让我们来康一康目前 Ariadne 有哪些 **Match** 吧。
首先需要声明一下，`Match` 类本身仅为**抽象基类**，无法被直接实例化，他有以下几种变体：

- `RegexMatch` ： 正则表达式匹配
- `FullMatch` ： 严格全匹配（匹配字符串）
- `UnionMatch` ： 多重全匹配（匹配时满足其传入的多个字符串中的一个即为匹配成功）
- `ElementMatch` ： 消息元素匹配（如 `At`、`Image`等）
- `WildcardMatch` ： 泛匹配（任意匹配/贪婪匹配，包括空格等）
- `ParamMatch` ： 泛匹配（任意匹配，可通过引号与空格确定匹配起止）
- `ArgumentMatch` ： 参数匹配（即：`-t xx`、`--type xx` 等）

那么就让我们分别介绍一下每一种 **Match** 吧~

### RegexMatch

`RegexMatch` 是 Twilight 的基础，它可以匹配指定的正则表达式。

创建一个 UnionMatch 的方法如下：

``` python
>>> RegexMatch(r"\d+")
```

另外，下面即将介绍到的 `FullMatch`、`UnionMatch`、`ParamMatch`、`WildcardMatch`
都是基于 `RegexMatch` 的包装类（即 `RegexMatch` 可以用的方法，这几种 Match 也可以用噢）。

#### `flags` 方法

你可以通过该方法设置正则表达式的匹配标记，例如：

``` python
>>> RegexMatch(r"\d+ # digits").flags(re.V) # 设置 re.VERBOSE 标记
```

> 什么？你不会正则？那你可以去学学噢~

#### `space` 方法

这是一个比较有用的方法，通过这个方法，你可以设置匹配的时候要求这个 Match
的匹配内容后面是否需要空格。

该方法的使用例如下：

``` python
>>> from graia.ariadne.message.parser.twilight import SpacePolicy
>>> RegexMatch(r"\d+").space(SpacePolicy.NOSPACE)
>>> RegexMatch(r"[a-z]+").space(SpacePolicy.FORCE)
>>> RegexMatch(r"[A-Z]+").space(SpacePolicy.PRESERVE)
```

其中 `SpacePolicy` 具有如下常量:

- `NOSPACE` ： 不附带尾随空格（即该 Match 的匹配内容后面必须不是空格）
- `PRESERVE` ： 预留尾随空格（即该 Match 的匹配内容后面有没有空格都没关系）
- `FORCE` ： 强制需要尾随空格（即该 Match 的匹配内容后面必须有空格）

### FullMatch

相信通过前面几章的用例，你已经大概了解了 FullMatch 具体怎么用了吧，这里就不过多介绍了。

由于 FullMatch 继承自 RegexMatch，因此他也具有 `flags` 和 `space` 方法。

### UnionMatch

在前面，我们提到 UnionMatch 是**多重全匹配**，意即匹配时满足其传入的多个字符串中的一个即为匹配成功。

创建一个 UnionMatch 的方法如下：

``` python
>>> UnionMatch("你可以匹配我", "或者我", "我也可以")
>>> UnionMatch(*["你可以匹配我", "或者我", "我也可以"])  # 请注意星号
>>> UnionMatch("你可以匹配我", "或者我", "我也可以", optional=True)
>>> UnionMatch(*["你可以匹配我", "或者我", "我也可以"], optional=True)  # 请注意星号
```

相比 FullMatch 和 RegexMatch，UnionMatch 多了一个 `optional` 的选项，
当该选项设置为 **True** 时，表示该 UnionMatch 为可选。

### ElementMatch

ElementMatch 可以用来匹配各种在消息链中可以与文字共存的消息元素，
譬如：At、Image、AtAll、Face、MarketFace。

创建一个 UnionMatch 的方法如下：

``` python
>>> ElementMatch(At)
>>> ElementMatch(At, optional=True)
```

同样的 ElementMatch 也具有 `optional` 选项。

### WildcardMatch

泛匹配/贪婪匹配/任意匹配，创建时无需传入任何参数。
并且他对要匹配的字符串的长度没有任何要求，就算是 `""` 也算匹配成功，使用时需多多注意。

**请注意**，一般情况下请不要将放于其他 Match 的前面，否则可能会出现意外问题。

### ParamMatch

泛匹配/任意匹配，他与 WildcardMatch 相似，但他要求至少一个字符，
并且可以匹配到被引号包含起来的含空格的字符串。

例如，有一个 Twilight：

``` python
Twilight(
    [
        FullMatch("歌词").space(SpacePolicy.FORCE),
        "lyrics" @ ParamMatch().space(SpacePolicy.FORCE),
        FullMatch("好耶"),
    ],
)
# 上面的等价于下面这个
Twilight.from_command("歌词 {lyrics} 好耶")
```

那么，这个 Twilight 可以成功匹配到下面这几种字符串：

- `歌词 我有一只小毛驴我从来都不骑 好耶`
- `歌词 "我有一只小毛驴 我从来都不骑" 好耶`
- `歌词 '我有一只小毛驴 我从来都不骑' 好耶`

但无法匹配到以下的字符串：

- `歌词 我有一只小毛驴 我从来都不骑 好耶`
- <code>歌词 &#96;我有一只小毛驴 我从来都不骑&#96; 好耶</code> ： <code>&#96;</code> 不是引号
- `歌词 “我有一只小毛驴 我从来都不骑” 好耶` ： 不包含中文引号
- `歌词 ‘我有一只小毛驴 我从来都不骑’ 好耶` ： 不包含中文引号
- `歌词 [我有一只小毛驴 我从来都不骑] 好耶` ： 括号不是引号
- `歌词 {我有一只小毛驴 我从来都不骑} 好耶` ： 括号不是引号
- `歌词 【我有一只小毛驴 我从来都不骑】 好耶` ： 括号不是引号

::: warning
请注意，此处的的引号仅指 **竖直** 的引号，即 `"` 与 `'`，不包含以下几种引号/符号：

- `“`
- `”`
- `‘`
- `’`
- <code>&#96;</code>：重音符 / 钝音符 / 抑音符
- `ˊ`：尖音符 / 锐音符
- `´`
:::

### ArgumentMatch

ArgumentMatch 是 Twilight 的一大亮点，他可以像一般的命令行程序一样，
识别诸如 `-t group` 及 `--type member` 这样的命令格式。

<Loading></Loading>

## 6.4 参数分配与 `MatchResule`

既然 Twilight 有这么多种 Match，而且我们搞这么麻烦用没有意义呢？

**当然有！**我们可以通过**参数分配**及 `MatchResule` 来获取每一个 Match 的匹配结果，
这样就可以省去非常多的我们自己解析消息参数的时间和步骤了。

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<Loading></Loading>

::: interlink
**相关链接：**<https://graia.readthedocs.io/advance/twilight/>
:::
