type InformationCellProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: JSX.Element;
};

const InformationCell = ({ width = 6, children }: InformationCellProps) => (
  <div className={`w-[${(width / 12) * 100}%]`}>
    <div className="bg-gray-800 border border-gray-600 m-1">
      <div className="flex justify-center items-center border border-gray-400 p-2">{children}</div>
    </div>
  </div>
);

export default InformationCell;
