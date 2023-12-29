type InformationCellRowProps = {
  label?: string;
  children: JSX.Element | JSX.Element[];
};

const InformationCellRow = ({ label, children }: InformationCellRowProps) => (
  <div>
    {label && <p className="text-center text-xs">{label}</p>}
    <div className="flex flew-row flex-wrap">{children}</div>
  </div>
);

export default InformationCellRow;
