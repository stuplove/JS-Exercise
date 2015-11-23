var fs = require('fs');
var co = require('co');
var XLSX = require('xlsx');
// co(function*() {
try {
    var saveBase = __dirname + '/../build/',
        fileName = 'jsonToOut.xlsx',
        saveXlsxPath = saveBase + fileName,

        json = JSON.parse(fs.readFileSync(__dirname + '/json.js', 'utf8'));

    fs.exists(saveBase, function(exists) {
        console.log('save path exists=', exists)
        if (!exists)
            fs.mkdir(saveBase, function() {
                co(createXLSX);
            })
        else
            co(createXLSX);
    });



    function* createXLSX() {
        console.log('createXLSX')
            //讀取空 xlsx, 資料表名稱為 '工作表1'
        var workbook = yield XLSX.readFile(__dirname + '/temp.xlsx');
        // console.log(Object.getOwnPropertyNames(workbook))

        var sheet_name_list = workbook.SheetNames;
        console.log('sheet_name_list= ', sheet_name_list)

        var worksheet = workbook.Sheets[sheet_name_list[0]];

        var jsonNames = Object.getOwnPropertyNames(json);
        for (var i = 1; i <= jsonNames.length; i++) {
            var name = jsonNames[i - 1],
                val = json[name];

            function format(text) {
                return {
                    t: 's',
                    v: text,
                    r: '<t>' + text + '</t>',
                    h: text,
                    w: text
                }
            }
            worksheet['A' + i] = format(name);
            worksheet['B' + i] = format(val);
            worksheet['!ref'] = 'A1:B' + i;
        };

        XLSX.writeFile(workbook, saveXlsxPath);
    }

} catch (e) {
    console.log(e)
}
// })
