var fs = require('fs');
var co = require('co');
var XLSX = require('xlsx');
var jsonfile = require('jsonfile')

co(function*() {
    try {
        var saveJsPath = __dirname + '/../build/out.js',
            savePHPPath = __dirname + '/../build/out.php',
            saveJsonPath = __dirname + '/../build/out.json',
            sourceFile = __dirname + '/temp.xlsx';

        var workbook = yield XLSX.readFile(sourceFile),
            sheet_name_list = workbook.SheetNames;

        var worksheet = workbook.Sheets[sheet_name_list[0]],
            json = XLSX.utils.sheet_to_json(worksheet, {
                // header: 'A1'
                raw: true
            });

        console.log('read xlsx json= ', json)
        saveJS(saveJsPath, json)
        savePHP(savePHPPath, json)
        saveJsonFile(saveJsonPath, json)



        function savePHP(path, json) {
            var formatJson = format(json),
                rtn = "<?php $lang = array" + JSON.stringify(formatJson) + " ?>";

            rtn = rtn.replace("{", "(\n");
            rtn = rtn.replace("}", "\n);");
            rtn = rtn.replace(/,/g, ",\n");
            rtn = rtn.replace(/:/g, " => ");

            console.log('read xlsx format rtn= ', rtn)

            fs.writeFile(path, rtn, writeFileCb)
        }

        function saveJS(path, json) {
            var rtn = format(json)

            rtn = "var _JS_LANG = " + JSON.stringify(rtn);

            console.log('read xlsx format rtn= ', rtn)

            fs.writeFile(path, rtn, writeFileCb)
        }

        function writeFileCb(err) {
            if (err) throw err;
            console.log('It\'s saved!');
        }

        function saveJsonFile(path, json) {
            var rtn = format(json)

            console.log('read xlsx format rtn= ', rtn)

            jsonfile.writeFileSync(path, rtn, {
                spaces: 2
            })
        }

        function format(json) {
            var rtn = {};
            json.forEach(function(element, index, array) {
                rtn[element.key] = element.value
            })
            return rtn;
        }



    } catch (e) {
        console.log(e)
    }
})
