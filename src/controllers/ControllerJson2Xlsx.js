const json = require("body-parser");
const fs = require("fs");
const json2xlsx = require("json2xlsx");
const xlsx = require("xlsx");
const fileName = "data.xlsx";

async function generateExcelFromJSON() {
  try {
    let data = JSON.parse(
      fs.readFileSync("./public/data/result.json", {
        encoding: "utf8",
        flag: "r",
      })
    );

    let newWS = xlsx.utils.json_to_sheet(data);
    let newWB = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWS, newWB, "data");

    await xlsx.writeFile("./public/data/data.xlsx", newWB);
    // xlsx.writeFile(newWB, "./public/data/data.xlsx");
  } catch (error) {
    console.log(error);
  }
}

function
download(req, res) {
  let jsonFile = req.files.fileJSON;

  jsonFile.mv("./public/data/result.json", function (err) {
    if (err) {
      return res.status(500).send(err);
    } else {
      json2xlsx();
    }
  });
  res.redirect("/xlsx");
}