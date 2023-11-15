import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2ZseW5uMjA0OSIsImEiOiJjbG96aHl0ZXQwMHZkMmltajdkdW1peDVhIn0.LgRaT0h7orSxK5vlxHd0rg";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(118.7856);
  const [lat, setLat] = useState(32.0391);
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/gflynn2049/clp01kis900b101pq97kvhl5i",
      center: [lng, lat],
      zoom: zoom,
    });

    // (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl());

    // display coordinates
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, [mapContainerRef]);

  return (
    <React.Fragment>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </React.Fragment>
  );
};

export default Map;
