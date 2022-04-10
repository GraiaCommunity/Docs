# 你可能会遇到的一些奇奇怪怪的小问题

本节专门来讲解一些不怎么常见的问题。  
因为这些问题的受众面比较小，所以就在这里给大家汇总一下。

::: tsukkomi
某些问题，可能跟 GraiaProject 的库没有任何关系，
仅仅是因为你**有可能**会在机器人上遇到才写上去的
:::

## Graia 相关

### Termux 安装 uvloop 时出错

::: tip
Ariadne 自 0.6.1 版本起添加了 `Reverse Adapter`（反向 HTTP / WebSockets 适配器），假设你并不需要 `ReverseAdapter`，
你可以在安装时直接把 `graia-ariadne[full]` 换成以下 2 种中的一种：

- `graia-ariadne[graia]`
- `graia-ariadne[graia,alconna]`
:::

假设你想要在 Termux 上跑 bot，你可能会在执行 `poetry add graia-ariadne[full]` 的过程中出现错误。

这是因为通过 **full** 选项安装 Ariadne 时会自动安装 `Reverse Adapter` 所需要的 `uvicorn` 这个依赖，
而 `uvicorn` 在 Linux / Unix 环境下会安装 `uvloop`。

但是直到 uvloop 0.16.0，由于 Termux 中存在一些兼容性的问题，
所以不能通过 `pip install uvloop` 或 `poetry add uvloop` 之类的便捷方法来安装，否则会报错。（[相关问题](https://github.com/MagicStack/uvloop/issues/260)）

那么问题来了，怎么解决这个问题呢？

1. 通过 `pkg install libuv` 安装 Termux 的 libuv 库
2. 通过 `pip download uvloop` 下载 uvloop 的安装包，并解压和 cd 进去
3. 编辑 `setup.py`，将 `self.use_system_libuv` 的值从 `False` 改成 `True`
4. 在 uvloop 文件夹中使用 `pip install .` 安装（**不要忘记最后的点**）

::: tsukkomi Poetry 怎么办？
你可能想要知道怎么通过 poetry 来安装 uvloop？

你可以试试在 `poetry add xxx` 之前先按上面的步骤安装。  
（请注意，第 2 步请把 uvloop 下载到项目目录内，第 4 步要把 `pip install .` 替换为 `poetry run pip install .`）

待 uvloop 安装完后再使用 `poetry add uvloop` 来添加 uvloop，这样 poetry **可能**就不会尝试重复安装 uvloop 了。  
（如果成功了，记得把 uvloop 的版本锁定，以避免 poetry 以后尝试自动升级时出错。）

如果这样做失败了，那你还是放弃吧~
:::
