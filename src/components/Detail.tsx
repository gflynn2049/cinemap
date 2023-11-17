import React from "react";
import "./Detail.scss";
import { Theatre } from "../types";
import clsx from "clsx";

export const Detail = (props: { current: Theatre | null }) => {
  // {
  //   "coordinates": [109.500732421875, 30.342065246371632],
  //   "properties": {
  //     "影城名称": "南京万达影城（江宁万达广场店）",
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
    <div className="detail-container">
      <div className={clsx("detail", props.current && "show")}>
        {/* {props.current?.coordinates} */}
        <div>
          <h1 className="text-lg">{props.current?.properties["影城名称"]}</h1>
          <p className="text-gray-500 text-sm"></p>
          <table className="px-2 mt-5 mb-3 text-sm">
            <tbody>
              {props.current &&
                Object.entries(props.current.properties).map(
                  ([key, value]) =>
                    key != "type" &&
                    key != "影城名称" &&
                    value.length > 0 && (
                      <tr key={key}>
                        <td className="pr-5 text-right text-gray-600 py-2">
                          {key}
                        </td>
                        <td className="py-2">{value}</td>
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
