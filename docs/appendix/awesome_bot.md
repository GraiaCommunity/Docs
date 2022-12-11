# 社区可供参考的 bot

::: tip
假设你想要把你的仓库也写在这了，欢迎 PR  
（以下仓库排名不分先后）

列在此处的 Bot 所需要达到的基本标准：

- 使用 `pyproject.toml` 作为项目依赖及元数据存储文件
- 使用 [**Saya**](https://github.com/GraiaProject/Saya) 作为模块管理工具
- 代码使用 [**isort**](https://pycqa.github.io/isort/)、[**Black**](https://github.com/psf/black) 等格式化工具
- 代码风格基本符合 **PEP 8** 建议
- 核心功能均可在本地部署

:::

<div class="bot-repo">
  <GitRepo user="djkcyl" repo="BBot-Graia"><b>Abot正统在Bbot</b><br />一个使用 gRPC 接口用于 QQ 群内高效推送 BiliBili 动态和直播的机器人</GitRepo>
  <GitRepo user="I-love-study" repo="A_Simple_QQ_Bot">一个普普通通的 QQ 机器人</GitRepo>
  <GitRepo user="Redlnn" repo="redbot">一个以 Graia Ariadne 框架为基础的 QQ 机器人</GitRepo>
  <GitRepo user="SAGIRI-kawaii" repo="sagiri-bot">基于Graia和Mirai的QQ机器人 SAGIRI-BOT</GitRepo>
  <GitRepo user="BlueGlassBlock" repo="NeNeRobo">服务于 Graia Community 的项目管理，GitHub 自动化 Bot</GitRepo>
  <GitRepo user="zzzzz167" repo="Yuki" archived><b><s>已停更</s>哦我的上帝，ta又更新了</b><br />No Description</GitRepo>
  <GitRepo user="RF-Tar-Railt" repo="RaianBot">一个基于 Ariadne 与 Alconna 的简易 QQ 机器人</GitRepo>
  <GitRepo user="AwordaProject" repo="Aworda-LBot">霖念的小世界</GitRepo>
  <GitRepo user="kaixinol" repo="AldotaiBot">集多种兽圈文化功能的综合性bot。一个成分非常纯的兽圈bot</GitRepo>
</div>

<style scope>
.bot-repo {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
}

@media (max-width: 800px) {
  .bot-repo {
    grid-template-columns: 100%;
  }
}
</style>
