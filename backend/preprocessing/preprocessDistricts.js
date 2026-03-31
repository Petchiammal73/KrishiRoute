const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const inputFile = path.join(__dirname, "../raw_data/districts.csv");
const outputFile = path.join(__dirname, "../src/data/districtCoordinates.json");

const districtMap = {};

fs.createReadStream(inputFile)
  .pipe(
    csv({
      mapHeaders: ({ header }) =>
        header.toLowerCase().replace(/\s+/g, "_").trim()
    })
  )
  .on("data", (row) => {
    const district = row.district;
    const lat = parseFloat(row.latitude);
    const lng = parseFloat(row.longitude);

    if (!district || isNaN(lat) || isNaN(lng)) return;

    // normalize key
    const key = district.toLowerCase().trim();

    districtMap[key] = {
      lat,
      lng
    };
  })
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(districtMap, null, 2));

    console.log(
      "District dataset processed:",
      Object.keys(districtMap).length
    );
  })
  .on("error", (err) => {
    console.error(err);
  });