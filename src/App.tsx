import { useState } from "react";
import { fromWorker } from "./Helpers/fromWorker";
import { useReactable } from "@reactables/react";
import { ToggleState, ToggleActions, RxToggle } from "./RxToggle";
import "./App.css";

const USE_WORKER = true;

function App() {
  const [count, setCount] = useState(0);

  const [state, actions] = useReactable(() =>
    USE_WORKER
      ? fromWorker<ToggleState, ToggleActions>(
          new Worker(
            new URL("./Rxtoggle.worker.ts", import.meta.url),

            { type: "module" }
          )
        )
      : RxToggle()
  );

  return (
    <>
      <h1>Vite + React + Reactables + Web Workers</h1>
      <div className="card">
        <button onClick={() => actions.toggle()}>
          Toggle is: {state ? "on" : "off"}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
