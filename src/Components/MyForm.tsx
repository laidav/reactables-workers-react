import { useReactable } from "@reactables/react";
import { Form, Field, FormArray } from "@reactables/react-forms";
import Input from "./Input";
import { RxFormArray, userConfig } from "./RxMyForm";

const MyForm = () => {
  const [state, actions] = useReactable(RxFormArray);
  console.log(state, actions);

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
