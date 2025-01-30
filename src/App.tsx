import { useState } from "react";
import { fromWorker } from "@reactables/web-workers";
import { useReactable } from "@reactables/react";
import {
  RxExpensiveData,
  ExpensiveDataState,
  ExpensiveDataActions,
  ExpensiveDataStatus,
} from "./Rx/RxExpensiveData";
import DataService from "./DataService";
const USE_WORKER = true;

function App() {
  const [state, actions] = useReactable(() =>
    USE_WORKER
      ? fromWorker<ExpensiveDataState, ExpensiveDataActions>(
          new Worker(
            new URL("./RxToggle.worker.ts", import.meta.url),

            { type: "module" }
          )
        )
      : RxExpensiveData({ deps: { dataService: new DataService() } })
  );

  const [count, setCount] = useState(0);

  if (!state) return;

  const { status, data } = state;

  return (
    <>
      <h1>Vite + React + Reactable Web Workers!</h1>
      <div>
        <h3>Status: {status}</h3>
        <p>
          <strong>{data}</strong>
        </p>

        <button
          onClick={() => actions.getExpensiveData()}
          disabled={
            status === ExpensiveDataStatus.Fetching ||
            status === ExpensiveDataStatus.Processing
          }
        >
          Get Expensive Data
        </button>
      </div>

      <div className="card">
        <p>
          <strong>
            Increment the counter below while <strong>processing</strong> to see
            if the main UI thread is blocked!
          </strong>
        </p>
        <button onClick={() => setCount(count + 1)}>Count is: {count}</button>
      </div>
    </>
  );
}

export default App;
