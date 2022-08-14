#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""
minfont.js 的 Python 版，速度没有 minfont.js 的快，但生成的字体文件大小更小
"""

import os
import platform
from os.path import basename, exists, join

from fontTools import subset
from fontTools.ttLib import TTFont

origin_path = join('docs')
ignore_dirs = ['dist', 'public', '.DS_Store']
out_path = join('docs', 'public', 'fonts')
fonts = [
    join('fonts', 'HarmonyOS_Sans_SC_Bold.ttf'),
    join('fonts', 'HarmonyOS_Sans_SC_Regular.ttf'),
]

content = ''


def read(path):
    global content
    for root, dirs, files in os.walk(path):
        if basename(root) in ignore_dirs:
            dirs[:] = []  # 忽略当前目录下的子目录
            continue
        for f in files:
            print(f'正在读取 {join(root, f)}')
            with open(join(root, f), 'r', encoding='utf8') as file:
                while True:
                    if char := file.read(1):
                        content += f'{char}\n'
                    else:
                        break


print('读取文件中...')
read(origin_path)

for font in fonts:
    print(f'正在处理 {font}')
    if not exists(out_path):
        os.mkdir(out_path)
    f = TTFont(font)

    subsetter = subset.Subsetter()

    subsetter.populate(text=content)
    subsetter.subset(f)
    f.flavor = 'woff2'
    f.save(join(out_path, font.replace(".ttf", ".woff2")))
