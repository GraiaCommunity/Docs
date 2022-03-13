# 3.2. 八嘎 hentai 无路赛

[>_<]: 因为不知道怎么样才能把script写在md里面，没办法只能用';'来硬生生把代码连起来了

<audio id="thtlb" src="/voices/4_太好听了8.mp3"></audio>

::: danger
本文档还没有写完<Curtain type="danger">比如没准备好钉宫三连语音包，欢迎<RubyCurtain up="hentai xiong di" type="danger">
有志之士</RubyCurtain>提供</Curtain>十分建议在阅读的时候不要声音拉满 + 外放 <Curtain type="danger">除非你跟<MoreInfo words="唐可可">
<img
  src="/images/tutorials/3_2_tkk.webp"
  onmouseover="
    document.getElementById('thtlb').currentTime = 0;
    document.getElementById('thtlb').play();
  "
  onmouseout="
    document.getElementById('thtlb').pause();
  "
/></MoreInfo>一样有社交牛逼症</Curtain>
:::

虽然有点突然，但你是否有想过机器人能够对你[钉宫三连](https://zh.moegirl.org.cn/%E9%92%89%E5%AE%AB%E7%90%86%E6%83%A0)呢？

<ChatWindow title="Graia Framework Community">
  <ChatMsg name="GraiaX" onright>无路赛</ChatMsg>
  <ChatVoice name="EroEroBot" avatar="/avatar/ero.webp" audio="/voices/4_夏娜_无路赛_钉宫理惠.mp3">别戳我，好痒</ChatVoice>
</ChatWindow>

<VolumeBar front_word="贴心的音量键"></VolumeBar>

还记得上一节我们简单的讲解消息链时候，给出了这样一种构建图片元素的办法：

``` python
Image(path="./Graiax/EroEroBot/eropic.jpg")
```

很简单，对吧，只需要传入一个 `path` ，就可以构建一个图片元素实例。
如果只有这么简单，那怎么可能专门拿出一个章节来讲解这个呢？

接下来，让我们好好讲解一下图片元素的父类 —— 多媒体元素 `MultimediaElement`

## 3.2.1 什么是 MultimediaElement

多媒体元素 `MultimediaElement`，是 `graia-ariadne` 为了方便构建类似图片这种需要上传二进制数据的元素所创造的，
目前其子类包含有 `Image`、`FlashImage`、`Voice`。

下面，就让<RubyCurtain up="举例狂魔">我</RubyCurtain>给大家举几个例子：

``` python
>>> path_data = "./Graiax/EroEroBot/eropic.jpg"
>>> bytes_data: bytes = Path("./Graiax/EroEroBot/eropic.jpg").read_bytes()
>>> base64_data: str = b64encode(bytes_data).decode()

>>> Image(path=path_data)  # 通过传入 path 字符串创建 Image 对象
>>> Image(path=Path(path_data))  # 通过传入 Path 实例创建 Image 对象
>>> Image(data_bytes=bytes_data)  # 通过传入二进制数据创建 Image 对象
>>> Image(base64=base64_data)  # 通过传入 base64 编码的二进制数据创建 Image 对象
```

## 3.2.2 关于发送语音的一些小问题

~~众所周知~~ tx 服务器只接受 `amr` 跟 `silk` 两种格式的语音（其中 `silk` 格式支持更高的码率）。
而语音发送一直是困扰着 `Mirai` 用户的问题之一，与隔壁（`go-cqhttp`）不同的是，隔壁内置了语音转换器帮你转换音频格式，而我们只能自力更生。

截至目前，Python 有两个第三方库能够帮你将音频转换成 `silk`

- [graiax-silkcoder](https://pypi.org/project/graiax-silkcoder/)
- [pysilk-mod](https://pypi.org/project/pysilk-mod/)

以下我们将会以 `graiax-silkcoder` 举例，首先安装 `graiax-silkcoder`：

``` bash
# 普通安装
poetry add graiax-silkcoder
# 假设你的环境中没有安装 ffmpeg 但又需要 wav 以外的音频格式转换
poetry add graiax-silkcoder[ffmpeg]
```

快速简单地创建一个 Voice 对象：

``` python
from graiax import silkcoder

audio_bytes = await silkcoder.encode("Graiax/EroEroBot/hentai.mp3")
Voice(data_bytes=audio_bytes)
```

::: tip
详细用法请去其[Github 页面查看](https://pypi.org/project/graiax-silkcoder/)

这次就不能说我逊了，因为<RubyCurtain up="我写的 $h!t Mountain" type="tip">这就是我写的</RubyCurtain>  
（注：此处的“我”指该文档的主要作者 —— I Love Study）
:::

::: interlink
**相关链接：**  
<https://graia.readthedocs.io/basic/msg-chain/>  
<https://graia.readthedocs.io/advance/msg-chain/>
:::
