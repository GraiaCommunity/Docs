# 1. 来点涩图

## 1.1 快速创建一个单文件最小实例

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ```python
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
      if str(message) == "你好":
         await app.sendMessage(
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

   ```txt:no-line-numbers
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
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app - Launching app...
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.adapter - websocket: connected
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.adapter - websocket: ping task created
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app - Remote version: x.x.x
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app - Application launched with ?s
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app - daemon: adapter started
   ```

   ::::

5. 给你的 bot 随便发一条消息

   ```txt:no-line-numbers
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

   <ChatWindow title="Graia Framework Community">
      <ChatMsg name="GraiaX" onright>你好</ChatMsg>
      <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">不要说你好，来点涩图</ChatMsg>
   </ChatWindow>

## 1.2 创建一个最小 `Saya` 框架和插件

::: tsukkomi
你可能会好奇为什么这里会出现[第 11 章](./11_classification.md)的内容，让我来先向你解释一下为什么

直至目前，社区已经有不少基于 `graia-saya` 模块管理器 制作的机器人，这种**通过模块来管理机器人各个功能**的方式会对你后面写机器人有很大帮助。  
而且，某些模块甚至可以完全可以直接通过**复制粘贴文件**的形式直接装到你的机器人上。  
正是因为这样，所以我们决定将[第 11 章](./11_classification.md)才介绍的 `graia-saya` 模块管理器 的使用方式直接提前到本章举出最小实例。
<br/><Curtain type="tsukkomi">说白了就是想让你不要重复造轮子 desu</Curtain>
:::

1. 首先先构建一个类似于这样的框架
   ```txt:no-line-numbers
   EroEroBot
   ├─ main.py
   ├─ pyproject.toml
   └─ modules
      └─ hello_ero.py
   ```
2. 在 `main.py` 中复制粘贴这些代码

   ```python
   import asyncio
   import pkgutil

   from graia.ariadne.app import Ariadne
   from graia.ariadne.model import MiraiSession
   from graia.broadcast import Broadcast
   from graia.saya import Saya
   from graia.saya.builtins.broadcast import BroadcastBehaviour

   loop = asyncio.new_event_loop()
   bcc = Broadcast(loop=loop)
   app = Ariadne(
       MiraiSession(
           host="http://localhost:8080",
           verify_key="GraiaxVerifyKey",
           account=1919810,
           # 此处的内容请按照你的 MAH 配置来填写
       ),
   )
   saya = Saya(bcc)
   saya.install_behaviours(BroadcastBehaviour(bcc))

   with saya.module_context():
       for module_info in pkgutil.iter_modules(["modules"]):
           if module_info.name.startswith("_"):
               continue
           saya.require("modules." + module_info.name)

   app.launch_blocking()
   ```

3. 在 `hello_world.py` 中复制粘贴这些代码

   ```python
   from graia.ariadne.app import Ariadne
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
   from graia.ariadne.model import Group

   from graia.saya import Channel
   from graia.saya.builtins.broadcast.schema import ListenerSchema

   channel = Channel.current()

   @channel.use(ListenerSchema(listening_events=[GroupMessage]))
   async def ero(app: Ariadne, group: Group, message: MessageChain):
       await app.sendGroupMessage(group, MessageChain.create(
           f"不要说{message.asDisplay()}，来点涩图"
       ))
   ```

4. 使用命令 `poetry run python bot.py` 运行
   ::: tip 注意
   一定要记得在运行之前启动 `mcl (mirai-console-loader)`  
   关于 `mcl` 的配置，请看 :point_right: [这里](../before/Q&A.md#_3-关于-mirai-环境)
   :::
   :::: details 命令输出

   ```txt:no-line-numbers
   $ poetry run python bot.py
   20yy-MM-dd HH:mm:ss.SSS | DEBUG    | graia.saya:require:111 - require modules.github_repo
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.saya:require:134 - module loading finished: modules.github_repo
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
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:launch:1419 - Launching app...
   20yy-MM-dd HH:mm:ss.SSS | DEBUG    | graia.ariadne.app:daemon:1316 - Ariadne daemon started.
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.adapter:fetch_cycle:417 - websocket: connected
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.adapter:fetch_cycle:424 - websocket: ping task created
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:daemon:1321 - daemon: adapter started
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:launch:1430 - Remote version: 2.5.0
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:launch:1433 - Application launched with ?s
   ```

   ::::

5. 给你的 bot 随便发一条消息

   ```txt:no-line-numbers
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [Graiax(114514)] -> '你好'
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

   <ChatWindow title="Graia Framework Community">
      <ChatMsg name="GraiaX" onright>你好</ChatMsg>
      <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">不要说你好，来点涩图</ChatMsg>
   </ChatWindow>

::: interlink
**相关链接:** <https://graia.readthedocs.io/quickstart/>
:::
