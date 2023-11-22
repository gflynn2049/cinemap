import React from "react";
import "./Detail.scss";
import { Theatre } from "../types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { projectorsData } from "../ProjectorsData";
export const Detail = (props: {
  current: Theatre | null;
  setCurrent: () => void;
}) => {
  const { t, i18n } = useTranslation();

  const getProjectorsInfo = (projectorsArray: string[]) => {
    const getProjectorFeature = (p: string) => {
      const targetProjector = projectorsData.find(projector => projector.name == p)
      if (!targetProjector) return "";
      const features = targetProjector.features.filter(f => f.length > 0);
      if (features.length < 1) return ""
      if (targetProjector) return " (" + features.join(", ") + ")"
    }
    return projectorsArray.map((p) => p + getProjectorFeature(p)).join(', ');

  }
  const mapSVG = (
    <svg className="mr-1 w-3 h-3 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 21">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
      </g>
    </svg>
  )

  const mapsButtonStyle = "text-sm tracking-tighter	flex justify-center items-center border-gray-300 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 rounded-md py-1 pr-3 pl-2"
  return (
    <div
      style={{ zIndex: 502 }}
      className="absolute bottom-0 max-h-96 h-auto w-full justify-center flex" >
      <div
        style={{ zIndex: 503 }}
        className={clsx(
          "detail backdrop-blur-md bg-white/80 border-t border-l border-r border-gray-200 shadow dark:bg-gray-800/80 dark:border-gray-700",
          props.current && "show"
        )}
      >
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.current?.properties["theatre"]}
          </h1>
          <table className="px-2 mt-4 text-xs font-normal text-gray-700 dark:text-gray-400">
            <tbody>
              {props.current &&
                Object.entries(props.current.properties).map(
                  ([key, value]) =>
                    // key != "type" &&
                    key != "theatre" &&
                    key != "projectorString" &&
                    value && value.length > 0 && (
                      <tr key={key}>
                        <td className="pr-1 break-keep align-top text-gray-500 dark:text-gray-400 text-right py-1">
                          {t(key)}
                        </td>
                        <td className="pl-2 align-top py-1 text-gray-800 dark:text-gray-300">
                          {key === 'projectorsArray'
                            ? getProjectorsInfo(JSON.parse(value as string))
                            : value}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
          {props.current &&
            <div className="text-center mt-5 mb-1 gap-4 sm:gap-5 md:gap-6 flex justify-center">
              <a
                href={`https://uri.amap.com/marker?position=${props.current.coordinates.join(',')}&name=${props.current.properties.theatre}`}
                target="_blank"
                rel="noreferrer"
                className={mapsButtonStyle}>
                {mapSVG}
                {t("gaodeMaps")}
              </a>
              <a
                href={`http://api.map.baidu.com/marker?location=${props.current.coordinates.slice().reverse().join(',')}&title=${props.current.properties.theatre}&output=html`}
                target="_blank"
                rel="noreferrer"
                className={mapsButtonStyle}>
                {mapSVG}
                {t("baiduMaps")}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${props.current.coordinates.slice().reverse().join(',')}`}
                target="_blank"
                rel="noreferrer"
                className={mapsButtonStyle}>
                {mapSVG}
                {t("googleMaps")}
              </a>
              <a
                href={`https://maps.apple.com/?q=${props.current.coordinates.slice().reverse().join(',')}&name=${encodeURIComponent(props.current.properties.theatre)}`}
                target="_blank"
                rel="noreferrer"
                className={mapsButtonStyle}>
                {mapSVG}
                {t("appleMaps")}
              </a>
            </div>}
        </div>
      </div>
    </div>
  );
};
