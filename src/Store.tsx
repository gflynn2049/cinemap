import Fuse from "fuse.js";

import raw from "./data.json";

export const rawData = Object.freeze(raw);

export const geo = Object.freeze({
  type: "FeatureCollection",
  features: Object.values(rawData).flatMap(i => i.features),
});

export const filterTheatres = (
  displayDolby: boolean,
  displayImax: boolean,
  filterFunc: ((projectorsArray: string[]) => boolean) | null
) => {
  let returnType: "all" | "dolby" | "imax" | "none";
  if (displayImax && displayDolby) {
    returnType = "all";
  } else if (displayDolby) {
    returnType = "dolby";
  } else if (displayImax) {
    returnType = "imax";
  } else {
    returnType = "none";
  }

  let featureSource = geo.features as any[];

  let featuresDataWithFilter: any = [];
  if (filterFunc) {
    featuresDataWithFilter = featureSource.filter(theatre =>
      filterFunc(theatre.properties.projectorsArray)
    );
  } else {
    featuresDataWithFilter = featureSource;
  }
  if (returnType === "none") {
    featuresDataWithFilter = [];
  }
  if (returnType !== "all") {
    featuresDataWithFilter = featuresDataWithFilter.filter(
      (theatre: any) => theatre.properties["type"] === returnType
    );
  }

  return {
    ...geo,
    features: featuresDataWithFilter,
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
    "properties.addr",
    "geometry.coordinates",
  ],
};

export const fuse = new Fuse(theatres, fuseOptions);
