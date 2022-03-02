# 一些奇奇怪怪的小问题

这里面会专门讲解一些不怎么常见的问题。

因为这些问题的受众面比较小，
所以就在这里给大家汇总一下

## Termux 安装 uvloop

::: tip
假设你并不需要 `ReverseAdapter`，
你可以直接直接从 `graia-ariadne[full]` 换成 `graia-ariadne[graia]`
:::

假设你想要在 Termux 上跑 bot，  
但是当你 `pip install graia-ariadne[full]` 的时候  
却发现安装出现的报错  

通过排查，你发现，原来是 `uvloop` 的安装出现了问题  

直到 uvloop 0.16.0，在Termux中，
因为一些适配性的问题，
所以不能通过 `pip install uvloop` 之类的便捷方法来安装

那么问题来了，怎么样

1. 通过 `pkg install libuv` 安装 Termux 的 libuv 库
2. 通过 `pip download uvloop` 下载 uvloop 的安装包，并解压和 cd 进去
3. 编辑 `setup.py`，将 `self.use_system_libuv` 的值从 `False` 改成 `True`
4. 在 uvloop 文件夹中使用 `pip install .` 安装

::: tip
你可能想要知道怎么通过 poetry 来安装 uvloop  
这个嘛，我也不知道
:::
