import { RxBuilder, Action } from "@reactables/core";
import { Observable } from "rxjs";
export type ToggleState = boolean;
export type ToggleActions = { toggle: (value?: boolean) => void };

export const RxToggle = (
  {
    initialState = false,
    sources = [],
  }: {
    sources?: Observable<Action<unknown>>[];
    initialState?: boolean;
  } = { sources: [], initialState: false }
) =>
  RxBuilder({
    initialState,
    reducers: {
      toggle: (state, { payload }) =>
        payload === undefined ? !state : (payload as boolean),
    },
    sources,
  });
