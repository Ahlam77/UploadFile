json2xlsx-copy
--------------
请使用原版 [json2xlsx](https://github.com/digplan/json2xlsx)


v0.1.8
---------
删除6-7行的代码，在非全局模式下多参数启动会引起``fs.readFile``的抛错
```js
if (process.argv[2])
  readXLSX(process.argv[2]);
```
