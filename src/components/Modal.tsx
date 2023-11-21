import React from "react";

export const Modal = (props: {
  current: boolean;
  setCurrent: () => void;
  about: boolean;
  setAbout: () => void;
  children: any;
}) => {
  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-40 ${(props.current || props.about) ? "" : "pointer-events-none"
        }`}
    >
      <div
        className={`bg-black bg-opacity-50 bottom-0 left-0 right-0 top-0 absolute transition-opacity duration-500 ease-out ${props.current ? "opacity-75" : "opacity-0"
          }`}
        onClick={() => {
          props.setCurrent();
          props.setAbout()
        }}
      />
      <div
        className="bg-white absolute transition-all duration-200 ease-out ease-in bottom-0 left-0 right-0"
        style={(props.current || props.about) ? {} : { transform: "translateY(100%)" }}
      >
        {props.children}
      </div>
    </div>
  );
};
