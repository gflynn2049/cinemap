import React from "react";
import "./Detail.scss";
import { Theatre } from "../types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
export const Detail = (props: {
  current: Theatre | null;
  setCurrent: () => void;
}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="detail-container" onClick={() => props.setCurrent()}>
      <div
        className={clsx(
          "detail backdrop-blur-md bg-white/80 border border-gray-200 shadow dark:bg-gray-800/80 dark:border-gray-700",
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
                    value.length > 0 && (
                      <tr key={key}>
                        <td className="pr-1 break-keep align-top text-gray-500 dark:text-gray-400 text-right py-1">
                          {t(key)}
                        </td>
                        <td className="pl-2 align-top py-1 text-gray-800 dark:text-gray-200">
                          {value}
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
