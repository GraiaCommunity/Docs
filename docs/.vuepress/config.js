const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-CN",
  title: "GraiaX社区文档",
  description: "GraiaX社区文档",

  themeConfig: {
    head: [['link', { rel: 'icon', href: "/favicon.ico" }]],
    logo: "/logo.svg",
    repo: "Graiax-Community/Docs",
    editLink: false,
    notFound: [
      "你在翻什么，这里可没有涩图哦",
      "朋友，你是不是迷路了",
      "不要乱翻，会乱的"
    ],
    backToHome: "返回首页",
    navbar: [
      {
        text: "Graia Ariadne 官方文档",
        link: "https://graia.rtfd.io"
      }
    ],
    sidebar: {
      "/make_ero_bot/": [
        {
          text: "引言",
          link: "/make_ero_bot/README.md"
        },
        {
          text: "开始之前",
          children: [
            "/make_ero_bot/before/Q&A.md",
            "/make_ero_bot/before/1_mirai.md",
            "/make_ero_bot/before/2_terminal_multiplexer.md"
          ]
        },
        {
          text: "手把手教你写机器人",
          children: [
            "/make_ero_bot/tutorials/1_hello_ero.md",
            "/make_ero_bot/tutorials/2_other_event.md",
            "/make_ero_bot/tutorials/3_ero_comes.md",
            "/make_ero_bot/tutorials/4_kugimiya.md",
            "/make_ero_bot/tutorials/5_forward_message.md",
            "/make_ero_bot/tutorials/6_ero_from_net.md",
            "/make_ero_bot/tutorials/7_setu_tag.md",
            "/make_ero_bot/tutorials/8_leave_no_evidence.md",
            "/make_ero_bot/tutorials/9_huaji.md",
            "/make_ero_bot/tutorials/10_not_everyone_have_st.md",
            "/make_ero_bot/tutorials/11_ohayou_oniichan.md",
            "/make_ero_bot/tutorials/12_classification.md",
            "/make_ero_bot/tutorials/13_setu_tag_pls.md"
          ]
        },
        {
          text: "附录",
          children: [
            "/make_ero_bot/appendix/terms.md",
            "/make_ero_bot/appendix/credit.md",
            "/make_ero_bot/appendix/awesome_bot.md",
            "/make_ero_bot/appendix/inside_story.md",
            "/make_ero_bot/appendix/Q&A.md"
          ]
        }
      ]
    }
  },
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components")
      }
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: '来，搜',
          },
        },
      },
    ],
  ],
};
