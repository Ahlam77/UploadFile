var os = require('os');
var path = require('path');
var guid = require('guid');
var j2e = require('json2xlsx-copy');
var lab = require('linco.lab');
var Config = require('vpm-config');

class JE {
    constructor(options) {
        this.config = new Config;
        this.config.init({
            tmpDir: os.tmpdir()
        });
        this.config.merge(options || {});
        lab.mkdir(this.config.get('tmpDir'));
    }

    getFilepath() {
        return path.join(this.config.get('tmpDir'), guid.raw() + '.xlsx')
    }

    getData(data) {
        if(Array.isArray(data)){
            return {
                name: 'sheetname',
                data: data
            }
        }
        if(!data.name){
            data.name = 'sheetname';
        }
        return data
    }

    write(data, fn) {
        let filepath = this.getFilepath();
        let sheet = this.getData(data);
        try{
            j2e.write(filepath, sheet.name, sheet.data);
            return fn ? fn(null, filepath) : filepath;
        }
        catch(e){
            if(fn){
                fn(e)
            }
            else{
                throw e
            }
        }
    }
}

module.exports = JE;
