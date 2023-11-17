import React, { useEffect } from "react";
import { brands, brandToColor } from "../constants";
import clsx from "clsx";
import { useMapContext } from "./MapContext";
import { filteredGeo } from "../Store";
import { useTranslation } from "react-i18next";

export const FloatControl = (props: {
  displayDolby: boolean;
  setDisplayDolby: () => void;
  displayImax: boolean;
  setDisplayImax: () => void;
}) => {
  const { map } = useMapContext();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: "en" | "zh") => {
    i18n.changeLanguage(lng);
  };

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
      <div className="rounded-xl shadow flex flex-col p-2 backdrop-blur-md bg-white/80 shadow dark:bg-gray-800/80">
        {brands.map((brand) => (
          <button
            key={brand}
            className={clsx(
              "tracking-tight py-4 px-1 focus:outline-none outline-none transition-all duration-300",
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
            <div className="font-bold text-base">{brand.toUpperCase()}</div>
          </button>
        ))}

        {/* <button
          className={i18n.language != "en" ? "text-gray-400" : ""}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
        <button onClick={() => changeLanguage("zh")}>简</button> */}
      </div>
    </div>
  );
};
