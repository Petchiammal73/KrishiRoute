const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const inputFile = path.join(__dirname, "../raw_data/agri.csv");
const outputFile = path.join(__dirname, "../src/data/mandiData.json");

const results = [];

fs.createReadStream(inputFile)
  .pipe(
    csv({
      mapHeaders: ({ header }) =>
        header.toLowerCase().replace(/\s+/g, "_").trim()
    })
  )
  .on("data", (row) => {
    // map actual dataset fields
    const state = row.state_name;
    const district = row.district_name;
    const market = row.market_name;
    const commodity = row.commodity;
    const date = row.reported_date;

    const price = parseFloat(row["modal_price_(rs./quintal)"]);

    if (!market || !commodity || !price || price === 0) return;

    results.push({
      state: state?.trim(),
      district: district?.trim(),
      market: market.trim(),
      commodity: commodity.trim(),
      price: price,
      date: date
    });
  })
  .on("end", () => {
    console.log("Valid rows:", results.length);

    const latestMap = {};

    for (const row of results) {
      const key =
        row.market.toLowerCase() +
        "_" +
        row.commodity.toLowerCase();

      if (
        !latestMap[key] ||
        new Date(row.date) > new Date(latestMap[key].date)
      ) {
        latestMap[key] = row;
      }
    }

    const cleaned = Object.values(latestMap);

    fs.writeFileSync(outputFile, JSON.stringify(cleaned, null, 2));

    console.log("Final processed:", cleaned.length);
  })
  .on("error", (err) => {
    console.error("Error:", err);
  });