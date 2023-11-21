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
  return (
    <div className="absolute bottom-0 max-h-96 w-full justify-center flex" onClick={() => props.setCurrent()}>
      <div
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
                        <td className="pl-2 align-top py-1 text-gray-800 dark:text-gray-200">
                          {key === 'projectorsArray'
                            ? getProjectorsInfo(JSON.parse(value as string))
                            : value}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
