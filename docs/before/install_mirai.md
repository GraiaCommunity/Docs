# Mirai 的安装与配置

::: danger 注意
本章节写的有点 **$h!t**

请注意，安装和配置 Java 或 Miral 或 MCL
请**不要**使用所谓便携版、打包版、一键启动版、整合包等第三方打包的版本，
这些包通常会因为各种原因**出现无法启动、报错、无法链接、库过旧等问题**，
如果你使用这类打包版出现问题时，请**不要**联系任何人提出疑问。
:::

本章将会从 Java 的选择与 MCL 的安装两方面进行讲解。

## 安装 Java

当你看到这个标题，你肯定会觉得，“这有什么好教的”。这你就不懂了，就像
Python 也有如 “PyPy” 之类的其他解释器，所以，Java 也有很多种 JVM 和 JDK 可供选择。

::: tip
因为[某种原因](https://github.com/mamoe/mirai/discussions/779)，Mirai 与 Orcale JDK 的兼容性较差，因此建议使用 OpenJDK，同时 Mirai Console Loader 还要求 Java 版本大于等于 11，所以你不能使用 Java 8。
:::

### 安装 Java 的简单方法

如果你怕麻烦，那我们先从简单的安装方法说起，以下是各系统安装 OpenJDK 的方法：

:::: code-group
::: code-group-item Windows

```powershell
# 请注意，只有 Windows 10 1709 及以上或 Windows 11 才自带 winget 命令
# 事实上，截至目前，winget 的默认仓库中有足足 7 个来自不同厂商的 OpenJDK
# 这里就用 Windows 发行商 Microsoft 发行的 JDK 举例
winget install Microsoft.OpenJDK.17
```

::: tip
请注意，只有 Windows 10 1709（不含 LTSB、LTSC）及以上或 Windows 11 才自带 winget 命令。

Windows XP / Vista 已不受支持，请使用现代化的操作系统，Windows 7 / 8 /
10（1709 之前的版本或长期支持版本）请使用下一节提到的来自不同厂商的 OpenJDK 安装包。
:::

:::
::: code-group-item DEB系

```bash
# 适用于 Ubuntu / Debian 等系统
# 非 root 的情况下记得最前面加上 sudo
apt update
apt install openjdk-17-jre
```

:::
::: code-group-item RPM系

```bash
# 非 root 的情况下记得最前面加上 sudo

# 适用于 CentOS 8 / Rocky Linux 8
dnf install java-latest-openjdk
# 适用于 CentOS 7
yum install java-latest-openjdk
```

:::

::: code-group-item Arch系

```powershell
pacman -S jdk-openjdk
```

:::
::: code-group-item macOS

```fish
# 此处假设你提前安装了 brew cask
# 没有的话就先 "brew install brew-cask-completion"
# 事实上，brew 也能够安装足足 4 个厂商的 JDK
# 不过我们就按默认的来就好
brew cask install java
```

:::
::: code-group-item Termux

```bash
# 不太建议在 termux 运行 MCL，因为可能会出现各种各样的BUG和问题(比如功能突然失效，然后下一次触发时又莫名其妙的恢复了,或者触发时出现错误，可以用 Proot 安装一个原生 Linux 系统，但是触发时包含的中文字符可能会乱码)
# 可以看看后面的 MiraiAndroid，占用会低一点
pkg install openjdk-17
```

:::
::::

### 常见的 OpenJDK 发行版

事实上，因为 Java 是开源的，因此所有人和公司都可以发行属于自己的 Java 发行版。

通常我们把非官方的 Java 发行版叫做 OpenJDK

但是，不同厂商发行的 OpenJDK 可能会加入一些属于自己的私货，或者部分厂商所发行
OpenJDK 相对更完整，包括 OpenJFX 等其他 OpenJDK 需要另外安装的组件。

以下列举一些常见的 OpenJDK 发行版：

- （推荐）[Oracle OpenJDK](https://jdk.java.net/18)
- [Adoptium Eclipse Temurin](https://adoptium.net/zh-CN/temurin/releases)
  前身为[AdoptOpenJDK](https://adoptopenjdk.net/)
- （推荐）[BellSoft Liberica OpenJDK](https://bell-sw.com/pages/downloads/#mn)
- （推荐）[Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk#download-openjdk)
- （推荐）[Microsoft Build of OpenJDK](https://docs.microsoft.com/zh-cn/java/openjdk/download)
- [OpenLogic OpenJDK](https://www.openlogic.com/openjdk-downloads)

:::: details 想换个 JVM？试试 OpenJ9？

前面一直在说 **JDK**，现在来说说 **JVM**， JVM 全称是
Java Virtual Machine，即 **Java 虚拟机**。

常见的 JDK 一般都是用 **HotSpot** 虚拟机，而 **OpenJ9** 就是一种虚拟机。

以笔者的电脑（Windows 11）举例，**Mirai** 启动完毕后，其占用内存大概 232Mb，说实话占用挺高的。

但是假设使用了 OpenJ9 的话内存占用将会变成原来的 70% 左右 .
（在笔者的电脑上占用内存是 165.5Mb，同比减少 30%）

我们只需要在[这个地方](https://developer.ibm.com/languages/java/semeru-runtimes/downloads)找到适合自己系统的 Java 版本，然后安装即可。

啥？不会？[那看这里](./QA#baidu)。

::: warning
在 Windows 上使用 `IBM Semeru OpenJDK`（即使用 OpenJ9）的情况下，
可能在启动 MCL 的过程中在 `Mirai Console Loader 公告栏` 部分会出现乱码。
不过现阶段暂时没有发现会出现什么其他问题，所以请放心使用。
:::
::::

## 下载并解压 **MCL**

::: tip
**MCL** 指的是 **Mirai Console Loader**，其用于启动 Mirai 的控制台。

如果你较为熟悉 Github 的话，你也可以直接去其 [Releases 页面](https://github.com/iTXTech/mirai-console-loader/releases) 下载最新版本。
:::

假如你是 Windows 用户或 Linux 与 macOS 的图形界面用户，那就特别简单。
首先点[这里](https://github.com/iTXTech/mirai-console-loader/releases/download/v2.1.0/mcl-2.1.0.zip)，
然后点<MoreInfo words="这里" :link="true">↑ 不是这里，是这里 ↓<img alt="unzip" src="/images/before/unzip.webp"></MoreInfo>，就完成了（确信，不要连解压都不会吧）！

如果你使用的是没有图形界面的 Linux 系统，那执行下下面的命令就好了（不要说你不会噢，不会吧不会吧不会有人啥都不会就用 Linux 了吧）：

```bash
# 假设你的系统十分的精简，记得安装 wget 和 unzip
wget https://github.com/iTXTech/mirai-console-loader/releases/download/v2.1.0/mcl-2.1.0.zip
unzip mcl-2.1.0.zip -d mcl-2.1.0
```

## 添加 **Mirai Api Http** 插件并启动 **MCL**

::: tip
对于 Windows 用户来说，剩下的步骤是需要在 MCL 文件夹中打开命令行的。
假设你不会的话，请[看这里](./QA.md#_9-当你遇到不会的东西的时候)。

冷知识：在本文档及 Graia 或“友商”社区中 Mirai Api Http 经常被缩写为 **MAH**。
:::

首先需要进入到 `mcl-2.1.0` 文件夹中，然后使用如下命令添加 mirai-api-http 插件并启动 MCL：

```bash
./mcl --update-package net.mamoe:mirai-api-http --channel stable-v2 --type plugin
./mcl -u
```

然后，稍作等待，等到显示以下这行，就代表 Mirai 成功启动了。

```txt
xxxx-xx-xx xx:xx:xx I/main: mirai-console started successfully.

>
```

现在，我们添加一下自动登录的账号：

```txt
/autoLogin add <你的QQ号> <你的QQ密码>
# 如 /autoLogin add 114514 1919810
```

然后按键盘 `Ctrl + C` 退出一下 MCL。

### 关于账号协议问题

你应该知道，QQ 可以在不同设备的不同客户端使用，不同的客户端有很多不同的登录协议（比如安卓手机和安卓平板就分别属于不同的登陆协议）。
而 Mirai 支持了不少登陆协议，包括：

- 安卓手机：`ANDROID_PHONE`
- 安卓平板：`ANDROID_PAD`
- 安卓手表：`ANDROID_WATCH`
- 苹果平板：`IPAD`
- 苹果电脑：`MACOS`

不同的协议支持的功能可能会略有区别，如果你在开发过程中发现某个文档里有、别人能用的功能你无法使用，
就可以检查一下是不是协议不对。

当你输入 `/autoLogin add <你的QQ号> <你的QQ密码>` 的时候，Mirai
将会默认以 `ANDROID_PHONE` 协议登录。如果你因为某些原因（比如想要在
Bot 不掉线的情况下使用手机登录 Bot 的 QQ 账号）而想要更改登录协议的话，
可以试试以下命令：`/autoLogin setConfig <你的QQ号> protocol <你所需要的协议>`。

::: tip
上文所指的 `<你所需要的协议>`，是 `ANDROID_PHONE` 这样的英文哦，不是 `安卓手机` 什么的。

括号也要替换掉哦，不要输 `/autoLogin setConfig <123456789> protocol <ANDROID_PHONE>`
这种命令哦~
:::

## 配置 **Mirai Api Http** 参数

进入 `mcl-2.1.0/config/net.mamoe.mirai-api-http`，修改 `setting.yml`。

你可以直接降下面的例子复制替换掉原本的内容。  
不过请注意，不懂的参数不要乱动，冒号后请保留空格，不要使用中文冒号，不要随意删除空格。

```yaml
adapters:
  - http
  - ws
debug: false
enableVerify: true
verifyKey: GraiaxVerifyKey # 你可以自己设定，这里作为示范
singleMode: false
cacheSize: 4096
adapterSettings:
  http:
    host: localhost
    port: 8080
    cors: [*]
  ws:
    host: localhost
    port: 8080
    reservedSyncId: -1
```

使用命令 `./mcl` 重新启动 MCL，此时你应该在控制台看到如下提示：

```txt{2-5}
2022-07-04 19:11:11 I/Mirai HTTP API: ********************************************************
2022-07-04 19:11:12 I/http adapter: >>> [http adapter] is listening at http://localhost:8080
2022-07-04 19:11:12 I/ws adapter: >>> [ws adapter] is listening at ws://localhost:8080
2022-07-04 19:11:12 I/Mirai HTTP API: Http api server is running with verifyKey: GraiaxVerifyKey
2022-07-04 19:11:12 I/Mirai HTTP API: adaptors: [http,ws]
2022-07-04 19:11:12 I/Mirai HTTP API: ********************************************************
```

其中第二第三行是 Ariadne 连接 Mirai 的地址，第四行则是连接所用的密钥，请确保配置 Ariadne
时所用的参数与此处一致，同时还应确保第五行的 `adaptors:` 之后同时有 `http` 和 `ws` 两个选项。

## 登录

紧接上一小节，如果控制台显示如下信息：

```txt
2022-07-04 19:11:12 I/Bot.<你的bot之QQ号>: Loaded account secrets from local cache.
2022-07-04 19:11:13 I/Bot.<你的bot之QQ号>: Saved account secrets to local cache for fast login.
2022-07-04 19:11:13 I/Bot.<你的bot之QQ号>: Login successful.
2022-07-04 19:11:14 V/Bot.<你的bot之QQ号>: Event: BotOnlineEvent(bot=Bot(<你的bot之QQ号>))
2022-07-04 19:11:14 I/Bot.<你的bot之QQ号>: Bot login successful.
```

那么恭喜你，接下来不用看了，但是...
如果像下面那样弹出一个弹窗，那你就继续看吧~

![captcha](/images/before/captcha_box.webp)

::: warning
在没有图形界面的设备上，并不会弹窗（想想也不可能弹出来啊
kora），因此你需要在控制台中完成操作。
:::

可恶的 tx 啊，竟想阻止我的美梦，怎么办？有两种办法：

- 手动获取 ticket 并输入到控制台，然后登录（）
  ::: tip
  该方法比较复杂，需要较强的动手能力，如果第二种方法无法成功，可以进入交流群获取帮助，至于你问我交流群在哪，那你最好先认真过一下文档找找~
  :::
- 用 MiraiAndroid 生成一个 device.json 来解决

简单说明一下第二种，其实很简单：

1. 安装 [**MiraiAndroid**](https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution_groups/release) 在你的安卓手机里
2. 启动，在最下面的输入框输入 `/login <你的QQ号> <你的QQ密码>`
   登录你的机器人账号，在登录成功之前可能会出现很多奇奇怪怪的验证，
   但是到了最后，当控制台显示以下提示的时候，你就成功了。

   ```bash
   [INFO] Login successful.
   [INFO] Bot login successful.
   [INFO] EroEroBot (114514) Login successful
   ```

   类似下图所示：

   <img alt="MiraiAndroid1" src="/images/before/mirai-android-1.png" width=200>

3. 点击左上角，再点击 `工具`

   <img alt="MiraiAndroid2" src="/images/before/mirai-android-2.webp" width=200>

   选择你机器人的账号，选择 `导出 DEVICE.JSON` 将其导出。

4. 再次进入 MCL 目录的 `bots/<你的QQ号>` 文件夹，将导出的 `device.json` 复制进去。

现在，再次执行 `./mcl` 启动 MCL 看看效果，假设成功了，那么恭喜你，假设没有成功，这边建议拜一下企鹅。

::: warning
假如滑动验证码验证失败，可能会弹窗让你扫二维码，这时候有概率因为没有设备锁的原因而一直弹窗。
请尝试开启或关闭设备锁后重试。
:::

## 附：使用 Docker

Docker 嘛，应该不用我介绍了吧，懂得都懂。事实上，我们有现成的 Docker 来解决这个问题。
~~[这里](https://github.com/ZhaoZuohong/mirai-mah-docker)有现成的 Dockerfile~~该仓库已经原作者删除

## 附: 在 MiraiAndroid 中运行 Mirai Api Http

对于那些想要**在安卓手机上**跑 bot 的人来说，**MiraiAndroid** 绝对是跑 **Mirai Api Http** 的不二之选。
所以，在这里也教一下大家怎么在 **MiraiAndroid** 上运行 **Mirai Api Http**。

::: tip
假设你不怎么喜欢使用 **MiraiAndroid**，可以试试使用 **Termux** 来运行 **MCL**。

用 **MiraiAndroid** 来运行 Mirai 的好处是，其 CPU 和内存占用会小很多。
:::

::: warning 注意
**MiraiAndroid** 要求的最低 Android 版本是 Android 8.0。
:::

1. 安装 [**MiraiAndroid**](https://install.appcenter.ms/users/mzdluo123/apps/miraiandroid/distribution_groups/release) 在你的安卓手机里
2. 输入 `autoLogin add <你的QQ号> <你的QQ密码>` 来自动登录你的账号
3. 重启 **MiraiAndroid**，并且根据提示完成登录
4. 进入[Mirai Api Http 的 Releases 界面](https://github.com/project-mirai/mirai-api-http/releases/latest)，下载最新版本的 **Mirai Api Http**
5. 点击 **MiraiAndroid** 的左上角，进入 `插件管理`
6. 点击右上角的 "+"，然后选择 `mirai-api-http-v2.x.x.mirai.jar`, 然后点击 `编译并安装` 并选择 `脱糖(desugaring)`，后面，输入文件名请输入 `mirai-api-http.jar`
   ::: tip
   有可能会出现无法选择的情况，假设遇到这类问题，推荐在手机上安装
   **Mixplorer** 这个文件管理器，然后在点击 `+` 的时候使用 **Mixplorer** 图标的 **选择**。
   :::
7. 进入到 `/storage/emulated/0/Android/data/io.github.mzdluo123.mirai.android/files/config/net.mamoe.mirai-api-http/setting.yml`
   输入配置文件，内容请参考[上面](#配置-mirai-api-http-参数)

8. 重启 **MiraiAndroid**

::: tip
至于 Python 环境嘛，你可以搞一个 **Termux**~
:::
