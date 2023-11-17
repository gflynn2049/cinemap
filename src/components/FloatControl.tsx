import React, { useEffect } from "react";
import { brands, brandToColor } from "../constants";
import clsx from "clsx";
import { useMapContext } from "./MapContext";
import { filteredGeo } from "../Store";

export const FloatControl = (props: {
  displayDolby: boolean;
  setDisplayDolby: () => void;
  displayImax: boolean;
  setDisplayImax: () => void;
}) => {
  const { map } = useMapContext();

  useEffect(() => {
    if (map?.current) {
      const source = map.current.getSource("source");
      // check if the source exists before calling setData
      if (source) {
        source.setData(filteredGeo(props.displayImax, props.displayDolby));
      }
    }
  }, [map, props.displayImax, props.displayDolby]);

  return (
    <div className="fixed bottom-0 left-0 mx-3 mb-10">
      <div className="bg-white rounded shadow flex flex-col p-2">
        {brands.map((brand) => (
          <button
            key={brand}
            className={clsx(
              "py-2 px-1 focus:outline-none outline-none transition-all duration-300",
              ((!props.displayDolby && brand == "dolby") ||
                (!props.displayImax && brand == "imax")) &&
                "opacity-25"
            )}
            style={{ color: brandToColor[brand] }}
            onClick={() => {
              if (brand == "dolby") {
                // avoid empty geo data
                if (props.displayImax) props.setDisplayDolby();
              } else {
                // imax
                if (props.displayDolby) props.setDisplayImax();
              }
            }}
          >
            <div className="font-bold text-xs">{brand.toUpperCase()}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
