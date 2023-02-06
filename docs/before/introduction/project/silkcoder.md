# GraiaX Silkcoder

A fxxxing simple silkv3 converter

<project-info
    name="graiax-silkcoder"
    license="MIT"
    version="v0.3.5"
    author="I-love-study"
    repoUser="I-love-study"
    repoName="graiax-silkcoder"
/>

发送语音的利器。

## 安装

::::code-group
:::code-group-item PDM

```bash
pdm add graiax-silkcoder
```

:::
:::code-group-item Poetry

```bash
poetry add graiax-silkcoder
```

:::
:::code-group-item PIP

```bash
pip install graiax-silkcoder
```

:::
::::

## 多个编解码器支持

这里我们着重讲一下  
事实上，`graiax-silkcoder` 本体，**只有**wav/pcm格式转silk格式的能力。  
也就是说，如果你的系统**非常滴干净**，那 `silkcoder` 就只支持 `wav` 格式。  
（注：这里的 `wav` 格式特指内容为 PCM 音频的 `WAVE_FORMAT_PCM`）

::: details 小贴士

如果你不知道你的音频文件是不是 `WAVE_FORMAT_PCM`  
可以通过下面的代码来判断，如果不报错，那就是了

``` python
import wave
wave.open("你要测试的wav.wav")
```

:::

而 silkcoder 对于其他音频格式的转换则需要使用其他的方法  
在这里，我们提供了如下两种编解码器来解决这个问题

- ffmpeg
  - 优点：几乎所有音频格式他都能进行转换
  - 缺点：
    - 完整版的他非常庞大（完整功能的 ffmpeg Windows 二进制文件大小达 100Mb+）
    - 配置有点难顶（在不使用 imageio-ffmpeg 的情况下，需要自行下载 + 自己设置环境变量）
- libsndfile
  - 优点：小（bin 只有 1Mb），支持 mp3, flac, ogg/opus 等音频
  - 缺点：不支持 aac 音频（一般体现为以 `.m4a` 为后缀的文件）

::::code-group
:::code-group-item 只需要本体

```bash
# 需要自行配置 ffmpeg
graiax-silkcoder
```

:::
:::code-group-item 需要 ffmpeg (imageio-ffmpeg)

```bash
graiax-silkcoder[ffmpeg]
```

:::
:::code-group-item 需要 libsndfile

```bash
graiax-silkcoder[libsndfile]
```

:::
::::

## 怎么用

好了，终于讲到了最关键的地方了。  
不过现在懒得写，假设急用的话可以看看库的 [Readme](https://github.com/I-love-study/graiax-silkcoder/blob/master/README.md)

<Loading></Loading>

## 小调试

为了调试方便，本库还提供了 cli 功能  
能够让用户直接通过命令行的形式对文件进行转码/播放

举个例子

``` powershell
python -m graiax.silkcoder encode -i "a.wav" "a.silk"
python -m graiax.silkcoder decode -i "a.silk" "a.wav"
```

在这里就~~恬不知耻地~~贴一份 `help` 生成地使用指南

``` bash
#encode
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

#decode
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

然后我们为 Windows 用户还保留了一个新功能

得益于 Python 的 Windows 标准库中有能够播放声音的库  
`silkcoder` 在 Windows 下能实现直接转码播放的功能，可通过如下方法实现

``` powershell
python -m graiax.silkcoder play xxx.silk
```
