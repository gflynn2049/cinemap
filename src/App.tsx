import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import { Detail } from "./components/Detail";
import { Modal } from "./components/Modal";
import { MapProvider } from "./components/MapContext";
import About from "./components/About";
import Nav from "./components/Nav";
import { FloatControl } from "./components/FloatControl";
import { ProjectorFilterOptions } from "./ProjectorsData";

import { Theatre } from "./types";

import "./App.css";
import "./index.css";

function App() {
  const [current, setCurrent] = useState<Theatre | null>(null); // current theatre for displaying details
  const [about, setAbout] = useState<boolean>(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [displayDolby, setDisplayDolby] = useState<boolean>(true);
  const [displayImax, setDisplayImax] = useState<boolean>(true);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [projectorFilters, setProjectorFilters] = useState<ProjectorFilterOptions>({});
  const [useFilter, setUseFilter] = useState(false);

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <div>
      <MapProvider>
        <Map setCurrent={(theatre: Theatre) => setCurrent(theatre)} />
        <Nav
          setUseFilter={setUseFilter}
          setProjectorFilters={setProjectorFilters}
          displaySearch={displaySearch}
          setDisplaySearch={(val: boolean) => setDisplaySearch(val)}
          displayDolby={displayDolby}
          displayImax={displayImax}
          about={about}
          setAbout={(val: boolean) => setAbout(val)}
          displayFilter={displayFilter}
          setDisplayFilter={(val: boolean) => setDisplayFilter(val)}
          setCurrent={(theatre: Theatre | null) => setCurrent(theatre)}
        />
        <FloatControl
          projectorFilters={projectorFilters}
          useFilter={useFilter}
          displayDolby={displayDolby}
          setDisplayDolby={() => setDisplayDolby(!displayDolby)}
          displayImax={displayImax}
          setDisplayImax={() => setDisplayImax(!displayImax)}
          about={about}
          setAbout={setAbout}
        />
      </MapProvider>
      <Modal
        displaySearch={displaySearch}
        setDisplaySearch={() => setDisplaySearch(false)}
        current={!!current}
        setCurrent={() => setCurrent(null)}
        about={about}
        setAbout={() => setAbout(false)}
        displayFilter={displayFilter}
        setDisplayFilter={() => setDisplayFilter(false)}
      >
        <About
          about={about}
          setAbout={() => setAbout(false)}
          setDisplayFilter={() => setDisplayFilter(false)}
          setDisplaySearch={() => setDisplaySearch(false)}
        />
        <Detail current={current} setCurrent={() => setCurrent(null)} />
      </Modal>
    </div>
  );
}

export default App;
