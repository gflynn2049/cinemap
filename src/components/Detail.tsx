import React from "react";
import "./Detail.scss";
import { Theatre } from "../types";
import clsx from "clsx";

export const Detail = (props: {
  current: Theatre | null;
  setCurrent: () => void;
}) => {
  // {
  //   "coordinates": [109.500732421875, 30.342065246371632],
  //   "properties": {
  //     "Theatre": "南京万达影城（江宁万达广场店）",
  //     "放映机型号": "IMAX 気灯",
  //     "开业时间": "2013年12月21日",
  //     "银幕宽度（米）": "",
  //     "银幕高度（米）": "",
  //     "银幕面积（平方米）": "",
  //     "座位数（个）": "400",
  //     "备注": "假作为数据",
  //     "type": "imax"
  //   }
  // }

  return (
    <div className="detail-container" onClick={() => props.setCurrent()}>
      <div className={clsx("detail blur-white", props.current && "show")}>
        <div>
          <h1 className="text-lg">{props.current?.properties["Theatre"]}</h1>
          <p className="text-gray-500 text-sm"></p>
          <table className="px-2 mt-3 mb-3 text-sm">
            <tbody>
              {props.current &&
                Object.entries(props.current.properties).map(
                  ([key, value]) =>
                    key != "type" &&
                    key != "Theatre" &&
                    value.length > 0 && (
                      <tr key={key}>
                        <td className="pr-4 text-right text-gray-600 py-1">
                          {key}
                        </td>
                        <td className="py-1">{value}</td>
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
