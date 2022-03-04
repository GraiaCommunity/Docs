# 1. 来点涩图

## 注意事项

1. **本文档将会默认你至少学过一点点 `Python`，假设你连 Python 都不会，建议至少学点 Python 基础再来看；**
2. **本文档将假设你具有一定的英语阅读能力，并能对工具软件的提示作出自己的决定；**
3. **本文档将会使用 `poetry` 作为依赖和虚拟环境管理工具；**
   ::: warning
   关于为什么用 `poetry`，你可以看这里 :point_right: [看这](../before/Q&A.md#_4-关于-poetry)
   :::

4. **本文档将使用 `graia-ariadne` 0.6.1 及以上的版本**，部分内容可能仍为旧版本但不影响食用；  
   ::: tip
   因为文档会随着 `graia-ariadne` 版本的更新而更新，所以我**强烈推荐**你直接安装最新版本（latest）  
   现在的 `graia-ariadne` 的最新版本为 <img src="https://img.shields.io/pypi/v/graia-ariadne?color=2970b6&amp;label=PyPI版本&amp;style=for-the-badge" alt="PyPI版本" style="vertical-align: middle">
   :::
5. 虽然 `Ariadne` 支持 Python 3.8~3.10 但为了**最佳体验**，我们建议你最好升级到 `Python3.9+`；
6. **本文档部分内容可能未及时更新或不全**，因此你可以在本文档的一些页面见到如下的提示框，他们通常指向相关的文档。
   ::: interlink
   **相关链接：**<https://graia.readthedocs.io/>
   :::

## 1.1 创建项目

新建一个项目文件夹，这里我们就叫 `EroEroBot` 吧 （<Curtain>PeroPero 震怒</Curtain>），并进入该文件夹内：

``` bash
mkdir EroEroBot
cd EroEroBot
```

然后输入 `poetry init` 开始创建环境，你就会看到类似下面的提示：

``` bash
$ poetry init

This command will guide you through creating your pyproject.toml config.

Package name [EroEroBot]:
Version [0.1.0]:
Description []:
Author [GraiaCommunity <example@graiax.cn>, n to skip]:  n  # 注意，这里要你自己填写 n
License []:
Compatible Python versions [^3.9]:

Would you like to define your main dependencies interactively? (yes/no) [yes] n  # 注意，这里要你自己填写 n
Would you like to define your development dependencies interactively? (yes/no) [yes] n  # 注意，这里要你自己填写 n
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


Do you confirm generation? (yes/no) [yes] y  # 注意，这里要你自己填写 y
```

::: tip
国内连接 Pypi 非常慢，所以我们在定义依赖与开发依赖时填 no  
后面设置了镜像源之后再自己添加依赖
:::

完成之后，你的项目文件夹内应该会出现一个 `pyproject.toml` 文件。

为了防止后续添加依赖时等待太久，可以修改 `pyproject.toml` 来添加国内镜像加速站，打开该文件后在文件末尾添加如下内容即可：

``` toml
[[tool.poetry.source]]
# 这里以清华源举例，你也可以使用其他源
name = "tuna-tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = false
```

## 1.2 启用虚拟环境并安装 `graia-ariadne`

在配置好环境之后，你需要给你的项目创建一个虚拟环境并安装 `graia-ariadne`，在项目根目录执行如下命令：

``` bash
poetry env use python3.9  # 如果你设备里只有一个版本的 Python 或你想使用最新版本，则这一条命令可以不执行
poetry add graia-ariadne[full]
```

::: tip TIPS

1. Ariadne 自 0.6.1 版本起添加了 `Reverse Adapter`（反向 HTTP / WebSockets 适配器），
   假设你并不需要 `ReverseAdapter`，你可以直接把上述的 `graia-ariadne[full]`
   换成 `graia-ariadne[graia]` 或 `graia-ariadne[graia,alconna]`。

   此外 Ariadne 其实有好几种 Extra deps（可选依赖），如下所示：

   - graia-ariadne[graia]
      - graia-saya —— 模块化（[第11章](./11_classification.md)用到）
      - graia-scheduler —— 定时任务（[第10章](./10_ohayou_oniichan.md)用到）
   - graia-ariadne[alconna]
      - arclet-alconna —— 消息链处理器（[第6章第4节](./6_4_alconna.md)）
   - graia-ariadne[server]
      - fastapi —— 用于 `ReverseAdapter` 反向连接器（挖坑）
      - uvicorn —— 运行 `fastapi` 所需要的容器

   而 `graia-ariadne[full]` 则会安装以上所有非必要组件。

2. 假设你不怎么喜欢整虚拟环境也可以使用如下命令来取消虚拟环境的创建。

   ``` bash
   poetry config virtualenvs.create false
   ```

3. 你的运行结果可能跟我有所不同，但是大致应该是差不多的。
:::

:::: details 命令输出

``` bash
$ poetry env use 3.9

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using virtualenv: /root/.cache/pypoetry/virtualenvs/EroEroBot-BexBd8Xq-py3.9
```

``` bash
$ poetry add graia-ariadne[full]

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using version ^x.x.x for graia-ariadne

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 24 installs, 0 updates, 0 removals

  • Installing six (x.x.x)
  • Installing colorama (x.x.x)
  • Installing frozenlist (x.x.x)
  • Installing idna (x.x.x)
  • Installing multidict (x.x.x)
  • Installing python-dateutil (x.x.x)
  • Installing win32-setctime (x.x.x)
  • Installing aiosignal (x.x.x)
  • Installing async-timeout (x.x.x)
  • Installing croniter (x.x.x)
  • Installing graia-broadcast (x.x.x)
  • Installing attrs (x.x.x)
  • Installing typing-extensions (x.x.x)
  • Installing charset-normalizer (x.x.x)
  • Installing loguru (x.x.x)
  • Installing wcwidth (x.x.x)
  • Installing yarl (x.x.x)
  • Installing aiohttp (x.x.x)
  • Installing arclet-alconna (x.x.x)
  • Installing graia-scheduler (x.x.x)
  • Installing pydantic (x.x.x)
  • Installing graia-saya (x.x.x)
  • Installing prompt-toolkit (x.x.x)
  • Installing graia-ariadne (x.x.x)
```

::::

## 1.3 快速创建一个最小实例

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ``` python
   from graia.ariadne.app import Ariadne
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
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
       await app.sendGroupMessage(
           group,
           MessageChain.create(f"不要说{message.asDisplay()}，来点涩图"),
       )


   app.launch_blocking()
   ```

4. 保存，并且使用命令 `poetry run python bot.py` 运行

   ::: tip 注意
   一定要记得在运行之前启动 `mcl (mirai-console-loader)`  
   关于 `mcl` 的配置，请看 :point_right: [这里](../before/Q&A.md#_3-关于-mirai-环境)
   :::

   之后，你会看到显示如下信息输出：

   :::: details 命令输出
   ``` bash
   $ poetry run python bot.py
                   _           _
        /\        (_)         | |
       /  \   _ __ _  __ _  __| |_ __   ___
      / /\ \ | '__| |/ _` |/ _` | '_ \ / _ \
     / ____ \| |  | | (_| | (_| | | | |  __/
    /_/    \_\_|  |_|\__,_|\__,_|_| |_|\___|
   Ariadne version: x.x.x
   Saya version: x.x.x
   Broadcast version: x.x.x
   Scheduler version: x.x.x
   2022-02-15 17:12:16.320 | INFO     | graia.ariadne.app - Launching app...
   2022-02-15 17:12:16.321 | INFO     | graia.ariadne.adapter - websocket: connected
   2022-02-15 17:12:16.332 | INFO     | graia.ariadne.adapter - websocket: ping task created
   2022-02-15 17:12:16.333 | INFO     | graia.ariadne.app - Remote version: x.x.x
   2022-02-15 17:12:16.334 | INFO     | graia.ariadne.app - Application launched with 0.012s
   2022-02-15 17:12:16.335 | INFO     | graia.ariadne.app - daemon: adapter started
   ```
   ::::

5. 给你的 bot 随便发一条消息

   ``` bash
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
