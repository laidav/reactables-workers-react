import { RxBuilder } from "@reactables/core";
export type ToggleState = boolean;
export type ToggleActions = { toggle: (value?: boolean) => void };

export const RxToggle = () =>
  RxBuilder({
    initialState: false,
    reducers: {
      toggle: (state, { payload }) =>
        payload === undefined ? !state : (payload as boolean),
    },
  });
