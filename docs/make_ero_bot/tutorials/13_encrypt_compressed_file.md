# 13. 无内鬼，来点加密压缩包

::: danger 重要警告
以下篇章教学的东西将成为**真正意义上**能够发送**真正意义上的**涩图的功能  
请务必在看本章节的时候摸着自己的良心  
不要干出任何违法的事情  
:::

::: warning
还没写完，所以感觉挺乱的
:::

众所周知，QQ 因为某种原因，是不能出现那种很涩的图片的  
不过呢，我们可以通过一些奇奇怪怪的方法来绕过这些地方  
比如说，群文件<img src="/images/tutorials/8_wangwang.webp" height=20 style="vertical-align:text-bottom">

<ChatPanel title="GraiaCommunity">
  <ChatMessage name="GraiaX" onright>来一打紧身衣涩图</ChatMessage>
  <ChatMessage name="EroEroBot" :avatar="$withBase('/avatar/ero.webp')">
    <div style="width: 200px">
      <img src="/images/tutorials/13_compressed_file.svg" class="no-zoom" style="
        width: 30px;
        border-radius:10px;
        border: solid 10px var(--c-details-bg);
        background-color: var(--c-details-bg);
        vertical-align:top;
        margin-right: 10px"/>
      <strong>secret.zip</strong> (6.33Mb)
    </div>
    <hr style="border-top: 2px solid var(--c-details-bg); color: var(--c-details-bg)"/>
    <div style="float:left; font-size: 0.75em">来自群文件</div>
    <div style="float:right; font-size: 0.75em; color: #12B7F5">
      <a onclick="window.open('https:\/\/www.bilibili.com/video/BV1GJ411x7h7', '_blank')" target="_blank" style="color: #12B7F5">打开</a>&nbsp;
      <a onclick="window.open('https:\/\/www.bilibili.com/video/BV1GJ411x7h7', '_blank')" target="_blank" style="color: #12B7F5">打开文件夹</a>&nbsp;
      <a onclick="window.open('http:\/\/connect.qq.com/widget/shareqq/index.html?url=https:\/\/www.bilibili.com/video/BV1GJ411x7h7&sharesource=qzone&title=你被骗了&pics=https:\/\/i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg&summary=NeverGonnaGiveYouUp&desc=NeverGonnaGiveYouUp', '_blank')" target="_blank" style="color: #12B7F5">转发</a>&nbsp;
      <div style="width:10px; height:2px;border-top:6px double;border-bottom:2px solid;display: inline-block;" onclick="window.open('https:\/\/www.bilibili.com/video/BV1GJ411x7h7', '_blank')"></div>
    <div style="width:1px; height:2px;border-top:6px double;border-bottom:2px solid;display: inline-block;"></div></div>
  </ChatMessage>
</ChatPanel>

斯巴拉西，这是什么梦寐以求的功能啊  
那就让我们赶快进入今天的涩涩创想吧

## 文件操作（上传）

::: tip
因为[某种因素](https://github.com/GraiaProject/Ariadne/issues/108)  
中文文件名会被 UrlEncode  
不过该问题已经在 `Ariadne 0.6.0rc1` 被修复
:::

首先，又到了我们经典的举例子时间~

``` python{15}
...

@channel.use(ListenerSchema(
    listening_events=[GroupMessage],
    decorators=[Twilight.from_command("涩图来 {tag}")]
))
async def upload_file(app: Ariadne, group: Group, tag: ParamMatch):
    if tag.result.asDisplay() != "紧身衣":
        return # 因为这只是一个简单的教程，所以我们就指定tag好了

    # 破天荒出现的秘密文件desu
    url = "https://raw.githubusercontent.com/GraiaCommunity/EroEroBot/master/data/secret.pdf"
    async with aiohttp.request("GET", url=url) as r:
        secret_pdf = await r.read()
    await app.uploadFile(data=secret_pdf, target=group, name="紧身衣.pdf")
```

说真的，挺简单的，这里唯一的重点，就是这个 `app.uploadFile`  
当然，仅仅是这一个例子还是不太够，我们要更深入一点

``` python{3,6-7}
async def uploadFile(
    self,
    data: Union[bytes, io.IOBase, os.PathLike], # 要上传的数据/数据流
    method: Union[str, UploadMethod] = None, # 上传方法，不用管
    target: Union[Friend, Group, int] = -1, # 要上传的群
    path: str = "", # 群文件路径
    name: str = "", # 文件名字
) -> "FileInfo":
```

::: tip
`Mirai` **只支持**群文件，**并不支持**好友文件的发送及管理<br/>
target 的 `Type Hint` 有 `Friend` 的原因仅仅是因为 `万一哪一天支持了` 而出现的
:::

首先是最重要的 `data`，说白了就是文件数据  
不过要注意，你写一个文件路径进去是不行的，你只能传数据/数据流进去

::: tip
可能有些小白可能看不懂这个 `Union[bytes, io.IOBase, os.PathLike]` 是什么意思  
所以在这里给大家介绍一下 `data` 可以传入的几种类型（并不全面 desu）

- `bytes`
- `io.BytesIO` `io.StringIO`
- `typing.BinaryIO` （如 `open("secret.txt")`）
- `pathlib.Path` （`pathlib`，好东西，建议去学学）
:::

然后是 `path` 和 `name`，事实上这个很容易理解

`path` 就是你要上传到的文件夹  
`name` 就是你上传文件的名字

::: tip TIPS
事实上，你可以通过 `path="sese/setu.jpg"` 的方式  
来达到与 `path="sese", name="setu.jpg"` 相同的效果

因为 QQ 的限制，群文件并不能做到文件夹里有文件夹  
所以 `path="sese/sese/setu.jpg"` 会被识别成 `path="sese" name="sese/setu.jpg"`

不过如果填写 `path="sese/sese" name="setu.jpg"`  
将会直接将 `path` 和 `name` 传递给 `mah`

还是因为 QQ 的限制  
群文件名不能带有 `\/:*?"<>|`
:::

## 文件类型

然后，最后，就是返回值 `FileInfo`  

大致是长这样：

``` python
    name: str # 文件名
    path: str # 路径
    id: Optional[str] # 文件 ID
    parent: Optional["FileInfo"] # 文件所在目录，如果没有这个属性则说明在根目录
    contact: Optional[Union[Group, Friend]] # 文件所在位置 (群组)
    is_file: bool # 是否为文件
    is_directory: bool # 是否为目录
    download_info: Optional[DownloadInfo] # 下载信息
```

其他
事实上，QQ 使用 `文件 ID` 作为文件的唯一识别码<Curtain>要不然你用 QQ 群文件怎么会允许同名群文件</Curtain>

<p align="center" style="font-size: 1.6rem; margin: 5px auto">loading...</p>
<p align="center" style="margin: 5px auto"><Curtain>等一下先</Curtain></p>
<Loading></Loading>
