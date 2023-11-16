import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { geo } from "../Store";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2ZseW5uMjA0OSIsImEiOiJjbG96aHl0ZXQwMHZkMmltajdkdW1peDVhIn0.LgRaT0h7orSxK5vlxHd0rg";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(118.7917);
  const [lat, setLat] = useState(32.0528);
  const [zoom, setZoom] = useState(7);

  let map = {};

  function createColorPoint(...color) {
    const d = 40;
    const r = d / 2;
    const r2 = r ** 2;
    const bytesPerPixel = 4;

    const data = new Uint8Array(d * d * bytesPerPixel);

    for (let x = 0; x < d; x++) {
      for (let y = 0; y < d; y++) {
        if ((x - r) ** 2 + (y - r) ** 2 >= r2) continue;

        const offset = (y * d + x) * bytesPerPixel;
        for (let b = 0; b < bytesPerPixel; b++) data[offset + b] = color[b];
      }
    }
    return { width: d, height: d, data };
  }

  // init map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    map = new mapboxgl.Map({
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

    map.on("load", () => {
      map.addImage("#imax", createColorPoint(98, 189, 180, 180));
      map.addImage("#dolby", createColorPoint(224, 155, 81, 180));
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    map.on("load", () => {
      map.addSource("source", {
        type: "geojson",
        data: geo,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 25,
      });

      map.addLayer({
        id: "layer",
        type: "symbol",
        source: "source",
        layout: {
          "icon-image": [
            "case",
            ["==", ["get", "type"], "imax"],
            "#imax",
            ["==", ["get", "type"], "dolby"],
            "#dolby",
            "#fff", // other
          ],
          "icon-size": 0.25,
          "text-field": ["get", "影城名称"],
          "text-size": 12,
          "text-offset": [0, 0.5],
          "text-anchor": "top",

          "icon-allow-overlap": true,
        },
        paint: {
          "text-color": "#7e6c56",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-halo-blur": 0,
        },
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "source",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#d3cdc0",
          "circle-stroke-color": "#a59a83",
          "circle-stroke-width": 1,
          "circle-radius": 10,
        },
      });

      map.addLayer({
        id: "clusters-count",
        type: "symbol",
        source: "source",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-size": 12,
          "text-allow-overlap": true,
        },
        paint: {
          "text-color": "white",
        },
      });

      // inspect a cluster on click
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource("source")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      // mouse event listener
      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });
      map.on("mouseenter", "layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "layer", () => {
        map.getCanvas().style.cursor = "";
      });

      // get user's location
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    });
  }, []);

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
