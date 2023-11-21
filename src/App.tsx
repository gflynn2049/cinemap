import React, { useEffect, useState } from "react";

import { Theatre } from "./types";
import Map from "./components/Map";
import { Detail } from "./components/Detail";
import { Modal } from "./components/Modal";
import { MapProvider } from "./components/MapContext";
import Filter from "./components/Filter";

import "./App.css";
import "./index.css";
import About from "./components/About";

function App() {
  const [current, setCurrent] = useState<Theatre | null>(null); // current theatre for displaying details
  const [about, setAbout] = useState<boolean>(false)

  useEffect(() => { console.log(about) }, [about])
  return (
    <div>
      <MapProvider>
        <Map setCurrent={(theatre: Theatre) => setCurrent(theatre)} />
        <Filter about={about} setAbout={(val: boolean) => setAbout(val)} />
      </MapProvider>
      <Modal current={!!current} setCurrent={() => setCurrent(null)} about={!!about} setAbout={() => setAbout(false)}>
        <Detail current={current} setCurrent={() => setCurrent(null)} />
        <About about={about} setAbout={() => { setAbout(false) }} />
      </Modal>
    </div>
  );
}

export default App;
