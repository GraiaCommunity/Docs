# 快速上手

<h2>你好，来点涩图 —— 创建一个最小实例</h2>

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
           # 以下3行请按照你的 MAH 配置来填写
           host="http://localhost:8080",  # 同 MAH 的 port
           verify_key="GraiaxVerifyKey",  # 同 MAH 配置的 verifyKey
           account=1919810,  # 机器人 QQ 账号
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

::: interlink
**相关链接:** <https://graia.readthedocs.io/quickstart/>
:::
