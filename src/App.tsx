import React, { useState } from "react";
import Map from "./components/Map";
import { Theatre } from "./types";
import { Detail } from "./components/Detail";
import { Modal } from "./components/Modal";
import "./App.css";
import "./index.css";
function App() {
  const [current, setCurrent] = useState<Theatre | null>(null);
  return (
    <div>
      <Map setCurrent={(theatre: Theatre) => setCurrent(theatre)} />

      <Modal current={!!current} setCurrent={() => setCurrent(null)}>
        <Detail current={current} />
      </Modal>
    </div>
  );
}

export default App;
