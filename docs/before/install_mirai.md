# `Mirai` 的安装与配置

::: danger 注意
本章节写的有点 $h!t
:::

本章将会教你从 Java 的选择到 mcl 安装

## 安装 `Java`

当你看到这个，你肯定会说  
“这有什么好教的”，这你就不懂了  
就像是 Python 也有如 "PyPy" 之类的其他解释器
Java 也有很多种 JVM 选择

::: tip
虽然说 mirai 因为[某种原因](https://github.com/mamoe/mirai/discussions/779)导致并不能使用 Orcale JDK  
但是，mcl 通过一些办法解决了这个问题
所以只要是 JDK 11+，剩下的请随便
:::

### 最简单的安装方法

如果你怕麻烦，那我们先从最简单的安装方式说起

:::: code-group
::: code-group-item Ubuntu

```bash
# 非 root 的情况下记得最前面加上 sudo
apt install openjdk-17-jre
```

:::
::: code-group-item CentOS 8 / Rocky Linux 8

```bash
# 非 root 的情况下记得最前面加上 sudo
dnf install java-latest-openjdk
```

:::
::: code-group-item Windows 10 / 11

```powershell
# 假设你的电脑安装了 Winget
# 事实上，截至目前，winget 上有足足 7 个厂商的 JDK
# 因为是 Windows嘛，所以就以 Microsoft 发行的 JDK 举例
winget install Microsoft.OpenJDK.17
```

:::
::: code-group-item MacOS

```fish
# 假设你提前安装了 brew cask
# 没有，就先 "brew install brew-cask-completion"
# 事实上，brew能够安装足足 4 个厂商的 JDK
# 不过我们就按默认的来就好
brew cask install java
```

:::
::: code-group-item termux

```bash
# 不太建议在 termux 运行 mcl
# 可以看看后面的 MiraiAndroid，占用会低一点
pkg install openjdk-17
```

:::
::::

### 试试 `openj9`

以笔者的电脑（Windows 11）举例  
在 `mirai` 启动完毕后，占用内存大概 232Mb  
说句实在话，内存占用挺高的

但是假设你使用了 `openj9` 的 `jdk` 内存将会变成原来的 70%  
（在笔者的电脑上占用内存是 165.5Mb，同比减少 30%）

我们只需要在[这个地方](https://developer.ibm.com/languages/java/semeru-runtimes/downloads)找到适合自己系统的 Java  
然后安装，就好了

啥？不会？[那看这里](Q&A.html#_9-当你遇到不会的东西的时候)

## 下载并解压 `mcl`

先说 Windows 用户，这个特别简单  
首先点[这里](https://github.com/iTXTech/mirai-console-loader/releases/download/v1.2.2/mcl-1.2.2.zip)，
然后点<MoreInfo words="这里" :link="true">↑ 不是这里，是这里 ↓<img src="/images/before/unzip.webp"></MoreInfo>，就完成了

再说说 Linux 用户，这个也很简单

```bash
# 假设你的系统十分的精简，记得安装 wget 和 unzip
wget https://github.com/iTXTech/mirai-console-loader/releases/download/v1.2.2/mcl-1.2.2.zip
unzip mcl-1.2.2.zip -d mcl-1.2.2
```

## 添加 `mirai-api-http` 并启动 `mcl`

::: tip
对于 Windows 用户来说，剩下的步骤是需要在文件夹中打开命令行的  
假设你不会的话，请[看这里](./Q&A.md#_9-当你遇到不会的东西的时候)
:::

首先需要进入到 `mcl-1.2.2` 文件夹中  
然后，跟着我的命令来

```bash
./mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin
./mcl -u
```

然后，稍作等待，等到显示这个  
然后你就成功启动了 mirai

```txt:no-line-numbers
xxxx-xx-xx xx:xx:xx I/main: mirai-console started successfully.

>
```

然后让我们添加一下自动登录的账号

```txt:no-line-numbers
/autoLogin add <你的QQ号> <你的QQ密码>
```

然后输入 `Ctrl + C` 退出一下 mcl

## 配置 `mirai-api-http` 参数

进入 `./config/net.mamoe.mirai-api-http`，修改 `setting.yml`

```yaml
# "./config/net.mamoe.mirai-api-http/setting.yml"
adapters:
  - http
  - ws
debug: false
enableVerify: true
verifyKey: GraiaxVerifyKey # 你可以自己设定，这里作为示范
singleMode: false
cacheSize: 4096 # 可选，缓存大小，默认4096. 缓存过小会导致引用回复与撤回消息失败
adapterSettings:

  ## 详情看 http adapter 使用说明 配置
  http:
    host: localhost
    port: 8080 # 端口
    cors: [*]

  ## 详情看 websocket adapter 使用说明 配置
  ws:
    host: localhost
    port: 8080 # 端口
    reservedSyncId: -1 # 确保为 -1
```

## 登录

执行 `./mcl` 启动 mirai-console  
如果直接显示 `Event: BotOnlineEvent(bot=Bot(<你的QQ号>))` 那么恭喜你，接下来不用看了  
但是... 如果像下面那样弹出一个弹窗，那你还要往下看

![captcha](/images/before/captcha_box.webp)

可恶的 tx 啊，竟想阻止我的美梦  
怎么办？两种办法

1. 用[根据 Mirai 官方教程](https://docs.mirai.mamoe.net/mirai-login-solver-selenium/)来进行验证
2. 用 MiraiAndroid 生成一个 device.json 来解决

第一种因为写的十分详细，所以在这里我们就不在赘述
简单说明一下第二种，很简单

1. 安装 [`MiraiAndroid`](https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution_groups/release) 在你的安卓手机里
2. 启动，在最下面的输入框输入 `/login <你的QQ号> <你的QQ密码>` 登录你的机器人账号  
   在登录成功之前可能会出现很多奇奇怪怪的验证  
   但是到了最后，当控制台显示这个的时候，你就成功了

   ```bash:no-line-numbers
   [INFO] Login successful.
   [INFO] Bot login successful.
   [INFO] EroEroBot (114514) Login successful
   ```

3. 点击左上角，再点击 `工具`

   <img src="/images/before/tools.webp" width=200>

   选择你机器人的账号，选择 `导出 DEVICE.JSON` 将其导出

4. 进入 `bots/<你的QQ号>` 下面，将导出的 `device.json` 复制进去

现在，让我们再次执行 `./mcl` 启动 mirai-console 看看效果  
假设成功了，那么恭喜你  
假设没有成功，这边建议拜一下企鹅

<h2>附：使用 Docker</h2>

Docker 嘛，应该不用我介绍了吧，懂得都懂  
事实上，我们有现成的 Docker 来解决这个问题  
[这里](https://github.com/ZhaoZuohong/mirai-mah-docker)有现成的 Dockerfile

<h2>附: 在 <code>MiraiAndroid</code> 中运行 <code>mirai-api-http</code></h2>

对于那些想要**在安卓手机上**跑 bot 的人来说，`MiraiAndroid` 绝对是跑 `Mirai-api-http` 的不二之选  
所以，在这里也教一下大家怎么在 `MiraiAndroid` 上运行 `Mirai-api-http`

::: tip
假设你不怎么喜欢使用 `MiraiAndroid`  
可以试试使用 `termux` + `openjdk-17` 来运行 `mcl`
:::

::: warning 注意
`MiraiAndroid` 要求的最低 Android 版本是 Android 8.0
:::

1. 安装 [`MiraiAndroid`](https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution_groups/release) 在你的安卓手机里
2. 输入 `autoLogin add <你的QQ号> <你的QQ密码>` 来自动登录你的账号
3. 重启 `MiraiAndroid`，并且根据提示完成登录
4. 进入[Mirai-api-http Releases 界面](https://github.com/project-mirai/mirai-api-http/releases/latest)，下载最新版本的 `Mirai-api-http`
5. 点击 `MiraiAndroid` 的左上角，进入 `插件管理`
6. 点击右上角的 "+"，然后选择 `mirai-api-http-v2.x.x.mirai.jar`  
   当选择成功的时候，选择 `编译并安装` 并且选择 `脱糖(desugaring)`  
   后面，输入文件名的时候，输入 `mirai-api-http.jar`
   ::: tip
   有可能会出现无法选择的情况，假设遇到这类问题  
   推荐在手机上安装 `Mixplorer`，然后在点击 `+` 的时候使用 `Mixplorer` 图标的 `选择`
   :::
7. 进入到 `/storage/emulated/0/Android/data/io.github.mzdluo123.mirai.android/files/config/net.mamoe.mirai-api-http/setting.yml`
   输入配置文件

   ```yaml
   adapters:
   - http
   - ws
   debug: false
   enableVerify: true
   verifyKey: GraiaxVerifyKey # 你可以自己设定，这里作为示范
   singleMode: false
   cacheSize: 4096 # 可选，缓存大小，默认4096. 缓存过小会导致引用回复与撤回消息失败
   adapterSettings:

   ## 详情看 http adapter 使用说明 配置
   http:
       host: localhost
       port: 8080 # 端口
       cors: [*]

   ## 详情看 websocket adapter 使用说明 配置
   ws:
       host: localhost
       port: 8080 # 端口
       reservedSyncId: -1 # 确保为 -1
   ```

8. 重启 `MiraiAndroid`

::: tip
你可以选择使用 `termux` 来跑 Python 哦
:::
