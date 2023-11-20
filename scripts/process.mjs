import csv from "csv-parser";
import fs from "fs";

(async () => {

  // const fileNames = ["imax", "dolby", "dolby.us"];
  // for (const fileName of fileNames) {
  // const fn = fileName == "dolby" || fileName == "dolby.us" ? "dolby" : "imax";
  const fileName = "output"
  // res[fn] = {
  const res = {
    data: { features: [] },
  };

  // todo: remove bom
  fs.createReadStream(`../cinema-data/${fileName}.csv`)
    .pipe(csv())
    .on("data", (entry) => {
      const { lng, lat, ...other } = entry;

      res.data.features.push({
        type: "Feature",
        properties: { ...other },
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
  // }
})();
