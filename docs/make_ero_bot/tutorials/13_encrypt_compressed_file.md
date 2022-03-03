# 13. 无内鬼，来点加密压缩包

::: danger 重要警告
以下篇章教学的东西将成为**真正意义上**能够发送**真正意义上的**涩图的功能，
请务必在看本章节的时候摸着自己的良心，不要干出任何违法的事情。

关于加密压缩包的部分，其实还没写……
:::

::: warning
有种草草收尾的感觉。。。
:::

众所周知，QQ 因为某种原因，是不能出现那种很涩的图片的，
不过呢，我们可以通过一些奇奇怪怪的方法来绕过这些限制。
比如说，群文件<img src="/images/tutorials/8_wangwang.webp" height=20 style="vertical-align:text-bottom">。

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

斯巴拉西，这是什么梦寐以求的功能啊！那就让我们赶快进入今天的涩涩创想吧！

## 13.1 文件操作（上传）

首先，又到了我们经典的举例子时间~

``` python{15}
...
from graia.ariadne.message.parser.twilight import MatchResult

@channel.use(ListenerSchema(
    listening_events=[GroupMessage],
    decorators=[Twilight.from_command("涩图来 {tag}")]
))
async def upload_file(app: Ariadne, group: Group, tag: MatchResult):
    if tag.result.asDisplay() != "紧身衣":
        return # 因为这只是一个简单的教程，所以我们就指定tag好了

    # 破天荒出现的秘密文件desu
    url = "https://raw.githubusercontent.com/GraiaCommunity/EroEroBot/master/data/secret.pdf"
    async with aiohttp.request("GET", url=url) as r:
        secret_pdf = await r.read()
    await app.uploadFile(data=secret_pdf, target=group, name="紧身衣.pdf")
```

说真的，挺简单的，这里唯一的重点，就是这个 `app.uploadFile`，
当然，仅仅是这一个例子还是不太够，我们要更深入一点：

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
`Mirai` **只支持**群文件，**并不支持**好友文件的发送及管理<br>
target 的 `Type Hint` 有 `Friend` 的原因仅仅是因为 `万一哪一天支持了` 而出现的
:::

首先是最重要的 `data`，说白了就是文件的二进制数据，不过要注意，你写一个文件路径进去是不行的，你只能传数据/数据流进去。

::: tip
可能有些小白可能看不懂这个 `Union[bytes, io.IOBase, os.PathLike]` 是什么意思，
所以在这里给大家介绍一下 `data` 可以传入的几种类型（并不全面 desu）：

- `bytes`
- `io.BytesIO` `io.StringIO`
- `typing.BinaryIO` （如 `open("secret.txt")`）
- `pathlib.Path` （`pathlib`，好东西，建议去学学）
:::

然后是 `path` 和 `name`，事实上这个很容易理解：

- `path` 就是你要上传到的文件夹
- `name` 就是你上传文件的名字

::: tip TIPS
事实上，你可以通过 `path="sese/setu.jpg"` 的方式，来达到与
`path="sese", name="setu.jpg"` 相同的效果。

因为 QQ 的限制，群文件并不能做到文件夹里有文件夹，所以
`path="sese/sese/setu.jpg"` 会被识别成 `path="sese" name="sese/setu.jpg"`。

不过如果填写 `path="sese/sese" name="setu.jpg"`，
将会直接将 `path` 和 `name` 传递给 `mah`。

还是因为 QQ 的限制，群文件名不能带有 `\/:*?"<>|`。
:::

## 13.2 文件类型

然后，最后，就是返回值 `FileInfo`。

大致是长这样：

``` python{3,8}
class FileInfo(AriadneBaseModel):
    name: str # 文件名
    path: str # 路径
    id: Optional[str] # 文件 ID
    parent: Optional["FileInfo"] # 文件所在目录，如果没有这个属性则说明在根目录
    contact: Optional[Union[Group, Friend]] # 文件所在位置 (群组)
    is_file: bool # 是否为文件
    is_directory: bool # 是否为目录
    download_info: Optional[DownloadInfo] # 下载信息
```

讲一下画高亮的部分：

1. `id`：QQ 使用 `文件 ID` 作为文件的唯一识别码<Curtain>要不然你用 QQ 群文件怎么会允许同名群文件</Curtain>。<br>
    事实上，后面会讲的一切操作（如重命名，移动文件），都会需要 `文件 ID`。

2. `download_info`：如变量名所说，这个就是下载信息，这其中包含了包括文件 MD5 等一系列下载所需要的东西。

    ``` python
    class DownloadInfo(AriadneBaseModel):
        sha: str # 文件 SHA256
        md5: str # 文件 MD5
        download_times: int # 下载次数
        uploader_id: int # 上传者 QQ 号
        upload_time: datetime # 上传时间
        last_modify_time: datetime # 最后修改时间（如重命名则为修改）
        url: Optional[str] # 下载 url
    ```

## 13.3 批量下载

事实上，我们已经大致了解了群文件的大致构造了，那就让我们来做一个批量下载群文件中图片的代码例子吧~

``` python
# 全是缩进警告
async def download_setu(app: Ariadne, group: Group):
    os.makedirs("download", exist_ok=True) # 创建一个 download 文件夹
    async for file in app.getFileIterator(group):
        if file.name.split(".")[-1] in ["jpg", "jpeg", "png"]:
            download_info = (await app.getFileInfo(group, file.id, with_download_info=True)).download_info
            async with aiohttp.request("GET", download_info.url) as r:
                with open(f"download/{file.name}", "wb") as f:
                    while chunk := await resp.content.read(8192):
                        f.write(chunk)
```

::: tip
事实上，获取 `DownloadInfo` 需要额外调用 API，
所以在遍历的情况下，我们不太建议将 `getFileIterator` 的 `with_download_info` 参数设置为 `True`，
要不然会让速度变慢（假设你群文件全是图片的话可能情况就又不相同了）。

建议不要下载太快，要不然可能群文件相关 API 会被风控~
:::
