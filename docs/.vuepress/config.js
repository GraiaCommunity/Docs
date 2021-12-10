const { path } = require("@vuepress/utils");

module.exports = {
  lang: "zh-CN",
  title: "GraiaX社区文档",
  description: "GraiaX社区文档",

  themeConfig: {
    logo: "https://vuejs.org/images/logo.png"
  },
  plugins: [
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components")
      }
    ]
  ]
};
