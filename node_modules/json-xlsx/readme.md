json-xlsx
---
json => xlsx 生成xlsx到指定的目录下，生成完成后返回文件路径

### Install
```sh
npm i json-xlsx --save
```
Sheet
```json
{
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
            7893
        ]
    ]
}
```

### Usage
```js
var JE = require('json-xlsx');
var je = new JE({tmpDir: '/tmp'});

console.log(je.write(data)) // => /tmp/guid.xlsx

// Or
je.write(data, (err, filepath) => {
    console.log(filepath)
})
```
