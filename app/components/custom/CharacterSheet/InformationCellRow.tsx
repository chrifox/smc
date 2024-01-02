type InformationCellRowProps = {
  label?: string;
  children: JSX.Element | JSX.Element[];
};

const InformationCellRow = ({ label, children }: InformationCellRowProps) => (
  <div className="mb-2">
    {label && <p className="text-center text-xs mb-1">{label}</p>}
    <div className="flex flew-row flex-wrap">{children}</div>
  </div>
);

export default InformationCellRow;
