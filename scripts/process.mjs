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
    // uniqueTypes: new Set(), // HashSet for storing unique types
  };

  // todo: remove bom
  fs.createReadStream(`../cinema-data/${fileName}.csv`)
    .pipe(csv())
    .on("data", (entry) => {
      const { lng, lat, projector, ...other } = entry;

      const projectorsArray = projector.split('\n').map(item => item.trim());
      const projectorsString = projectorsArray.join(', ')
      const feature = {
        type: "Feature",
        properties: { ...other, projectorsArray, projectorsString },
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      };
      res.data.features.push(feature);
      // res.uniqueTypes.add(projector);

    })
    .on("end", () => {
      // const uniqueTypesArray = Array.from(res.uniqueTypes);
      // console.log("Unique Types:", uniqueTypesArray);

      fs.writeFile("./src/data.json", JSON.stringify(res), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
  // }
})();
