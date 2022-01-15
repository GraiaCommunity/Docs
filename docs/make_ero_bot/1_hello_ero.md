---
id: hello_ero
title: 1. 来点涩图
---

# 来点涩图

## 注意

本文将会使用 `poetry` 作为依赖管理和打包的工具。  
你可能会疑惑为什么不直接使用 `pip` + `venv` 而是使用 `poetry`？

`poetry` 能够让我们更好地管理你机器人的依赖  
如果不使用 `poetry` 虽然可能在你在刚开始制作 QQ 机器人的时候还没有什么问题  
但等到功能增多、依赖变多以后，你就会知道 `poetry` 有多爽了  

:::tip
（当然，你直接用 pip 也行，只是并不推荐）

直接用 pip 的方法很简单  
你只需要 replace("poetry add", "pip install")  
至于你问我如何用 pip 创建虚拟环境？[看这](0_before_start.html#_8-当你遇到不会的东西的时候)
:::

## 1.创建项目

新建一个项目文件夹(在这里我们就叫 `EroEroBot` 吧) <Curtain>PeroPero 震怒</Curtain> ，并进入到该文件夹里面

```bash
mkdir EroEroBot
cd EroEroBot
```

然后输入 `poetry init` 开始创建环境

```bash
root@Graiax-Server:/Graiax/EroEroBot$ poetry init

This command will guide you through creating your pyproject.toml config.

Package name [EroEroBot]:
Version [0.1.0]:
Description []:
Author [Graiax-Community <example@graiax.cn>, n to skip]:
License []:
Compatible Python versions [^3.9]:
Would you like to define your main dependencies interactively? (yes/no) [yes] no # 注意，这里要你自己填写 no
Would you like to define your development dependencies interactively? (yes/no) [yes] no # 注意，这里要你自己填写 no
Generated file

[tool.poetry]
name = "EroEroBot"
version = "0.1.0"
description = ""
authors = ["Graiax-Community <example@graiax.cn>"]

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"


Do you confirm generation? (yes/no) [yes]
```

注：因为国内对 Pypi 的连接问题实在是太离谱了，所以我们在定义依赖与开发依赖的时候填写 no

后面，你的文件夹里面应该会出现一个 `pyproject.toml`

:::tip
为了防止后续的包解析及安装等待时间过长，可以预先修改项目根目录下的 `pyproject.toml` 来添加国内镜像加速站，打开该文件后在文件末尾添加如下内容

```toml
[[tool.poetry.source]]
# 这里以清华源举例，你也可以使用其他源
name = "tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```
:::

## 2.启用虚拟环境并安装 `graia-ariadne`

在配置好环境之后，你需要给你的项目创建一个虚拟环境并且安装 `graia-ariadne`
还是刚刚那个目录
输入如下指令

```bash
poetry env use python3.9
poetry add graia-ariadne
```

注：你的运行结果可能跟我有所不同，但是大致应该是差不多的

```bash
$ poetry env use 3.9

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using virtualenv: /root/.cache/pypoetry/virtualenvs/EroEroBot-BexBd8Xq-py3.9
```

```bash
$ poetry add graia-ariadne

Using version ^0.4.8.1 for graia-ariadne

Updating dependencies
Resolving dependencies... (38.9s)

Writing lock file

Package operations: 14 installs, 0 updates, 0 removals

  • Installing frozenlist (1.2.0)
  • Installing idna (3.3)
  • Installing multidict (5.2.0)
  • Installing typing-extensions (3.10.0.2)
  • Installing aiosignal (1.2.0)
  • Installing async-timeout (4.0.1)
  • Installing attrs (21.2.0)
  • Installing charset-normalizer (2.0.8)
  • Installing yarl (1.7.2)
  • Installing aiohttp (3.8.1)
  • Installing graia-broadcast (0.14.3)
  • Installing loguru (0.5.3)
  • Installing pydantic (1.8.2)
  • Installing graia-ariadne (0.4.7)
```

## 3.快速创建一个最小实例

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ```python
   import asyncio

   from graia.broadcast import Broadcast

   from graia.ariadne.app import Ariadne
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
   from graia.ariadne.message.element import Plain
   from graia.ariadne.model import Group, MiraiSession

   loop = asyncio.new_event_loop()

   bcc = Broadcast(loop=loop)
   app = Ariadne(
       broadcast=bcc,
       connect_info=MiraiSession(
           host="http://localhost:8080",
           verify_key="GraiaxVerifyKey",
           account=1919810,
           # 此处的内容请按照你的 MAH 配置来填写
       ),
   )


   @bcc.receiver(GroupMessage)
   async def setu(app: Ariadne, group: Group, message: MessageChain):
       await app.sendGroupMessage(group, MessageChain.create(
           f"不要说{message.asDisplay()}，来点涩图"
       ))


   app.launch_blocking()
   ```

4. 保存，并且使用如下命令运行

   ```bash
   poetry run python bot.py
   ```

   之后，你会看到显示如下画面

   ```bash
   $ poetry run python bot.py

                  _           _
       /\        (_)         | |
      /  \   _ __ _  __ _  __| |_ __   ___
     / /\ \ | '__| |/ _` |/ _` | '_ \ / _ \
    / ____ \| |  | | (_| | (_| | | | |  __/
   /_/    \_\_|  |_|\__,_|\__,_|_| |_|\___|
   Ariadne version: 0.5.1
   Broadcast version: 0.14.5
   Saya version: 0.0.13
   Scheduler version: 0.0.6
   2022-01-15 22:15:58.85 | INFO     | graia.ariadne.app - Launching app...
   2022-01-15 22:15:58.86 | INFO     | graia.ariadne.adapter - websocket: connected
   2022-01-15 22:15:58.86 | INFO     | graia.ariadne.adapter - websocket: ping task created
   2022-01-15 22:15:58.87 | INFO     | graia.ariadne.app - Remote version: 2.4.0
   2022-01-15 22:15:58.87 | INFO     | graia.ariadne.app - Application launched with 0.019s
   2022-01-15 22:15:58.87 | INFO     | graia.ariadne.app - daemon: adapter started
   ```

5. 给你的 bot 随便发一条消息

   ```bash
   2021-12-03 10:49:45.350 | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
   2021-12-03 10:49:45.478 | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

  <ChatPanel title="GraiaX-Community">
    <ChatMessage name="GraiaX" onright>你好</ChatMessage>
    <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">不要说你好，来点涩图</ChatMessage>
  </ChatPanel>
