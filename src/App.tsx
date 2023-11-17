import React, { useState } from "react";
import { Theatre } from "./types";
import Map from "./components/Map";
import { Detail } from "./components/Detail";
import { Modal } from "./components/Modal";
import { MapProvider } from "./components/MapContext";
import { FloatControl } from "./components/FloatControl";

import "./App.css";
import "./index.css";

function App() {
  const [current, setCurrent] = useState<Theatre | null>(null);
  const [displayDolby, setDisplayDolby] = useState<boolean>(true);
  const [displayImax, setDisplayImax] = useState<boolean>(true);

  return (
    <div>
      <MapProvider>
        <Map setCurrent={(theatre: Theatre) => setCurrent(theatre)} />
        <FloatControl
          displayDolby={displayDolby}
          setDisplayDolby={() => setDisplayDolby(!displayDolby)}
          displayImax={displayImax}
          setDisplayImax={() => setDisplayImax(!displayImax)}
        />
      </MapProvider>
      <Modal current={!!current} setCurrent={() => setCurrent(null)}>
        <Detail current={current} setCurrent={() => setCurrent(null)} />
      </Modal>
    </div>
  );
}

export default App;
