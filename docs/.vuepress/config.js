const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-CN",
  title: "GraiaX社区文档",
  description: "GraiaX社区文档",

  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    sidebar: {
      "/make_ero_bot/": [
        {
          text: "手把手教你写机器人",
          children: [
            "/make_ero_bot/README.md",
            "/make_ero_bot/1_hello_ero.md",
            "/make_ero_bot/2_bot_start.md",
            "/make_ero_bot/3_ero_comes.md"
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
    ]
  ],
};
