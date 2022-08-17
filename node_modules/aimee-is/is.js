/**
 * is for Aimeejs
 * Author by gavinning
 * Homepage https://github.com/Aimeejs/is
 */

var is = {};
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

/**
 * [数组类型判定]
 * @param  {[object]}  obj  [要检查的对象]
 * @return {[boolean]}      [true or false]
 */
is.array = function (obj) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(obj);
    }

    return toString.call(obj) === '[object Array]';
}

is.plainObject = function isPlainObject(obj) {
    'use strict';

    if (!obj || toString.call(obj) !== '[object Object]') {
        return false;
    }

    var hasOwnConstructor = hasOwn.call(obj, 'constructor');
    var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for (key in obj) {/**/}

    return typeof key === 'undefined' || hasOwn.call(obj, key);
}

is.string = function(obj){
    return typeof obj === 'string';
}

is.function = function(obj){
    return typeof obj === 'function';
}

is.emptyObject = function(obj){
    var i, arr = [];
    for(var i in obj){
        i && arr.push(i)
    }
    return arr.length ? false : true;
}

module.exports = is;
