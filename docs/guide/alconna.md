# Alconna

::: tsukkomi 注
本章节由 `Alconna` 作者本人编辑，所以你将会看到

- 令人窒息的浓度
- 画风突变的标题
- 意义不明的日语翻译 ~~熟肉反生~~
:::

`Alconna`，全称 [`Arclet-Alconna`](https://github.com/ArcletProject/Alconna)，
是由 [`Arclet Project`](https://github.com/ArcletProject) 维护的一个功能强大的 **命令** 解析器，
简单一点来讲就是杂糅了多种 CLI 模块 (如 `click`、`fire`等) 风格的命令解析库 (迫真)。

::: tip TIPS

1. `Alconna` 由两个[尼希语](http://tieba.baidu.com/p/7268094994) 单词组成，`alco` 和 `conna`
2. `ArcletProject` 是一个新生社区，欢迎各位来[交流♂](https://jq.qq.com/?_wv=1027&k=PUPOnCSH)

:::

## 凡事都要先安装

::: tip
假设你之前安装 Ariadne 时用的是以下 3 种选项中的一种，那么你可以直接跳过本小节。

- `graia-ariadne[full]`
- `graia-ariadne[alconna]`
- `graia-ariadne[graia,alconna]`
:::

:::: code-group
::: code-group-item poetry

```bash
# 顺便选一个输进去就完事了
poetry add arclet-alconna[graia]
poetry add arclet-alconna-graia
poetry add graia-ariadne[alconna]
```

:::
::: code-group-item pip

```bash
# 顺便选一个输进去就完事了
pip install arclet-alconna[graia]
pip install arclet-alconna-graia
pip install graia-ariadne[alconna]
```

:::
::::

## 缭乱！外星大魔王

开发涩涩Bot时，我们难免会有需求增加一个涩图搜索的命令：

```txt
setu搜索 CONTENT
```

这里我们规定用户输入的 `content` 参数只能是一个图片 (Image) 或者一个链接 (URL)。

我们默认使用 `saucenao` 的 api，但有时候我们也想使用别的搜图引擎而且能自定义参数：

```txt
use [saucenao|ascii2d|ehentai|iqdb|tracemoe] = saucenao
count <NUM:int>
threshold <VALUE:float>
timeout <SEC:int>
```

如果使用 Twilight 去做，选项之间的处理会比较复杂。

这个时候，~~天空一声巨响，Alconna 闪亮登场~~，我们可以使用 `Alconna` 来实现我们想要的功能：

```python
from arclet.alconna import Alconna, Args, Option
from graia.ariadne.message.element import Image

api_list = ["saucenao", "ascii2d", "ehentai", "iqdb", "tracemoe"]
SetuFind = Alconna(
  "setu搜索", Args['content':[Image, 'url']],
  options=[
    Option("use", Args['api':api_list:], help_text="选择搜图使用的 API"),
    Option("count", Args.num[int], help_text="设置每次搜图展示的最多数量"),
    Option("threshold", Args.value[float], help_text="设置相似度过滤的值"),
    Option("timeout", Args["sec":int:60], help_text="设置超时时间")
  ],
  help_text="依据输入的图片寻找可能的原始图片来源 Usage: 可以传入图片, 也可以是图片的网络链接; Example: setu搜索 [图片];"
)
```

如此，命令就创建好了。

接下来，在你的机器人中添加一个用来执行 `setu搜索` 命令的监听器：  
（**本章中如无特殊说明，所有版本号均指 `Ariadne` 的版本号，非 `Alconna` 的版本号**）

```python
...
from arclet.alconna.graia.dispatcher import AlconnaDispatcher, AlconnaProperty
from arclet.alconna.graia.saya import AlconnaSchema


@channel.use(AlconnaSchema(AlconnaDispatcher(alconna=SetuFind, help_flag="reply")))
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def ero(app: Ariadne, group: Group, result: AlconnaProperty):
    arp = result.result
    content = arp.content
    used_api = arp.query("use.api")
    max_count  = arp.query("count.num")
    similarity  = arp.query("threshold.args.value")
    timeout_sec = arp.query("timeout.sec")
    ...  # setu搜索的处理部分
...
```

准备就绪，对着你的机器人~~发情~~发号施令吧：

<ChatWindow title="聊天记录">
  <ChatMsg name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">setu搜索 <img src="/images/guide/ero_pic_1.webp"/></ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp"><ChatQuote name="群菜鸮">setu搜索</ChatQuote>正在搜索，请稍后</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">工口发生~</ChatMsg>
  <ChatMsg name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">草</ChatMsg>
  <ChatMsg name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">草</ChatMsg>
  <ChatMsg name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">草</ChatMsg>
</ChatWindow>

`AlconnaDispatcher` 拥有参数 `help_flag`，表示对于该命令帮助信息的处理方式。其可以有三种值：

- `'stay'`: 不处理，原样返回，不能在监听器内获取到帮助信息
- `'reply'`: `AlconnaDispatcher` 会自动将帮助信息发送给命令发起者
- `'post'`: `AlconnaDispatcher` 会广播一个 `AlconnaHelpMessage` 事件，你可以通过监听该事件来自定义命令帮助行为

例如，当上例的 `help_flag` 为 `reply` 时，可以出现如下情况：

<ChatWindow title="聊天记录">
  <ChatMsg name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">setu搜索 --help</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">setu搜索 &lt;content:Image|url&gt;<br />
  依据输入的图片寻找可能的原始图片来源<br />
  用法:<br />
   可以传入图片, 也可以是图片的网络链接<br />
  可用的选项有:<br />
  # 选择搜图使用的 API<br />
    use &lt;api:'saucenao'|'ascii2d'|'ehentai'|'iqdb'|'tracemoe'&gt;<br />
  # 设置每次搜图展示的最多数量<br />
    count &lt;num:int&gt;<br />
  # 设置相似度过滤的值<br />
    threshold &lt;value:float&gt;<br />
  # 设置超时时间<br>
    timeout &lt;sec:int = 60&gt;<br />
  使用示例:<br />
   setu搜索 [图片]<br />
  </ChatMsg>
  <ChatMsg name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">好</ChatMsg>
</ChatWindow>

## 直面灾厄

~~左：莱塔尼亚权杖 右：荒地龙舌兰~~

要想写好一个 `Alconna`，你首先需要理清楚自己的**命令结构**。

一般，你需要把命令分为四个部分：

1. 命令名称：作为一个命令的标识符
2. 命令分隔符：一般是空格，作为参数之间的区分符号
3. 命令参数：一个命令所需求的主要参数，可以为空
4. 命令选项：为命令添加额外的解释参数，或以此选择命令的不同功能

::: tip
是的，Alconna 负责的并不是**消息链解析**，而是**命令解析**。
~~虽然说 Alconna 的实现攘括了消息链解析的功能~~
:::

在上述例子中，`setu搜索` 是命令名称，`<content>` 是命令参数，而剩下的 `count` 和 `use` 都是命令选项。

一个命令可以没有命令参数，但一定要有命令名称，这样才称得上健全！

若用一个类来比喻的话，命令参数就是 `__init__` 方法的参数，命令名称就是 `Class.__name__`，命令选项则是该类下的所有类方法。

::: tip
`Alconna` 0.7.1 中加入了 `Fire-Like` 的构造方法，支持把传入的对象转换为 `Alconna` 命令。

```python
from arclet.alconna import AlconnaFire

def test_func(name: str, sender_id: int):
    print(f"Hello! [{sender_id}]{name}")

alc = AlconnaFire(test_func)
```

:::

### 使用模糊匹配

模糊匹配是 Alconna 0.8.0 中新增加的特性，通过在 Alconna 中 设置 `is_fuzzy_match=True` 开启。

模糊匹配会应用在任意需要进行名称判断的地方，如**命令名称**，**选项名称**和**参数名称**（如指定需要传入参数名称）。

```python{3}
from arclet.alconna import Alconna

alc = Alconna("test_fuzzy", is_fuzzy_match=True)
alc.parse("test_fuzy")

# output: test_fuzy is not matched. Do you mean "test_fuzzy"?
```

### 自定义语言文件

语言配置是 Alconna 0.8.3 中新增加的特性，为用户提供了自定义报错/输出的接口。

您可以通过 `Alconna.load_config_file` 直接更新配置，也可以通过 `Alconna.lang_config.change_lang` 对单一文本进行修改。

```python
from arclet.alconna import Alconna, lang_config, Option

alc = Alconna("!command", is_raise_exception=True) + Option("--bar", "foo:str")
lang_config.change_lang(
    "analyser.param_unmatched",
    "以下参数没有被正确解析哦~\n: {target}\n请主人检查一下命令是否正确输入了呢~",
)
alc.parse("!command --baz abc")

'''
output:

ParamsUnmatched: 以下参数没有被正确解析哦~
: --baz
请主人检查一下命令是否正确输入了呢~
'''
```

## 亮出你的本事吧！外星人

> **「やってみせろよ、ウチュウジンー！」**

### 创建 Alconna

以下将展示 Alconna 创建的 5 种方式：

:::: code-group
::: code-group-item typical

```python{6,12}
...
from arclet.alconna import Args
from arclet.alconna.graia import AlconnaDispatcher
...

alc = Alconna("我要涩图", Args["count":int])


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item String

```python{6,12}
...
from arclet.alconna import AlconnaString
from arclet.alconna.graia import AlconnaDispatcher
...

alc = AlconnaString("我要涩图 <count:int>")


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Format

```python{6,12}
...
from arclet.alconna import AlconnaFormat
from arclet.alconna.graia import AlconnaDispatcher
...

alc = AlconnaFormat("我要涩图 {count}", {"count": int})


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Decorate

```python{6,9-12,18}
...
from arclet.alconna import AlconnaDecorate
from arclet.alconna.graia import AlconnaDispatcher
...

cli = AlconnaDecorate(loop=loop)


@cli.build_command("我要涩图")
@cli.argument(Args["count":int])
def setu(count: int):
    ...


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=setu.command)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Fire

```python{7-10,13,19}
...
from arclet.alconna import AlconnaFire
from arclet.alconna.graia import AlconnaDispatcher
...


def give_me_setu(count: int):
    class Config:
        command=我要涩图
    ...


alc = AlconnaFire(give_me_setu)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::::

### 代码解析

上面的代码中展示了五种 Alconna 的创建方式。

下面我们将一一说明这五种方法的细节。

#### 标准形式：直接使用 `Alconna(...)`

在**标准形式**中，你需要传入较多的命令组件，但同时其可以清晰地表达命令结构。

目前的命令组件有`Option`、`Subcommand` 与 `Args`。

这样创建的 Alconna 实例又长什么样呢？让我们来看一看：

```python
>>> Alconna(
...     command="我要涩图",
...     main_args=Args["count":int],
...     options=[
...         Option("从", Args["tag;S":str])
...     ]
... )
<Alconna::我要涩图 with 3 options; args=Args('count': '(\-?\d+)')>
```

`command`传入的便是命令名称，`main_args` 是命令参数，`options` 则是命令选项。

`Args`是命令参数的载体，通过"键-值-默认"传入一系列参数，具体食用方法我们后面会讲到。

:::tip
为什么会有三个 option 呢？因为所有的 Alconna 都内置了 `--help` 与 `--shortcut` 这两个选项。
:::

::: tsukkomi 注
Alconna 0.7.6 后，简易的命令构造可用如下方法：

```python
>>> alc = Alconna("我要涩图", Args.count[int]) + option("--from", "tag;S:str")
```

即可以省略 `command` 与 `main_args` 关键字，并且用 `+` 增加选项或子命令。

:::

#### Koishi-like：使用 `AlconnaString(...)`

在**koishi-like**方法中，你可以用类似 `koishi` 中编写命令的格式来构造 Alconna

上面的例子中，我们可以给他输入这样一串字符串：`我要涩图 2 从 纯爱 兽耳`

这条字符串的意思就是，我们需要一条命令，
该命令以“**我要涩图**”作为前缀，同时他还需要一个参数，其以 `count` 为名字，并且类型为 `int`,
然后还需要一个选项，其名称为“**从**”，需要不定个参数，其以 `tag` 为名字，并且每个参数类型为 `str`。

于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaString("我要涩图 <count:int>", "从 <tag;S:str>")
<Alconna::我要涩图 with 3 options; args=Args('count': '(\-?\d+)')>
```

可以看到，我们的 `<count:int>` 变成了 `Args['count':int]`。

::: tip
关于`koishi-like`的命令参数，请详细阅读 [命令参数](https://arcletproject.github.io/docs/alconna/basic/alconna-args) 与
[参数编写规则](https://arcletproject.github.io/docs/alconna/constructs/koishi-like#%E7%BC%96%E5%86%99%E8%A7%84%E5%88%99)
来编写
:::

#### Format：使用 `AlconnaFormat(...)`

在**format**方法中，你可以用 f-string 的格式来构造 Alconna。

仍以上面的命令为例，我们相当于输入了这样一串字符串：`我要涩图 {count} 从 {*tags}`
于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaFormat("我要涩图 {count:int} 从 {tags;S}", {"tags;S": str})
<Alconna::我要涩图 with 3 options; args=Args('count': 'AnyParam')>
```

#### Fire-Like：使用 `AlconnaFire(...)`

Fire-like 允许你传入任意的参数(主要是函数、类、实例、模块)，`Alconna` 会尝试提取命令相关参数，
并构建为 `Alconna`。

仍以上面的命令为例，我们相当于构造了一个类 `Class:我要涩图`，其需要传入 `count` 参数来实例化,
并写有一个方法 `从`，该方法接受一个不定参数 `tags;S`。
于是我们就得到了如下的 Alconna 实例：

```python
>>> class Setu:
...     def __init__(self, count:int):
...         self.count = count
...     def 从(self, *tags: str):
...         ...
...
>>> AlconnaFire(Setu, config={"command": "我要涩图"})
<Alconna::我要涩图 with 3 options; args=Args('count': '(\-?\d+)')>
```

### 组件

命令玩的好，组件少不了~

`Alconna` 拥有两大组件：`Option` 与 `Subcommand`。

**Option**

`Option` 可以传入一组 `alias`：

```python
Option("--foo", alias=["-F", "--FOO", "-f"])
```

那么`-f`、`-F` 与 `--FOO`将等同于`--foo`。

**Subcommand**

`Subcommand` 可以传入自己的 `Option`：

```python
Subcommand("sub", options=[Option("sub_opt")])
```

此时`sub_opt`必须在`sub`被输入时才算作合法选项，即：

- `sub ... sub_opt ...` ✔
- `sub_opt ... sub ...` ❌

## 总会有参数的

> **「何とでもなるはずだパラメータ！」**

### Args

`Args` 在 Alconna 中有非常重要的地位，有一半的 bug 皆因其引发（暴论）。

通常以 `Args[key1:var1:default1, key2:var2, ...]` 的方式构造一个 Args。

其中，key 一定是字符串，而 var 一般为参数的类型，default 为具体的值。

#### var

var 可以是以下几类：

- 存在于 `arclet.alconna.types.pattern_map` 中的类型/字符串，用以替换为预制好的 BasePattern
- 字符串，会转换为正则表达式
- 列表，其中可存放 BasePattern、类型或者任意参数值，如字符串或者数字
- `Union`、`Optional`、`Literal` 等会尝试转换为 `List[Type]`
- `Dict[type1，type2]`、`List[type]`、`Set[type]`
- 一般的类型，其会尝试比较传入参数的类型是否与其相关
- AnyOne，AllParam，作为泛匹配的标识符

内置的类型检查包括 `int`、`str`、`float`、`bool`、`'url'`、`'ip'`、`'email'`、`list`、`dict`、`tuple`、`set`、`Any` 、 `bytes`、`hex` 等。

:::tip NOTE
若想增加类型检查,我们可以通过 `arclet.alconna.typing.set_converter` 传入自己的 ArgPattern：

```python
>>> set_converter(
...     BasePattern(
...         "app", PatternModel.REGEX_CONVERT, Ariadne, lambda x: app, 'app'
...     )
... )
```

或通过`arclet.alconna.typing.ObjectPattern`并传入一个类型来向 pattern_map 中注册检查类型：

```python
ObjectPattern(Image, limit=("url",))
```

:::

#### key

`key`的作用是用以标记解析出来的参数并存放于 Arpamar 中,以方便用户调用。

其有七种为 Args 注解的标识符,为 `S`、`W`、`A`、`F`、`K`、`O` 和 `H`。标识符应与 key 以 `;` 分隔，用 `'|'` 区分：

- `S` 标识符表示当前参数为可变长非键值对参数，类似函数中的 `*args`，可以传入 0 至任意个参数。
- `W` 标识符表示当前参数为可变长键值对参数，类似函数中的 `**kwargs`，可传入 0 至任意个参数。
- `A` 标识符表示该处传入的参数应不是规定的类型，或不在指定的值中。
- `F` 标识符表示该参数的类型不经过类型转换。
- `K` 标识符表示该参数需要键值对匹配，即 `key=var` 的形式。
- `O` 标识符表示该参数为可选参数，会在无参数匹配时跳过。
- `H` 标识符表示该参数的类型注解需要隐藏。

另外，正整数也是可以作为标识符的，其会作为 `S` 的限制性操作。如 `key;3` 表示需要传入 0 至 3 个参数。

### BasePattern

`BasePattern` 是 `Alconna` 中对正则解析的拓展，负责对传入参数的检查与类型转换。

例如我想把如 `'sth1/sth2/sth3/sth4'` 的参数在解析后变成类似 `['sth1', 'sth2', 'sth3', 'sth4']` 这样子。

那么我可以这样编写一个 BasePattern：

```python
from arclet.alconna.typing import BasePattern, PatternModel

my_list = BasePattern(
    "(.+)", model=PatternModel.REGEX_CONVERT, origin_type=list,
    converter=lambda x: x.split('/'), alias='my_list'
)
```

或者

```python
from arclet.alconna import pattern_gen


@pattern_gen("my_list", "(.+)")
def my_list(text: str):
    return text.split('/')
```

并在创建 Alconna 时使用：

```python
...
alc = Alconna(".command", Args["foo":my_list])
```

此时输入 `'.command usr/bin/python'`，则 `foo` 将被解析为 `['usr', 'bin', 'python']`

### Arpamar

`Alconna.parse` 会返回由 `Arpamar` 承载的解析结果。

`Arpamar` 会有如下参数：

- 调试类
  - matched: 是否匹配成功
  - head_matched: 命令头部是否匹配成功
  - error_data: 解析失败时剩余的数据
  - error_info: 解析失败时的报错信息

- 分析类
  - main_args: 命令的主参数的解析结果
  - options: 命令所有选项的解析结果
  - subcommands: 命令所有子命令的解析结果
  - other_args: 除主参数外的其他解析结果
  - all_matched_args: 所有 Args 的解析结果
  - header: 当命令头部填入有效表达式时的解析结果

老规矩，直接上实例：

```python
...
from arclet.alconna import Alconna, Args, Option, Subcommand, Arpamar
from arclet.alconna.graia.dispatcher import AlconnaDispatcher
from arclet.alconna.graia.saya import AlconnaSchema
...


@channel.use(
  AlconnaSchema(
    AlconnaDispatcher(
      alconna=Alconna(
        "找歌", Args["song":str],
        options=[
          Option("语种", Args["lang":str]),
          Subcommand("歌手", [Option("地区", Args["region":str])], Args["singer":str]),
        ],
      ),
      help_flag='reply'
    )
  )
)
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def lyric_xxx(app: Ariadne, group: Group, result: Arpamar):
    print(result.matched)
    print(result.error_info)
    print(result.options)
    print(result.song)
    if result.find("语种"):
        print(result.query("语种.lang"))
    if result.find("歌手"):
        print(result.query("歌手.singer"))
```

### Arpamar Behavior

`ArpamarBehavior` 是负责解析 `Arpamar` 行为的类，用来更精细的预处理结果。

`Alconna` 目前预制了三种 `Behavior`，分别用来：

- `set_default`: 当某个选项未被输入时，使用该行为添加一个默认值
- `exclusion`: 当指定的两个选项同时出现时报错
- `cool_down`: 限制命令调用频率

```python
from arclet.alconna import Alconna, cool_down, Args

alc2 = Alconna(
    "test_cool_down",
    main_args=Args["bar":int],
    behaviors=[cool_down(0.2)]
)

for i in range(4):
    time.sleep(0.1)
    print(alc2.parse("test_cool_down {}".format(i)))

>>> matched=False, head_matched=True, error_data=[], error_info=操作过于频繁
>>> matched=True, head_matched=True, main_args={'bar': 1}
>>> matched=False, head_matched=True, error_data=[], error_info=操作过于频繁
>>> matched=True, head_matched=True, main_args={'bar': 3}
```

### AlconnaDuplication

`AlconnaDuplication` 用来提供更好的自动补全，经测试表现良好（好耶）。

普通情况下使用，需要利用到 `ArgsStub`、`OptionStub` 和 `SubcommandStub` 三个部分，

仍以上方命令为例，其对应的 `Duplication` 应如下构造：

```python
from arclet.alconna import AlconnaDuplication, ArgsStub, OptionStub

class MyDup(AlconnaDuplication):
    my_args: ArgsStub
    从: OptionStub  # 选项与子命令对应的stub的变量名必须与其名字相同
```

并在解析时传入`Duplication`：

```python
result = alc.parse("我要涩图 2", duplication=MyDup)
>>> type(result)
<class MyDup>
```

:::tip

同样，在 `AlconnaDispatcher` 中也可以使用 `Duplication`，你只需要如下操作：

```python{10}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group, dup: MyDup):
    print(dup.my_args.availabe)
```

亦或者，你可以直接使用 `Stub` 作为参注解：

```python{10}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=alc)],
    )
)
async def test(app: Ariadne, group: Group, y_args: ArgsStub):
    print(my_args.availabe)
