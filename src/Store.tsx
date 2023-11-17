import Fuse from "fuse.js";

// import raw from "./data-w-coor.json";
import raw from "./data.json";

export const rawData = Object.freeze(raw);
// console.log(JSON.stringify(rawData));

// export const geo = rawData.imax.data;
export const geo = Object.freeze({
  type: "FeatureCollection",
  features: Object.values(rawData).flatMap((i) => i.data.features),
});

export const filteredGeo = (displayImax: boolean, displayDolby: boolean) => {
  if (!displayDolby && !displayImax) return;
  if (displayImax && displayDolby) {
    return geo;
  } else {
    const returnType = displayImax ? "imax" : "dolby";
    return {
      ...geo,
      features: (geo.features as any[]).filter(
        (i) => i.properties["type"] === returnType
      ),
    };
  }
};
// export const theatres = Object.freeze(
//   geo.features.map((i) => ({
//     ...i,
//     // coordinates: i.geometry.coordinates, //todo
//   }))
// );

// console.log(JSON.stringify(theatres));

// export const fuseByName = new Fuse(theatres, {
//   keys: ["properties.Theatre"],
// });
