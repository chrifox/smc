import Tile from "../../element/Tile";

type InformationCellProps = {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: JSX.Element;
};

const InformationCell = ({ width = 6, children }: InformationCellProps) => (
  <div className={`w-[${(width / 12) * 100}%]`}>
    <Tile>{children}</Tile>
  </div>
);

export default InformationCell;
