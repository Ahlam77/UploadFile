const json = require('body-parser')
const fs = require('fs')
const xml2js = require('xml2js')
const xlsx = require('xlsx')
const json2xlsx = require("json2xlsx");
const xlsxPath = "./public/data/data.xlsx";

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
        //return jsonString
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

async function json2xlsxFromTo(jsonPath, xlsxPath) {
    try {
        let data = JSON.parse(
            fs.readFileSync(jsonPath, {
                encoding: "utf8",
                flag: "r",
            })).catalog.book;
        json2xlsx.write(xlsxPath, "sheet1", data)


    } catch (error) {
        console.log(error);
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