type Column = {
  header: string;
  accessor: string;
  isDate?: boolean;
};

type CommonTableProps = {
  columns: Column[];
  data: any[];
};

const formatDate = (value: any) => {
  if (typeof value !== "string") return value;

  const isoDateRegex =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

  if (!isoDateRegex.test(value)) return value;

  const date = new Date(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default function CommonTable({ columns, data }: CommonTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
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
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition cursor-pointer bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50"
              >
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
