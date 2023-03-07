# IDE 的选择

> 参考自 Well404 的[博客](http://blog.well404.top/2023/02/28/开发环境配置/)

:::warning 声明（~~叠甲×3~~）
本教程并不是一个十分严谨、客观且适用于所有人的环境组合，
如果你的开发环境也很好用那么你大可不必切换到不熟悉的开发环境，
毕竟自己用的舒服才是最重要的。
:::

1. 什么是 IDE？
2. pyc 和 vsc 的区别
3. pyc 不支持 pdm，需要用 poetry
4. 刚入门推荐 pyc，有基础建议 vsc

## 什么是 IDE？

集成开发环境（IDE，Integrated Development Environment），其本来是指辅助程序猿写代码的一系列软件的合集。
不过我们通常都会特指写代码时所用的编辑器（其具有语法高亮、代码补全、代码检查、代码格式化等功能）。

对于 Python 程序猿来说，常用的 IDE 通常有以下两个：

- [JetBrains PyCharm](https://www.jetbrains.com/pycharm/)（以下简称 pyc）
- [Visual Studio Code](https://code.visualstudio.com/)（以下简称 vsc）

:::tip

- PyCharm 和 VSC 都是免费的，百度搜到要付费下载的都是假的
- VSC 与 [Visual Studio](https://visualstudio.microsoft.com/zh-hans/)
  并**没有**任何直接联系，他们俩只是名字有重复的词
- PyCharm 和 VSC 都需要经过一定的配置才用得舒服，并没有做到开箱即用

:::

## PyCharm 与 Visual Studi Code 的区别？

由于 PyCharm 拥有丰厚的历史底蕴，其功能繁多，配置也多，
新手刚接触的时候常常会遇到工作区没有设置或设置错误、
虚拟环境没有设置或设置错误导致一堆错误的问题，同时 PyCharm
的储存空间和内存占用也是非常可观的因此除非你是 Pycharm
的老用户，否则并不推荐使用 Pycharm 进行开发。

而 VS Code 是微软开发的开源**免费**跨平台编辑器，
在设置正确的情况下其功能和使用体验与 PyCharm
相当，但想要做到舒服使用 VS Code 也需要进行较多的配置。
