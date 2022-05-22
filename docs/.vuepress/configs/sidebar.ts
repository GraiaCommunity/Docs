export default {
  '/': [
    {
      text: '引言',
      link: '/guide',
      children: [],
    },
    {
      text: '开始之前',
      collapsible: true,
      children: [
        '/before/Q&A.md',
        '/before/install_mirai.md',
        '/before/terminal_multiplexer.md',
        '/before/small_questions.md',
      ],
    },
    {
      text: '手把手教你写机器人',
      collapsible: true,
      children: [
        '/guide/create_env.md',
        '/guide/hello_ero.md',
        '/guide/saya.md',
        '/guide/other_event.md',
        '/guide/multi_events.md',
        {
          text: '关于消息链的故事',
          link: '/guide/message_chain.md',
          children: ['/guide/message_chain.md', '/guide/multimedia_message.md'],
        },
        '/guide/forward_message.md',
        '/guide/image_from_internet.md',
        {
          text: '来点 xxx 涩图',
          link: '/guide/message_parser.md',
          children: [
            '/guide/base_parser.md',
            '/guide/twilight.md',
            '/guide/commander.md',
            '/guide/alconna.md',
          ],
        },
        '/guide/recall_message.md',
        '/guide/formatter.md',
        '/guide/depend.md',
        '/guide/scheduler.md',
        '/guide/interrupt_control.md',
        '/guide/file_operation.md',
        '/guide/console.md',
        '/guide/async_exec.md',
      ],
    },
    {
      text: '附录',
      collapsible: true,
      children: [
        '/appendix/terms.md',
        '/appendix/credit.md',
        '/appendix/awesome_bot.md',
        '/appendix/inside_story.md',
        '/appendix/Q&A.md',
      ],
    },
    {
      text: '热点跟踪',
      collapsible: true,
      children: ['/saucenao.md'],
    },
  ],
}
