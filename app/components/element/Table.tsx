import { DeleteRounded } from "@mui/icons-material";
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
  getRowClasses?: (row: TableRow) => string;
  getCellClasses?: (row: TableRow, key: string) => string;
  columns: TableColumn[];
};

const Table = ({
  rows,
  columns,
  rowAction,
  getRowClasses,
  getCellClasses,
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
            className={`${rowAction ? "cursor-pointer" : ""} ${
              getRowClasses ? getRowClasses(row) : ""
            }`}
            onClick={rowAction ? () => rowAction(row.id) : undefined}
          >
            {Object.entries(row).map(([key, value]: [string, any]) => (
              <td
                key={`${row.id}--${key}`}
                className={`px-2 py-1 ${
                  getCellClasses ? getCellClasses(row, key) : ""
                }`}
              >
                {value}
              </td>
            ))}

            {allowDelete && (
              <td className="text-right">
                <Button
                  visuallyLink
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleDelete(row.id);
                  }}
                >
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
