# GraiaX Silkcoder

A fxxxing simple silkv3 converter.  
一个超简单的 silkv3 转换器。

<project-info
    name="graiax-silkcoder"
    license="MIT"
    version="v0.3.6"
    author="I-love-study"
    repoUser="I-love-study"
    repoName="graiax-silkcoder"
/>

由于 QQ 只支持播放 `silkv3` 格式的语音，因此我们不能直接发送 `mp3`、`wav`
等格式的文件，需要先进行转码。**GraiaX Silkcoder** 是一个可以便捷地将音频文件转换为 `silkv3`
格式的库（支持 `async`）。

## 安装

::::code-group
:::code-group-item PDM

```sh
pdm add graiax-silkcoder
```

:::
:::code-group-item Poetry

```sh
poetry add graiax-silkcoder
```

:::
:::code-group-item PIP

```sh
pip install graiax-silkcoder
```

:::
::::

## 安装后的配置

::: warning
你一定很好奇为什么不先讲讲用法。我跟你<ruby>酱<rt>jiǎng</rt></ruby>哦，
这里的环境配置是灰常重要的。如果不好好配置，你就会出现非常多的 `bug`。
:::

### 来自 Windows 可能出现的 bug

对于**纯净的** Windows 来说，当你使用该插件的时候，很有可能会出现这个报错：

```shell
# 英文系统
...
File "<省略的路径名>\graiax\silkcoder\silkv3.py", line 1, in <module>
    from . import _silkv3
ImportError: DLL load failed while importing _silkv3: The specified module could not be found.
# 中文系统
...
File "<省略的路径名>\graiax\silkcoder\silkv3.py", line 1, in <module>
    from . import _silkv3
ImportError：DLL load failed while importing _silkv3：找不到指定的模块
```

烦诶，为什么会这样。原因很简单——**太干净了**

