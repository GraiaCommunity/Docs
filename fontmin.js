const fs = require('fs');
const Fontmin = require('fontmin');

let path = "./docs/"
var ignoreFiles = ['.vitepress', 'public', '.DS_Store']
var outPath = "./docs/public/fonts/"
var fontPath = './font/'
var font = ['HarmonyOS_Sans_SC_Bold', 'HarmonyOS_Sans_SC_Regular']

var content
fs.readdir(path, function (err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(function (file) {
        if (!ignoreFiles.includes(file)) {
            var stat = fs.statSync(path + file);
            if (stat.isFile()) {
                var md = fs.readFileSync(path + file)
                content += md.toString()
            }
            if (stat.isDirectory()) {
                var a = fs.readdirSync(path + file)
                a.forEach(function (b) {
                    var c = fs.statSync(path + file + '/' + b);
                    if (c.isFile()) {
                        var d = fs.readFileSync(path + file + '/' + b)
                        content += d.toString()
                    }
                })
            }
        }
    })
    for (var i in font) {
        let g = font[i]
        console.log("正在处理" + g)
        var fontmin = new Fontmin()
            .src(fontPath + g + ".ttf")
            .use(Fontmin.glyph({ text: content }))
            .use(Fontmin.ttf2woff2())
            .dest('./FontOut')

        fontmin.run(function (err, files, stream) {
            if (err) {
                console.error(err);
            }
            console.log('生成完成,正在复制');
            fs.renameSync('./FontOut/' + g + '.woff2', outPath + g + '.woff2')
            console.log('移动成功!')
        });
    }
})

