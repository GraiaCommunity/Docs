---
id: hello-ero
title: 1. 来点涩图
---

## 注意
本文将会使用 `poetry` 作为依赖管理和打包的工具。  
你可能会疑惑为什么不直接使用 `pip` + `venv` 而是使用 `poetry`  
`poetry`能够让我们更好的管理你机器人的依赖以及更新  
可能你在刚开始制作QQ机器人的时候还没有什么问题  
但等到后面你就会知道`poetry`帮你管理依赖关系是有多爽了

## 0.开始前你需要注意的
1. 在最开始的开始，请记住，配置好你的mcl(详细配置请看[官方的配置文档](https://graia.readthedocs.io/zh_CN/latest/appendix/mah-install/))  
2. 安装`Python 3.9+`版本的 Python
3. 安装`poetry` (下图为 poetry 推荐的安装办法)
```bash
# osx / linux / bashonwindows 
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
# windows powershell
(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
```

## 1.创建项目

新建一个项目文件夹(在这里我们就叫 `EroEroBot` 吧) <Curtain>PeroPero震怒</Curtain> ，并进入到该文件夹里面
```bash
mkdir EroEroBot
cd EroEroBot
```
然后输入`poetry init`开始创建环境
```bash
root@Graiax-Server:/Graiax/EroEroBot# poetry init

This command will guide you through creating your pyproject.toml config.

Package name [EroEroBot]:  
Version [0.1.0]:  
Description []:  
Author [
Graiax-Community <example@graiax.cn>, n to skip]:  
License []:  
Compatible Python versions [^3.9]:  
Would you like to define your main dependencies interactively? (yes/no) [yes] no # 注意，这里要你自己填写no
Would you like to define your development dependencies interactively? (yes/no) [yes] no # 注意，这里要你自己填写no
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
注：因为国内对Pypi的连接问题实在是太离谱了，所以我们在定义依赖的时候填写no  

后面，你的文件夹里面应该会出现一个`pyproject.toml`

>为了防止后续的包解析及安装等待时间过长，可以预先修改项目根目录下的 `pyproject.toml` 来添加国内镜像加速站，打开该文件后在文件末尾添加如下内容
>```toml
>[[tool.poetry.source]]
># 这里以清华源举例，你也可以使用其他源
>name = "tsinghua"
>url = "https://pypi.tuna.tsinghua.edu.cn/simple"
>default = true
>```

## 2.启用虚拟环境并安装`graia-ariadne`
在配置好环境之后，你需要给你的项目创建一个虚拟环境并且安装`graia-ariadne`
还是刚刚那个目录
输入如下指令

```bash
poetry env use python3.9
poetry add graia-ariadne
```
注：你的运行结果可能跟我有所不同，但是大致应该是差不多的
```bash
# poetry env use 3.9

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using virtualenv: /root/.cache/pypoetry/virtualenvs/EroEroBot-BexBd8Xq-py3.9
```

```bash
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


    #app.launch_blocking()
    loop.run_until_complete(app.lifecycle())
    ```
4. 保存，并且使用如下命令运行  
    ```bash 
    poetry run python bot.py
    ```
    之后，你会看到显示如下画面
    ```bash
    # poetry run python bot.py
    2021-12-03 10:47:47.328 | INFO     | graia.ariadne.app:launch:1264 - Launching app...
    2021-12-03 10:47:47.328 | INFO     | graia.ariadne.app:launch:1268 - 
                   _           _            
        /\        (_)         | |           
       /  \   _ __ _  __ _  __| |_ __   ___ 
      / /\ \ | '__| |/ _` |/ _` | '_ \ / _ \
     / ____ \| |  | | (_| | (_| | | | |  __/
    /_/    \_\_|  |_|\__,_|\__,_|_| |_|\___|

    2021-12-03 10:47:47.329 | INFO     | graia.ariadne.app:launch:1277 - graia-ariadne version: 0.4.7
    2021-12-03 10:47:47.330 | INFO     | graia.ariadne.app:launch:1277 - graia-broadcast version: 0.14.3
    2021-12-03 10:47:47.331 | INFO     | graia.ariadne.app:launch:1277 - graia-scheduler version: Not Found / Installed
    2021-12-03 10:47:47.331 | INFO     | graia.ariadne.app:launch:1277 - graia-saya version: Not Found / Installed
    2021-12-03 10:47:47.331 | DEBUG    | graia.ariadne.app:daemon:1192 - Ariadne daemon started.
    2021-12-03 10:47:47.385 | INFO     | graia.ariadne.adapter:fetch_cycle:367 - websocket: connected
    2021-12-03 10:47:47.386 | INFO     | graia.ariadne.adapter:fetch_cycle:372 - websocket: ping task created
    2021-12-03 10:47:47.386 | DEBUG    | graia.ariadne.adapter:ws_ping:295 - websocket: ping
    2021-12-03 10:47:47.386 | DEBUG    | graia.ariadne.adapter:ws_ping:299 - websocket: ping success, delay 30.0s
    2021-12-03 10:47:47.399 | DEBUG    | graia.ariadne.adapter:fetch_cycle:391 - websocket: received pong
    2021-12-03 10:47:47.477 | INFO     | graia.ariadne.app:launch:1286 - Remote version: 2.3.3
    2021-12-03 10:47:47.477 | INFO     | graia.ariadne.app:launch:1289 - Application launched with 0.15s
    ```
5. 给你的bot随便发一条消息
    ```bash
    2021-12-03 10:49:45.350 | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
    2021-12-03 10:49:45.478 | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- 不要说你好，来点涩图
    ```

<ChatPanel title="GraiaX-Community">
  <ChatMessage name="GraiaX" onright=true>你好</ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.png')">不要说你好，来点涩图</ChatMessage>
</ChatPanel>