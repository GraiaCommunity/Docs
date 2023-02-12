# GraiaX Playwright

Easy Playwright Access for GraiaCommunity.

<project-info
    name="graiax-playwright"
    license="MIT"
    version="v0.2.1"
    author="BlueGlassBlock、Red_lnn、I Love Study"
    repoUser="GraiaCommunity"
    repoName="graiax-playwright"
/>

Graiax Playwright 使用 launart 作为启动管理器， 适用于 Ariadne 及 Avilla。

用于在 Ariadne 启动的时候同时通过 Playwright 启动一个浏览器内核，且可以在
Ariadne 运行过程中调用，并在其退出的时候自动关闭 Playwright。

> 需要注意的是，Playwright 将会在运行期间保持浏览器后台常驻，
> 但一般情况下由于未开启任何页面，其内存占用量不是非常大（但也是可观的）。

## 安装

::::code-group
:::code-group-item PDM

```bash
pdm add graiax-playwright
```

:::
:::code-group-item Poetry

```bash
poetry add graiax-playwright
```

:::
:::code-group-item PIP

```bash
pip install graiax-playwright
```

:::
::::

## 开始

以下教程以 Ariadne 配合 Launart 为例。

### 在机器人入口文件中：

```python
from graia.ariadne.app import Ariadne
from graiax.playwright import PlaywrightService // [!code focus]

app = Ariadne(...)
app.launch_manager.add_service(PlaywrightService("chromium")) # 默认值为 chromium // [!code focus]
app.launch_manager.add_service(PlaywrightService(user_data_dir="./browser_data"))  # 与上一行二选一，使用 Persistent Context // [!code focus]
...

Ariadne.launch_blocking()
```

### 在 Saya 模块中：

```python
from graia.ariadne.app import Ariadne
from graiax.playwright import PlaywrightBrowser
from graiax.shortcut.saya import listen

# 此处代码为没有使用 Persistent Context 的示例
# 若使用 Persistent Context 请使用 `context = app.launch_manager.get_interface(PlaywrightContext)`
# 该方法获得的对象与 playwright.async_api.BrowserContext 兼容


@listen(...)
async def function(app: Ariadne):
    browser = app.launch_manager.get_interface(PlaywrightBrowser)
    # 此处的 browser 之用法与 playwright.async_api.Browser 无异，但要注意的是下方代码的返回值为 False。
    # `isinstance(browser, playwright.async_api.Browser)`
    async with browser.page(  # 此 API 启用了自动上下文管理
        viewport={"width": 800, "height": 10},
        device_scale_factor=1.5,
    ) as page:
        await page.set_content("Hello World!")
        img = await page.screenshot(type="jpeg", quality=80, full_page=True, scale="device")

    await app.sendMessage(..., MessageChain(Image(data_bytes=img)))
    ...
```
