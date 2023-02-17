# Mirai 的安装与配置

:::danger 注意
请注意，安装和配置 Java 或 Miral 或 MCL
请**不要**使用所谓便携版、打包版、一键启动版、整合包等第三方打包的版本，
这些包通常会因为各种原因**出现无法启动、报错、无法链接、库过旧等问题**，
如果你使用这类打包版出现问题时，请**不要**联系任何人提出疑问。
:::

本章将会从 Java 的选择与 MCL 的安装两方面进行讲解。

## 安装 Java

当你看到这个标题，你肯定会觉得，“这有什么好教的”。这你就不懂了，就像
Python 也有如 “PyPy” 之类的其他解释器，所以，Java 也有很多种 JVM 和 JDK 可供选择。

:::tip
因为[某种原因](https://github.com/mamoe/mirai/discussions/779)，Mirai 与 OrcaleJDK 的兼容性较差，因此建议使用 OpenJDK，同时 Mirai Console Loader 还要求 Java 版本大于等于 11，所以你不能使用 Java 8。
:::

### 安装 Java 的简单方法

如果你怕麻烦，那我们先从简单的安装方法说起，以下是各系统安装 OpenJDK 的方法：

::::code-group
:::code-group-item Windows

```powershell
# 请注意，只有 Windows 10 1709 （非 LTS 版）及以上或 Windows 11 才自带 winget 命令
# 事实上，截至目前，winget 的默认仓库中有足足 7 个来自不同厂商的 OpenJDK
# 这里就用 Windows 发行商 Microsoft 发行的 JDK 举例
winget install Microsoft.OpenJDK.17
```

:::tip
请注意，只有 Windows 10 1709（不含 LTSB、LTSC）及以上或 Windows 11 才自带 winget 命令。

Windows XP / Vista 已不受支持，请使用现代化的操作系统，Windows 7 / 8 /
10（1709 之前的版本或长期支持版本）请使用下一节提到的来自不同厂商的 OpenJDK 安装包。
:::

:::
:::code-group-item DEB系

```sh
# 适用于 Ubuntu / Debian 等系统
# 非 root 的情况下记得最前面加上 sudo
apt update
apt install openjdk-17-jre
```

:::
:::code-group-item RPM系

```sh
# 非 root 的情况下记得最前面加上 sudo

# 适用于 CentOS 8 / Rocky Linux 8
dnf install java-latest-openjdk
# 适用于 CentOS 7
yum install java-latest-openjdk
```

:::

:::code-group-item Arch系

```powershell
pacman -S jdk-openjdk
```

:::
:::code-group-item macOS

```fish
# 此处假设你提前安装了 brew cask
# 没有的话就先 "brew install brew-cask-completion"
# 事实上，brew 也能够安装足足 4 个厂商的 JDK
# 不过我们就按默认的来就好
brew cask install java
```

:::
:::code-group-item Termux

```sh
# 不太建议在 termux 运行 MCL，因为可能会出现各种各样的 bug 和问题（比如功能突然失效，然后下一次触发时又莫名其妙的恢复了，或者触发时出现错误，可以用 Proot 安装一个原生 Linux 系统，但是触发时包含的中文字符可能会乱码）
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

- 【推荐】[Azul Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk#download-openjdk)
- 【推荐】[BellSoft Liberica OpenJDK](https://bell-sw.com/pages/downloads/#mn)
- 【推荐】[Microsoft Build of OpenJDK](https://docs.microsoft.com/zh-cn/java/openjdk/download)
- 【推荐】[Oracle OpenJDK](https://jdk.java.net/18)
- [Adoptium Eclipse Temurin](https://adoptium.net/zh-CN/temurin/releases)
  前身为 [AdoptOpenJDK](https://adoptopenjdk.net/)
- [OpenLogic OpenJDK](https://www.openlogic.com/openjdk-downloads)

::::details 想换个 JVM？试试 OpenJ9？

前面一直在说 **JDK**，现在来说说 **JVM**， JVM 全称是
Java Virtual Machine，即 **Java 虚拟机**。

常见的 JDK 一般都是用 **HotSpot** 虚拟机，而 **OpenJ9** 就是一种虚拟机。

以笔者的电脑（Windows 11）举例，**Mirai** 启动完毕后，其占用内存大概 232Mb，说实话占用挺高的。

但是假设使用了 OpenJ9 的话内存占用将会变成原来的 70% 左右 .
（在笔者的电脑上占用内存是 165.5Mb，同比减少 30%）

我们只需要在[这个地方](https://developer.ibm.com/languages/java/semeru-runtimes/downloads)找到适合自己系统的 Java 版本，然后安装即可。

啥？不会？[那看这里](./QA#baidu)。

:::warning
在 Windows 上使用 `IBM Semeru OpenJDK`（即使用 OpenJ9）的情况下，
可能在启动 MCL 的过程中在 `Mirai Console Loader 公告栏` 部分会出现乱码。
不过现阶段暂时没有发现会出现什么其他问题，所以请放心使用。
:::
::::

## 下载并解压 **MCL**

:::tip
**MCL** 指的是 **Mirai Console Loader**，其用于启动 Mirai 的控制台。

如果你较为熟悉 Github 的话，你也可以直接去其 [Latest Releases 页面](https://github.com/iTXTech/mirai-console-loader/releases/latest) 下载名为 `mcl-2.x.x.zip` 的压缩包，然后解压到任意文件夹。
:::

如果你使用的是没有图形界面的 Linux 系统，那执行下下面的命令就好了（不要说你不会噢，不会吧不会吧不会有人啥都不会就用 Linux 了吧）：

```sh
# 假设你的系统十分的精简，记得安装 wget 和 unzip
wget https://github.com/iTXTech/mirai-console-loader/releases/download/v2.1.2/mcl-2.1.2.zip
unzip mcl-2.1.2.zip -d mcl-2.1.2
```

至于有图形界面的系统，如果你连解压都不会，还是别继续下去了~

## 添加 **Mirai Api Http** 插件

首先在终端中进入到 `mcl-2.1.2` 文件夹中，然后使用如下命令添加 mirai-api-http 插件并启动 MCL。

:::tip
冷知识：在本文档及 Graia 或“友商”社区中 Mirai Api Http 经常被缩写为 **MAH**。

<hr />

对于 Windows 用户，使用资源管理器进入 MCL 所在文件夹后，点击地址栏并输入 `CMD`
然后敲击回车即可在当前文件夹的路径打开命令提示符，如果你使用 Windows 10（2022
年及之后的非阉割版），你也可以使用 `wt` 代替 `CMD`。

对于 Linux 用户，如果你连在终端中进入某个文件夹都不会，还是回去用 Windows 吧。
:::

```sh
./mcl --update-package net.mamoe:mirai-api-http --channel maven-stable --type plugin
```

## 添加 mirai-login-solver-sakura 插件

:::warning
使用 mirai-login-solver-sakura 需要准备一台跟得上时代的安卓手机，
不要使用老旧的废手机/老人机/超冷门机型，也不要使用模拟器/WSA。
:::

Mirai Console 自带的登录非常的不方便，而且不正确的登录方法容易导致帐号被 tx 拉黑。
为了正确地登录 Bot 的 QQ，最好使用 **mirai-login-solver-sakura** 插件。

从其 [Latest Releases 页面](https://github.com/KasukuSakura/mirai-login-solver-sakura/releases/latest)
下载名为 `mirai-login-solver-sakura-x.x.x.mirai2.jar` 的 jar
文件，并将其放入 `mcl-2.1.2/plugins/` 文件夹中。

从上面提到的页面下载名为 `apk-release.apk` 的安卓安装包，安装
**SakuraLoginSolver** 到你的安卓手机上。

## 启动 **MCL**

在 MCL 文件夹内打开命令提示符/终端（或在终端中进入 MCL 文件夹），执行命令
`./mcl`。然后稍作等待，如果你的 Java 安装正确，MCL
就会启动，等到显示以下这行，就代表 Mirai 成功启动了。

```sh
20xx-xx-xx xx:xx:xx I/main: mirai-console started successfully.
>
```

然后按键盘 `Ctrl + C` 退出 MCL（Mac 用户请使用 `Command + .`）。

## 配置 **Mirai Api Http** 参数

依次打开 `mcl-2.1.2/config/net.mamoe.mirai-api-http/`
文件夹，使用文本编辑器修改 `setting.yml`。

你可以直接复制下面的例子然后替换掉文件内原有的内容。  
不过请注意，不懂的参数不要乱动，冒号后请保留空格，
不要使用中文冒号，不要随意删除空格，不要随意添加新行。

```yaml
adapters:
  - http
  - ws
debug: false
enableVerify: true
verifyKey: GraiaXVerifyKey ## 你可以自己设定，这里作为示范
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

<div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki one-dark-pro has-highlighted-lines" tabindex="0"><code style="color:#98C379"><span class="line"><span>2023-02-16 23:02:29 I/Mirai HTTP API: ********************************************************</span></span>
<span class="line"><span>2023-02-16 23:02:29 I/MahKtorAdapter[http,ws]: Autoreload is disabled because the development mode is off.</span></span>
<span class="line"><span>2023-02-16 23:02:30 I/MahKtorAdapter[http,ws]: Application started in 0.076 seconds.</span></span>
<span class="line highlighted"><span>2023-02-16 23:02:30 I/MahKtorAdapter[http,ws]: Responding at http://localhost:8080</span></span>
<span class="line highlighted"><span>2023-02-16 23:02:30 I/http adapter: &gt;&gt;&gt; [http adapter] is listening at http://localhost:8080</span></span>
<span class="line highlighted"><span>2023-02-16 23:02:30 I/ws adapter: &gt;&gt;&gt; [ws adapter] is listening at ws://localhost:8080</span></span>
<span class="line highlighted"><span>2023-02-16 23:02:30 I/Mirai HTTP API: Http api server is running with verifyKey: funnyguy</span></span>
<span class="line highlighted"><span>2023-02-16 23:02:30 I/Mirai HTTP API: adaptors: [http,ws]</span></span>
<span class="line"><span>2023-02-16 23:02:30 I/Mirai HTTP API: ********************************************************</span></span>
<span class="line"><span></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span></div></div>

其中第四行是 Ariadne 连接 Mirai 的地址，第七行最后则是连接所用的密钥，请确保配置 Ariadne
时所用的参数与此处一致，同时还应确保第八行的 `adaptors:` 之后同时有 `http` 和 `ws` 两个选项。

## 登录

### 配置自动登录

现在，我们添加一下自动登录的账号，在 Mirai 启动完毕后控制台的 `>`
后输入如下 Mirai Console 命令：

```sh
/autoLogin add <你的QQ号> <你的QQ密码>
# 如 /autoLogin add 114514 1919810
```

::::details 关于账号协议问题

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

:::tip
上文所指的 `<你所需要的协议>`，是 `ANDROID_PHONE` 这样的英文哦，不是 `安卓手机` 什么的。

括号也要替换掉哦，不要输 `/autoLogin setConfig <123456789> protocol <ANDROID_PHONE>`
这种命令哦~
:::
::::

退出并重新启动 MCL，如果控制台显示如下信息：

<div class="language-shell line-numbers-mode">
<button class="copy"></button>
<span class="lang">bash</span>
<pre>
<code style="color:#98C379"><span class="line"><span>2023-01-31 18:44:05 I/Bot.&ltbot QQ号&gt: Loaded account secrets from local cache.</span></span>
<span class="line"><span>2023-01-31 18:44:05 I/Bot.&ltbot QQ号&gt: Saved account secrets to local cache for fast login.</span></span>
<span class="line"><span>2023-01-31 18:44:05 I/Bot.&ltbot QQ号&gt: Login successful.</span></span>
<span class="line"><span style="color:#abb2bf">2023-01-31 19:40:00 V/Bot.&ltbot QQ号&gt: Event: BotOnlineEvent(bot=Bot(&ltbot QQ号&gt))</span></span>
<span class="line"><span>2023-01-31 18:44:07 I/Bot.&ltbot QQ号&gt: Bot login successful.</span></span>
<span class="line"><span>2023-01-31 18:44:07 I/main: mirai-console started successfully.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span></div></div>

那么恭喜你，接下来不用看了，但如果不是，那你就继续看吧~

### 滑动验证码

假设你在没有图形界面的 Linux 系统中启动 MCL，
如果没有自动登录成功，在添加了 **mirai-login-solver-sakura**
插件的情况下，会有如下提示：

```sh
2023-02-14 23:18:20 I/main: Auto-login 123456789, protocol: IPAD, heartbeatStrategy: STAT_HB
请使用 SakuraLoginSolver 打开 http://<ip>:44643/request/request/50634119 来完成验证
```

> 上面提示中的 123456789 为要登录的 QQ 号，44643 为端口号，50634119 为请求 ID  
> 这些数字仅作为示例，端口号和请求 ID 每一次运行 MCL 都不一样，请不要照抄。

假设你的 MCL 运行在你自己家的电脑上，电脑在你家的局域网内的 IP 为 `192.168.1.101`
此时，你需要在你的安卓手机上打开刚刚安装的 **SakuraLoginSolver**
APP，在顶部中间的输入框中输入 `http://192.168.1.101:44643/request/request/50634119`
并点击下一步进入滑动验证码界面，完成验证后，电脑上的 MCL 会提示你下一步操作。

|输入请求地址|滑动验证|
|:--:|:--:|
|![输入请求地址](/images/before/sakura_input.webp)|![滑动验证](/images/before/sukura_slide.webp)|

:::tip

1. **SakuraLoginSolver** 在首次运行时点击下一步可能会闪退，重新启动并输入即可
2. 在有图形界面的操作系统上，**mirai-login-solver-sakura**
   可以显示二维码，然后通过 **SakuraLoginSolver** 扫描而不用输入一长串请求地址
3. 如果你使用的是云服务器，你需要在手机输入请求地址之前在云服务器提供商的控制面板上放行
   **mirai-login-solver-sakura** 提示的端口，通常这项操作在一个叫做安全组的地方完成，
   放行传入方向即可
4. 假如你在云服务器提供商处放行了端口后 **SakuraLoginSolver** 仍无法连接 MCL，
   请检查系统内置防火墙是否启动及配置是否正确。在**正常**的 Windows
   系统上，初次启动 MCL 时便会弹出防火墙窗口，请不要直接关掉，请勾选公用网络、专用网络后点击允许访问

:::

### 短信验证

当你完成滑动验证码后，在开启了设备锁/新设备验证的帐号上，还需要进行短信验证。
此时，MCL 的控制台会显示如下信息：

> 就算你的帐号没开设备锁/新设备验证，可能也需要进行短信验证。

```sh
请使用 SakuraLoginSolver 打开 http://<ip>:44643/request/request/50634119 来完成验证
可用方法：legacy, sms // [!code focus]
输入 「cancel」 取消 / 按下 「Ctrl+C」 取消 // [!code focus]
> // [!code focus]
```

在 `>` 之后输入 `sms` 并按下**回车键**，此时会 MCL
控制台会显示手机号，若手机号无误，再次按下**回车键**发送验证码短信：

```sh{4}
请使用 SakuraLoginSolver 打开 http://<ip>:44643/request/request/50634119 来完成验证
可用方法：legacy, sms
输入 「cancel」 取消 / 按下 「Ctrl+C」 取消
> sms // [!code focus]
需要短信验证 -> (+86) 139*******2 // [!code focus]
直接按下 「Enter」 发送短信，输入验证码完成验证 // [!code focus]
按下 「Ctrl+C」 取消 // [!code focus]
> // [!code focus]
短信已发出. 请自行留意短信重发时间 // [!code focus]
高频请求验证码可能导致账户被停用 // [!code focus]
> // [!code focus]
```

收到短信后，将验证码输入在最后一个 `>` 之后并按下回车建，若验证码无误
MCL 将成功登录并记住登录状态。

```sh{3}
短信已发出. 请自行留意短信重发时间
高频请求验证码可能导致账户被停用
> 567815 // [!code focus]
2023-01-31 18:44:05 I/Bot.<bot QQ号>: Login successful. // [!code focus]
2023-01-31 18:44:05 I/Bot.<bot QQ号>: Saved account secrets to local cache for fast login.
2023-01-31 18:44:05 I/Bot.<bot QQ号>: Login successful.
2023-01-31 19:40:00 V/Bot.<bot QQ号>: Event: BotOnlineEvent(bot=Bot(<bot QQ号>))
2023-01-31 18:44:07 I/Bot.<bot QQ号>: Bot login successful.
2023-01-31 18:44:07 I/main: mirai-console started successfully.
```

至此，自动登录就配置成功了，如果有多个帐号需要登录，在 MCL
启动之后再次执行 `/autologin` 命令即可。

## 登录出现问题怎么办？

### 1. 版本过低

如果某次登录的时候提示如下信息：

```sh
Login failed: Error(bot=Bot(xxxxxxxxx), code=235, title=温馨提示，message=当前QQ版本过低，请升级至最新版本后再登录。点击进入下载页面，errorInfo=)
2023-01-20 05:39:20 E/console: net.mamoe.mirai.network.WrongPasswordException: Error(bot=Bot(xxxxxxxxx), code=235, title=温馨提示，message=当前QQ版本过低，请升级至最新版本后再登录。点击进入下载页面，errorInfo=) // [!code error]
```

首先，你需要通过 `./mcl -u` 命令更新 Mirai Core 及 Mirai Console 到最新版。

> 如果你的 Mirai Api Http 也是通过命令安装的话，那么他也会被更新。  
> 如果你使用的是旧版的 Ariadne，那么更新后可能 Ariadne 会连不上 MAH，
> 此时建议把 Ariadne 也更新。

重新启动 MCL，如果仍然不行，你需要删除 `mcl-2.1.2/bots/<xxxxxxxxx>`
这个文件夹，`<xxxxxxxxx>` 为你的 Bot 的 QQ 号，删除之后重新登录即可。
