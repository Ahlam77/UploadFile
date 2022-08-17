var Config = require('../config');
var config = new Config;

console.log(config.get())

config.init({name: 'gavinning'})
console.log(config.general())

config.general('age', 18)
console.log(config.general())
