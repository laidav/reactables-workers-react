import { concat, of } from "rxjs";
import { mergeMap, map, delay } from "rxjs/operators";
import { RxBuilder, type Reactable } from "@reactables/core";
import { ReactableFactory } from "@reactables/web-workers";
import DataService from "../DataService";

export enum ExpensiveDataStatus {
  Initialized = "Initialized",
  Fetching = "Fetching...",
  Processing = "Processing...",
  Complete = "Complete!",
}

export interface ExpensiveDataState {
  data: string | null;
  status: ExpensiveDataStatus;
}

export interface ExpensiveDataActions {
  getExpensiveData: () => void;
}

const initialState: ExpensiveDataState = {
  data: null,
  status: ExpensiveDataStatus.Initialized,
};

export const RxExpensiveData: ReactableFactory<
  ExpensiveDataState,
  ExpensiveDataActions
> = (config?: {
  deps?: { dataService?: DataService };
}): Reactable<ExpensiveDataState, ExpensiveDataActions> =>
  RxBuilder({
    initialState,
    reducers: {
      getExpensiveData: {
        reducer: () => ({
          data: null,
          status: ExpensiveDataStatus.Fetching,
        }),
        effects: [
          (getExpensiveData$) =>
            getExpensiveData$.pipe(
              mergeMap(() =>
                (config?.deps?.dataService as DataService).getData()
              ),
              mergeMap((data) => {
                return concat(
                  of({ type: "processingData" }), // Notify data has been received and processing data.
                  of(data).pipe(
                    delay(100), // Just so we can see the processing message when we are not using the worker
                    map((data) => {
                      // SOME EXPENSIVE PROCESSING
                      whileLoopForMilliseconds(3000);

                      return {
                        type: "complete",
                        payload: `Boy that took a while to process: ${data}`,
                      };
                    })
                  )
                );
              })
            ),
        ],
      },
      processingData: (state) => ({
        ...state,
        status: ExpensiveDataStatus.Processing,
      }),
      complete: (state, action) => ({
        ...state,
        data: action.payload as string,
        status: ExpensiveDataStatus.Complete,
      }),
    },
  });

export const whileLoopForMilliseconds = (ms: number) => {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy-wait loop: Keeps the CPU occupied
  }
};
