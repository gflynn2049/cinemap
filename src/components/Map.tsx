import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import { geo } from "../Store";
import { Theatre } from "../types";
import { useMapContext } from "./MapContext";
import "./Map.scss";



mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESS_TOKEN as string

const Map: React.FC<{ setCurrent: (current: Theatre) => void }> = (props) => {
  const { map, mapContainer } = useMapContext();

  const [lng, setLng] = useState(94.3597);
  const [lat, setLat] = useState(48.1882);
  const [zoom, setZoom] = useState(1.94);

  function createColorPoint(...color: number[]) {
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

  useEffect(() => {
    if (map.current) return; // initialize
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/gflynn2049/clp01kis900b101pq97kvhl5i",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }));

    // display coordinates
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // todo: bind brandToColor
    map.current.on("load", () => {
      map.current.addImage("#imax", createColorPoint(98, 189, 180, 180));
      map.current.addImage("#dolby", createColorPoint(224, 155, 81, 180));
    });

    map.current.on("click", "layer", (e: any) => {
      if (!e.features) {
        return;
      }

      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;

      props.setCurrent({ coordinates, properties });
    });

    // inspect a cluster on click
    map.current.on("click", "clusters", (e: any) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map.current
        .getSource("source")
        .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
          if (err) return;

          map.current.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // mouse event listener
    map.current.on("mouseenter", "clusters", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "clusters", () => {
      map.current.getCanvas().style.cursor = "";
    });
    map.current.on("mouseenter", "layer", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "layer", () => {
      map.current.getCanvas().style.cursor = "";
    });

    map.current.on("load", () => {

      // get user's location
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        "bottom-right"
      );

      map.current.addSource("source", {
        type: "geojson",
        data: geo,
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 25,
      });

      map.current.addLayer({
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
          "text-field": ["get", "theatre"],
          "text-size": 12,
          "text-offset": [0, 0.5],
          "text-anchor": "top",
          "icon-allow-overlap": true,
          // "icon-ignore-placement": true,
          // "text-allow-overlap": true,
          // "text-ignore-placement": false

        },
        paint: {
          "text-color": "#7e6c56",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "text-halo-blur": 0,
        },
      });

      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "source",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "point_count"],
            0,
            "#94bce3",
            // ["rgba", 148, 188, 227, 0.8],
            15,
            "#6694c4",
            // ["rgba", 102, 148, 196, 0.8],
            35,
            "#5172ad",
            // ["rgba", 81, 114, 173, 0.8],
            50,
            // "#3f4996",
            ["rgba", 63, 73, 150, 0.8],
          ],
          "circle-stroke-color": ["rgba", 1, 1, 1, 0],
          "circle-stroke-width": 1,
          "circle-radius": ["+", 6, ["*", 3, ["ln", ["get", "point_count"]]]],
        },
      });

      map.current.addLayer({
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
    });
  }, []);

  // console.log(lng + " " + " " + lat + " " + zoom)
  return (
    <React.Fragment>
      <div className="map-container" ref={mapContainer} />
    </React.Fragment>
  );
};

export default Map;
