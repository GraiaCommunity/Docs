# GraiaX FastAPI

Easy FastAPI Access for GraiaCommunity.

<project-info
    name="graiax-fastapi"
    license="MIT"
    version="v0.2.1"
    author="BlueGlassBlock、Red_lnn"
    repoUser="GraiaCommunity"
    repoName="graiax-fastapi"
/>

启动 Ariadne 时同时启动一个 Uvicorn 服务器并把 FastAPI 作为其
ASGIApplication，在退出时自动关闭 Uvicorn。
同时，可在 Saya 模块中便捷地注册 FastAPI 的路由。

## 安装

::::code-group
:::code-group-item PDM

```bash
pdm add graiax-fastapi
```

:::
:::code-group-item Poetry

```bash
poetry add graiax-fastapi
```

:::
:::code-group-item PIP

```bash
pip install graiax-fastapi
```

:::
::::

## 开始

以下教程以 Ariadne 配合 Launart 为例。

如果你有使用 **Graia Saya** 作为模块管理工具，那么可以通过使用 **FastAPIBehaviour** 以在 Saya 模块中更方便地使用 FastAPI。

但是 FastAPI 本身并**不自带**ASGI 服务器，因此你需要额外添加一个 **UvicornService**。

### 在机器人入口文件中：

```python
from creart import create
from graia.ariadne.app import Ariadne
from graia.amnesia.builtins.uvicorn import UvicornService // [!code focus]
from graiax.fastapi import FastAPIBehaviour, FastAPIService // [!code focus]
from graia.saya import Saya

app = Ariadne(...)
saya = create(Saya)
fastapi = FastAPI() // [!code focus]

saya.install_behaviours(FastAPIBehaviour(fastapi)) // [!code focus]

# 可以不创建 FastAPI 实例, 交给 FastAPIService 自己创建 // [!code focus]
# app.launch_manager.add_service(FastAPIService()) // [!code focus]
# 这样的话就不能给 FastAPI 传参并自定义 FastAPI // [!code focus]
app.launch_manager.add_service(FastAPIService(fastapi)) // [!code focus]
app.launch_manager.add_service(UvicornService()) // [!code focus]

Ariadne.launch_blocking()
```

### 在 Saya 模块中：

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

:::details 其他方式
假如你不想在 Saya 模块中为 FastAPI 添加路由，那么你可以选择以下两种方式：

**1. 在机器人入口文件中直接添加：**

```python
...
app = Ariadne(...)
saya = create(Saya)
fastapi = FastAPI()

fastapi.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@fastapi.get("/main")
async def main():
    return "main"

...
Ariadne.launch_blocking()
```

**2. Ariadne 启动成功后在 Saya 模块中添加：**

```python
from graia.amnesia.builtins.uvicorn import ASGIHandlerProvider
from graiax.shortcut.saya import listen


async def root(...):
    ...


@listen(ApplicationLaunched)
async def function(app: Ariadne):
    mgr = app.launch_manager
    fastapi: FastAPI = mgr.get_interface(ASGIHandlerProvider).get_asgi_handler()  # type: ignore
    fastapi.add_api_route('/', endpoint=root, methods=['GET'])
    fastapi.get('/main')(root)
    fastapi.add_api_websocket_route('/ws', endpoint=websocket)
```

:::
