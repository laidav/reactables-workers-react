import { WrappedFieldProps } from "@reactables/react-forms";
const Input = ({
  input,
  label,
  meta: { touched, errors, pending, valid },
}: { label?: string } & WrappedFieldProps) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          className={`form-label ${touched && !valid ? "text-danger" : ""}`}
        >
          {label}
        </label>
      )}
      <input
        {...input}
        type="text"
        className={`form-control ${touched && !valid ? "is-invalid" : ""}`}
      />
      {touched && errors.required && (
        <div>
          <small className="text-danger">Field is required</small>
        </div>
      )}
      {touched && errors.email && (
        <div>
          <small className="text-danger">Not a valid email address</small>
        </div>
      )}
    </div>
  );
};

export default Input;
