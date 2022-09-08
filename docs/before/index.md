# 引言

众所周知，学习代码最好的办法，就是举例子。

所以我们将创建**大家最喜欢的涩图机器人**为例子，将你们带入机器人的世界。

本文档的所有例子都可以在 :point_right: [这里](https://github.com/GraiaCommunity/EroEroBot) 找到。

假设文档有一些专有名词不了解，也可以看看[这里](/appendix/terms)。

::: danger 警告一下
这个文档只是社区的一小部分，不是社区的所有。
整个社区真的不全是涩涩人，真的！
:::

## 在这之前你需要的

1. [x] [先谈好](./QA) —— 开始之前，你需要知道的事情
2. [x] [Mirai 的配置](./install_mirai) —— 从 0 开始的 `Mirai-api-http` 环境配置
3. [x] [复用终端](./terminal_multiplexer) —— 远程服务器跑机器人，你所需要知道的那些事
4. [x] [你可能会遇到的一些奇奇怪怪的小问题](./troubleshooting)

## 从零开始的~~异世界~~涩图机器人教程

1. [x] [造房之前，打好地基](../guide/create_env) —— 创建项目并安装依赖
2. [x] [快速上手](../guide/hello_ero) —— 你好，来点涩图。你与机器人的第一次对话
3. [x] [东西要分类好](../guide/saya) —— 模块管理器 `graia-saya` 的使用
4. [x] [不要再戳了](../guide/other_event) —— `Ariadne` 上各类 `Event` 的简单讲解
5. [ ] [谁在找我](../guide/multi_events) —— 同时需要监听多个事件时候的注意事项
6. [x] [关于消息链的故事](../guide/message_chain)
   1. [x] [消息链是什么链](../guide/message_chain) —— `MessageChain` 的介绍
   2. [x] [八嘎 hentai 无路赛](../guide/multimedia_message) —— 对于发送 `多媒体消息` 的补充
7. [x] [好大的奶](../guide/forward_message) —— 合并消息的构建与解析
8. [x] [来点网络上的涩图](../guide/image_from_internet) —— `aiohttp` 的超简单运用
9. [x] [来点 xxx 涩图](../guide/message_parser/) —— `Ariadne` 的消息匹配器**们**的介绍
   1. [x] [基础消息链处理器](../guide/message_parser/base_parser) —— 简单又好用，不用造轮子
   2. [x] [Twilight](../guide/message_parser/twilight) —— `Kanata` 的精神续作
   3. [x] [Commander](../guide/message_parser/commander) —— 字符串创建命令
   4. [x] [Alconna](../guide/message_parser/alconna) —— <MoreInfo words="外  星  来  客"><div style="background: var(--vp-c-bg);border:3px solid var(--vp-c-brand)">（奥特曼也算是外星来客）<img src="/images/alien.webp" alt="Ultraman" style="vertical-align:top"/></div></MoreInfo>
10. [x] [看完了吗，我撤回了](../guide/recall_message) —— `异步延时` 和 Ariadne 实例的其他方法介绍
11. [x] [/斜眼笑](../guide/formatter) —— `Formatter` 的运用
12. [x] [不是所有人都能看涩图](../guide/depend) —— `Depend` 的简单运用
13. [x] [哦嗨哟，欧尼酱](../guide/scheduler) —— 任务计划器 `graia-scheduler` 的使用
14. [x] [请问您这次要怎么样的涩图](../guide/interrupt_control) —— `interrupt` 的简单运用
15. [x] [无内鬼，来点加密压缩包](../guide/file_operation) —— 关于`文件操作`的简单实例
16. [x] [后台对线](../guide/console) —— 关于 `Console` 的介绍
17. [ ] [异步画~~涩~~图](../guide/async_exec) —— `io_bound` 和 `cpu_bound` 的运用
18. :x: [一条龙涩涩](#从零开始的异世界涩图机器人教程) —— `saya` 跨模块运用

## 附录

1. [x] [术语](../appendix/terms) —— 看这篇文档可能需要知道的一些奇奇怪怪的缩写
2. [x] [鸣谢](../appendix/credit)
3. [x] [社区可供参考的 bot](../appendix/awesome_bot)
4. [x] [日志（大概）](../appendix/inside_story) —— 本文档主要作者的小天地
5. [x] [Q&A](../appendix/QA) —— 反派经典有问必答环节

::: tsukkomi 标注说明

- [x] : 已经完成的
- [ ] : 写了，但又没完全写的
- :x: : 还未立项的

:::
