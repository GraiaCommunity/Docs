# 导语

众所周知，学习代码最好的办法，就是举例子

所以我们将创建**大家最喜欢的涩图机器人**为例子，将你们带入机器人的世界

::: danger 警告一下
这个文档只是社区的一小部分，不是社区的所有  
整个社区真的不全是涩涩人，真的！
:::

::: warning
本教程将会默认你至少学过一点点 `Python`  
假设你连 Python 都不会，建议至少学点 Python 基础再来看  
:::

::: tip
本文档的所有例子都在[co ↗ co ↘](https://github.com/GraiaCommunity/EroEroBot)  
假设文档有专有名词没看懂，也可以看看[这里](terms)
:::

## 在这之前你需要的

 0. :white_check_mark: [先谈好](./before/Q&A.md) —— 开始之前，你需要知道的事情  
 1. :white_check_mark: [Mirai的配置](./before/1_mirai.md) —— 从 0 开始的 `Mirai-api-http` 环境配置
 2. :white_check_mark: [复用终端](./before/2_terminal_multiplexer.md) —— 远程服务器跑机器人，你所需要知道的那些事

## 从零开始的~~异世界~~涩图机器人教程

 1. :white_check_mark: [你好，来点涩图](./tutorials/1_hello_ero.md) —— 你与机器人的第一次对话
 2. :white_check_mark: [别戳了](./tutorials/2_other_event.md) —— `Ariadne` 上各类 `Event` 的简单讲解
 3. :white_check_mark: <MoreInfo :link="true" words="关于消息链的故事"><div style="background: var(--c-bg);border:3px solid var(--c-brand)">这里变绿只是看着好看罢了，并没有超链接</div></MoreInfo>
    1. :white_check_mark: [发涩图](./tutorials/3_1_ero_comes.md) —— `MessageChain` 的介绍
    2. :white_check_mark: [八嘎 hentai 无路赛](./tutorials/3_2_kugimiya.md) —— 对于 ` 多媒体消息 ` 发送的一点补充  
 4. :white_check_mark: [好大的奶](./tutorials/4_forward_message.md) —— 合并消息的构建与解析
 5. :white_check_mark: [来点网络上的涩图](./tutorials/5_ero_from_net.md) —— `aiohttp` 的超简单运用
 6. :heavy_minus_sign: [来点 xxx 涩图](./tutorials/6_0_setu_tag.md) —— `Ariadne` 的消息匹配器**们**的介绍  
    1. :white_check_mark: [基础消息链处理器](./tutorials/6_1_base_parser.md) —— 简答又好用，不用造轮子  
    2. :heavy_minus_sign: [Twilight](./tutorials/6_2_twilight.md) —— `Kanata` 的精神续作  
    3. :heavy_minus_sign: [Commander](./tutorials/6_3_commander.md) —— 字符串创建命令  
    4. :heavy_minus_sign: [Alconna](./tutorials/6_4_alconna.md) —— <MoreInfo words="外  星  来  客"><div style="background: var(--c-bg);border:3px solid var(--c-brand)">（奥特曼也算是外星来客）<img src="/images/alien.webp" style="vertical-align:top"/></div></MoreInfo>  
 7. :white_check_mark: [看完了吗，我撤回了](./tutorials/7_leave_no_evidence.md) —— `异步延时` 和 Ariadne 实例的其他方法介绍
 8. :white_check_mark: [/斜眼笑](./tutorials/8_huaji.md) —— `Formatter` 的运用
 9. :white_check_mark: [不是所有人都能看涩图](./tutorials/9_not_everyone_have_st.md) —— `Depend` 的简单运用
10. :white_check_mark: [哦嗨哟，欧尼酱](./tutorials/10_ohayou_oniichan.md) —— 任务计划器 `graia-scheduler` 的使用
11. :white_check_mark: [东西要分类好](./tutorials/11_classification.md) —— 插件管理器 `graia-saya` 的使用
12. :white_check_mark: [请问您这次要怎么样的涩图](./tutorials/12_setu_tag_pls.md) —— `interrupt` 的简单运用
13. :white_check_mark: [无内鬼，来点加密压缩包](./tutorials/13_encrypt_compressed_file.md) —— 关于`文件操作`的简单实例
14. :heavy_minus_sign: [后台对线](./tutorials/14_backend_laning.md) —— 关于 `Console` 的介绍
15. :heavy_minus_sign: [异步画~~涩~~图](./tutorials/15_async_drawing.md) —— `io_bound` 和 `cpu_bound` 的运用
16. :x: [一条龙涩涩]() —— `saya` 跨模块运用

注：
:white_check_mark:: 已经完成的
:heavy_minus_sign:: 写了，但又没完全写的
:x:: 还未立项的
