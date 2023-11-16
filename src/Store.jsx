import Fuse from "fuse.js";

import raw from "./data-w-coor.json";

export const rawData = Object.freeze(raw);
// console.log(JSON.stringify(rawData));

export const geo = Object.freeze({
  type: "FeatureCollection",
  features: rawData.features.flatMap((feature) => feature),
});
// console.log(JSON.stringify(geo));

export const theatres = Object.freeze(
  geo.features.map((i) => ({
    ...i,
    // coordinates: i.geometry.coordinates, //todo
  }))
);

// console.log(JSON.stringify(theatres));

// export const fuseByName = new Fuse(theatres, {
//   keys: ["properties.影城名称"],
// });
