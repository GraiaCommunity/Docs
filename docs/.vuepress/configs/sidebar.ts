import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebar: SidebarConfig = {
    "/make_ero_bot/": [
        {
            text: "引言",
            link: "/make_ero_bot/README.md",
        },
        {
            text: "开始之前",
            children: [
                "/make_ero_bot/before/Q&A.md",
                "/make_ero_bot/before/1_mirai.md",
                "/make_ero_bot/before/2_terminal_multiplexer.md",
            ],
        },
        {
            text: "手把手教你写机器人",
            children: [
                "/make_ero_bot/tutorials/1_hello_ero.md",
                "/make_ero_bot/tutorials/2_other_event.md",
                {
                    text: "3.关于消息链的故事",
                    link: "/make_ero_bot/tutorials/3_1_ero_comes.md",
                    children: [
                        "/make_ero_bot/tutorials/3_1_ero_comes.md",
                        "/make_ero_bot/tutorials/3_2_kugimiya.md"
                    ],
                },
                "/make_ero_bot/tutorials/4_forward_message.md",
                "/make_ero_bot/tutorials/5_ero_from_net.md",
                {
                    text: "6. 来点 xxx 涩图",
                    link: "/make_ero_bot/tutorials/6_0_setu_tag.md",
                    children: [
                        "/make_ero_bot/tutorials/6_1_base_parser.md",
                        "/make_ero_bot/tutorials/6_2_twilight.md",
                        "/make_ero_bot/tutorials/6_3_commander.md",
                        "/make_ero_bot/tutorials/6_4_alconna.md",
                    ],
                },
                "/make_ero_bot/tutorials/7_leave_no_evidence.md",
                "/make_ero_bot/tutorials/8_huaji.md",
                "/make_ero_bot/tutorials/9_not_everyone_have_st.md",
                "/make_ero_bot/tutorials/10_ohayou_oniichan.md",
                "/make_ero_bot/tutorials/11_classification.md",
                "/make_ero_bot/tutorials/12_setu_tag_pls.md",
                "/make_ero_bot/tutorials/13_encrypt_compressed_file.md",
                "/make_ero_bot/tutorials/14_backend_laning.md",
                "/make_ero_bot/tutorials/15_async_drawing.md",
            ],
        },
        {
            text: "附录",
            children: [
                "/make_ero_bot/appendix/small_question.md",
                "/make_ero_bot/appendix/terms.md",
                "/make_ero_bot/appendix/credit.md",
                "/make_ero_bot/appendix/awesome_bot.md",
                "/make_ero_bot/appendix/inside_story.md",
                "/make_ero_bot/appendix/Q&A.md",
            ],
        },
    ],
}