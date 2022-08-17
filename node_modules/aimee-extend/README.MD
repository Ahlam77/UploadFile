# Aimee-extend

Aimee-extend Aimee的扩展模块，用于对象扩展提供底层服务，依赖aimee-is，代码来自jQuery.extend@2.0.3，使用方法可参照jQuery.extend

[Aimee-is](https://github.com/gavinning/aimee-is)

```
// 直接使用
var extend = require('extend');

var obj = extend({}, {}, {} [, {}...])
```

```
// 作为属性使用
var extend = require('extend');
var obj = {};

obj.extend = extend;
obj.extend({
	bar: function(){
		console.log('bar')
	}
})

obj.bar()
// => bar
```

```
// 作为类的核心方法使用
var extend = require('extend');
var Class = function(){}

Class.extend = Class.prototype.extend = extend;

// 扩展自身
Class.extend({})

// 扩展原型链
Class.prototype.extend({})
```
