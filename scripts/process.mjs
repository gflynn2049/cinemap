import csv from "csv-parser";
import fs from "fs";
// import { projectorsData } from "../src/ProjectorsData.js"

(async () => {
  const fileName = "data"
  const res = {
    data: { features: [] },
  };

  // const uniqueTypes = {}
  fs.createReadStream(`./cinemap-data/${fileName}.csv`)
    .pipe(csv())
    .on("data", (entry) => {
      const { lng, lat, projector, ...other } = entry;

      const trimmedOther = {};
      for (const key in other) {
        if (other.hasOwnProperty(key)) {
          trimmedOther[key] = other[key].trim();
          if (trimmedOther[key] === '-') {
            trimmedOther[key] = ''
          }
        }
      }

      const projectorsArray = projector.split('\n').map(item => {
        let trimmedItem = item.trim();
        if (trimmedItem == "IMAX 氙灯") trimmedItem = 'IMAX Xenon'
        // uniqueTypes[trimmedItem] = (uniqueTypes[trimmedItem] || 0) + 1;
        return trimmedItem;
      });

      const feature = {
        type: "Feature",
        properties: { ...trimmedOther, projectorsArray },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
      res.data.features.push(feature);

    })
    .on("end", () => {

      // const missingProjectorNames = [];

      // Object.keys(uniqueTypes).forEach(key => {
      //   if (key != '' && !projectorsData.some(projector => projector.name === key)) {
      //     missingProjectorNames.push(key);
      //   }
      // });

      // if (missingProjectorNames.length > 0) {
      //   console.log('Projector names not present in projectorsData:', missingProjectorNames);
      // }
      // console.log("Unique Types:", JSON.stringify(uniqueTypes));

      fs.writeFile("./src/data.json", JSON.stringify(res), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
  const filePath = "./src/lastUpdated.json"

  try {
    const currentDate = new Date();
    const data = { lastUpdated: currentDate.toISOString() };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Data has been written to ${filePath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
})();
