# 造房之前，打好地基

> 罗马不是一夜建成，机器人也不是一日造好。—— 爷

## 注意事项

1. **本文档将会默认你至少学过一点点 `Python`，假设你连 Python 都不会，建议至少学点 Python 基础再来看。**
2. **本文档将假设你具有一定的英语阅读能力<Curtain>通过 XX 翻译也行</Curtain>，并能对工具软件的提示作出自己的决定。**
3. **本文档将会使用 `poetry` 作为依赖和虚拟环境管理工具。**
   ::: warning
   关于为什么用 `poetry`，你可以看这里 :point_right: [看这](../before/Q&A.md#_6-关于-poetry)
   :::

4. **本文档将使用 `graia-ariadne` 0.7.5 及以上的版本**，Ariadne 在 0.7.0 进行了一次大的
Breaking Change，因此本文档不适用 0.7.0 以下的 Ariadne，也不再提供旧版的使用方法及示例。
   ::: tip
   从 0.5.x 和 0.6.x 版本的 Ariadne 迁移至 0.7.x 请参考[这里](https://graia.readthedocs.io/projects/ariadne/migrate/amnesia_port/)

   有关什么是 Ariadne，请参阅[这里](../before/Q&A.html#_2-什么是-ariadne)

   因为文档会随着 `graia-ariadne` 版本的更新而更新，所以**强烈推荐**你直接安装最新版本（latest）  
   现在的 `graia-ariadne` 的最新版本为 <img src="https://img.shields.io/pypi/v/graia-ariadne?color=2970b6&amp;label=&amp;style=flat-square" alt="PyPI版本" style="vertical-align: middle">
   :::

5. 虽然 `Ariadne` 支持 <img src="https://img.shields.io/pypi/pyversions/graia-ariadne?color=2970b6&amp;label=Python&amp;style=flat-square" alt="Python版本" style="vertical-align: middle">，但为了**最佳体验**，我们建议你最好升级到 `Python3.9+` 以保证能够享受到全部功能。
6. **本文档部分内容可能未及时更新或不全**，因此你可以在本文档的一些页面见到如下的提示框，他们通常指向相关的文档/示例。
   ::: interlink
   **相关链接:** <https://graia.readthedocs.io/>
   :::

## 创建项目

新建一个项目文件夹，这里我们就叫 `EroEroBot` 吧 （<Curtain>PeroPero 震怒</Curtain>）

::: interlink EroEroBot
本章完整示例可在 [EroEroBot/main-base.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/main-base.py) 找到。  
你可以在[此处](https://github.com/GraiaCommunity/EroEroBot/releases/tag/release)下载预配置好的模板（不定期更新）。
:::

创建好后进入该文件夹内：

```bash
mkdir EroEroBot
cd EroEroBot
```

然后输入 `poetry init` 开始创建环境，你就会看到类似下面的提示：

```bash
$ poetry init

This command will guide you through creating your pyproject.toml config.

Package name [EroEroBot]:
Version [0.1.0]:
Description []:
Author [GraiaCommunity <example@graiax.cn>, n to skip]:  n  # 注意，这里要你自己填写 n
License []:
Compatible Python versions [^3.9]:

Would you like to define your main dependencies interactively? (yes/no) [yes] n  # 注意，这里要你自己填写 n
Would you like to define your development dependencies interactively? (yes/no) [yes] n  # 注意，这里要你自己填写 n
Generated file

[tool.poetry]
name = "EroEroBot"
version = "0.1.0"
description = ""
authors = ["GraiaCommunity <example@graiax.cn>"]

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"


Do you confirm generation? (yes/no) [yes] y  # 注意，这里要你自己填写 y
```

::: tip
国内连接 PyPI 非常慢，所以我们在定义依赖与开发依赖时填 no  
后面设置了镜像源之后再自己添加依赖
:::

完成之后，你的项目文件夹内应该会出现一个 `pyproject.toml` 文件。

为了防止后续添加依赖时等待太久，可以修改 `pyproject.toml` 来添加国内镜像加速站，打开该文件后在文件末尾添加如下内容即可：

```toml
[[tool.poetry.source]]
# 这里以清华源举例，你也可以使用其他源
name = "tuna-tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = false
```

## 启用虚拟环境并安装 `graia-ariadne`

在配置好环境之后，你需要给你的项目创建一个虚拟环境并安装 `graia-ariadne`，在项目根目录执行如下命令：

```bash
poetry env use python3.9  # 如果你设备里只有一个版本的 Python 或你想使用最新版本，则这一条命令可以不执行
poetry add graia-ariadne[standard]
```

::: tip TIPS

1. Ariadne 其实有好几种 Extra deps（可选依赖），如下所示：

   - graia-ariadne[graia]
     - graia-saya —— 模块化（[第 3 章](./saya.md)）
     - graia-scheduler —— 定时任务（[第 12 章](./scheduler.md)）
   - graia-ariadne[alconna]
     - arclet-alconna-graia —— 消息链处理器（[第 8 章第 4 节](./alconna.md)）
   - graia-ariadne[standard]
     - richuru
     - graia-saya —— 模块化（[第 3 章](./saya.md)）
     - graia-scheduler —— 定时任务（[第 12 章](./scheduler.md)）
   - graia-ariadne[full]
     - richuru
     - graia-saya —— 模块化（[第 3 章](./saya.md)）
     - graia-scheduler —— 定时任务（[第 12 章](./scheduler.md)）
     - arclet-alconna-graia —— 消息链处理器（[第 8 章第 4 节](./alconna.md)）

   而 `graia-ariadne[full]` 则会安装以上所有非必要组件。

2. 假设你不怎么喜欢整虚拟环境也可以使用如下命令来取消虚拟环境的创建。

   ```bash
   poetry config virtualenvs.create false
   ```

3. 事实上，poetry 创建的虚拟环境并不会在文件夹里面，则是在这些地方

   - macOS: `~/Library/Application Support/pypoetry`
   - Windows: `C:\Users\<username>\AppData\Roaming\pypoetry`
   - Linux: `~/.config/pypoetry`

   假设你不怎么喜欢的话，可以通过以下方式将虚拟环境创建在项目文件夹的 `.venv` 文件夹里

   ```bash
   poetry config virtualenvs.in-project true
   ```

4. 因为各种各样的原因，你的运行结果可能跟我有所不同，但是大致应该是差不多的。
:::

:::: details 命令输出

```bash
$ poetry env use 3.9

Creating virtualenv EroEroBot-BexBd8Xq-py3.9 in /root/.cache/pypoetry/virtualenvs
Using virtualenv: /root/.cache/pypoetry/virtualenvs/EroEroBot-BexBd8Xq-py3.9
```

```bash
$ poetry add graia-ariadne[standard]

Using version ^0.6.12 for graia-ariadne

Updating dependencies
Resolving dependencies...

Writing lock file

Package operations: 25 installs, 0 updates, 0 removals

  • Installing six (x.x.x)
  • Installing colorama (x.x.x)
  • Installing frozenlist (x.x.x)
  • Installing idna (x.x)
  • Installing multidict (x.x.x)
  • Installing python-dateutil (x.x.x)
  • Installing win32-setctime (x.x.x)
  • Installing aiosignal (x.x.x)
  • Installing arclet-alconna (x.x.x.x)
  • Installing async-timeout (x.x.x)
  • Installing croniter (x.x.x)
  • Installing attrs (x.x.x)
  • Installing loguru (x.x.x)
  • Installing graia-broadcast (x.x.x)
  • Installing graia-ariadne (x.x.x)
  • Installing typing-extensions (x.x.x)
  • Installing yarl (x.x.x)
  • Installing wcwidth (x.x.x)
  • Installing charset-normalizer (x.x.x)
  • Installing aiohttp (x.x.x)
  • Installing arclet-alconna-graia (x.x.x)
  • Installing graia-scheduler (x.x.x)
  • Installing graia-saya (x.x.x)
  • Installing pydantic (x.x.x)
  • Installing prompt-toolkit (x.x.x)
```

::: tsukkomi
事实上，假设你比较细心的话，你会发现：前一句的运行环境是 `Linux`，后一句的运行环境是 `Windows`。

为什么呢？没为什么，只是我懒。
:::

::::
