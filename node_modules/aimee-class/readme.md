# class
基类，用于方便创建类及子类


## For aimeejs  
```
aimee i class --save
```
```js
var Class = require('class')
```

## For nodejs  
```
npm i aimee-class --save
```
```js
var Class = require('aimee-class')
```


## Example 1
```js
// 创建子类
var Persion = Class.create();
```

## Example 2
```js
// 扩展类自身
Person.extend({foo: 'bar'})

// 扩展类原型链
Person.include({foo: 'bar'})
// Or
// 扩展类原型链
Person.fn.extend({foo: 'bar'})
```

## Example 3
``Person.fn.__init``可以接收到someObj参数
```js
// 创建实例
var person = new Person;
// Or
var person = new Person(someObj);
// Or
var person = Person.instance();
// Or
var person = Person.instance(someObj);
```
