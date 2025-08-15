import { useState, useEffect } from "react";
import Toast from "./Toast";

interface Column {
  name: string;
  type: string;
  isPrimary: boolean;
  isNullable: boolean;
  isForeign: boolean;
  referencesTable: string;
  referencesColumn?: string;
  description: string;
}

interface TableCreatorProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveTable: (table: any) => void;
  tableData?: {
    tableName: string;
    description: string;
    columns: Column[];
  };
  disabled?: boolean; // disables all inputs if true
}

const TableCreator = ({
  setIsOpen,
  onSaveTable,
  tableData,
  disabled = false,
}: TableCreatorProps) => {
  const [tableName, setTableName] = useState(tableData?.tableName || "");
  const [tableDescription, setTableDescription] = useState(
    tableData?.description || ""
  );
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);
  const [columns, setColumns] = useState<Column[]>(
    tableData?.columns || [
      {
        name: "id",
        type: "int",
        isPrimary: true,
        isNullable: false,
        isForeign: false,
        referencesTable: "",
        description: "Primary key",
      },
    ]
  );
  const [previewSQL, setPreviewSQL] = useState("");
  console.log("tableData", tableData);

  useEffect(() => {
    if (tableData) {
      setTableName(tableData.tableName);
      setTableDescription(tableData.description);
      setColumns(tableData.columns);
    }
  }, [tableData]);

  const addColumn = () => {
    setColumns([
      ...columns,
      {
        name: "",
        type: "nvarchar(255)",
        isPrimary: false,
        isNullable: true,
        isForeign: false,
        referencesTable: "",
        description: "",
      },
    ]);
  };

  const updateColumn = <K extends keyof Column>(
    index: number,
    key: K,
    value: Column[K]
  ) => {
    const updated = [...columns];
    updated[index][key] = value;
    setColumns(updated);
  }

  const generateSQL = () => {
    console.log(columns.length);

    if (!tableName) {
      setToast({ message: "Table required", type: "error" });
      return "";
    } else if (!tableDescription) {
      setToast({ message: "Description required", type: "error" });
      return "";
    } else if (columns.length == 1) {
      setToast({ message: "More than 1 column required", type: "error" });
      return "";
    } else if (columns.some((item) => item.name === "")) {
      setToast({ message: "Column name required", type: "error" });
      return "";
    }
    const colDefs = columns
      .map((col) => {
        const nullable = col.isNullable ? "" : "NOT NULL";
        const primary = col.isPrimary ? "PRIMARY KEY" : "";
        return `[${col.name}] ${col.type} ${nullable} ${primary}`.trim();
      })
      .join(",\n  ");

    return `CREATE TABLE [${tableName}] (\n  ${colDefs}\n);`;
  };

  const handlePreviewSQL = () => setPreviewSQL(generateSQL());

  const handleSave = () => {
    if (!tableName) {
      setToast({ message: "Table name is required", type: "error" });
      return;
    }
    onSaveTable({
      tableName,
      description: tableDescription,
      columns,
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
        <div className="flex flex-col bg-[#101a23] rounded-xl shadow-2xl w-[80%] h-[80%] overflow-hidden border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#223649] border-b border-white/10">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              {disabled
                ? "View Table"
                : tableData
                ? "Edit Table"
                : "Create Table"}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-[#314d68] hover:bg-[#3f5d7d] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Table Name */}
            <div className="max-w-lg">
              <label className="block text-white font-medium mb-2">
                Table Name
              </label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Enter table name"
                disabled={disabled}
                className="w-full h-14 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] px-4 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all disabled:opacity-50"
              />
            </div>

            {/* Table Description */}
            <div className="max-w-lg">
              <label className="block text-white font-medium mb-2">
                Table Description
              </label>
              <input
                type="text"
                value={tableDescription}
                onChange={(e) => setTableDescription(e.target.value)}
                placeholder="Enter table description"
                disabled={disabled}
                className="w-full h-14 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] px-4 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all disabled:opacity-50"
              />
            </div>

            {/* Columns Table */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">Columns</h3>
              <div className="overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#182634]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Primary
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Nullable
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Foreign
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        References
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {columns.map((col, i) => (
                      <tr key={i} className="border-t border-[#314d68]">
                        <td className="px-4 py-2 text-white text-sm">
                          <input
                            type="text"
                            value={col.name}
                            onChange={(e) =>
                              updateColumn(i, "name", e.target.value)
                            }
                            disabled={disabled}
                            className="w-full bg-[#101a23] text-white border border-[#314d68] rounded px-2 disabled:opacity-50"
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm">
                          <input
                            type="text"
                            value={col.type}
                            onChange={(e) =>
                              updateColumn(i, "type", e.target.value)
                            }
                            disabled={disabled}
                            className="w-full bg-[#101a23] text-white border border-[#314d68] rounded px-2 disabled:opacity-50"
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm text-center">
                          <input
                            type="checkbox"
                            checked={col.isPrimary}
                            onChange={(e) =>
                              updateColumn(i, "isPrimary", e.target.checked)
                            }
                            disabled={disabled}
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm text-center">
                          <input
                            type="checkbox"
                            checked={col.isNullable}
                            onChange={(e) =>
                              updateColumn(i, "isNullable", e.target.checked)
                            }
                            disabled={disabled}
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm text-center">
                          <input
                            type="checkbox"
                            checked={col.isForeign}
                            onChange={(e) =>
                              updateColumn(i, "isForeign", e.target.checked)
                            }
                            disabled={disabled}
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm">
                          <input
                            type="text"
                            value={col.referencesTable}
                            placeholder="Table.Column"
                            onChange={(e) =>
                              updateColumn(i, "referencesTable", e.target.value)
                            }
                            disabled={disabled}
                            className="w-full bg-[#101a23] text-white border border-[#314d68] rounded px-2 disabled:opacity-50"
                          />
                        </td>
                        <td className="px-4 py-2 text-white text-sm">
                          <input
                            type="text"
                            value={col.description}
                            onChange={(e) =>
                              updateColumn(i, "description", e.target.value)
                            }
                            disabled={disabled}
                            className="w-full bg-[#101a23] text-white border border-[#314d68] rounded px-2 disabled:opacity-50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!disabled && (
                <button
                  className="mt-3 px-4 py-2 bg-[#223649] hover:bg-[#314d68] text-white rounded-lg text-sm font-semibold"
                  onClick={addColumn}
                >
                  Add Column
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-[#223649] border-t border-white/10">
            <button
              onClick={handlePreviewSQL}
              className="px-4 py-2 bg-[#314d68] text-white rounded-lg hover:bg-[#3f5d7d] transition-colors"
            >
              Preview SQL
            </button>
            {!disabled && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#0c7ff2] text-white rounded-lg hover:bg-[#0b6ad4] transition-colors"
              >
                Save Table
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview SQL Modal */}
      {previewSQL && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#101a23] rounded-xl shadow-2xl w-[60%] max-h-[70%] overflow-auto p-6 border border-white/10">
            <h3 className="text-white text-xl font-bold mb-4">Preview SQL</h3>
            <pre className="bg-[#182634] text-white p-4 rounded overflow-auto">
              {previewSQL}
            </pre>
            <button
              onClick={() => setPreviewSQL("")}
              className="mt-4 px-4 py-2 bg-[#0c7ff2] text-white rounded hover:bg-[#0b6ad4] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default TableCreator;
