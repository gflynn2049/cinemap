import React, { useEffect } from "react";
import { brands, brandToColor } from "../constants";
import clsx from "clsx";
import { useMapContext } from "./MapContext";
import { filterTheatres } from "../Store";
import { useTranslation } from "react-i18next";


export const FloatControl = (props: {
  displayDolby: boolean;
  setDisplayDolby: () => void;
  displayImax: boolean;
  setDisplayImax: () => void;
  about: boolean;
  setAbout: (val: boolean) => void;
}) => {
  const { map } = useMapContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (map?.current) {
      const source = map.current.getSource("source");
      // check if the source exists before calling setData
      if (source) {
        source.setData(filterTheatres(props.displayDolby, props.displayImax, null));
      }
    }
  }, [map, props.displayImax, props.displayDolby]);

  const getBrandDisplayName = {
    dolby: "Dolby",
    imax: "IMAX",
  };
  return (
    <div className="transition fixed bottom-0 left-0 mx-3 mb-10">
      <div className="rounded-xl gap-6 py-4 shadow flex flex-col p-2 backdrop-blur-md bg-white/80 shadow dark:bg-gray-800/80">
        {brands.map((brand) => (
          <button
            key={brand}
            className={clsx(
              "tracking-tight px-1 focus:outline-none outline-none transition-all duration-300",
              ((!props.displayDolby && brand == "dolby") ||
                (!props.displayImax && brand == "imax")) &&
              "opacity-25"
            )}
            style={{ color: brandToColor[brand] }}
            onClick={() => {
              if (brand == "dolby") {
                props.setDisplayDolby();
              } else {
                props.setDisplayImax();
              }
            }}
          >
            <div className="font-bold text-sm">
              {getBrandDisplayName[brand]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
