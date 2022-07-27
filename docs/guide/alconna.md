# Alconna

::: tsukkomi 注
本章节由 **Alconna** 作者本人编辑，所以你将会看到

- 令人窒息的浓度
- 画风突变的标题
- 意义不明的日语翻译 ~~熟肉反生~~

不过放心，梗都有相关注释<Curtain type="tsukkomi">什么梗百科</Curtain>

> [**「わかります。」**](https://zh.moegirl.org.cn/%E9%95%BF%E9%A2%88%E9%B9%BF(%E5%B0%91%E5%A5%B3%E6%AD%8C%E5%89%A7))
:::

**Alconna**，全称 [**Arclet-Alconna**](https://github.com/ArcletProject/Alconna)，
是由 [**Arclet Project**](https://github.com/ArcletProject) 维护的一个功能强大的 **命令** 解析器，
简单一点来讲就是杂糅了多种 CLI 模块（如 `click`、`fire` 等）风格的命令解析库（迫真）。

::: tip TIPS

1. **Alconna** 由两个[尼希语](http://tieba.baidu.com/p/7268094994) 单词组成，`alco` 和 `conna`
2. **ArcletProject** 是一个新生社区，欢迎各位来[交流♂](https://jq.qq.com/?_wv=1027&k=PUPOnCSH)

:::

## 凡事都要先安装

::: tip
假设你之前安装 **Ariadne** 时用的是以下 3 种选项中的一种，那么你可以直接跳过本小节。

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

## [缭乱！外星大魔王](https://zh.moegirl.org.cn/%E7%BC%AD%E4%B9%B1!Victory_Road)

开发涩涩Bot时，我们难免会有需求增加一个涩图搜索的命令：

```txt
setu搜索 CONTENT
```

这里我们规定用户输入的 `content` 参数只能是一个图片（Image）或者一个链接（URL）。

我们默认使用 **SauceNAO** 的 api，但有时候我们也想使用别的搜图引擎而且能自定义参数：

```txt
use API:[saucenao|ascii2d|ehentai|iqdb|tracemoe] = saucenao
count NUM:int
threshold VALUE:float
timeout SEC:int
```

如果使用 **Twilight** 去做，选项之间的处理会比较复杂。

这个时候，~~天空一声巨响，Alconna 闪亮登场~~，我们可以使用 **Alconna** 来实现我们想要的功能：

```python
from arclet.alconna import Alconna, Args, Option
from arclet.alconna.graia.utils import ImgOrUrl

api_list = ["saucenao", "ascii2d", "ehentai", "iqdb", "tracemoe"]
SetuFind = Alconna(
    "setu搜索", 
    Args['content', ImgOrUrl],
    options=[
        Option("use", Args['api', api_list], help_text="选择搜图使用的 API"),
        Option("count", Args.num[int], help_text="设置每次搜图展示的最多数量"),
        Option("threshold", Args.value[float], help_text="设置相似度过滤的值"),
        Option("timeout", Args["sec", int, 60], help_text="设置超时时间")
    ],
    help_text="依据输入的图片寻找可能的原始图片来源 Usage: 可以传入图片, 也可以是图片的网络链接; Example: setu搜索 [图片];"
)
```

如此一来，一个命令就创建好了。

接下来，在你的机器人中添加一个用来执行 `setu搜索` 命令的监听器：

```python
from arclet.alconna.graia import AlconnaDispatcher, Match, Query, match_value, command
from graia.ariadne.util.saya import listen, dispatch, decorate


@listen(GroupMessage)
@dispatch(AlconnaDispatcher(SetuFind, send_flag="reply"))
@decorate(match_value("use.api", "saucenao", or_not=True))
async def ero_saucenao(
    app: Ariadne, 
    group: Group, 
    content: Match[str], 
    max_count: Query[int] = Query("count.num"),
    similarity: Query[float] = Query("threshold.args.value"),
    timeout_sec: Query[int] = Query("timeout.sec", -1)
): 
    ...  # setu搜索的处理部分，使用saucenao


@listen(GroupMessage)
@dispatch(AlconnaDispatcher(SetuFind, send_flag="reply"))
@decorate(match_value("use.api", "ascii2d"))
async def ero_ascii2d(
    app: Ariadne, 
    group: Group, 
    content: Match[str], 
    max_count: Query[int] = Query("count.num"),
    similarity: Query[float] = Query("threshold.args.value"),
    timeout_sec: Query[int] = Query("timeout.sec", -1)
): 
    ...  # setu搜索的处理部分，使用ascii2d
```

准备就绪，对着你的机器人~~发情~~发号施令吧：

<ChatWindow title="聊天记录">
  <ChatMsg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">
    setu搜索<br />
    <img style="margin-top: 5px" src="/images/guide/ero_pic_1.webp"/>
  </ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp"><ChatQuote name="群菜鸮">setu搜索</ChatQuote>正在搜索，请稍后</ChatMsg>
  <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">工口发生~</ChatMsg>
  <ChatMsg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">草</ChatMsg>
  <ChatMsg name="群菜鸡" avatar="https://q4.qlogo.cn/g?b=qq&nk=1450069615&s=640">草</ChatMsg>
  <ChatMsg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">草</ChatMsg>
</ChatWindow>

**AlconnaDispatcher** 拥有参数 `send_flag`，表示对于该命令存在的输出文本的处理方式。其可以有三种值：

- `'stay'`: 不处理，原样返回，不能在监听器内获取到输出信息
- `'reply'`: `AlconnaDispatcher` 会自动将输出信息发送给命令发起者
- `'post'`: `AlconnaDispatcher` 会广播一个 `AlconnaOutputMessage` 事件，你可以通过监听该事件来自定义输出文本的处理方法

例如，当上例的 `send_flag` 为 `reply` 时，可以出现如下情况：

<ChatWindow title="聊天记录">
  <ChatMsg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">setu搜索 --help</ChatMsg>
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
  <ChatMsg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">好</ChatMsg>
</ChatWindow>

## [直面灾厄](https://zh.moegirl.org.cn/%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F/%E9%9B%86%E6%88%90%E6%88%98%E7%95%A5/%E5%82%80%E5%BD%B1%E4%B8%8E%E7%8C%A9%E7%BA%A2%E5%AD%A4%E9%92%BB#%E9%9A%BE%E5%BA%A6%E5%88%86%E7%BA%A7)

~~左：莱塔尼亚权杖 右：荒地龙舌兰~~

要想写好一个 Alconna，你首先需要理清楚自己的**命令结构**。

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

一个命令可以没有命令参数，但一定要有命令名称，这样才称得上健全.jpg

若用一个类来比喻的话，命令参数就是 `__init__` 方法的参数，命令名称就是 `Class.__name__`，命令选项则是该类下的所有类方法。

::: tip
Alconna 0.7.1 中加入了 **Fire-Like** 的构造方法，支持把传入的对象转换为 Alconna 命令。

```python
from arclet.alconna import AlconnaFire


@AlconnaFire
def test_func(name: str, sender_id: int):
    print(f"Hello! [{sender_id}]{name}")


test_func.parse(...)
```

:::

### 配置

Alconna 有两类配置, 分别是 `arclet.alconna.config` 和 `arclet.alconna.Alconna.config`

`config` 是一个单例，可以控制一些全局属性，如：

```python{3-4}
from arclet.alconna import config

config.fuzzy_threshold = 0.6 # 设置模糊匹配的阈值
config.enable_message_cache = False # 设置是否开启缓存机制
```

`Alconna.config` 则是类方法，可以设置默认属性，如：

```python{4-5}
from arclet.alconna import Alconna, ArgParserTextFormatter

Alconna.config(
    headers=["/"],  # 设置 headers 默认为 “/”
    formatter_type=ArgParserTextFormatter  # 设置 formatter 默认为 ArgParserTextFormatter
)
```

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

```python{4-7}
from arclet.alconna import Alconna, config, Option

alc = Alconna("!command", is_raise_exception=True) + Option("--bar", "foo:str")
config.lang.change_lang(
    "analyser.param_unmatched",
    "以下参数没有被正确解析哦~\n: {target}\n请主人检查一下命令是否正确输入了呢~\n不然给你一招雪菜猩红风暴~",
)
alc.parse("!command --baz abc")

'''
output:

ParamsUnmatched: 以下参数没有被正确解析哦~
: --baz
请主人检查一下命令是否正确输入了呢~
不然给你一招雪菜猩红风暴~
'''
```

(~~[你毫无疑问是个雪菜推呢~](https://zh.moegirl.org.cn/LoveLive!%E7%B3%BB%E5%88%97#%E6%B5%81%E8%A1%8C%E7%9A%84%E6%A2%97)~~<Curtain><a href="https://zh.moegirl.org.cn/%E4%B8%8A%E5%8E%9F%E6%AD%A5%E6%A2%A6" target="_blank">大西亚步梦</a>：诶</Curtain>
)

### 命令组

**命令组**允许不同的指令经过同一入口解析，适合用于**命令结构相似**并且**参数名称相同**的命令。

构造命令组可直接使用 `|` 操作符：

```python{3}
from arclet.alconna.core import Alconna

alc = Alconna("{place1}在哪里") | Alconna("哪里有{place1}")
alc.parse("食物在哪里")
```

或者使用 `AlconnaGroup`：

```python{3}
from arclet.alconna.core import Alconna, AlconnaGroup

alc = AlconnaGroup("test", Alconna("{place1}在哪里"), Alconna("哪里有{place1}"))
alc.parse("食物在哪里")
```

命令组的解析表现与单个命令的行为基本一致，若全部命令解析失败则返回最后一个命令的解析结果。

## [Kirakira☆dokidoki的Dispatcher](https://zh.moegirl.org.cn/index.php?search=Kirakira+Dokidoki&title=Special:%E6%90%9C%E7%B4%A2&searchToken=9hyop5qg906tdzfb9wltw6slt)
 
在 **Ariadne** 中，你可以通过使用 **AlconnaDispatcher** 来提供消息处理服务：

```python{6}
from arclet.alconna.graia import AlconnaDispatcher, Alconna


@app.broadcast.receiver(
    GroupMessage, 
    dispatchers=[AlconnaDispatcher(Alconna(...))]
)
async def _(app: Ariadne, group: Group, result: Arpamar):
    ...
```

**AlconnaDispatcher** 目前有如下参数：
- `alconna`: `Alconna`本体
- `send_flag`: 输出文本的行为，默认为`stay`，可选值为`reply`或`post`
- `skip_for_unmatch`: 当收到的消息不匹配`Alconna`时是否跳过，默认为`True`
- `allow_quote`: 当收到的消息是用户回复时，是否继续解析，默认为`False`
- `send_handler`: 对输出文本的处理函数

若 `send_flag` 选择 `reply`，则 `AlconnaDispatcher` 会自动将输出信息发出。
若 `send_flag` 选择 `post`，则 `AlconnaDispatcher` 会利用 `Broadcast` 广播一个事件，并将输出信息作为参数发出。


### 参数标注

**AlconnaDispatcher** 可以分配以下几种参数：
- `Alconna`: 使用的 `Alconna` 对象
- `Arpamar`: `Alconna` 生成的数据容器
- `AlconnaProperty`: `AlconnaDispatcher` 返回的特殊对象，可以获取：
    - `help_text`: 可能的帮助信息
    - `result`: `Arpamar`
    - `source`: 原始事件
- 匹配项，如 `Match`
- `Duplication`: `Alconna` 提供的良好的类型补全容器
- 匹配的参数，必须保证参数名与参数类型与解析结果中的一致，如`content: str`
- etc.

### 与 Saya 配合使用

`Alconna-Graia` 在 0.0.12 更新了 **Saya** 相关的部分, 包括 **AlconnaSchame** 与 **AlconnaBehaviour**，如下例：

首先，在 `main.py` 中记得创建一个 **AlconnaBehaviour** 并在 Saya 中注册，此处使用 **creart** 完成相关操作：

```python
...
from arclet.alconna.graia.saya import AlconnaSchema, AlconnaBehaviour
from arclet.alconna.graia.dispatcher import AlconnaDispatcher
from arclet.alconna import Alconna, Arpamar
from graia.saya.builtins.broadcast import ListenerSchema
from graia.saya import Saya
from creart import create
...

...
saya = create(Saya)
create(AlconnaBehaviour)
...
```

然后是单个模块中的用法：

```python
channel = Channel.current()


@channel.use(AlconnaSchema(AlconnaDispatcher(Alconna("test1", "foo:int"))))
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def _(app: Ariadne, res: Arpamar):
    ...


@channel.use(AlconnaSchema.from_("test2 <foo:int>"))
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def _(app: Ariadne, res: Arpamar):
    ...
```

:::tip

近几次更新后已经不需要 **AlconnaSchema** 来负责管理命令，即直接使用 **AlconnaDispatcher** 即可。

所以更推荐使用 **SayaUtil**：

```python{5-6}
from graia.ariadne.util.saya import listen, dispatch
from arclet.alconna.graia import AlconnaDispatcher, Alconna


@listen(GroupMessage)
@dispatch(AlconnaDispatcher(Alconna(...)))
async def _(app: Ariadne, result: Arpamar):
    ...
```

或者 `arclet-alconna-graia` 自带的 SayaUtil 组件 **command**：

```python{4}
from arclet.alconna.graia import command, Alconna


@command(Alconna(...), private=False, send_error=True)
async def _(app: Ariadne, result: Arpamar):
    ...
```

该情况默认使用 `reply` 的 send_flag。

:::

### 匹配项

`arclet-alconna-graia` 提供两个特殊类以匹配参数：

- `Match`: 查询某个参数是否匹配，如 `foo: Match[int]`。使用时以 `Match.available` 判断是否匹配成功，以
  `Match.result` 获取匹配结果。
- `Query`: 查询某个参数路径是否存在，如`sth: Query[int] = Query("foo.bar")`；可以指定默认值如
  `Query("foo.bar", 1234)`。使用时以 `Query.available` 判断是否匹配成功，以 `Query.result` 获取匹配结果。


### 特殊事件

当 **AlconnaDispatcher** 的 `send_flag` 为 `post` 时，其会通过 bcc 广播一个 **AlconnaOutputMessage** 事件。

该事件可获取的参数如下：
- `help_string`(str): 可能的帮助信息
- `alconna` (Alconna): 该帮助信息对应的命令
- `sender`, `message`, `app`, ...: 从源消息事件中可获取的所有参数

### 特殊类型

`arclet-alconna-graia` 提供了几个特定的 `Args` 类型：
- `ImgOrUrl`: 表示匹配一个 **Image** 消息元素或者是代表图片链接的字符串，匹配结果是图片的链接（str）
- `AtID`: 表示匹配一个 **At** 消息元素或者是 `@xxxx` 式样的字符串或者数字，返回数字（int）

### 特殊装饰器

`arclet-alconna-graia` 提供了几个特定的 **Depend** 装饰器，如下所示：

#### fetch_name

`fetch_name` 是有头的装饰器，负责在机器人功能需要指令发送者提供名字时自动处理名称。

假设某个指令如下：

```python
Alconna("发病", Args["name", [str, At], ...])
```

我们希望若指令的 `name` 存在时，`name` 是字符串则直接使用，是 `At` 则用 at
的对象的名称，否则使用发送者的名称，那么仅使用 `fetch_name` 即可：

```python
from arclet.alconna.graia import fetch_name, command


@command(Alconna(...), private=False)
async def _(app: Ariadne, group: Group, name: str = fetch_name("name")):
    ...
```

`fetch_name` 的参数 `path` 表示可能作为名称参数的参数名字，默认为`"name"`。

:::tip

`fetch_name` 直接作为默认值可能会引起某些类型检查器愤怒（是谁呢？一定不是**pylance**吧）

所以推荐使用 **SayaUtil** 的 **decorate**：

```python{6}
from arclet.alconna.graia import fetch_name, command
from graia.ariadne.util.saya import decorate


@command(Alconna(...), private=False)
@decorate({"name": fetch_name()})
async def _(app: Ariadne, group: Group, name: str):
    ...
```

:::

#### match_path

`match_path` 用以在命令存在功能细化时帮助解析结果分发到具体的监听器上

假设命令如下：

```python
Alconna(
    "功能",
    options=[
        Option("列出"),
        Option("禁用"),
        Option("启用")
    ]
)
```

`列出`、`禁用`、`启用` 以及什么都不做是该命令可能的四种细分的功能。你当然可以把处理部分堆在一个监听器内，如：

```python
from arclet.alconna.graia import command

cmd = Alconna(...)


@command(cmd, private=False)
async def handler(app: Ariadne, group: Group, result: Arpamar):
    if not result.components:
        return await app.send_group_message(group, MessageChain(result.source.get_help()))
    if result.find("列出"):
        ...
        return
    if result.find("禁用"):
        ...
        return
    if result.find("启用"):
        ...
        return
```

毫无疑问，这种写法会让功能负责的命令的处理器看起来十分庞大。

于是使用 `match_path`：

```python
from arclet.alconna.graia import match_path, command
from graia.ariadne.util.saya import decorate

cmd = Alconna(...)


@command(cmd, private=False)
@decorate(match_path("$main"))
async def _(app: Ariadne, group: Group, result: Arpamar):
    return await app.send_group_message(group, MessageChain(result.source.get_help()))


@command(cmd, private=False)
@decorate(match_path("列出"))
async def _(app: Ariadne, group: Group, result: Arpamar):
    ...

@command(cmd, private=False)
@decorate(match_path("禁用"))
async def _(app: Ariadne, group: Group, result: Arpamar):
    ...

@command(cmd, private=False)
@decorate(match_path("启用"))
async def _(app: Ariadne, group: Group, result: Arpamar):
    ...
```

`match_path` 的参数 `path` 表示分发需要匹配的选项或子命令，当 `path` 为 `$main` 时表示匹配无选项的情况。

#### match_value

`match_value` 的功能与 `match_path` 类似，但允许对匹配值进行判断。

例如某个命令携带固定参数：

```python
Alconna("test", Args["level", ["info", "debug", "error"]])
```

你当然可以把处理部分堆在一个监听器内，如：

```python
from arclet.alconna.graia import command, Match

cmd = Alconna(...)


@command(cmd, private=False)
async def handler(app: Ariadne, group: Group, level: Match[str]):
    if level.result == "info":
        ...
        return
    if level.result == "debug":
        ...
        return
    if level.result == "error":
        ...
        return
```

但你可以这样写：

```python
from arclet.alconna.graia import match_value, command
from graia.ariadne.util.saya import decorate

cmd = Alconna(...)


@command(cmd, private=False)
@decorate(match_value("level", "info"))
async def _(app: Ariadne, group: Group):
    ...

@command(cmd, private=False)
@decorate(match_value("level", "debug"))
async def _(app: Ariadne, group: Group):
    ...

@command(cmd, private=False)
@decorate(match_value("level", "error"))
async def _(app: Ariadne, group: Group):
    ...
```

`match_value` 的参数 `or_not` 允许在参数不存在时视作匹配成功，适合在判断路径为选项参数时使用。

## [亮出你的本事吧！外星人](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「やってみせろよ、ウチュウジンー！」**

### 创建 Alconna

以下将展示 Alconna 创建的 5 种方式：

:::: code-group
::: code-group-item typical

```python{4,10}
from arclet.alconna import Args
from arclet.alconna.graia import AlconnaDispatcher

alc = Alconna("我要涩图", Args["count", int])


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item String

```python{4,10}
from arclet.alconna import AlconnaString
from arclet.alconna.graia import AlconnaDispatcher

alc = AlconnaString("我要涩图 <count:int>")


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Format

```python{4,10}
from arclet.alconna import AlconnaFormat
from arclet.alconna.graia import AlconnaDispatcher

alc = AlconnaFormat("我要涩图 {count}", {"count": int})


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Decorate

```python{4,7-10,16}
from arclet.alconna import AlconnaDecorate
from arclet.alconna.graia import AlconnaDispatcher

cli = AlconnaDecorate()


@cli.build_command("我要涩图")
@cli.argument(Args["count", int])
def setu(count: int):
    ...


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(setu.command)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Fire

```python{5-8,11,17}
from arclet.alconna import AlconnaFire
from arclet.alconna.graia import AlconnaDispatcher


def give_me_setu(count: int):
    class Config:
        command=我要涩图
    ...


alc = AlconnaFire(give_me_setu)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
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

目前的命令组件有 **Option**、**Subcommand** 与 **Args**。

这样创建的 Alconna 实例又长什么样呢？

```python
>>> Alconna(
...     command="我要涩图",  # command 关键字可以省略
...     main_args=Args["count", int],  # main_args 关键字可以省略
...     options=[
...         Option("从", Args["tag;S", str])
...     ]
... )
<Alconna::我要涩图 with 3 options; args=Args('count': int)>
```

`command`传入的便是命令名称，`main_args` 是命令参数，`options` 则是命令选项。

`Args`是命令参数的载体，通过"键-值-默认"传入一系列参数，具体食用方法我们后面会讲到。

::: tip
为什么会有三个 option 呢？ 因为所有的 Alconna 都内置了 `--help` 与 `--shortcut` 这两个选项。
:::

::: tsukkomi 注
Alconna 0.7.6 后，简易的命令构造可用如下方法：

```python
>>> alc = Alconna("我要涩图", Args.count[int]) + Option("--from", "tag;S:str")
```

即可以省略 `command` 与 `main_args` 关键字，并且用 `+` 增加选项或子命令。

:::

#### Koishi-like：使用 `AlconnaString(...)`

在 **Koishi-like** 方法中，你可以用类似 **Koishi** 中编写命令的格式来构造 **Alconna**。

上面的例子中，我们期望的命令是这样的一串字符串：`我要涩图 2 从 纯爱 兽耳`。

该命令以“**我要涩图**”作为前缀，同时需要一个参数，其以 `count` 为名字，并且类型为 `int`，
然后允许一个选项，其名称为“**从**”，需要不定个参数，其以 `tag` 为名字，并且每个参数类型为 `str`。

于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaString("我要涩图 <count:int>", "从 <tag;S:str>")
<Alconna::我要涩图 with 3 options; args=Args('count': int)>
```

可以看到，我们的 `<count:int>` 变成了 `Args['count', int]`。

::: tip
关于 `Koishi-like` 的命令参数，请详细阅读
 [命令参数](https://arcletproject.github.io/docs/alconna/basic/alconna-args)
 与
 [参数编写规则](https://arcletproject.github.io/docs/alconna/constructs/koishi-like#%E7%BC%96%E5%86%99%E8%A7%84%E5%88%99)
 来编写
:::

#### Format：使用 `AlconnaFormat(...)`

在**format**方法中，你可以用 **f-string** 的格式来构造 Alconna。

仍以上面的命令为例，我们相当于输入了这样一串字符串：`我要涩图 {count} 从 {*tags}`
于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaFormat("我要涩图 {count:int} 从 {tags;S}", {"tags;S": str})
<Alconna::我要涩图 with 3 options; args=Args('count': int)>
```

#### Fire-Like：使用 `AlconnaFire(...)`

**Fire-like** 允许你传入任意的参数(主要是函数、类、实例、模块)，`Alconna` 会尝试提取命令相关参数，
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
<Alconna::我要涩图 with 3 options; args=Args('count': int)>
```

### 组件

`Alconna` 拥有两大组件：**Option** 与 **Subcommand**。

<h4>Option</h4>

`Option` 可以传入一组 `alias`：

```python
Option("--foo", alias=["-F", "--FOO", "-f"])
```

那么`-f`、`-F` 与 `--FOO`将等同于`--foo`。

另外也可以用如 `Option("--foo|-F|--FOO|-f")` 来指定别名。

<h4>Subcommand</h4>

`Subcommand` 可以传入自己的 **Option**：

```python
Subcommand("sub", options=[Option("sub_opt")])
```

此时 `sub_opt` 必须在 `sub` 被输入时才算作合法选项，即：

- `sub ... sub_opt ...` ✔
- `sub_opt ... sub ...` ❌

除此之外，**Option** 与 **Subcommand** 拥有如下共同参数：

<h5>help_text</h5>

传入该组件的帮助信息

<h5>action</h5>

传入针对该组件的参数行为器，一般是一个函数

<h5>dest</h5>

`dest` 被指定为解析完成时标注匹配结果的标识符，不传入时默认为选项或子命令的名称 (name)

<h5>requires</h5>

`requires` 是一段指定顺序的字符串列表，作为唯一的前置序列与命令嵌套替换

对于命令 `test foo bar baz qux <a:int>` 来讲，因为`foo bar baz` 仅需要判断是否相等, 所以可以这么编写：

```python
Alconna("test", options=[Option("qux", Args.a[int], requires=["foo", "bar", "baz"])])
```

::: tip
requires 也可以在 name 中传入  
譬如：

```python
Option("foo bar baz qux")
```

:::

## [总会有参数的](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「何とでもなるはずだパラメータ！」**

### Args

**Args** 在 Alconna 中有非常重要的地位，有一半的 bug 皆因其引发（暴论）。

通常以 `Args[key1, var1, default1][key2, var2][...]` 的方式构造一个 Args。

其中，key 一定是字符串，而 var 一般为参数的类型，default 为具体的值。

#### var

var 可以是以下几类：

- 存在于 `arclet.alconna.types.pattern_map` 中的类型/字符串，用以替换为预制好的 **BasePattern**
- 字符串，会转换为正则表达式
- 列表，其中可存放 **BasePattern**、类型或者任意参数值，如字符串或者数字
- `Union`、`Optional`、`Literal` 等会尝试转换为 `List[Type]`
- `Dict[type1，type2]`、`List[type]`、`Set[type]`
- 一般的类型，其会尝试比较传入参数的类型是否与其相关
- **AnyOne**、**AllParam**，作为泛匹配的标识符
- 预制好的字典, 表示传入值依据该字典的键决定匹配结果
- `Annotated[type, Callable[..., bool], ...]`，表示为某一类型添加校验器
- `Callable[[P], T]`，表示会将传入的参数 P 经过该调用对象并将返回值 T 作为匹配结果
- ...

内置的类型检查包括 `int`、`str`、`float`、`bool`、`'url'`、`'ip'`、`'email'`、`list`、`dict`、`tuple`、`set`、`Any` 、`bytes`、`hex`、`datetime` 等。

:::tip NOTE
若想增加类型检查,我们可以通过 `arclet.alconna.typing.set_converter` 传入自己的 ArgPattern：

```python
from arclet.alconna.typing import set_converter

>>> set_converter(
...     BasePattern(
...         "app", PatternModel.REGEX_CONVERT, Ariadne, lambda x: app, 'app'
...     )
... )
```

或通过 `arclet.alconna.builtin.pattern import ObjectPattern` 传入一个类型来向 pattern_map 中注册检查类型：

```python
from arclet.alconna.builtin.pattern import ObjectPattern

ObjectPattern(Image, limit=("url",))
```

:::

#### key

`key`的作用是用以标记解析出来的参数并存放于 **Arpamar** 中,以方便用户调用。

其有七种为 Args 注解的标识符,为 `S`、`W`、`A`、`F`、`K`、`O` 和 `H`。标识符应与 key 以 `;` 分隔：

- `S` 标识符表示当前参数为可变长非键值对参数，类似函数中的 `*args`，可以传入 0 至任意个参数。
- `W` 标识符表示当前参数为可变长键值对参数，类似函数中的 `**kwargs`，可传入 0 至任意个参数。
- `A` 标识符表示该处传入的参数应不是规定的类型，或不在指定的值中。
- `F` 标识符表示该参数的类型不经过类型转换。
- `K` 标识符表示该参数需要键值对匹配，即 `key=var` 的形式。
- `O` 标识符表示该参数为可选参数，会在无参数匹配时跳过。
- `H` 标识符表示该参数的类型注解需要隐藏。

另外，正整数也是可以作为标识符的，其会作为 `S` 的限制性操作。如 `key;3` 表示需要传入 0 至 3 个参数。

### BasePattern

**BasePattern** 是 Alconna 中对正则解析的拓展，负责对传入参数的检查与类型转换。

例如我想把如 `'sth1/sth2/sth3/sth4'` 的参数在解析后变成类似 `['sth1', 'sth2', 'sth3', 'sth4']` 这样子。

那么我可以这样编写一个 BasePattern：

```python
from arclet.alconna.typing import BasePattern, PatternModel

my_list = BasePattern(
    "(.+/.*)", model=PatternModel.REGEX_CONVERT, origin=list,
    converter=lambda x: x.split('/'), alias='my_list', accepts=[str]
)
```

并在创建 Alconna 时使用：

```python
...
alc = Alconna(".command", Args["foo", my_list])
```

此时输入 `'.command usr/bin/python'`，则 `foo` 将被解析为 `['usr', 'bin', 'python']`

### Arpamar

`Alconna.parse` 会返回由 **Arpamar** 承载的解析结果。

Arpamar 会有如下参数：

- 调试类
  - matched: 是否匹配成功
  - head_matched: 命令头部是否匹配成功
  - error_data: 解析失败时剩余的数据
  - error_info: 解析失败时的报错信息
  - origin: 原始命令，可以类型标注
  - source: 使用的 Alconna

- 分析类
  - main_args: 命令的主参数的解析结果
  - options: 命令所有选项的解析结果
  - subcommands: 命令所有子命令的解析结果
  - other_args: 除主参数外的其他解析结果
  - all_matched_args: 所有 Args 的解析结果
  - header: 当命令头部填入有效表达式时的解析结果

老规矩，直接上实例：

```python
from arclet.alconna import Alconna, Args, Option, Subcommand, Arpamar
from arclet.alconna.graia import command


@command(
    Alconna(
        "找歌", Args["song", str],
        options=[
            Option("语种", Args["lang", str]),
            Subcommand("歌手", [Option("地区", Args["region", str])], Args["singer", str]),
        ],
    ),
    private=False
)
async def lyric_xxx(app: Ariadne, group: Group, result: Arpamar[MessageChain]):
    print(result.matched)
    print(result.origin)
    print(result.error_info)
    print(result.options)
    print(result.song)
    if result.find("语种"):
        print(result.query("语种.lang"))
    if result.find("歌手"):
        print(result.query("歌手.singer"))
```

#### Arpamar Behavior

**ArpamarBehavior** 是负责解析 **Arpamar** 行为的类，用来更精细的预处理结果。

Alconna 目前预制了三种 **Behavior**，分别用来：

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

### Duplication

**Duplication** 用来提供更好的自动补全，类似于 **ArgParse** 的 **Namespace**，经测试表现良好（好耶）。

普通情况下使用，需要利用到 **ArgsStub**、**OptionStub** 和 **SubcommandStub** 三个部分，

仍以上方命令为例，其对应的 Duplication 应如下构造：

```python
from arclet.alconna import Duplication, ArgsStub, OptionStub

class MyDup(Duplication):
    my_args: ArgsStub
    从: OptionStub  # 选项与子命令对应的stub的变量名必须与其名字相同
```

并在解析时传入 Duplication：

```python
result = alc.parse("我要涩图 2", duplication=MyDup)
>>> type(result)
<class MyDup>
```

:::tip

同样，在 **AlconnaDispatcher** 中也可以使用 **Duplication**，你只需要如下操作：

```python{7-8}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group, dup: MyDup):
    print(dup.my_args.availabe)
```

亦或者，你可以直接使用 **Stub** 作为参注解：

```python{7-8}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group, y_args: ArgsStub):
    print(my_args.availabe)
```

:::

**Duplication** 也可以如 **Namespace** 一样直接标明参数名称和类型：

```python{3-5}
from arclet.alconna import Duplication
from typing import Tuple
class MyDup(Duplication):
    count: int
    tag: Tuple[str, ...]
```

该用法下需要确保属性存在

## [居然是整活？](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「コッケイナだと！」**

### 元素匹配

一定要记住，Alconna 是支持元素匹配的（Plain 元素或 Source 等元素除外）。

假设某个命令需要传入名字，但你也想能够直接用 **@** 来指定目标, 那么可以直接这么写：

```python{6}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    "发病",
    Args["target", [At, int]],
    headers=["EroEro", "!"],
)
```

### 头部 Pattern

Alconna 的 **command** 同样可以接受 **类型** 或者 **BasePattern**：

```python{4-5}
from typing import Annotated
from arclet.alconna import Alconna

number = Alconna(int, help_text="输入数字")
digit = Alconna(Annotated[int, lambda x: x>0], help_text="输入正整数")
```

### At 机器人来使用命令

At 等元素同样可以放置于 **headers** 里，但必须是实例化的对象，不能传入类型：

```python{7}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    "发病",
    Args["target", [At, int]],
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

该方法构建的快捷指令在 bot 生命周期结束后会一并销毁，但可以通过 Alconna 的 **CommandManager** 来保存：

```python
from pathlib import Path
from arclet.alconna import command_manager
...

command_manager.cache_path = Path(__file__).parent / "my_cache.db"
command_manager.dump_cache()
```

:::

### 不规则命令

Alconna 对于命令头部 **command** 应用有特殊的构建规则。

其可以像 **AlconnaFormat** 那样通过 `'xxx{name:type or pattern}xxx'` 来生成正则表达式，并将匹配结果传递给 `Arpamar.header`。

其中 `name` 与 `type` 都可以留空, `type` 留空时当作`'str'`。

类似 `.r100` 或者 `查询XX人品` 的指令，这么写就好了：

```python{4}
from arclet.alconna import Alconna, Arpamar
from arclet.alconna.graia import AlconnaDispatcher

dice = Alconna(".r{dice:int}")


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(dice)],
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

who = Alconna("告诉我") + Option("谁", Args['target;S', str] / "和", separator="是")

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

```python{7}
from arclet.alconna import Alconna


def test(foo: str, bar: int, baz: bool):
    ...

tes = Alconna("command", action=test)
print(tes.args)

>>> "Args('foo': str, 'bar': int, 'baz': bool)"
```

在 Alconna 0.7.3 后，args 可以传入一个符合规则的字符串，其会尝试转换为 Args。

```python{3}
from arclet.alconna import Alconna

tes = Alconna("command", main_args="foo:str, bar:int, baz:bool")
print(tes.args)

>>> "Args('foo': str, 'bar': int, 'baz': bool)"
```

### 减少 Option 的使用

利用 `K` 与 `O` 前缀，我们可以在 **Args** 中模拟出一个 option：

```python{3}
from arclet.alconna import Alconna, Args

alc = Alconna("cut_img", Args["--width;OK", int, 1280]["--height;OK", int, 720])
alc.parse("cut_img --height=640")

>>> matched=True, head_matched=True, main_args={"--width": 1280, "--height":640}
```

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

> **「わかります」**

<Loading></Loading>

::: interlink
**相关链接:**  
<https://arcletproject.github.io/docs/alconna/tutorial>
:::
