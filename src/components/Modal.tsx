import React from "react";

export const Modal = (props: {
  current: boolean;
  setCurrent: () => void;
  children: any;
}) => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-40 ${
        props.current ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`bg-white bg-opacity-85 bottom-0 left-0 right-0 top-0 absolute transition-opacity duration-500 ease-out ${
          props.current ? "opacity-75" : "opacity-0"
        }`}
        onClick={() => {
          props.setCurrent();
        }}
      />
      <div
        className="bg-white absolute transition-all duration-200 ease-out border-gray-200 bottom-0 left-0 right-0 border-t"
        style={props.current ? {} : { transform: "translateY(100%)" }}
      >
        {props.children}
      </div>
    </div>
  );
};
