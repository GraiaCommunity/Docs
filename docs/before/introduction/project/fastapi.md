# GraiaX FastAPI

Easy FastAPI Access for GraiaCommunity.

<project-info
    name="graiax-fastapi"
    license="MIT"
    version="v0.4.0"
    author="BlueGlassBlock、Red_lnn"
    repoUser="GraiaCommunity"
    repoName="graiax-fastapi"
/>

你可以方便地使用 GraiaX FastAPI 配合 `graia.amnesia.builtins.asgi.UvicornASGIService`
轻松地在启动使用了 Graia Amnesia 的项目（如：Ariadne、Avilla）的同时启动一个
Uvicorn 服务器并在 Saya 模块中便捷地注册 FastAPI 的路由，且在 Launart 退出的时候自动关闭 Uvicorn。

## 安装

::::code-group
:::code-group-item PDM

```sh
pdm add graiax-fastapi
```

:::
:::code-group-item Poetry

```sh
poetry add graiax-fastapi
```

:::
:::code-group-item PIP

```sh
pip install graiax-fastapi
```

:::
::::

## 开始

以 Avilla 为例。

:::warning
自 v0.4.0 版本开始， GraiaX FastAPI 抛弃了旧版
Launart（`<0.7.0`）和旧版 Amnesia（`<0.8.0`）的支持，因此在
Ariadne 支持新的 Launart 以及 Amnesia 之前，请使用
`graiax-fastapi==0.3.0`。
:::

### 配合 Launart 使用

### 在机器人入口文件中：

#### 机器人入口文件

如果你有使用 **Graia Saya** 作为模块管理工具，那么你可以使用 **FastAPIBehaviour**
以在 Saya 模块中更方便地使用 FastAPI。

FastAPI 本身并 **不自带** ASGI 服务器，因此你需要额外添加一个 **UvicornASGIService**。

```python
import pkgutil

from avilla.console.protocol import ConsoleProtocol
from avilla.core import Avilla
from creart import create
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graia.amnesia.builtins.asgi import UvicornASGIService
from graia.broadcast import Broadcast
from graia.saya import Saya
from launart import Launart

broadcast = create(Broadcast)
saya = create(Saya)
launart = create(Launart)
avilla = Avilla(broadcast=broadcast, launch_manager=launart, message_cache_size=0)
fastapi = FastAPI()

avilla.apply_protocols(ConsoleProtocol())
saya.install_behaviours(FastAPIBehaviour(fastapi))
fastapi.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
launart.add_component(FastAPIService(fastapi))
launart.add_component(UvicornASGIService("127.0.0.1", 9000, {"": fastapi}))  # type:ignore
# 上面这条命令会占据 Uvicorn 的所有入口点，详见下方的 Warning

with saya.module_context():
    for module in pkgutil.iter_modules(["modules"]):
        if module.name[0] in ("#", ".", "_"):
            continue
        saya.require(f"modules.{module.name}")

launart.launch_blocking()
```

:::warning
需要留意的是，在把我们的 FastAPI 实例添加到 `UvicornASGIService` 中间件时，我们通过
`{"": fastapi}` 指定了一个**入口点**（entrypoint）`""`，这代表着我们此时传进去的
FastAPI 实例将占据 `http://127.0.0.1:9000/` 下所有入口（例如我们可以通过 `http://127.0.0.1:9000/docs`
访问我们的 FastAPI 实例的 OpenAPI 文档），这样用起来很方便，但可能会影响其他也使用 `UvicornASGIService`
中间件的功能（例如 Avilla 的 ob11 协议）。

假如我们使用 `{"/api": fastapi}` 指定 `/api` 为入口点，那么我们就需要通过 `http://127.0.0.1:9000/api/docs` 而不是
`http://127.0.0.1:9000/docs` 来访问我们的 FastAPI 实例的 OpenAPI 文档。
:::

#### Saya 模块中

```python
from graia.saya import Channel
from pydantic import BaseModel

from graiax.fastapi import RouteSchema, route

channel = Channel.current()


class ResponseModel(BaseModel):
    code: int
    message: str


# 方式一：像 FastAPI 那样直接使用装饰器
@route.get("/", response_model=ResponseModel)
async def root():
    return {"code": 200, "message": "Hello World!"}


# 方式二：当你先需要同一个路径有多种请求方式时你可以这样做
@route.route(["GET"], "/xxxxx")
async def xxxxx():
    return "xxxx"


# 方式三：上面那种方式实际上也可以这么写
@channel.use(RouteSchema("/xxx", methods=["GET", "POST"]))
async def xxx():
    return "xxx"


# Websocket
from fastapi import WebSocket
from starlette.websockets import WebSocketDisconnect
from websockets.exceptions import ConnectionClosedOK


@route.ws("/ws")
# 等价于 @channel.use(WebsocketRouteSchema("/ws"))
async def ws(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            print(await websocket.receive_text())
        except (WebSocketDisconnect, ConnectionClosedOK, RuntimeError):
            break
```

假如你不想在 Saya 模块中为 FastAPI 添加路由，那么你可以选择以下几种方式：

:::details 其他方式
**1. 在机器人入口文件中直接添加：**

```python
...
fastapi = FastAPI()
...
fastapi.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@fastapi.get("/main")
async def main():
    return "main"

...
launart.add_component(FastAPIService(fastapi))
launart.add_component(UvicornASGIService("127.0.0.1", 9000, {"": fastapi}))  # type:ignore
...
```

**2. 在 Avilla 启动成功后添加：**

```python
from fastapi.responses import PlainTextResponse
from avilla.standard.core.application.event import ApplicationReady
from graiax.fastapi.interface import FastAPIProvider

async def interface_test():
    return PlainTextResponse("I'm from interface!")


@listen(ApplicationReady)
async def function():
    launart = Launart.current()
    fastapi = launart.get_interface(FastAPIProvider)
    fastapi.add_api_route("/interface", fastapi.get("/interface")(interface_test))
```

:::
