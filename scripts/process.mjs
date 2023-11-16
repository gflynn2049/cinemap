import csv from "csv-parser";
import fs from "fs";

(async () => {
  const res = {};
  const fileNames = ["imax", "dolby"];
  for (const fileName of fileNames) {
    res[fileName] = {
      data: { features: [] },
    };

    // todo: remove bom
    fs.createReadStream(`../cinema-data/${fileName}.csv`)
      .pipe(csv())
      .on("data", (entry) => {
        res[fileName].data.features.push({
          type: "Feature",
          properties: { ...entry },
          geometry: {
            type: "Point",
            coordinates: [Math.random() * 20 + 100, Math.random() * 20 + 30], // api 太贵了！怎么办！
          },
        });
      })
      .on("end", () => {
        fs.writeFile("./src/data.json", JSON.stringify(res), "utf-8", (err) => {
          if (err) console.log(err);
        });
      });
  }
})();
