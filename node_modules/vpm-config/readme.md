# Config

为任意对象提供配置管理


#### Install

![INFO](https://nodei.co/npm/vpm-config.png?downloads=true&downloadRank=true&stars=true)  
![DOWNLOAD](https://nodei.co/npm-dl/vpm-config.png?height=3)  

```sh
# For Aimee
aimee i config
```

```sh
# For Node
npm i vpm-config
```


### Usage
```javascript
// For Aimee
var Config = require('config');
var config = new Config;
```
```javascript
// For Node
var Config = require('vpm-config');
var config = new Config;
```
### Example
```javascript
config.init();

// eg1
config.set('foo', 'bar');
config.get('foo');					// => bar

// eg2
config.set('foo.bar', '123');
config.get('foo');					// => {bar: 123}
config.get('foo.bar');				// => 123

// eg3
config.merge('foo.bar', {
    test: 123
});
config.get('foo.bar');				// => {test: 123}
```  

### For app
在其他app中接入config 1
```js
// Build
var app = {};
var Config = require('vpm-config');

app.config = new Config;
app.config.init({
    foo: true,
    bar: false
})
// your code
// ...
module.exports = app;
```
```js
// Use
var app = require('app');

// Set
app.config.set('bar', true);

// Get
app.config.get('foo') // => true

// your code
// ...
```

### For app
在其他app中接入config 2
```js
// Build
var app = {};
var Config = require('vpm-config');
var config = new Config;

config.init({
    foo: true,
    bar: false
})

app.config = function(){
    config.general.apply(config, arguments);
    return this;
}
// your code
// ...
module.exports = app;
```
```js
// Use
var app = require('app');

// Set
app.config('bar', true);

// Get
app.config('foo') // => true

// your code
// ...
```

#### Api

``config.init(target)``
* ``@param`` ``target`` ``type: Object`` 可选，传入已有的配置
* ``@param`` ``target`` ``type: String`` 可选，传入初试配置文件绝对路径或模块id，Nodejs下会被当做默认持久化存储路径   
```javascript
config.init({ foo: 'bar' })
// Or
config.init('/User/gavinning/foo.json')
```
---

``config.set(key, value)``
* ``@des`` 覆盖配置文件中指定的key
* ``@param`` ``key`` ``type: String`` 必选，需要更新的key
* ``@param`` ``value`` ``type: AnyType`` 必选，任意数据类型均可
```javascript
config.set('app.user.name', 'gavinning')
```
---

``config.get(key)``
* ``@param`` ``key`` ``type: String`` 可选，不传key默认返回完整的配置对象
```javascript
config.get()            // => { app: { user: { name: 'gavinning' } }, foo: 'bar' }
config.get('app')       // => { user: { name: 'gavinning' } }
config.get('app.user')  // => { name: 'gavinning' }
```
---

``config.merge(key, value)``
* ``@des`` 合并到配置文件指定的key
* ``@param`` ``key`` ``type: String`` 可选，没有key的时候直接更新到根对象(慎用)
* ``@param`` ``value`` ``type: AnyType`` 必选，任意数据类型均可
```javascript
config.merge('app.conf', { path: '/app/gavinning' })
config.get()            // => { app: { user: { name: 'gavinning' }, conf: { path: '/app/gavinning' } }, foo: 'bar' }
```
---
``config.general(key, value)``
* ``@des`` 通用方法，可以转接到app的config上，让app.config进可攻退可守
* ``@param`` ``key`` ``type: String`` 可选，key && !value时 调用 config.get(key)
* ``@param`` ``key`` ``type: Object`` 可选，此时调用 config.merge(key)
* ``@param`` ``value`` ``type: AnyType`` 可选，此时调用 config.set(key, value)
```javascript
// Build
var app = {};
var Config = require('config').Config;
var config = new Config;

config.init({
    foo: true,
    bar: false
})

app.config = function(){
    return config.general.apply(config, arguments) || this;
}
```


---

``config.save(src, options, fn)``
* ``@des`` 持久化存储，仅Nodejs下有效
* ``@param`` ``src`` ``type: String`` 初始化参数为路径时，此参数可选
* ``@param`` ``options`` ``type: Object`` 持久化存储配置项，此参数可选
* ``@param`` ``fn`` ``type: Function`` 可选，fn ? 异步处理 : 同步处理
```javascript
config.save() // 同步，默认使用初始化时的路径
config.save('/User/gavinning/foo.json')     // 同步
config.save('/User/gavinning/foo.json', {pretty: true}, fn) // 异步

options.pretty = true   // => 美化存储结果
options.prettyOptions = {
    type: 'tab',        // => tab | space
    size: 1             // => 1个单位
}
```
