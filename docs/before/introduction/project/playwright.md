# GraiaX Playwright

Easy Playwright Access for GraiaCommunity.

<project-info
    name="graiax-playwright"
    license="MIT"
    version="v0.3.0"
    author="BlueGlassBlock、Red_lnn、I Love Study"
    repoUser="GraiaCommunity"
    repoName="graiax-playwright"
/>

Graiax Playwright 使用 [launart](https://github.com/GraiaProject/launart) 作为启动管理器，
适用于 [Ariadne](https://github.com/GraiaProject/Ariadne) 及 [Avilla](https://github.com/GraiaProject/Avilla)。

通过 GraiaX Playwright 你可以轻松地在 Ariadne / Avilla 启动的时候同时启动一个
Playwright，并在其退出的时候自动关闭 Playwright。

> 需要注意的是，Playwright 将会在运行期间保持浏览器后台常驻，
> 但一般情况下由于未开启任何页面，其内存占用量不是非常大（但也是可观的）。

## 安装

::::code-group
:::code-group-item PDM

```sh
pdm add graiax-playwright
```

:::
:::code-group-item Poetry

```sh
poetry add graiax-playwright
```

:::
:::code-group-item PIP

```sh
pip install graiax-playwright
```

:::
::::

## 开始

以下教程以配合 Launart 使用为例。

```python
from creart import create
from launart import Launart
from graia.ariadne.app import Ariadne
from graiax.playwright import PlaywrightService

launart = create(Launart)
launart.add_component(PlaywrightService("chromium")) # 默认值为 chromium
launart.add_component(PlaywrightService("chromium"， user_data_dir="./browser_data"))  # 与上一行二选一，该方式使用 Persistent Context
...

launart.launch_blocking()
```

### 配合 Graia Saya 使用

```python
from creart import create
from launart import Launart
from graia.ariadne.util.saya import listen
from graiax.playwright import PlaywrightBrowser

# 此处代码为没有使用 Persistent Context 的示例
# 若使用 Persistent Context 请使用 `context = launart.get_interface(PlaywrightContext)`
# 该方法获得的对象与 playwright.async_api.BrowserContext 兼容


@listen(...)
async def function(app: Ariadne):
    launart = create(Launart)
    browser = launart.get_interface(PlaywrightBrowser)
    # 此处的 browser 之用法与 playwright.async_api.Browser 无异，但要注意的是下方代码的返回值为 False。
    # `isinstance(browser, playwright.async_api.Browser)`
    async with browser.page(  # 此 API 启用了自动上下文管理
        viewport={"width": 800, "height": 10},
        device_scale_factor=1.5,
    ) as page:
        await page.set_content("Hello World!")
        img = await page.screenshot(type="jpeg", quality=80, full_page=True, scale="device")
    ...
```

### 高级用法之一

上面配合 Saya 使用的例子展示了创建一个页面的例子，但假如我们需要一个与其他页面**隔离**的新页面（例如 cookie
等），那么我们可以使用 `browser.page(context=True)` 在创建页面时使用一个新的上下文，如下所示：

:::tip
该种用法不支持持久性上下文（Persistent Context）

更多信息详见：<https://playwright.dev/python/docs/browser-contexts>
:::

```python
@listen(...)
async def function(app: Ariadne):
    launart = create(Launart)
    browser = launart.get_interface(PlaywrightBrowser)
    async with browser.page(new_context=True) as page:  # 此 API 启用了自动上下文管理
        await page.set_content("Hello World!")
        img = await page.screenshot(type="jpeg", quality=80, full_page=True, scale="device")
    ...
```

### 高级用法之二

上面配合 Saya 使用的例子展示了为**单个页面**设置 viewport 的功能，自 GraiaX Playwright `v0.3.1`
版本起，可以在创建 PlaywrightService 时为全局的 Browser Context 指定 viewport，然后在截图时使用全局
Browser Context 截图，如下所示：

:::tip
该种用法不支持持久性上下文（Persistent Context）
:::

**机器人入口文件：**

```python
launart.add_service(PlaywrightService("chromium"))
```

**Saya 模块中：**

```python
from graiax.playwright import PlaywrightContext


@listen(...)
async def function(app: Ariadne):
    launart = create(Launart)
    context = launart.get_interface(PlaywrightContext)
    async with context.page() as page:  # 此 API 启用了自动上下文管理
        await page.set_content("Hello World!")
        img = await page.screenshot(type="jpeg", quality=80, full_page=True, scale="device")
    ...
```
