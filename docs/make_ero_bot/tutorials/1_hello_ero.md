# 1. 来点涩图

## 注意事项

1. **本文将会使用 `poetry` 作为依赖管理和打包的工具。**
2. **本文将假设你具有一定的英语阅读并对工具软件的提示有自己作出决定的能力**
3. **本文将使用 `graia-ariadne` 0.6.0.post1 及以上的版本**，部分内容可能仍为旧版本但不影响食用
4. 虽然 `Ariadne` 支持 Python 3.8 - 3.10 但为了最佳体验，我们建议你最好升级到 Python3.9+

你可能会疑惑为什么不直接使用 `pip` + `venv` 而是使用 `poetry`？

> `poetry` 能够更好地管理依赖但你直接用 pip 也行  
> 只是不推荐（不会有人想因为依赖冲突把系统环境炸掉吧）
>
> &nbsp;
>
> 至于你问我如何用 pip 创建虚拟环境？👉 [看这](../before/Q&A.md#_9-当你遇到不会的东西的时候)
>
> 虽然可能在刚开始写 QQ 机器人时不用 `poetry` 没啥问题  
> 但等依赖多了以后，你就会知道 `poetry` 有多好用了（详细请看[这](../before/Q&A.md#_4-关于-poetry)）

## 1.1 创建项目

新建一个项目文件夹，这里我们就叫 `EroEroBot` 吧 （<Curtain>PeroPero 震怒</Curtain>），并进入该文件夹里面

::: tip
国内连接 Pypi 非常慢，所以我们在定义依赖与开发依赖时填 no  
后面设置了镜像源之后再自己添加依赖
:::

```bash
mkdir EroEroBot
cd EroEroBot
```

然后输入 `poetry init` 开始创建环境，你就会看到类似下面的提示：

```bash
$ poetry init

This command will guide you through creating your pyproject.toml config.

Package name [EroEroBot]:
Version [0.1.0]:
Description []:
Author [GraiaCommunity <example@graiax.cn>, n to skip]:  n # 注意，这里要你自己填写 n
License []:
Compatible Python versions [^3.9]:

Would you like to define your main dependencies interactively? (yes/no) [yes] n # 注意，这里要你自己填写 n
Would you like to define your development dependencies interactively? (yes/no) [yes] n # 注意，这里要你自己填写 n
Generated file

[tool.poetry]
name = "EroEroBot"
version = "0.1.0"
description = ""
authors = ["GraiaCommunity <example@graiax.cn>"]

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"


Do you confirm generation? (yes/no) [yes] y # 注意，这里要你自己填写 y
```

完成之后，你的项目文件夹内应该会出现一个 `pyproject.toml`

为了防止后续添加依赖时等待太久，可以修改 `pyproject.toml` 来添加国内镜像加速站，打开该文件后在文件末尾添加如下内容即可。

```toml
[[tool.poetry.source]]
# 这里以清华源举例，你也可以使用其他源
name = "tuna-tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = false
```

## 1.2 启用虚拟环境并安装 `graia-ariadne`

在配置好环境之后，你需要给你的项目创建一个虚拟环境并且安装 `graia-ariadne`  
在项目根目录执行如下命令：

```bash
poetry env use python3.9 # 如果你设备里只有一个版本的 Python 或你想使用最新版本，则这一条命令可以不执行
poetry add graia-ariadne[full]
```

::: tip TIPS

1. `graia-ariadne[full]` 是安装 `graia-ariadne` 功能所需要的所有非必要组件，如下所示：

   - graia-saya —— 模块化（[第11章](./11_classification.md)用到）
   - graia-scheduler —— 定时任务（[第10章](./10_ohayou_oniichan.md)用到）
   - arclet-alconna —— 消息链处理器（[第6章第4节](./6_4_alconna.md)）

2. 假设你不怎么喜欢整虚拟环境也可以使用如下命令来取消虚拟环境的创建

   ```bash
   poetry config virtualenvs.create false
   ```

3. 你的运行结果可能跟我有所不同，但是大致应该是差不多的
:::

```bash
$ poetry env use 3.9

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using virtualenv: /root/.cache/pypoetry/virtualenvs/EroEroBot-BexBd8Xq-py3.9
```

```bash
$ poetry add graia-ariadne[full]

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using version ^0.6.0.post1 for graia-ariadne

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 24 installs, 0 updates, 0 removals

  • Installing six (1.16.0)
  • Installing colorama (0.4.4)
  • Installing frozenlist (1.3.0)
  • Installing idna (3.3)
  • Installing multidict (6.0.2)
  • Installing python-dateutil (2.8.2)
  • Installing win32-setctime (1.1.0)
  • Installing aiosignal (1.2.0)
  • Installing async-timeout (4.0.2)
  • Installing croniter (1.3.4)
  • Installing graia-broadcast (0.15.6)
  • Installing attrs (21.4.0)
  • Installing typing-extensions (4.1.1)
  • Installing charset-normalizer (2.0.12)
  • Installing loguru (0.6.0)
  • Installing wcwidth (0.2.5)
  • Installing yarl (1.7.2)
  • Installing aiohttp (3.8.1)
  • Installing arclet-alconna (0.6.3)
  • Installing graia-scheduler (0.0.6)
  • Installing pydantic (1.9.0)
  • Installing graia-saya (0.0.14)
  • Installing prompt-toolkit (3.0.28)
  • Installing graia-ariadne (0.6.0.post1)
```

## 1.3 快速创建一个最小实例

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ```python
   import asyncio

   from graia.ariadne.app import Ariadne
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
   from graia.ariadne.message.element import Plain
   from graia.ariadne.model import Group, MiraiSession

   app = Ariadne(
       MiraiSession(
           host="http://localhost:8080",
           verify_key="GraiaxVerifyKey",
           account=1919810,
           # 此处的内容请按照你的 MAH 配置来填写
       ),
   )
   bcc = app.broadcast


   @bcc.receiver(GroupMessage)
   async def setu(app: Ariadne, group: Group, message: MessageChain):
       await app.sendGroupMessage(group, MessageChain.create(
           f"不要说{message.asDisplay()}，来点涩图"
       ))


   app.launch_blocking()
   ```

4. 保存，并且使用命令 `poetry run python bot.py` 运行

   ::: tip 注意
   一定要记得在运行之前启动 `mcl (mirai-console-loader)`  
   关于 `mcl` 的配置，请看 👉 [这里](../before/Q&A.md#_3-关于-mirai-环境)
   :::

   之后，你会看到显示如下信息输出：

    ```bash
    $ poetry run python bot.py
                    _           _
         /\        (_)         | |
        /  \   _ __ _  __ _  __| |_ __   ___
       / /\ \ | '__| |/ _` |/ _` | '_ \ / _ \
      / ____ \| |  | | (_| | (_| | | | |  __/
     /_/    \_\_|  |_|\__,_|\__,_|_| |_|\___|
    Ariadne version: 0.6.0.post1
    Saya version: 0.0.14
    Broadcast version: 0.15.6
    Scheduler version: 0.0.6
    2022-02-15 17:12:16.320 | INFO     | graia.ariadne.app - Launching app...
    2022-02-15 17:12:16.321 | INFO     | graia.ariadne.adapter - websocket: connected
    2022-02-15 17:12:16.332 | INFO     | graia.ariadne.adapter - websocket: ping task created
    2022-02-15 17:12:16.333 | INFO     | graia.ariadne.app - Remote version: 2.5.0
    2022-02-15 17:12:16.334 | INFO     | graia.ariadne.app - Application launched with 0.012s
    2022-02-15 17:12:16.335 | INFO     | graia.ariadne.app - daemon: adapter started
    ```

5. 给你的 bot 随便发一条消息

   ```bash
   2021-12-03 10:49:45.350 | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
   2021-12-03 10:49:45.478 | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

   <ChatPanel title="GraiaCommunity">
   <ChatMessage name="GraiaX" onright>你好</ChatMessage>
   <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">不要说你好，来点涩图</ChatMessage>
   </ChatPanel>

::: interlink
**相关链接:** <https://graia.readthedocs.io/quickstart/>
:::
