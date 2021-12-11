---
id: mirai-api-http
title: 手动配置mirai-api-http
sidebar-title: 手动配置 mah
---

:::warning
该文档将会介绍最正常的方法来安装先前工作
假设你想通过其他办法配置，可以去阅读[mirai官方文档](https://docs.mirai.mamoe.net/)
:::

## 1. 安装java
注：  
下图以java 11 jdk 举例  
你也可以安装其他java 11+ 版本的 jdk/jre
```bash
#对于Ubuntu/Debian用户
apt install openjdk-11-jdk
#对于Centos8/Rocky Linux用户
dnf install java-11-openjdk
#对于Centos7用户
yum install java-11-openjdk
```
[Windows 64位 安装包](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_x64_windows_hotspot_11.0.11_9.msi)
[Windows 32位 安装包](https://github.com/AdoptOpenJDK/openjdk11-binaries/releases/download/jdk-11.0.11%2B9/OpenJDK11U-jdk_x86-32_windows_hotspot_11.0.11_9.msi)

## 2. 下载mcl(Mirai-Console-Loader)
1. 到 [MCL的releases界面](https://github.com/iTXTech/mirai-console-loader/releases/latest) 下载最新版本的mcl(一般命名为mcl-x.x.x.zip)并解压
2. 打开命令行/终端并进入到该文件夹中，并输入`.\mcl`启动，并在启动完成后关闭  
(当输出了`I/main: mirai-console started successfully`，即启动完成)
```bash
#启动之后，你的文件夹大概就是这个样子
├─config
│  └─Console
├─data
├─libs
├─plugins
└─scripts
```
## 3. 安装并配置mah(Mirai-api-http)
1. 到 [MAH的releases界面](https://github.com/project-mirai/mirai-api-http/releases/latest) 下载最新版本的mah(一般命名为mirai-api-http-v2.x.x.mirai.jar)
2. 将下载好的文件放入`plugins`文件夹里面
3. 再次通过`.\mcl`启动mcl, 并在启动完成后关闭
4. 编辑`config/net.mamoe.mirai-api-http/setting.yml`进行设置
```yaml
adapters:
  - http
  - ws
debug: false
enableVerify: true
verifyKey: GraiaxVerifyKey # 你可以自己设定, 这里作为示范
singleMode: false
cacheSize: 4096 # 可选, 缓存大小, 默认4096. 缓存过小会导致引用回复与撤回消息失败
adapterSettings:
  ## 详情看 http adapter 使用说明 配置
  http:
    host: localhost
    port: 8080 # 端口
    cors: [*]

  ## 详情看 websocket adapter 使用说明 配置
  ws:
    host: localhost
    port: 8080 # 端口
    reservedSyncId: -1 # 确保为 -1, 否则 WebsocketAdapter(Experimental) 没法正常工作.
```