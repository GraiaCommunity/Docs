const fs = require('fs')
const Fontmin = require('fontmin')

const path = 'docs/'
const ignoreFiles = ['dist', 'public', '.DS_Store']
const outPath = 'docs/public/fonts/'
const fontPath = 'fonts/'
const fonts = ['HarmonyOS_Sans_SC_Bold', 'HarmonyOS_Sans_SC_Regular']
const tempPath = fontPath + '.temp/'

let content = ''

function readFile(file) {
  const stat = fs.statSync(`${path}${file}`)
  if (stat.isFile()) {
    console.log(`正在读取 ${path}${file}`)
    const md = fs.readFileSync(`${path}${file}`)
    content += md.toString()
  }
  if (stat.isDirectory()) {
    const subdir = fs.readdirSync(`${path}${file}`)
    for (let i = 0; i < subdir.length; i++) {
      if (ignoreFiles.includes(subdir[i])) continue
      readFile(`${file}/${subdir[i]}`)
    }
  }
}

function minFont(font) {
  console.log(`正在处理 ${font}`)
  const fontmin = new Fontmin()
    .src(fontPath + font + '.ttf')
    .use(Fontmin.glyph({ text: content }))
    .use(Fontmin.ttf2woff2())
    .dest(tempPath)

  fontmin.run(function (err, files, stream) {
    if (err) {
      console.error(err)
    }
    console.log(`${font} 处理完成，正在复制`)
    fs.renameSync(`${tempPath}${font}.woff2`, `${outPath}${font}.woff2`)
  })
}

// 完全不懂怎么让删除文件夹在处理完字体后再删除，所以先注释掉
// function rmDir(dir) {
//   console.log(`正在删除 ${dir}`)
//   const subdir = fs.readdirSync(dir)
//   for (let i = 0; i < subdir.length; i++) {
//     const stat = fs.statSync(`${dir}${subdir[i]}`)
//     if (stat.isFile()) {
//       fs.unlinkSync(`${dir}${subdir[i]}`)
//     }
//     if (stat.isDirectory()) {
//       rmDir(`${dir}${subdir[i]}/`)
//     }
//   }
//   fs.rmdirSync(dir)
// }

function process(err, files) {
  if (err) {
    return console.error(err)
  }
  for (let i = 0; i < files.length; i++) {
    if (ignoreFiles.includes(files[i])) continue
    readFile(files[i])
  }
  if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath)
  if (!fs.existsSync(outPath)) fs.mkdirSync(outPath)
  for (const idx in fonts) {
    minFont(fonts[idx])
  }
}

console.log('读取文件中...')
fs.readdir(path, (err, files) => {
  process(err, files)
  // rmDir(tempPath)
})
