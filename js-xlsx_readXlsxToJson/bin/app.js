var fs = require('fs');
var co = require('co');
var XLSX = require('xlsx');

try {
    var saveBase = __dirname + '/../build/',
        fileName = 'out.json',
        saveXlsxPath = saveBase + fileName;

    var workbook = yield XLSX.readFile(__dirname + '/temp.xlsx'),
        sheet_name_list = workbook.SheetNames;

    var json = {};

    sheet_name_list.forEach(function(y) {
        var worksheet = workbook.Sheets[y];
        for (z in worksheet) {
            if (z[0] === '!') continue;
            console.log(typeof z)
            // z.indexOf("oo") > -1
            return

            // var value = worksheet[z].v;
            // if(z.indexof)
            // console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
        }
    });

    // fs.exists(saveBase, function(exists) {
    //     console.log('save path exists=', exists)
    //     if (!exists)
    //         fs.mkdir(saveBase, function() {
    //             co(createXLSX);
    //         })
    //     else
    //         co(createXLSX);
    // });



    function* createXLSX() {
        console.log('createXLSX')
            //讀取空 xlsx, 資料表名稱為 '工作表1'
        var workbook = yield XLSX.readFile(__dirname + '/temp.xlsx');
        // console.log(Object.getOwnPropertyNames(workbook))

        var sheet_name_list = workbook.SheetNames;
        console.log('sheet_name_list= ', sheet_name_list)
        var sheet_name_list = workbook.SheetNames;
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
