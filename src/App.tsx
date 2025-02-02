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

const createWorker = (pathUrl: string) =>
  new Worker(new URL(pathUrl, import.meta.url), { type: "module" });

// TOGGLE THIS TO TURN WORKER ON/OFF TO TEST BLOCKING ON MAIN THREAD.
const USE_WORKER = true;

function App() {
  const [expensiveDataState, actions] = useReactable(() =>
    USE_WORKER
      ? fromWorker<ExpensiveDataState, ExpensiveDataActions>(
          createWorker("./Rx/RxExpensiveData.worker.ts")
        )
      : RxExpensiveData({ dataService: new DataService() })
  );

  // Increment the counter to see if the main UI thread is blocked;
  const [count, setCount] = useState(0);

  if (!expensiveDataState) return;

  const { status, data } = expensiveDataState;

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
