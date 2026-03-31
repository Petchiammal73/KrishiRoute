const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "./raw_data/cities.csv";
const outputFile = "./src/data/cityCoordinates.json";

const cityMap = {};

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    const city =
      row.city ||
      row.City ||
      row.name;

    const lat =
      parseFloat(row.lat) ||
      parseFloat(row.latitude);

    const lng =
      parseFloat(row.lng) ||
      parseFloat(row.longitude);

    if (!city || isNaN(lat) || isNaN(lng)) return;

    cityMap[city.trim()] = {
      lat,
      lng
    };
  })
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(cityMap, null, 2));

    console.log("City dataset processed:", Object.keys(cityMap).length);
  });