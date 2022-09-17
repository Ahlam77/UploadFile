const express = require('express')
const fs = require('fs')
const ControllerXml2Xlsx = require('./controllers/ControllerXml2Xlsx.js')
const xlsxPath = "./public/data/data.xlsx";
const route = express.Router()

route.get('/', (req, res) => res.render('index'))

route.get("/json", (req, res) => res.render("index"));
route.get("/download", (req, res) => {
  res.download(xlsxPath,(err)=>{
    if (err){
        fs.unlinkSync(xlsxPath);
        res.send("Unable to download");
    }
    fs.unlinkSync(xlsxPath);
  });
  
});
 
route.post('/convert', ControllerXml2Xlsx.convertFromXmlToXlsx)




module.exports = route 
