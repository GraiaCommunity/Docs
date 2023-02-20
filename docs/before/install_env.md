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
   (截至本段文字书写(2023.2.19)前，上述例子的正式版并没有适配 Python 3.11 版本)
2. 如果你的项目需要用到一些更新不勤快，可能没有适配 Python 3.11 的版本

:::

## 虚拟环境是什么

1. 介绍虚拟环境
2. 常见的虚拟环境方案：virtualenv、venv、pipenv，但不推荐自己创建虚拟环境

## 包管理器的选择

1. 什么是包管理器
2. 推荐 PDM

### 为什么用 pdm 不用 poetry

:::warning 事先说明（叠甲）
我们并没有认为使用 poetry 是什么需要抵制的行为。
不管是使用 poetry 还是 pdm 还是 hatch 还是其他的包管理器，
我们都会一视同仁。
只不过我们在此比较推荐 pdm ，并向你阐述我们推荐 pdm 的原因。
:::

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
