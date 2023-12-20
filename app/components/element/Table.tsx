import { DeleteRounded } from "@mui/icons-material";
import { getClassColour } from "@/app/utils/character";
import Button from "./Button";

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = {
  [key: string]: string | number;
};

type TableProps = {
  allowDelete?: boolean;
  handleDelete?: any;
  rows: TableRow[];
  rowAction?: any;
  columns: TableColumn[];
};

const Table = ({
  rows,
  columns,
  rowAction,
  allowDelete,
  handleDelete,
}: TableProps) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-2 py-1 text-left">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any) => (
          <tr
            key={row.id}
            className={`bg-[${getClassColour(row.class)}]`}
            onClick={rowAction ? () => rowAction(row.id) : undefined}
          >
            {Object.entries(row).map(([key, value]: [string, any]) => (
              <td key={`${row.id}--${key}`} className="px-2 py-1">
                {value}
              </td>
            ))}

            {allowDelete && (
              <td className="text-right">
                <Button visuallyLink onClick={() => handleDelete(row.id)}>
                  <DeleteRounded />
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
