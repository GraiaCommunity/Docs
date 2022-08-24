# pathlib 为什么是神？路径解析推荐

当你在写机器人的时候，想必或多或少都有遇到过关于路径的问题吧。  
而当你在 <ruby>CSDN<rp>(</rp><rt>床上等你</rt><rp>)</rp></ruby> 搜索了一番以后，
你知道，在 Python 中都是用 os.path 来解析路径的。所以，你写出了这样的代码。

:::tip
以下情节多少有点夸张，不过也不完全夸张。
:::

```python
import os
import os.path

# 得到文件所在目录下"资源"文件夹路径，如果不存在则创建它
source_folder = os.path.dirname(__file__) + r"/资源"
source_folder = os.path.join(os.path.dirname(__file__), "资源")
if not os.path.exists(source_folder):
    os.makedirs(source_folder)

# 获取这些文件中所有 jpg png 格式文件的文件名
source_name = [
    os.path.split(p)[1][-4] for p in os.listdir(source_folder)
    if os.path.splitext(p)[1] in [".jpg", ".png"]
]
source_name = [
    os.path.splitext(os.path.split(p)[1])[0] for p in os.listdir(source_folder)
    if os.path.splitext(p)[1] in [".jpg", ".png"]
]

# 将一个绝对路径的文件复制到根目录同名的压缩包里面
from zipfile import Zipfle
file = "/a/b/c/d.txt"
compress_file = os.path.splitext(os.path.split(p)[1])[0] + ".zip"
with Zipfile(compress_file, "w") as myzip:
    myzip.write(file)

# 读取文件，否则创建文件
if os.path.exists(os.path.join(os.getcwd(), "config.json")):
    with open(os.path.join(os.getcwd(), "config.json"), "r", encoding="UTF-8") as f:
        config = json.load(f)
else:
    with open(os.path.join(os.getcwd(), "config.json"), "w", encoding="UTF-8") as f:
        json.dump({"config": {}}, f)
```

说实话，这一点都不 Pythonic，不是吗？
难道就没有更优雅的写法了吗？

<!-- 当然有啊，那就是 `pathlib` -->
预知后事如何，请看下回分析

<Loading></Loading>
