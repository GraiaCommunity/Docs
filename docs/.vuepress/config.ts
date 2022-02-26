import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'

import { navbar, sidebar } from './configs/'

export default defineUserConfig<DefaultThemeOptions>({
    // 文档名
    lang: "zh-CN",
    title: "GraiaX文档",
    description: "GraiaX文档",

    theme: path.resolve(__dirname, './theme'),
    themeConfig: {
        head: [["link", { rel: "icon", href: "/favicon.ico" }]],
        logo: "/logo.svg",
        repo: "GraiaCommunity/Docs",
        editLink: false,
        notFound: ["你在翻什么，这里可没有涩图哦", "朋友，你是不是迷路了", "不要乱翻，会乱的"],
        backToHome: "返回首页",

        // medium-zoom 配置项
        selector: ".theme-default-content :not(a) > img:not(.no-zoom)",
        zoomOptions: {
            margin: 16
        },
        navbar: navbar,
        sidebar: sidebar,
    },
    plugins: [
        [
            "@vuepress/register-components",
            {
                componentsDir: path.resolve(__dirname, "./components"),
            },
        ],
        [
            "@vuepress/plugin-search",
            {
                locales: {
                    "/": {
                        placeholder: "来，搜",
                    },
                },
            },
        ],
        [
            "@vuepress/plugin-container",
            {
                type: "interlink",
            },
        ],
        [
            "@vuepress/plugin-container",
            {
                type: "tsukkomi",
                locales: {
                    "/": {
                        defaultInfo: "吐槽",
                    },
                },
            },
        ],
        [
            "@vuepress/plugin-shiki",
            {
                theme: "one-dark-pro",
            },
        ],
    ],
})
