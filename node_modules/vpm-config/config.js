/**
 * Config for Aimeejs
 * Author gavinning
 * Homepage https://github.com/Aimeejs/config
 */

var env = require('./lib/is');

if(env.node()){
    // For node
    var is = require('aimee-is');
    var extend = require('aimee-extend');
    var jsonFormat = require('json-format');
}
else{
    // For aimee
    var is = require('is');
    var extend = require('extend');
}

class Config {

    constructor() {
        this.__config = {};
    }

    /**
     * 设置数据模型
     * @param   {String || Object} target 模块id或数据模型对象
     */
    init(target) {
        // 当做模块路径处理
        if(is.string(target)){
            try{
                this.__config = require(target);
                this.__savepath = target;
            }
            catch(e){
                throw new Error(target + ' is not a module id.')
            }
        }

        // 当做配置文件处理
        if(is.plainObject(target)){
            this.__config = target;
        }
    }

    /**
     * 单项配置设置，覆盖模式，推荐只用于单项配置
     * @param   {String}  key   属性
     * @param   {Anytype} value 属性值
     * @example config.set('dir.install', 'packages');
     */
    set(key, value) {
        try{
            eval('this.__config.' + key + ' = value')
        }catch(e){
            this.__config = Config.createObject(this.__config, key, value)
        }
    }

    /**
     * 获取配置
     * @param   {String}  key 属性
     * @return  {Anytype}     属性值
     * @example config.get('dir.install'); // => packages
     */
    get(key) {
        if(!key){
            return this.__config;
        }

        try{
            return eval('this.__config.' + key)
        }catch(e){
            return undefined
        }
    }

    /**
     * 多项配置设置，合并模式，推荐使用多项配置
     * @param   {String}   key   合并的属性节点
     * @param   {Anytype}   value 合并的对象map
     * @example config.merge({dir: {install: 'packages'}});
     * @example config.merge('dir', {install: 'packages'});
     * @example config.merge('dir.install', 'packages');
     */
    merge(key, value) {
        var tmp;

        if(!value){
            value = key;
            key = null;
        }

        // 检查key是否存在
        if(key && typeof key !== 'string'){
            key = null;
        }

        // 合并到指定节点
        if(key){
            tmp = Config.createObject({}, key, value);
            extend(true, this.__config, tmp);
        }
        // 合并到根节点
        else{
            extend(true, this.__config, value);
        }
    }

    /**
     * 默认项
     * @param   {String}   key   key
     * @param   {object}   key   => value
     * @param   {AnyType}  value value
     * @example this.general.apply(this, arguments)
     */
    general(key, value) {
        if(!key){
            return this.get()
        }

        if(typeof key === 'object'){
            return this.merge(key)
        }

        if(typeof key === 'string'){
            return value === undefined ?
                this.get(key):
                this.set(key, value);
        }
    }

    /**
     * 持久化存储
     * @param   {String}   src     存储地址，可选
     * @param   {Object}   options 可选配置项
     * @param   {Function} fn      存储成功后回调，可选
     * @example this.save()
     * @example this.save('/a/a.json')
     * @example this.save('/a/a.json', fn)
     */
    save(src, options, fn) {
        var data, def;

        def = {
            pretty: true
        }

        if(is.function(src)){
            fn = src;
            src = null;
        }

        if(is.plainObject(src)){
            options = src;
            src = null;
        }

        if(is.function(options)){
            fn = options;
            options = def;
        }

        src = src || this.__savepath;
        options = options || def;
        this.__savepath = this.__savepath || src;

        // For Save
        options.pretty ?
            data = jsonFormat(this.__config || {}, options.prettyOptions || {type: 'space', size: 2}):
            data = JSON.stringify(this.__config || {});

        if(src){
            try{
                fn ?
                    require('fs').writeFile(src, data, fn):
                    require('fs').writeFileSync(src, data);
            }
            catch(e){
                console.error('Save方法仅在node环境下生效.')
            }
        }
    }
}

/**
 * 递归创建不存在子节点为空对象
 * @param   {Object}  target   目标对象
 * @param   {String}  key      要操作的key
 * @param   {anyType} value    target.key
 * @return  {Object}           target
 * @example this.create({}, 'app.path', __dirname)
 */
Config.createObject = function(target, key, value){
    var pop;
    var data = target = target || {};
    var arr = key.split('.');

    do{
        pop = arr.shift();
        data[pop] = data[pop] || {};
        data = data[pop];
    }
    while(arr.length > 1)

    // 检查是否存在value
    if(value){
        // 节点创建完成尝试赋值
        try{
            eval('target.' + key + ' = value')
        // 赋值失败则抛错
        }catch(e){
            throw e;
        }
    }

    return target;
}

module.exports = Config;
