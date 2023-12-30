import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options?: { label: string; value: string }[];
}

const defaultInputClasses = "text-black outline-none rounded w-full p-1";

const Input = ({ label, options = [], ...props }: InputProps & SelectProps) => {
  switch (props.type) {
    case "select":
      return options.length > 0 ? (
        <div className="input-group mb-2">
          <label>{label}</label>
          <select
            className={defaultInputClasses}
            {...props}
          >
            <option value="">{props.placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null;
    case "range":
      return (
        <div className="input-group mb-2">
          <label>{label}</label>
          <input
            className={defaultInputClasses}
            onMouseUp={props.onChange}
            {...props}
          />
        </div>
      );
    case "color":
      return (
        <div className="input-group mb-2">
          <label>{label}</label>
          <input
            className={defaultInputClasses.replaceAll("p-1", "")}
            {...props}
          />
        </div>
      );
    default:
      return (
        <div className="input-group mb-2">
          <label>{label}</label>
          <input className={defaultInputClasses} {...props} />
        </div>
      );
  }
};

export default Input;
