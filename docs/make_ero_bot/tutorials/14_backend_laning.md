# 14. 后台对线

::: danger
总感觉有哪里忘记讲了
:::

还记得 `mcl` 吗？你应该对他底下的这个 `>` 印象深刻吧。

``` bash
xxxx-xx-xx xx:xx:xx I/main: mirai-console started successfully.

>
```

那么问题来了，我们能够在 `graia-ariadne` 整出相同的效果吗？

还别说，真能，你需要的是 `Console`~

## `Console` 是什么

`Console` 说白了就是一个内建实时控制台，你可以在通过控制台做点什么东西。

## 快速开始

首先我们需要在 `main.py` 加一点东西进行初始化：

``` python
from graia.ariadne.console import Console
from graia.ariadne.console.saya import ConsoleBehaviour
...

con = Console(broadcast=bcc, prompt="EroEroBot> ")
...
saya.install_behaviours(
    ...
    ConsoleBehaviour(con))
```

然后让你再次启用程序的时候，铛铛：

``` bash
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

## 写一个后台发送消息吧~

来，让我们在 `module` 文件夹中新建一个 `backend_laning.py`：

``` python
from graia.ariadne.app import Ariadne
from graia.ariadne.message.parser.twilight import MatchResult, ParamMatch, Twilight
from graia.ariadne.console.saya import ConsoleSchema
from graia.saya import Channel

channel = Channel.current()

@channel.use(ConsoleSchema([Twilight.from_command("laning {id} {message}")]))
async def console_chat(app: Ariadne, id: MatchResult, message: MatchResult):
    group_id = id.result.asDisplay()
    await app.sendGroupMessage(int(group_id), message.result)
```

首先，先从「为什么 Console 能用 Twilight」这个问题开始吧~

事实上，`Console` 为了能够多用用现成的管理器，会将获取的输入转换为 MessageChain 来让现有的**一堆消息匹配器**可用。

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<Loading></Loading>

::: interlink
**相关链接：**<https://graia.readthedocs.io/extra/console/>
:::
