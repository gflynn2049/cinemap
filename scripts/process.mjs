import csv from "csv-parser";
import fs from "fs";

(async () => {
  const res = {};
  const fileNames = ["imax", "dolby", "dolby.us"];
  for (const fileName of fileNames) {
    const fn = "dolby" || "dolby.us" ? "dolby" : "imax";
    res[fn] = {
      data: { features: [] },
    };

    // todo: remove bom
    fs.createReadStream(`../cinema-data/${fileName}.csv`)
      .pipe(csv())
      .on("data", (entry) => {
        const { lng, lat, ...other } = entry;

        res[fn].data.features.push({
          type: "Feature",
          properties: { ...other, type: fn },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
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
