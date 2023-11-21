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

  const changeLanguage = () => {
    const prevLang = i18n.language
    // 草 有优雅一点的写法吗 怎么重置语言啊
    i18n.changeLanguage(prevLang == 'en' ? 'zh' : 'en');
    map.current.setLayoutProperty('country-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('continent-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('state-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('settlement-major-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('settlement-minor-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('settlement-subdivision-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('airport-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('transit-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('poi-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('road-label-simple', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('block-number-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('building-number-label', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
    map.current.setLayoutProperty('building-entrance', 'text-field', [
      'get',
      `name_${prevLang == 'en' ? 'zh-Hans' : 'en'}`
    ]);
  };

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
    <div className="fixed bottom-0 left-0 mx-3 mb-10">
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

        <button
          className="text-gray-400 text-sm font-medium cursor-pointer"
          onClick={() => changeLanguage()}
        >
          <span className={`${i18n.language == 'zh' && 'dark:text-white text-gray-600'}`}>简</span> / <span className={`${i18n.language == 'en' && 'text-white'}`}>EN</span>
        </button>

        <button className="dark:text-white text-gray-600 text-sm font-medium cursor-pointer" onClick={() => props.setAbout(!props.about)}>
          {t("about")}
        </button>
      </div>
    </div>
  );
};
