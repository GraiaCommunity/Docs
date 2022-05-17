# 后台对线

还记得 `mcl` 吗？你应该对他底下的这个 `>` 印象深刻吧。

```txt:no-line-numbers
xxxx-xx-xx xx:xx:xx I/main: mirai-console started successfully.

>
```

那么问题来了，我们能够在 `graia-ariadne` 整出相同的效果吗？

还别说，真能，你需要的是 `Console`~

## `Console` 是什么

`Console` 说白了就是一个内建实时控制台，你可以在通过控制台做点什么东西。

## 快速开始

首先我们需要在 `main.py` 加一点东西进行初始化：

```python
from graia.ariadne.console import Console
from graia.ariadne.console.saya import ConsoleBehaviour
...

con = Console(broadcast=bcc, prompt="EroEroBot> ")
...
saya.install_behaviours(
    ...
    ConsoleBehaviour(con)
)
```

然后让你再次启用程序的时候，铛铛：

```txt:no-line-numbers
Ariadne version: A.A.A
Broadcast version: B.B.B
Saya version: C.C.C
Scheduler version: D.D.D
| INFO     | graia.ariadne.app:launch:1356 - Launching app...
| DEBUG    | graia.ariadne.app:daemon:1264 - Ariadne daemon started.

EroEroBot>
```

::: tip
因为[某种原因](https://github.com/prompt-toolkit/python-prompt-toolkit/issues/1483)，
假设你是在 Windows 平台上使用 `Windows Terminal`，
可能会出现「一行打印不下的文字只能显示第一行」的问题。

这是因为 `Console` 的依赖库 `prompt-toolkit` 的问题，
所以你往 `Ariadne` 提 issue 是没用的哦。
<br><Curtain>谁叫人家是 python 为数不多的支持多平台的 tui 库呢（摊手）</Curtain>
:::

::: danger
一般情况下，请不要在启用 Console 之后在代码种使用如下方式进行输出，包括但不限于：

- `print()`
- `sys.stdout.write()`

如要输出普通字符串，你可以这样做：

```python
from loguru import logger

logger.info("测试")
logger.opt(raw=True).log("测试")
```

:::

## Console 能做什么？

你可能会说，我要一个后台（控制台）又有什么用呢？

我可以告诉你两个最简单的栗子：

1. 你可以在后台通过 Bot 的账号主动发送群/私聊消息了（当然，只要你想，你也可以执行更多的操作），你的 Bot 再也不是只能一应一答或者定时发消息的“傻孩纸”了
2. 你觉不觉得每次关闭 Ariadne 都要按 `ctrl+c` 手指要伸很长很累，现在你可以通过命令退出 Ariadne 了！

### 在后台发送消息吧~

来，让我们在 `module` 文件夹中新建一个 `backend_laning.py`：

```python
from graia.ariadne.app import Ariadne
from graia.ariadne.console.saya import ConsoleSchema
from graia.ariadne.message.parser.twilight import MatchResult, ParamMatch, Twilight
from graia.saya import Channel

channel = Channel.current()


@channel.use(ConsoleSchema([Twilight.from_command("laning {id} {message}")]))
async def console_chat(app: Ariadne, id: MatchResult, message: MatchResult):
    group_id = id.result.asDisplay()
    await app.sendGroupMessage(int(group_id), message.result)
```

启动你的 Bot，然后在 `EroEroBot>` 后输入 `laning 114514 19180` 并按下回车键，
你就会惊喜地发现，你的 Bot 在群号为 114514 的这个群里发了一条内容为 19180 的消息（假设你的 Bot 真的加入了群号为 114514 的群）。

#### 原理解析

首先，先从「为什么 Console 能用 Twilight」这个问题开始吧~
你可能会很好奇为什么明明是在后台输入命令，但是还是可以用 Twilight 这样的“消息链处理器（解析器）”。

事实上，`Console` 为了能够多多复用现成的各种设施，会将他获取到的输入转换为消息链来处理。
你只需要把 `ConsoleSchema` 替换成 `ListenerSchema` 来理解就可以了，
在 `ConsoleSchema` 里除了没法像 `group: Group`、`member: Member` 外，
其他方面都跟你写普通的各种功能差不多。

### 通过命令退出 Ariadne

以下是一个栗子，当你执行 `stop` 命令时，Console 会询问你是否需要需要退出，
此时，你输入 `y`/`yes` 即可退出 Ariadne 了！

```python
from graia.ariadne.app import Ariadne
from graia.ariadne.console import Console
from graia.ariadne.console.saya import ConsoleSchema
from graia.ariadne.message.parser.base import FullMatch, Twilight
from graia.saya import Channel

channel = Channel.current()


@channel.use(ConsoleSchema([MatchContent("stop")]))
async def stop(app: Ariadne, console: Console):
    res: str = await console.prompt(
        l_prompt=[("class:warn", " 你确定要退出吗? "), ("", " (y/n) ")],
        style=Style([("warn", "bg:#cccccc fg:#d00000")]),
    )
    if res.lower() in ("y", "yes"):
        await app.stop()
        console.stop()
```

## 个性化

:::warning
若模仿本小节内容进行设置但设置不当，则可能会带来一些 Bug，请经过测试后再使用。

- 本小节内容需要你的终端所使用的字体支持 [Powerline](https://github.com/powerline/powerline) 或 [Nerd](https://www.nerdfonts.com/)，
  否则你可能会见到未知字符（如问号、方框等）。
- 本小节代码中有两个字符需要你的浏览器调用的等宽字体支持 [Powerline](https://github.com/powerline/powerline) 或 [Nerd](https://www.nerdfonts.com/)，
  否则你可能会见到未知字符（如问号、方框等）。

对于本栗子及更多类似的效果的预览图，
你可以点击[这里](https://github.com/powerline/powerline#screenshots)或[这里](https://ohmyposh.dev/docs/themes)或[这里](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)了解一下。
:::

假如你不满足于像 `prompt="EroEroBot> "` 这样只能自定义一个普通的字符串作为 Console 的输入提示，
假如你想要和 `oh my zsh` 或者 `oh my posh` 那样彩色的各种特殊字符的样子，可以吗？

**当然可以！**

你只需要在初始化 `Console` 的时候传入一些参数就可以实现了，下面就是一个栗子：

```python
...
from prompt_toolkit.formatted_text import HTML
from prompt_toolkit.styles import Style
...

con = Console(
    broadcast=app.broadcast,
    prompt=HTML("<split_1></split_1><eroerobot> EroEroBot </eroerobot><split_2></split_2> "),
    style=Style(
        [
            ("split_1", "fg:#61afef"),
            ("eroerobot", "bg:#61afef fg:#ffffff"),
            ("split_2", "fg:#61afef"),
        ]
    ),
    replace_logger=False,
)
```

::: interlink
**相关链接:**

- <https://graia.readthedocs.io/extra/console/>
- <https://python-prompt-toolkit.readthedocs.io/en/master/pages/reference.html?highlight=html#prompt_toolkit.formatted_text.HTML>
- <https://python-prompt-toolkit.readthedocs.io/en/master/pages/reference.html?highlight=html#prompt_toolkit.styles.Style>
:::
