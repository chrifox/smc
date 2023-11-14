type ButtonProps = {
  action: any;
  label: string;
  classes?: string;
};

const Button = ({ action, label, classes = "bg-gray-500" }: ButtonProps) => {
  return (
    <button className={`my-2 py-2 px-4 rounded ${classes}`} onClick={action}>
      {label}
    </button>
  );
};

export default Button;
