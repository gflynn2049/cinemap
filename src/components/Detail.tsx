import React from "react";
import "./Detail.scss";
import { Theatre } from "../types";
import clsx from "clsx";

export const Detail = (props: { current: Theatre | null }) => {
  console.log(props.current);
  return (
    <div className={clsx("detail", props.current && "show")}>
      {props.current?.coordinates}
    </div>
  );
};
