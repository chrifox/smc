import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
}

const Button = ({
  classes = "bg-gray-500",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={`my-2 py-2 px-4 rounded ${classes}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
