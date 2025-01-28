import { fromWorker } from "./Helpers/fromWorker";
import { useReactable } from "@reactables/react";
import { ToggleState, ToggleActions, RxToggle } from "./RxToggle";
import "./App.css";
import MyForm from "./Components/MyForm";

const USE_WORKER = true;

function App() {
  const [formOpen, actions] = useReactable(() =>
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
          {formOpen ? "Close Form" : "Open Form"}
        </button>
      </div>
      {formOpen && <MyForm />}
    </>
  );
}

export default App;
