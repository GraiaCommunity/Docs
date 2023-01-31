# GraiaX FastAPI

Easy FastAPI Access for GraiaCommunity

<project-info
    name="graiax-fastapi"
    license="MIT"
    version="v0.0.0"
    author="BlueGlassBlock、Red_lnn"
/>

启动 Ariadne 时同时启动一个 Uvicorn 服务器并把 FastAPI 作为其
ASGIApplication，在退出时自动关闭 Uvicorn。
同时，可在 Saya 模块中便捷地注册 FastAPI 的路由。

## 安装

:::: code-group
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
