import Fuse from "fuse.js";

import raw from "./data.json";

export const rawData = Object.freeze(raw);

export const geo = Object.freeze({
  type: "FeatureCollection",
  features: Object.values(rawData).flatMap((i) => i.features),
});

export const filterTheatres = (
  displayDolby: boolean,
  displayImax: boolean,
  filterFunc: ((projectorsArray: string[]) => boolean) | null,
) => {
  const returnType = displayImax && displayDolby ? "all" : displayDolby ? "dolby" : displayImax ? 'imax' : 'none';
  let features = geo.features as any[]
  if (returnType == 'none') return {
    ...geo,
    features: []
  }
  if (returnType != 'all') features = features.filter((theatre) => theatre.properties["type"] === returnType)
  return {
    ...geo,
    features: filterFunc ? features.filter(
      (theatre) => filterFunc(theatre.properties.projectorsArray)
    ) : features,
  };
};


export const theatres = Object.freeze(geo.features);

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "properties.theatre",
    "properties.note",
    "properties.projectorsArray",
    "properties.date",
    "properties.type",
    "geometry.coordinates"
  ]
};

export const fuse = new Fuse(theatres, fuseOptions);