type InformationCellProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: JSX.Element;
};

const InformationCell = ({ width = 12, children }: InformationCellProps) => (
  <div className={`w-[${(width / 12) * 100}%]`}>
    <div className="flex justify-center items-center bg-gray-800 p-1 m-1">
      {children}
    </div>
  </div>
);

export default InformationCell;
