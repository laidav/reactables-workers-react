import { combine } from "@reactables/core";
import { build, group, control, array } from "@reactables/forms";
import { RxToggle } from "../RxToggle";

export const userConfig = group({
  controls: {
    name: control(["", "required"]),
    email: control(["", ["required", "email"]]),
  },
});

export const RxFormArray = () => {
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
