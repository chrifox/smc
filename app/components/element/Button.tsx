import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  visuallyLink?: boolean;
}

let buttonClasses = "bg-gray-700 py-2 px-4 rounded",
  linkClasses = "py-2 px-4";

const Button = ({
  classes = "",
  visuallyLink = false,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${visuallyLink ? linkClasses : buttonClasses} ${classes}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