解决方法也很简单：只要下载[这个](https://aka.ms/vs/17/release/vc_redist.x64.exe)，然后安装他，就能解决了。

### 编解码器的选择

这里我们着重讲一下事实上，**GraiaX Silkcoder** 本体，**只有**wav/pcm格式转silk格式的能力。  
也就是说，如果你的系统**非常滴干净**，那 **GraiaX Silkcoder** 就只支持 `wav` 格式。  
（注：这里的 `wav` 格式特指内容为 PCM 音频的 `WAVE_FORMAT_PCM`）

:::details 小贴士

如果你不知道你的音频文件是不是 `WAVE_FORMAT_PCM`  
可以通过下面的代码来判断，如果不报错，那就是了.

```python
import wave
wave.open("你要测试的wav.wav")
```

:::

而 silkcoder 对于其他音频格式的转换则需要使用其他的方法。  
在这里，我们提供了如下两种编解码器来解决这个问题：

- FFmpeg
  - 优点：几乎所有音频格式他都能进行转换
  - 缺点：
    - 完整版的他非常庞大（完整功能的 FFmpeg Windows 二进制文件大小达 100Mb+）
    - 配置有点难顶（在不使用 imageio-ffmpeg 的情况下，需要自行下载 + 自己设置环境变量）
- libsndfile
  - 优点：小（bin 只有 1Mb），支持 mp3, flac, ogg/opus 等音频
  - 缺点：不支持 aac 音频（一般体现为以 `.m4a` 为后缀的文件）

::::code-group
:::code-group-item 只需要本体

```sh
# 如果需要转换非 wav 音频，则需要自行安装与配置 FFmpeg
graiax-silkcoder
```

:::
:::code-group-item 需要 ffmpeg (imageio-ffmpeg)

```sh
# 通过下面的方式使用 imageio-ffmpeg 中的 FFmpeg
graiax-silkcoder[ffmpeg]
```

:::
:::code-group-item 需要 libsndfile

```sh
graiax-silkcoder[libsndfile]
```

:::
::::

:::warning 警告
如果在 ARM 平台的 Windows 系统下安装时出现
`error: Microsoft Visual C++ 14.0 is required:`
或类似错误（或错误信息中含有 **BuildTools** 字眼），
这是因为~~懒狗~~作者并没有给 ARM 平台的 Windows 制作 whl 包。
这种情况下则需要安装
**Microsoft Visual BuildTools** 后再安装 **GraiaX Silkcoder**。

- [目前正式版BuildTools](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)
- [Visual Studio 2015 BuildTools](https://www.microsoft.com/zh-CN/download/details.aspx?id=48159)
- [Visual Studio 2017 BuildTools](https://aka.ms/vs/15/release/vs_buildtools.exe)
- [Visual Studio 2019 BuildTools](https://aka.ms/vs/16/release/vs_buildtools.exe)
- [Visual Studio 2022 BuildTools](https://aka.ms/vs/17/release/vs_buildtools.exe)

:::

## 怎么用

好了，终于讲到了最关键的地方了。

:::tip
因为同步和异步的区别只有前面是否有一个 `async_`，例如将 `silkcoder.encode("a.wav")`
替换为 `await silkcoder.async_encode("a.wav")`，所以下面我们就只拿同步方法举例子了。
:::

### 编码

你可以传入 `pathlike` 和 `bytes` 作为你的输入

```python
from io import BytesIO
from pathlib import Path
from graiax import silkcoder

data: bytes = silkcoder.encode("a.wav")  # 路径
data: bytes = silkcoder.encode(Path("a.wav"))  # 路径
data: bytes = silkcoder.encode(Path("a.wav").read_bytes())  # bytes
data: bytes = silkcoder.encode(BytesIO(Path("a.wav").read_bytes()))  # bytes
```

它能输出到 `bytes`（上一部分）、`pathlike` 和 `filelike`：

```python
from io import BytesIO
from pathlib import Path
from graiax import silkcoder

data: bytes = silkcoder.encode("a.wav")

silkcoder.encode("a.wav", "a.silk")  # 路径到路径
silkcoder.encode("a.wav", Path("a.silk"))  # 路径到路径
silkcoder.encode("a.wav", BytesIO())  # 路径到 filelike
```

它能做到截取音频的一部分来编码：

```python
from graiax import silkcoder

# 从最开始截取 5s
silkcoder.encode("a.wav", "a.silk", t=5)
# 从第 10s 开始截取 5s
silkcoder.encode("a.wav", "a.silk", ss=10, t=5)
```

你可以指定你的编码器：

```python
from graiax import silkcoder
from graiax.silkcoder import Codec

silkcoder.encode("a.mp3", "a.silk", codec = Codec.libsndfile)  # 指定使用 libsndfile
silkcoder.encode("a.mp3", "a.silk", codec = Codec.ffmpeg)  # 指定使用 FFmpeg
```

在 **FFmpeg** 模式下，你甚至可以直接传入 **FFmpeg** 的参数：

```python
from graiax import silkcoder

# 虽然 -vn 是可有可无，但我想不出其他例子了~
silkcoder.encode(
    "a.mp4",
    "a.silk",
    codec = Codec.ffmpeg,
    ffmpeg_para = ["-vn"]
)
```

你还可以指定输出的 **silk** 音频的码率大小：

```python
from graiax import silkcoder

# 默认状态下将会将尝试将目标语音大小限制在980kb上下
silkcoder.encode("a.wav", "a.silk", rate = 70000)
```

### 解码

跟编码一样，你的输入和输出都支持 `pathlike`、`str`、`bytes`

在**非 wave** 模式下，你可以写 **metadata**：

```python
from graiax import silkcoder
from graiax.silkcoder import Codec

metadata = {
    "title": "xx群",
    "artist": "xx网友"
}

# Tips： 如果你硬是选了 wave，他会忽略 metadata 参数而不是报错
silkcoder.decode(
    "a.silk", "a.flac",
    codec = Codec.libsndfile,
    metadata = metadata
)
```

在 **FFmpeg** 模式下，你可以选择输出的码率（仅对于有损格式）。
在 **libsndfile** 模式下，你可以选择输出的质量（vbr）（仅对于有损格式）。

```python
from graiax import silkcoder
from graiax.silkcoder import Codec

# 使用 FFmpeg 转换成 128kbps 的 mp3
silkcoder.decode(
    "a.silk", "a.mp3",
    codec = Codec.ffmpeg,
    rate = 128000
)

# 使用libsndfile 转换为 压缩率最大 的 flac（注，quality 参数只能在 0~1 之间）
silkcoder.decode(
    "a.silk", "a.flac",
    codec = Codec.libsndfile,
    quality = 1
)
```

你甚至可以在 FFmpeg 模式下输入 FFmpeg 的参数：

```python
from graiax import silkcoder

silkcoder.decode("a.silk", "a.mp3", ffmpeg_para = ["-ar", "44100"])
```

## 小调试

为了调试方便，自 `0.2.0` 版起，本库还提供了 cli 功能，
能够让用户直接通过命令行的形式对文件进行转码/播放。

举个例子：

```sh
python -m graiax.silkcoder encode -i "a.wav" "a.silk"
python -m graiax.silkcoder decode -i "a.silk" "a.wav"
```

在这里就~~恬不知耻地~~贴一份 `help` 生成地使用指南：

```sh
# encode
$ python -m graiax.silkcoder encode -h
usage: silkcoder encode [-h] -i I [--audio_format AUDIO_FORMAT] [--codec {wave,ffmpeg,libsndfile}] [--rate RATE] [-ia]
                        [-ss SS] [-t T]
                        output

positional arguments:
  output                输出文件名

options:
  -h, --help            show this help message and exit
  -i I                  输入文件
  --audio_format AUDIO_FORMAT
                        音频格式，默认为None
  --codec {wave,ffmpeg,libsndfile}
                        编码器(如果需要) 默认为None
  --rate RATE           silk码率 默认为None 编码情况下此时编码器将会尝试将码率限制在980kb(若时常在10min内，将严守1Mb线)
  -ia, --ios-adaptive   ios适配（控制最高码率在24kbps），默认关闭
  -ss SS                开始读取时间,对应ffmpeg/avconc中的ss(只能精确到秒) 默认为0(如t为0则忽略)
  -t T                  持续读取时间,对应ffmpeg/avconc中的t(只能精确到秒) 默认为0(不剪切)

# decode
$ python -m graiax.silkcoder decode -h
usage: silkcoder decode [-h] -i I [--audio-format AUDIO_FORMAT] [--codec {wave,ffmpeg,libsndfile}] [--rate RATE] output

positional arguments:
  output                输出文件名

options:
  -h, --help            show this help message and exit
  -i I                  输入文件
  --audio-format AUDIO_FORMAT
                        音频格式，默认为None
  --codec {wave,ffmpeg,libsndfile}
                        解码器(如果需要) 默认为None
  --rate RATE           输出音频码率，解码情况下则会直接传输给ffmpeg
```

然后我们为 Windows 用户还保留了一个新功能：

得益于 Python 的 Windows 标准库中有能够播放声音的库，
**GraiaX Silkcoder** 在 Windows 下能实现直接转码播放的功能，可通过如下方法实现

```sh
python -m graiax.silkcoder play xxx.silk
```

## Q&A

### 用 FFmpeg 还是 libsndfile

在该项目最开始的时候，就有人吐槽过：“为了简简单单的音频转换去下载一个大的离谱的 ffmpeg，这也太麻了吧。”  
（注：虽然说 ffmpeg 可以通过 disable 一大堆不必要视频/滤镜库来达到减小体积的目的，但是这需要自己编译，对小白挺不友好的）

所以，从 0.3.0 开始，开始增加了通过 libsndfile 来使用解析音频的特性。

> libsndfile 是一款广泛用于读写音频文件的C语言库，他支持包括 `flac`, `ogg`, `opus`, `mp3`[^1]等多种格式。

注：在同时可以使用 ffmpeg 和 libsndfile 的情况下， **GraiaX Silkcoder** 会优先使用 ffmpeg 进行转码

### 自定义 FFmpeg 的位置

可能有一些用户会想要自定义 FFmpeg 的位置（路径），你可以使用以下方法解决:

```python
from graiax import silkcoder
silkcoder.set_ffmpeg_path("./path/to/ffmpeg")
```

### iOS 音频问题

iOS 的音频解码器因为某些**特性**，只支持解码 **25kbps 以下** 的音频。
所以在 0.2.6 中，我们新增了一个 `ios_adaptive` 参数（默认为 `False`）。
当为 **True** 时，将把自适应最高码率限制在 **24kbps**
以下（一般是限制在 **100kbps** 以下），如果有 iOS 用户反馈听不到语音，你可以将该参数打开。

### FFmpeg 转换成 AAC 格式的问题

因为 **GraiaX Silkcoder** 全程采用 **PIPE** 的形式跟 **FFmpeg** 通信，
所以假设你想要将 **silk** 转码成 **AAC** 的时候，就会出现一些问题。
解决方法如下:

```python
from graiax import silkcoder
await silkcoder.async_decode("a.silk", "a.m4a", audio_format="adts")
```

[^1]: **GraiaX Silkcoder** 对 **libsndfile** 的支持来源于第三方库 **soundfile**，而该库在 **1.1.0** 之前并不支持 mp3、opus。
