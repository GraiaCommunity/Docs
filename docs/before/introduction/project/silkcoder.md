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
（注：这里的 `wav` 格式特指内容为 PCM 音频的 WAVE_FORMAT_PCM）

而 silkcoder 对于其他音频格式的转换则需要使用其他的方法  
在这里，我们提供了如下两种编解码器来解决这个问题

- ffmpeg
  - 优点：几乎所有音频格式他都能进行转换
  - 缺点：
    - 完整版的他非常庞大（完整功能的 ffmpeg Windows 二进制文件大小达 100Mb+）
    - 配置有点难顶（在不使用 imageio-ffmpeg 的情况下）
- libsndfile
  - 优点：小（bin只有1Mb），支持 mp3, flac, ogg/opus 等音频
  - 缺点：不支持 aac 音频

::::code-group
:::code-group-item 只需要本体

```bash
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
