# 引言

众所周知，学习代码最好的办法，就是举例子。

所以我们将创建**大家最喜欢的涩图机器人**为例子，将你们带入机器人的世界。

本文档的所有例子都可以在 :point_right: [这里](https://github.com/GraiaCommunity/EroEroBot) 找到。

假设文档有一些专有名词不了解，也可以看看[这里](./appendix/terms)。

::: danger 警告一下
这个文档只是社区的一小部分，不是社区的所有。
整个社区真的不全是涩涩人，真的！
:::

## 在这之前你需要的

0. :white_check_mark: [先谈好](../before/Q&A.md) —— 开始之前，你需要知道的事情
1. :white_check_mark: [Mirai 的配置](../before/install_mirai.md) —— 从 0 开始的 `Mirai-api-http` 环境配置
2. :white_check_mark: [复用终端](../before/terminal_multiplexer.md) —— 远程服务器跑机器人，你所需要知道的那些事
3. :white_check_mark: [你可能会遇到的一些奇奇怪怪的小问题](../before/small_questions.md)

## 从零开始的~~异世界~~涩图机器人教程

1. :white_check_mark: [造房之前，打好地基](./create_env.md) —— 创建项目并安装依赖
2. :white_check_mark: [快速上手](./hello_ero.md) —— 你好，来点涩图。你与机器人的第一次对话
3. :white_check_mark: [东西要分类好](./saya.md) —— 模块管理器 `graia-saya` 的使用
4. :white_check_mark: [不要再戳了](./other_event.md) —— `Ariadne` 上各类 `Event` 的简单讲解
5. :white_check_mark: [关于消息链的故事](./message_chain.md)
   1. :white_check_mark: [消息链是什么链](./message_chain.md) —— `MessageChain` 的介绍
   2. :heavy_minus_sign: [八嘎 hentai 无路赛](./multimedia_message.md) —— 对于发送 `多媒体消息` 的补充
6. :white_check_mark: [好大的奶](./forward_message.md) —— 合并消息的构建与解析
7. :white_check_mark: [来点网络上的涩图](./image_from_internet.md) —— `aiohttp` 的超简单运用
8. :heavy_minus_sign: [来点 xxx 涩图](./message_parser.md) —— `Ariadne` 的消息匹配器**们**的介绍
   1. :white_check_mark: [基础消息链处理器](./_base_parser.md) —— 简答又好用，不用造轮子
   2. :heavy_minus_sign: [Twilight](./twilight.md) —— `Kanata` 的精神续作
   3. :heavy_minus_sign: [Commander](./commander.md) —— 字符串创建命令
   4. :heavy_minus_sign: [Alconna](./alconna.md) —— <MoreInfo words="外  星  来  客"><div style="background: var(--c-bg);border:3px solid var(--c-brand)">（奥特曼也算是外星来客）<img src="/images/alien.webp" style="vertical-align:top"/></div></MoreInfo>
9. :white_check_mark: [看完了吗，我撤回了](./recall_message.md) —— `异步延时` 和 Ariadne 实例的其他方法介绍
10. :white_check_mark: [/斜眼笑](./formatter.md) —— `Formatter` 的运用
11. :white_check_mark: [不是所有人都能看涩图](./depend.md) —— `Depend` 的简单运用
12. :white_check_mark: [哦嗨哟，欧尼酱](./scheduler.md) —— 任务计划器 `graia-scheduler` 的使用
13. :white_check_mark: [请问您这次要怎么样的涩图](./interrupt_control.md) —— `interrupt` 的简单运用
14. :white_check_mark: [无内鬼，来点加密压缩包](./file_operation.md) —— 关于`文件操作`的简单实例
15. :heavy_minus_sign: [后台对线](./console.md) —— 关于 `Console` 的介绍
16. :heavy_minus_sign: [异步画~~涩~~图](./async_exec.md) —— `io_bound` 和 `cpu_bound` 的运用
17. :x: [一条龙涩涩](./) —— `saya` 跨模块运用

## 附录

1. :white_check_mark: [术语](../appendix/terms.md) —— 看这篇文档可能需要知道的一些奇奇怪怪的缩写
2. :white_check_mark: [鸣谢](../appendix/credit.md)
3. :white_check_mark: [社区可供参考的 bot](../appendix/awesome_bot.md)
4. :white_check_mark: [日志（大概）](../appendix/inside_story.md) —— 本文档主要作者的小天地
5. :white_check_mark: [Q&A](../appendix/Q&A.md) —— 反派经典有问必答环节

::: tsukkomi 标注说明
:white_check_mark:: 已经完成的  
:heavy_minus_sign:: 写了，但又没完全写的  
:x:: 还未立项的
:::