```

:::

## 居然是整活？

> **「コッケイナだと！」**

### 元素匹配

一定要记住，Alconna 是支持元素匹配的（Plain 元素或 Source 等元素除外）。

假设某个命令需要传入名字，但你也想能够直接用 @ 来指定目标, 那么可以直接这么写：

```python{6}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    "发病",
    Args["target":[At, str]],
    headers=["EroEro", "!"],
)
```

### At 机器人来使用命令

At 等元素同样可以放置于 headers 里，但必须是实例化的对象，不能传入类型：

```python{7}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    "发病",
    Args["target":[At, str]],
    headers=[At(123456789)],
)
```

此时你需要输入 `@123456789 发病 xxxx` 才能执行命令

### 快捷指令

基于对传入消息的记录，Alconna 0.9.0 以上支持动态的快捷指令构建：

```text
>>> my_command --shortcut XXX "my_command foo bar ..."
```

或者

```text
>>> my_command foo bar ...
>>> my_command --shortcut XXX
```

:::tip

该方法构建的快捷指令在 bot 生命周期结束后会一并销毁，但可以通过 Alconna 的 `CommandManager` 来保存：

```python
from pathlib import Path
from arclet.alconna import command_manager

...
command_manager.cache_path = Path(__file__).parent / "my_cache.db"
command_manager.dump_cache()
```

:::

### 不规则命令

Alconna 对于命令头部 `command` 应用有特殊的构建规则。

其可以像 `AlconnaFormat` 那样通过 `'xxx{name:type or pattern}xxx'` 来生成正则表达式，并将匹配结果传递给 `Arpamar.header`。

其中 `name` 与 `type` 都可以留空, `type` 留空时当作`'str'`。

类似 `.r100` 或者 `查询XX人品` 的指令，这么写就好了：

```python{4}
from arclet.alconna import Alconna, Arpamar
from arclet.alconna.graia import AlconnaDispatcher

