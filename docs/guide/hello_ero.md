# 快速上手

<h2>你好，来点涩图 —— 创建一个最小实例</h2>

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ```python
   import asyncio

   from graia.ariadne.app import Ariadne
   from graia.ariadne.connection.config import (
       HttpClientConfig,
       WebsocketClientConfig,
       config,
   )
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
   from graia.ariadne.model import Group, MiraiSession

   loop = asyncio.new_event_loop()
   bcc = Broadcast(loop=loop)
   Ariadne.config(loop=loop, broadcast=bcc)
   app = Ariadne(
       connection=config(
           114514,  # 你的机器人的 qq 号
           "verifyKey",  # 填入 verifyKey
           # 以下两行是你的 mirai-api-http 地址中的地址与端口
           # 默认为 "http://localhost:8080" 如果你没有改动可以省略这两行
           HttpClientConfig(host="http://11.45.1.4:19810"),
           WebsocketClientConfig(host="http://11.45.1.4:19810"),
       ),
   )


   @bcc.receiver(GroupMessage)
   async def setu(app: Ariadne, group: Group, message: MessageChain):
       if str(message) == "你好":
           await app.send_message(
               group,
               MessageChain(f"不要说{message.display}，来点涩图"),
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
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:109 - launchable components count: 4
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:110 - launch all components as async task...
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:task_done_cb:153 - [elizabeth.connection.242679293.http_client_connection] running completed.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | launart.manager:launch:182 - Layer #0:[http.universal_client] preparation completed.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | launart.manager:launch:182 - Layer #2:[elizabeth.service] preparation completed.
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:187 - all components prepared, blocking start.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | graia.ariadne.connection.ws:_:56 - Successfully got session key
   ```

   ::::

5. 给你的 bot 随便发一条消息

   ```txt:no-line-numbers
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log:64 - 1919810: [Graiax(114514)] -> '你好'
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log:64 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

   <ChatWindow title="Graia Framework Community">
      <ChatMsg name="GraiaX" onright>你好</ChatMsg>
      <ChatMsg name="EroEroBot" avatar="/avatar/ero.webp">不要说你好，来点涩图</ChatMsg>
   </ChatWindow>

::: interlink
**EroEroBot:**  
本章完整示例可在 [EroEroBot/main-base.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/main-base.py) 找到。  
你可以在[此处](https://github.com/GraiaCommunity/EroEroBot/releases/tag/release)下载预配置好的模板（不定期更新）。

**相关链接:** <https://graia.readthedocs.io/quickstart/>
:::
