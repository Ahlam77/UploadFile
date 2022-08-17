var path = require('path');
var Config = require('../config');
var config = new Config;

config.init({ user: { name: 'gavinning', age: 18 } });

config.set('user.tel', 1300)

console.log(config.get())

config.save('./config.json', {pretty: true})
