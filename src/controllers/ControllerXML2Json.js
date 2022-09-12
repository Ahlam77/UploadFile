//const { json } = require('body-parser')
const fs = require('fs')
const xml2js = require('xml2js')
const xlsx = require('xlsx')

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

function convert(req, res) {
    let xmlFile = req.files.fileXML

    xmlFile.mv(xmlPath, function (err) {
        if (err) {
            return res.status(500).send(err)
        }
        xml2jsonFromTo(xmlPath, jsonPath)
    })
    res.redirect('/json')
}