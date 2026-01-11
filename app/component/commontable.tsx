type Column = {
  header: string;
  accessor: string;
  isDate?: boolean;
};

type CommonTableProps = {
  columns: Column[];
  data: any[];
  showCheckbox?: boolean;
  selectedRows?: any[];
  onSelectionChange?: (rows: any[]) => void;
};

const formatDate = (value: any) => {
  if (typeof value !== "string") return value;

  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

  if (!isoDateRegex.test(value)) return value;

  const date = new Date(value);

  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

export default function CommonTable({
  columns,
  data,
  showCheckbox = false,
  selectedRows = [],
  onSelectionChange,
}: CommonTableProps) {
  const isAllSelected =
    data.length > 0 && selectedRows.length === data.length;

  const toggleSelectAll = () => {
    if (!onSelectionChange) return;

    if (isAllSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange([...data]);
    }
  };

  const toggleRow = (row: any) => {
    if (!onSelectionChange) return;

    if (selectedRows.includes(row)) {
      onSelectionChange(selectedRows.filter((r) => r !== row));
    } else {
      onSelectionChange([...selectedRows, row]);
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
             {showCheckbox && (
              <th className="px-4 py-3 border-b border-b-gray-200 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 cursor-pointer"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-b-gray-200"
              >
                {col.header}
              </th>
            ))}

           
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showCheckbox ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50"
              >
                 {showCheckbox && (
                  <td className="px-4 py-3 border-b border-b-gray-200 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRow(row)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-4 py-3 text-sm text-gray-700 border-b border-b-gray-200"
                  >
                    {col.isDate
                      ? formatDate(row[col.accessor])
                      : row[col.accessor] ?? "-"}
                  </td>
                ))}

               
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
