const json = require('body-parser')
const fs = require('fs')
const xml2js = require('xml2js')
const xlsx = require('xlsx')
const json2xlsx = require("json2xlsx");
const xlsxPath = "./public/data/data.xlsx";

const xmlPath = "src/data/dataset.xml"
const jsonPath = "./public/data/result.json"
var jsonString = ""

async function xml2jsonFromTo(xmlPath, jsonPath) {
    try {
        const xml = fs.readFileSync(xmlPath)
        const result = await xml2js.parseStringPromise(xml, {
            mergeAttrs: true
        })
        jsonString = JSON.stringify(result, null, 4)
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
            })
        );
        console.log("===================")
        console.log(jsonString)
        console.log("===================")
        json2xlsx.write(xlsxPath, "sheet1", [jsonString])

        // let newWS = xlsx.utils.json_to_sheet(data);
        // let newWB = xlsx.utils.book_new();
        // xlsx.utils.book_append_sheet(newWS, newWB, "data");
        // console.log(newWB)
        // await xlsx.writeFile(xlsxPath, newWB);

        // xlsx.writeFile(newWB, "./public/data/data.xlsx");
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