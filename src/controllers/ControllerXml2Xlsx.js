const json = require('body-parser')
const fs = require('fs')
const xml2js = require('xml2js')
const XLSX = require('xlsx')
const json2xlsx = require("json2xlsx");
const xlsxPath ="./public/data/sheet.xlsx";
//const download = require("download");

const xmlPath = "src/data/dataset.xml"
const jsonPath = "./public/data/result.json"


async function xml2jsonFromTo(xmlPath, jsonPath) {
    try {
        const xml = fs.readFileSync(xmlPath)
        const result = await xml2js.parseStringPromise(xml, {
            mergeAttrs: true
        })
      let jsonString = JSON.stringify(result, null, 4)
        //console.log(json)
        fs.writeFileSync(jsonPath, jsonString)
       // return jsonString
    } catch (error) {
        console.log(error)
    }
}

function convertFromXmlToJson(req, res) {
    let xmlFile = req.files.fileXML

    xmlFile.mv(xmlPath, function (err) {
        if (err) {
            return res.status(500).send(err)
        }
        xml2jsonFromTo(xmlPath, jsonPath)
    })
}

async function json2xlsxFromTo(jsonPath,xlsxPath ) {
    try {
      let data = JSON.parse(fs.readFileSync(jsonPath)).catalog.book;
      // console.log("File content:", data);
       
      json2xlsx.write(xlsxPath, "sheet", data);
      console.log("we rock 😈 𓀎");
      
    } catch (err) {
        console.error(err.massage);
    }
}


function convertFromJsonToXlsx(req, res) {
        json2xlsxFromTo(jsonPath, xlsxPath)
}

module.exports = {
    convertFromXmlToXlsx(req, res) {
        convertFromXmlToJson(req, res)
        convertFromJsonToXlsx(req, res)

        res.redirect('/json')
      
   
    }
    
}

 
