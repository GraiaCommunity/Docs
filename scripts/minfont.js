/*
 * minfont.py 的 JS 版，速度比 minfont.py 快，但生成的字体文件大小更大
 */

const fs = require('fs') // 不可转为 import
const Fontmin = require('fontmin') // 不可转为 import

const originPath = 'docs/'
const ignoreDirs = ['dist', 'public', '.DS_Store']
const outPath = 'docs/public/fonts/'
const fonts = [
  'fonts/HarmonyOS_Sans_SC_Bold.ttf',
  'fonts/HarmonyOS_Sans_SC_Regular.ttf',
]

let content = ''

function readFile(file) {
  const stat = fs.statSync(`${originPath}${file}`)
  if (stat.isFile()) {
    console.log(`正在读取 ${originPath}${file}`)
    const md = fs.readFileSync(`${originPath}${file}`)
    content += md.toString()
  }
  if (stat.isDirectory()) {
    const subdir = fs.readdirSync(`${originPath}${file}`)
    for (let i = 0; i < subdir.length; i++) {
      if (ignoreDirs.includes(subdir[i])) continue
      readFile(`${file}/${subdir[i]}`)
    }
  }
}

function minFont(font) {
  console.log(`正在处理 ${font}`)
  const fontmin = new Fontmin()
    .src(font)
    .use(Fontmin.glyph({ text: content }))
    .use(Fontmin.ttf2woff2())
    .dest(outPath)

  fontmin.run(function (err) {
    if (err) {
      console.log(`处理 ${font} 过程中出现错误：`)
      console.error(err)
    }
  })
}

console.log('读取文件中...')
fs.readdir(originPath, (err, files) => {
  if (err) {
    return console.error(err)
  }
  for (let i = 0; i < files.length; i++) {
    if (ignoreDirs.includes(files[i])) continue
    readFile(files[i])
  }
  if (!fs.existsSync(outPath)) fs.mkdirSync(outPath)
  for (const idx in fonts) {
    minFont(fonts[idx])
  }
})
