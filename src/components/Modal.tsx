import React from "react";

export const Modal = (props: {
  displaySearch: boolean;
  setDisplaySearch: () => void;
  current: boolean;
  setCurrent: () => void;
  about: boolean;
  setAbout: () => void;
  displayFilter: boolean;
  setDisplayFilter: () => void;
  children: any;
}) => {
  return (
    <div
      style={{ zIndex: 501 }}
      className={`fixed top-0 bottom-0 left-0 right-0 ${props.current || props.about || props.displayFilter || props.displaySearch ? "" : "pointer-events-none"}`}
    >
      <div
        className={`bg-black bg-opacity-50 bottom-0 left-0 right-0 top-0 absolute transition-opacity duration-500 ease-out ${props.current || props.about || props.displayFilter || props.displaySearch ? "opacity-50" : "opacity-0"}`}
        onClick={() => {
          props.setCurrent();
          props.setAbout()
          props.setDisplayFilter()
          props.setDisplaySearch()
        }}
      />
      <div
        className="bg-white absolute transition-all duration-200 ease-out ease-in bottom-0 left-0 right-0"
        style={(props.current || props.about || props.displaySearch) ? {} : { transform: "translateY(100%)" }}
      >
        {props.children}
      </div>
    </div>
  );
};
