const before = [
  {
    text: '开始之前',
    collapsible: true,
    items: [
      { text: '说在前面', link: '/before/' },
      { text: '你需要知道的一些事', link: '/before/QA' },
      { text: 'Mirai 的安装与配置', link: '/before/install_mirai' },
      { text: '名词解释', link: '/before/terms' },
    ],
  },
]

const guide = [
  {
    text: '手把手教你写机器人',
    collapsible: true,
    items: [
      { text: '要致富，先撸树', link: '/guide/create_env' },
      { text: '快速上手', link: '/guide/hello_ero' },
      { text: '东西要分类好', link: '/guide/saya' },
      { text: '不要再戳了~', link: '/guide/other_event' },
      { text: '谁在找我', link: '/guide/multi_events' },
      {
        text: '关于消息链的故事',
        items: [
          { text: '消息链是什么链', link: '/guide/message_chain' },
          { text: '八嘎 hentai 无路赛', link: '/guide/multimedia_message' },
        ],
      },
      { text: '好大的奶', link: '/guide/forward_message' },
      { text: '来点网上的涩图', link: '/guide/image_from_internet' },
      {
        text: '来点 xxx 涩图',
        link: '/guide/message_parser/',
        items: [
          { text: '消息链匹配器', link: '/guide/message_parser/base_parser' },
          { text: 'Twilight', link: '/guide/message_parser/twilight' },
          { text: 'Commander', link: '/guide/message_parser/commander' },
          { text: 'Alconna', link: '/guide/message_parser/alconna' },
        ],
      },
      { text: '看完了吗，我撤回了', link: '/guide/recall_message' },
      { text: '/斜眼笑（Formatter）', link: '/guide/formatter' },
      { text: '不是所有人都能看涩图', link: '/guide/depend' },
      { text: '哦嗨哟，欧尼酱', link: '/guide/scheduler' },
      {
        text: '请问今天你想要怎么样的涩图',
        link: '/guide/interrupt_control',
      },
      { text: '无内鬼，来点加密压缩包', link: '/guide/file_operation' },
      { text: '后台对线', link: '/guide/console' },
      { text: '异步画涩图', link: '/guide/async_exec' },
    ],
  },
]

const appendix = [
  {
    text: '附录',
    collapsible: true,
    items: [
      { text: '鸣谢', link: '/appendix/credit' },
      { text: '社区可供参考的 bot', link: 'appendix/awesome_bot' },
      { text: '日志（大概）', link: '/appendix/inside_story' },
      { text: 'Q&A', link: '/appendix/QA' },
    ],
  },
  {
    text: '写代码的小贴士',
    collapsible: true,
    // collapsed: true,
    items: [
      { text: '终端复用', link: '/appendix/tips/terminal_multiplexer' },
      { text: '更简短的修饰器', link: '/appendix/tips/shortcut' },
      { text: 'Termux 安装 Uvicorn 出错', link: '/appendix/tips/termux-install-uvicon' },
      { text: '尝试以下click-like的写法', link: '/appendix/tips/click_like_parser' },
      { text: 'pathlib 为什么是神？路径解析推荐', link: '/appendix/tips/pathlib' },
    ],
  },
  {
    text: '奇奇怪怪的东西',
    collapsible: true,
    // collapsed: true,
    items: [{ text: '热点追踪 - 群搜图小助手', link: '/appendix/other/saucenao' }],
  },
]

export { before, guide, appendix }
