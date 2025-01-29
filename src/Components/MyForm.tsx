import { fromWorker } from "../Helpers/fromWorker";
import { useReactable } from "@reactables/react";
import { Form, Field, FormArray } from "@reactables/react-forms";
import Input from "./Input";
import { RxMyForm, userConfig, MyFormState, MyFormActions } from "./RxMyForm";

const USE_WORKER = true;
const MyForm = () => {
  const [state, actions] = useReactable(() => {
    return USE_WORKER
      ? fromWorker<MyFormState, MyFormActions>(
          new Worker(
            new URL("./RxMyForm.worker.ts", import.meta.url),

            { type: "module" }
          )
        )
      : RxMyForm();
  });

  console.log(state, "in form", actions);
  if (!state) return <></>;

  return (
    <>
      <button type="button" onClick={() => actions.toggle.toggle()}>
        Toggle is: {state.toggle ? "on" : "off"}
      </button>
      <Form rxForm={[state.form, actions.form]}>
        <FormArray name="contacts">
          {({ items, pushControl, removeControl }) => {
            return (
              <>
                {items.map((control, index) => {
                  return (
                    <div key={control.key}>
                      <div>Contact # {index + 1}</div>
                      <Field
                        name={`contacts.${index}.name`}
                        label="Name:"
                        component={Input}
                      />
                      <Field
                        name={`contacts.${index}.email`}
                        label="Email: "
                        component={Input}
                      />
                      <button
                        type="button"
                        onClick={() => removeControl(index)}
                      >
                        Remove contact
                      </button>
                    </div>
                  );
                })}
                <button type="button" onClick={() => pushControl(userConfig)}>
                  Add Contact
                </button>
              </>
            );
          }}
        </FormArray>
      </Form>
    </>
  );
};

export default MyForm;
