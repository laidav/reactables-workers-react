import { WrappedFieldProps } from "@reactables/react-forms";

const Input = ({
  input,
  label,
  meta: { touched, valid },
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
    </div>
  );
};

export default Input;
