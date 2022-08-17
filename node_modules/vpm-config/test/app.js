var Config = require('../config');
var config = new Config;

var app = {};

app.config = config;
// app.config.init({a: 1});

app.config.set('user.name', 'gavinning');
app.config.set('user.age', 18)

console.log('config:                ', app.config.get())
console.log('config.user:           ', app.config.get('user'))
console.log('config.user.name:      ', app.config.get('user.name'))
console.log('config.user.tel:       ', app.config.get('user.tel'))
console.log('config.user.tel.number:', app.config.get('user.tel.number'))
