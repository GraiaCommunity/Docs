# Python 版本的选择

对于一个新创建的项目，理论上应使用较新的 Python 版本（毕竟你以后可能都不会想升级版本了）。

对于面对 Graia Project（如 [Ariadne](https://github.com/GraiaProject/Ariadne)）的项目，应尽可能使用
3.10 及以上的 Python 版本，目前 Python 最新版本为 3.11.x。

再不济（比如用的是 Windows 7 系统）也请务必保证所使用的 Python 版本大于 3.8
（Ariadne 对 Python 版本的最低要求是 Python 3.8）

:::tip

1. 一般来讲，像是 TensorFlow、PyTorch、numba 等深度学等库都会至少会保证适配当前 Python 最新版本的上一个版本
   （比如当你知道现在 Python 最新版本为 3.11.x，就可能大胆确认这些库至少支持了 Python 3.10 ）  
   （顺带一提，截至本段文字书写（2023.5.3）时，上述库均已支持 Python 3.11 ）
2. 如果你的项目需要用到一些更新不勤快的第三方库，可能没有适配 Python 3.11 的版本。
   （不过如果你使用的第三方库好几年没有任何维护，并且其要求的依赖无法满足
   （比如要求 Numpy 版本为 1.22.x 但是其他第三方库要求 >= 1.23）
   那还是比较推荐找到这些库的替代品
   ）
:::

:::tip 对于 Windows 7 用户
虽然 Python 3.9+ 停止了对 Windows 7 的支持，
但如果真的要运行，也不是没有办法。比如 [这里](https://github.com/adang1345/PythonWin7)
就提供了能在 Windows 7 上运行的 Python 3.9+ 安装包/可运行文件。
（不过运行的时候会不会出现其他 bug 什么的就不知道了）
:::