dice = Alconna(".r{dice:int}")


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=dice)],
    )
)
async def roll_dice(app: Ariadne, group: Group, result: Arpamar):
    dice_count = result.header.get('dice')
    print(dice_count)
    ...
```

### 自定义分隔符

你可以传入一个 `separator` 的参数，来作为命令参数之间的分隔符。

类似 `告诉我 谁是xxx和xxx` 的指令，这么写就好了：

```python{4}
from arclet.alconna import Alconna, Option, Arpamar, Args
from arclet.alconna.graia import AlconnaDispatcher

who = Alconna("告诉我") + Option("谁", Args['target;S':str] / "和", separator="是")

@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alconna=who)],
    )
)
async def find(app: Ariadne, group: Group, result: Arpamar):
    targets = result.target
    print(targets)
    ...
```

### 隐式构建 Args

在 Alconna 0.7.2 后，args 可以由传入的 action 生成：

```python
from arclet.alconna import Alconna


def test(foo: str, bar: int, baz: bool):
    ...

tes = Alconna("command", action=test)
print(tes.args)

>>> "Args('foo': '(.+?)', 'bar': '(\-?\d+)', 'baz': '(True|False|true|false)')"
```

在 Alconna 0.7.3 后，args 可以传入一个符合规则的字符串，其会尝试转换为 Args。

```python{3}
from arclet.alconna import Alconna

tes = Alconna("command", main_args="foo:str, bar:int, baz:bool")
print(tes.args)

>>> "Args('foo': '(.+?)', 'bar': '(\-?\d+)', 'baz': '(True|False|true|false)')"
```

### 减少 Option 的使用

利用 `K` 与 `O` 前缀，我们可以在 Args 中模拟出一个 option：

```python{3}
from arclet.alconna import Alconna, Args

alc = Alconna("cut_img", Args["--width;O|K":int:1280, "--height;O|K":int:720])
alc.parse("cut_img --height=640")

>>> matched=True, head_matched=True, main_args={"--width": 1280, "--height":640}
```

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<Loading></Loading>

::: interlink
**相关链接:**  
<https://graia.readthedocs.io/advance/alconna/quickstart/>  
<https://arcletproject.github.io/docs/alconna/tutorial>
:::
