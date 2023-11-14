import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: any;
  label: string;
  classes?: string;
}

const Button = ({
  action,
  label,
  classes = "bg-gray-500",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`my-2 py-2 px-4 rounded ${classes}`}
      onClick={action}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
