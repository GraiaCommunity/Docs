# 从零开始的 Python 环境及 IDE 的配置

看这个文档的很多人可能是第一次接触 Python，或者第一次写一个完整的 Python 项目，
在这里，学校老师教的 Python 和 IDE 的使用方法可能不再适用，为了帮助你产生项目管理的意识，
本章从零开始介绍一个 Python 项目的配置。

:::danger 请注意

1. 如果你是 Machine Learning（机器学习）/ Deep Learning（深度学习）/ Neural Network（神经网络）
   用户，本文大部分内容都不适合你。
2. 如果你是隔壁 [NoneBot2](https://nb2.baka.icu/) 的用户，本文可能也不太适合你。
   > 毕竟 nb-cli（脚手架） 已经帮助你们解决了相当一部分的问题了
   > 除非你不用 nb-cli，但如果你跟着他们的文档来不可能不用吧~

:::

:::warning
因为这一章节的剧情整体偏严肃向，
所以浓度相对其他章节会大大降低<Curtain>纯度，太低了</Curtain>
:::

## Python 版本的选择

对于一个新创建的项目，理论上应使用较新的 Python 版本（毕竟你以后可能都不会想升级版本了）。

对于面对 Graia Project（如 [Ariadne](https://github.com/GraiaProject/Ariadne)）的项目，应尽可能使用
3.10 及以上的 Python 版本，目前 Python 最新版本为 3.11.x。  
再不济（比如用的是 Windows 7 系统）也请务必保证所使用的 Python 版本大于 3.8
（Ariadne 对 Python 版本的最低要求是 Python 3.8）

:::tip

1. TensorFlow、PyTorch、numba 等深度学习常用库基本上都适配了 Python 3.10 版本。  
   （截至本段文字书写（2023.2.19）时，上述库的正式版并没有适配 Python 3.11 版本）
2. 如果你的项目需要用到一些更新不勤快，可能没有适配 Python 3.11 的版本

:::

## 虚拟环境是什么

virtualenv、venv，但不推荐自己创建虚拟环境

### What? Why?

> 什么是虚拟环境，为什么要使用虚拟环境？

首先此处的环境指的是 Python 的运行环境，以 Windows 系统为例，Python
环境包含 `python.exe` 和 `pythonw.exe` 这两个可执行文件，以及
`site-packages` 这个用来放置 Python 库的文件夹这俩部分。

其中，`python.exe` 和 `pythonw.exe` 即是 Python 解释器，用于读取并解释执行
Python 代码。

由于不同的项目有着不同的依赖，可能某个项目要求使用 `Pillow^0.8`
版本，而另一个项目使用了 `Pillow 0.9.x` 版本开始才有的新特性，
如果我们需要同时使用这两个项目，就面临版本冲突的问题。

:::tip 小提示
`Pillow^0.8` 即 `Pillow>=0.8.0,<0.9`，即 `Pillow^0.8.x`
:::

由于 Python 用于放置依赖的 `site-packages` 的目录结构设计并不像 `node_modules`
那样可以放下整个互联网，因此我们不能同时安装同一个库的多个版本。

为了在不同的项目上使用同一个库的不同版本，我们需要将不同的项目所使用的
Python 环境互相隔离，在这里我们推荐使用虚拟环境这一成熟的解决方案。

顾名思义，虚拟环境就是为每一个项目都虚拟出一个全新的 Python环境，该 Python
环境仅供该项目使用，这样就可以项目多了之后隔离不同项目避免出现大范围依赖冲突。

### 常见的虚拟环境解决方案

> 解决方案，即一条龙服务。可以帮你快速创建、激活、管理虚拟环境。

目前常见的虚拟环境解决方案一般有如下两种：

- virtualenv
- venv

**venv** 是自 Python 3.3 之后内置在 Python 中的一个虚拟环境管理工具；而 **virtualenv**
比 venv 更早推出，同时也是目前最流行的虚拟环境管理工具，其功能也比 venv 更强大。

有关于这两个工具的区别，由于我们的文档不涉及亲自操作 venv 或 virtualenv
的内容，因此不在此过多涉及，感兴趣话可以询问 New Bing~

:::tsukkomi
什么？你说 Conda？你都用 Conda 了你就看下一页吧！  
~~因为 Conda 太强大了，不单止虚拟环境，加上我也不会用，所以嗯，你懂的~~

况且，你都用 Conda 了，相信你对于虚拟环境、包管理器、Python
多版本管理等方面一定懂得差不多了吧！而且接下来的内容不建议和
Conda 一起使用，这一页里大部分内容也就不适合你了。
:::

## 包管理器的选择

> 为了方便地配置虚拟环境  
> 为了更好地管理依赖  
> ~~贯彻爱与真实的邪恶~~（？？？）  
> ~~可爱又迷人的反派角色~~（？？？）  
> ？？？…… ？？？……  
> 我们是穿梭在...  
> 白洞（~~涩图~~），白色（~~涩色~~）的明天在等着我们

好了不玩了~ 虽然有了虚拟环境管理器，但是在用 **PIP**
装包的时候还是可能会出现奇奇怪怪的冲突之类的问题，所以几乎每个开发者都像不喜欢
**NodeJs** 的 **NPM** 那样不喜欢 **Python** 的 **PIP**！

那 NPM 可以用 **Yarn** 和 **Pnpm** 一样，我们 Python
也要有我们自己的特色包管理器！

常见的 Python 的包管理器有 **Poetry**、**PDM**、**Hatch**、pipenv 等。其中
**pipenv** 已经落后于时代了，因此在这里我们推荐首选 **PDM**，其次**Poetry**。

:::warning 声明（~~叠甲~~）
我们并没有认为使用 Poetry 是什么需要抵制的行为。  
不管你使用 Poetry 还是 PDM 还是 Hatch 还是其他的包管理器，
我们都会一视同仁。  
只不过我们在此比较推荐 PDM，至于 Poetry 不作首选的原因在后面会有相应阐述。  
而由于笔者不熟悉 **Hatch**，GraiaX
社区里也暂时也没有相关用户，这里不做评价，我们也不会阻止你用。
:::

### 为什么用 pdm 不用 poetry

1. poetry 不遵守 pep
2. pdm 有脚本

### poetry、pdm 和 conda 的区别

1. conda 可以安装 pypi 没有的东西
2. 我用 conda 文档不用怎么办？都用 conda 了，自己配吧

### poetry、pdm 和 virtualenv、venv 的区别

这俩玩意包含虚拟环境管理

## IDE 的选择

1. 什么是 IDE？
2. pyc 和 vsc 的区别
3. pyc 不支持 pdm，需要用 poetry
4. 刚入门推荐 pyc，有基础建议 vsc

## Git 的安装与配置

1. Git 是什么，有什么用
2. Git 怎么安装
3. Git 怎么用

## Python 的安装

## PDM / Poetry 的安装

pip install pipx
pipx install pdm/poetry
pipx upgrade-all

## IDE 的安装与配置

### PyCharm + Poetry

1. 下载安装
2. 中文插件安装
3. 常用插件安装
4. 常用快捷键

### Visual Studio Code

1. 下载安装
2. 中文插件安装
3. 常用插件安装
4. black + pylance basic + isort 3个插件的安装和配置
5. 常用快捷键
