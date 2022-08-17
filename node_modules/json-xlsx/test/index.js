var JE = require('../app.js');
var je = new JE({tmpDir: '/tmp/form-data'});

var sheet = {
    "name": "sheetname",
    "data": [
        [
            1231,
            4561,
            7891
        ],
        [
            1232,
            4562,
            7892
        ]
    ]
}

console.log(je.write(sheet))
