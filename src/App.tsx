import { fromWorker } from "@reactables/web-workers";
import { useReactable } from "@reactables/react";
import { ToggleState, ToggleActions, RxToggle } from "./RxToggle";
import "./App.css";
import MyForm from "./Components/MyForm";
import { Reactable } from "@reactables/core";

const USE_WORKER = true;

function App() {
  const [formOpen, actions] = useReactable(
    () =>
      (USE_WORKER
        ? fromWorker<ToggleState, ToggleActions>(
            new Worker(
              new URL("./RxToggle.worker.ts", import.meta.url),

              { type: "module" }
            )
          )
        : RxToggle()) as Reactable<ToggleState, ToggleActions>
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
