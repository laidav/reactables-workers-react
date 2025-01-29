import { combine, Reactable } from "@reactables/core";
import { shareReplay } from "rxjs";
import {
  build,
  group,
  control,
  array,
  ControlModels,
  RxFormActions,
} from "@reactables/forms";
import { RxToggle, ToggleState, ToggleActions } from "../RxToggle";

export const userConfig = group({
  controls: {
    name: control(["", "required"]),
    email: control(["", ["required", "email"]]),
  },
});

export interface MyFormState {
  form: ControlModels.Form<unknown>;
  toggle: ToggleState;
}

export type MyFormActions = {
  form: RxFormActions;
  toggle: ToggleActions;
} & { destroy?: () => void };

export const RxMyForm = (): Reactable<MyFormState, MyFormActions> => {
  const [state$, actions] = build(
    group({
      controls: {
        contacts: array({
          controls: [...new Array(1).fill(userConfig)],
        }),
      },
    })
  );

  const rxToggle = RxToggle();

  return combine({
    form: [
      state$.pipe(shareReplay({ bufferSize: 1, refCount: true })),
      actions,
    ],
    toggle: rxToggle,
  });
};
