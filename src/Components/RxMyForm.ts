import { combine } from "@reactables/core";
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

export interface MyFormActions {
  form: RxFormActions;
  toggle: ToggleActions;
}

export const RxMyForm = () => {
  const rxFormArray = build(
    group({
      controls: {
        contacts: array({
          controls: [userConfig],
        }),
      },
    })
  );

  const rxToggle = RxToggle();

  return combine({
    form: rxFormArray,
    toggle: rxToggle,
  });
};
