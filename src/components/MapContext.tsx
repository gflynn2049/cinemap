import React, { createContext, useContext, useRef, ReactNode } from "react";

interface MapContextProps {
  map: React.MutableRefObject<any>;
  mapContainer: React.MutableRefObject<any>;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const contextValue: MapContextProps = { map, mapContainer };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
