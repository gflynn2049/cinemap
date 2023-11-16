import csv from "csv-parser";
import fs from "fs";

(async () => {
  const data = {
    type: "FeatureCollection",
    features: [],
  };

  let index = 0;

  // todo: remove bom
  fs.createReadStream("./cinema-data/data-csv.csv")
    .pipe(csv())
    .on("data", (entry) => {
      data.features[index++] = {
        type: "Feature",
        properties: { ...entry },
        geometry: {
          type: "Point",
          coordinates: [], // api 太贵了！怎么办！
        },
      };
    })
    .on("end", () => {
      fs.writeFile("./src/data.json", JSON.stringify(data), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
})();
