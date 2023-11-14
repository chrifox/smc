type InputProps = {
  label: string;
  value: any;
  placeholder: string;
  name: string;
  type: "select" | "text" | "number";
  onChange: (event: React.ChangeEvent<any>) => void;
  options?: { label: string; value: string }[];
};

const defaultInputClasses = "outline-none rounded ml-2";

const Input = ({
  label,
  value,
  name,
  type,
  onChange,
  options = [],
  placeholder,
}: InputProps) => {
  switch (type) {
    case "select":
      return options.length > 0 ? (
        <div className="input-group">
          <label>{label}</label>
          <select
            name={name}
            className={`${defaultInputClasses} text-black`}
            onChange={onChange}
            defaultValue={value}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null;
    default:
      return (
        <div className="input-group">
          <label>{label}</label>
          <input
            className={defaultInputClasses}
            name={name}
            type={type}
            onChange={onChange}
          />
        </div>
      );
  }
};

export default Input;
