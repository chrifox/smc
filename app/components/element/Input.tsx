import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (event: React.ChangeEvent<any>) => void;
  inputGroupClasses?: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options?: { label: string; value: string }[];
}

const defaultInputGroupClasses = "input-group mb-2";
const defaultInputClasses = "text-black outline-none rounded w-full p-1";

const InputGroup = ({
  label,
  classes,
  children,
}: {
  label: string;
  classes: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <div className={classes}>
    <div className="mx-2">
      <label>{label}</label>
      {children}
    </div>
  </div>
);

const Input = ({
  label,
  options = [],
  inputGroupClasses = "w-full",
  ...props
}: InputProps & SelectProps) => {
  const groupClasses = `${defaultInputGroupClasses} ${inputGroupClasses}`;
  switch (props.type) {
    case "select":
      return options.length > 0 ? (
        <InputGroup label={label} classes={groupClasses}>
          <select className={defaultInputClasses} {...props}>
            <option value="">{props.placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </InputGroup>
      ) : null;
    case "range":
      return (
        <InputGroup label={label} classes={groupClasses}>
          <input
            className={defaultInputClasses}
            onMouseUp={props.onChange}
            {...props}
          />
        </InputGroup>
      );
    case "color":
      return (
        <InputGroup label={label} classes={groupClasses}>
          <input
            className={defaultInputClasses.replaceAll("p-1", "")}
            {...props}
          />
        </InputGroup>
      );
    default:
      return (
        <InputGroup label={label} classes={groupClasses}>
          <input className={defaultInputClasses} {...props} />
        </InputGroup>
      );
  }
};

export default Input;
