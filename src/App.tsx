import { useState } from "react";
import { fromWorker } from "./Helpers/fromWorker";
import { useReactable } from "@reactables/react";
import { of } from "rxjs";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ToggleState, ToggleActions } from "./RxToggle";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [state, actions] = useReactable(() =>
    fromWorker<ToggleState, ToggleActions>(
      new Worker(
        new URL("./Rxtoggle.worker.ts", import.meta.url),

        { type: "module" }
      ),
      {
        sources: [of({ type: "toggle" })],
      }
    )
  );

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
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
