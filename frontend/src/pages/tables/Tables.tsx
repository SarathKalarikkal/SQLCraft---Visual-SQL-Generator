import { useState, useEffect } from "react";
import "./Tables.css";
import TableCreator from "../../components/TableCreator";
import { useAxios } from "../../hooks/useAxios";
import Loader from "../../hooks/loader";
import { Eye, SquarePen, Trash } from "lucide-react";
import DeletePopup from "../../components/DeletePopup";
import Toast from "../../components/Toast";

interface Column {
  id?: string;
  name: string;
  type: string;
  isPrimary: boolean;
  isNullable: boolean;
  description?: string;
}

interface Table {
  tableId: string;
  tableName: string;
  description: string;
  created_at: string;
  modify_date: string;
  columns: Column[];
}

interface TablesResponse {
  tables: Table[];
}

const Tables = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("");
  const [deleteItemName, setDeleteItemName] = useState<string>("");
  const [toast, setToast] = useState<{
    message: string;
    type?: "success" | "error";
  } | null>(null);
  const [posts, setPosts] = useState<TablesResponse>({ tables: [] });
  const [viewTable, setViewTable] = useState<Table | null>(null);
  const [isViewMode, setIsViewMode] = useState<boolean>(false); // true = view only, false = editable
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // true = editing existing, false = creating new

  const baseUrl = "http://localhost:3000/api/tableslists";

  const { data, loading, error } = useAxios<TablesResponse>(
    { url: baseUrl, method: "GET" },
    [baseUrl]
  );

  // Sync axios data with local state only once on initial load
  useEffect(() => {
    if (data && posts.tables.length === 0) {
      setPosts(data);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tables/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setToast({
          message: result.error || "Failed to delete table",
          type: "error",
        });
        return;
      }

      const updatedTables = posts.tables.filter(
        (table) => table.tableId !== id
      );
      setPosts({ tables: updatedTables });

      setToast({ message: "Table deleted successfully!", type: "success" });
      setIsDelete(false);
      setDeleteItemId("");
      setDeleteItemName("");
    } catch (error: any) {
      console.error(error);
      setToast({
        message: `Something went wrong: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleSaveTable = async (tableData: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/create-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tableData),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({
          message: `Table created successfully! Table ID: ${result.tableId}`,
          type: "success",
        });
        setIsOpen(false);
        setPosts((prev) => ({
          tables: [
            {
              tableId: result.tableId,
              tableName: tableData.tableName,
              description: tableData.description || "",
              created_at: new Date().toISOString(),
              modify_date: new Date().toISOString(),
              columns: tableData.columns,
            },
            ...prev.tables,
          ],
        }));
      } else {
        setToast({
          message: result.error || "Error creating table",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error(error);
      setToast({
        message: `Something went wrong: ${error.message}`,
        type: "error",
      });
    }
  };

  // Fetch single table details for viewing or editing
  const fetchTableDetails = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/table/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setToast({
          message: result.error || "Failed to fetch table details",
          type: "error",
        });
        return null;
      }

      return result.table as Table;
    } catch (error: any) {
      console.error(error);
      setToast({
        message: `Something went wrong: ${error.message}`,
        type: "error",
      });
      return null;
    }
  };

  // View Table (view-only)
  const handleViewTable = async (id: string) => {
    setIsUpdate(false);   // Not editing
    setIsViewMode(true);  // View-only mode

    const table = await fetchTableDetails(id);
    if (table) {
      setViewTable(table);
      setIsOpen(true);
    }
  };

  // Edit Table (open modal in edit mode)
  const handleEditTable = async (id: string) => {
    setIsUpdate(true);    // Editing mode
    setIsViewMode(false); // Editable

    const table = await fetchTableDetails(id);
    if (table) {
      setViewTable(table);
      setIsOpen(true);
    }
  };

  // Update table data after editing
  const handleUpdateTable = async (id: string, updatedData: any) => {
    try {
      const response = await fetch(`http://localhost:3000/api/table/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        setToast({
          message: result.error || "Failed to update table details",
          type: "error",
        });
        return;
      }

      setPosts((prev) => ({
        tables: prev.tables.map((table) =>
          table.tableId === id
            ? {
                ...table,
                tableName: updatedData.tableName,
                description: updatedData.description || "",
                columns: updatedData.columns,
                modify_date: new Date().toISOString(),
              }
            : table
        ),
      }));

      setToast({ message: "✅ Table updated successfully!", type: "success" });
      setIsOpen(false);
      setViewTable(null);
      setIsUpdate(false);
    } catch (error: any) {
      console.error(error);
      setToast({
        message: `Something went wrong: ${error.message}`,
        type: "error",
      });
    }
  };

  return (
    <div
      className="root flex flex-col bg-[#101a23] dark group-design-root overflow-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        {/* Header and Create Table button */}
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
              Tables
            </p>
            <p className="text-[#90adcb] text-sm font-normal leading-normal">
              Manage your database tables
            </p>
          </div>
          <div
            onClick={() => {
              setIsOpen(true);
              setIsViewMode(false);
              setIsUpdate(false);
              setViewTable(null);
            }}
            className="p-4 flex gap-3 rounded-lg border border-[#314d68] bg-[#182634] hover:bg-[#314d68] items-center cursor-pointer"
          >
            <span className="text-white text-base font-bold leading-tight">
              Create Table
            </span>
          </div>
        </div>

        {/* Table List */}
        <div className="container-query mt-6">
          {error ? (
            <p className="text-gray-400 text-sm">Error: {error}</p>
          ) : loading ? (
            <div className="mt-[50px]">
              <Loader variant="bars" label="Loading Tables" showLabel />
            </div>
          ) : (
            <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
              <table className="flex-1">
                <thead>
                  <tr className="bg-[#182634]">
                    <th className="px-4 py-3 text-left text-white w-[200px] text-sm font-medium">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-white w-[300px] text-sm font-medium">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-white w-[100px] text-sm font-medium">
                      Columns Count
                    </th>
                    <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium">
                      Updated
                    </th>
                    <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.tables.map((table) => (
                    <tr
                      key={table.tableId}
                      className="border-t border-t-[#314d68]"
                    >
                      <td className="h-[72px] px-4 py-2 text-white text-sm">
                        {table.tableName}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                        {table.description || "—"}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                        {table.columns.length}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                        {new Date(table.created_at).toLocaleDateString()}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                        {new Date(table.modify_date).toLocaleDateString()}
                      </td>
                      <td className="h-[72px] px-4 py-2 text-[#90adcb] text-sm flex gap-3">
                        <Eye
                          className="cursor-pointer hover:text-[#4089d7]"
                          onClick={() => handleViewTable(table.tableId)}
                        />
                        <SquarePen
                          className="cursor-pointer hover:text-[#4089d7]"
                          onClick={() => handleEditTable(table.tableId)}
                        />
                        <Trash
                          className="cursor-pointer hover:text-[#4089d7]"
                          onClick={() => {
                            setIsDelete(true);
                            setDeleteItemId(table.tableId);
                            setDeleteItemName(table.tableName);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 bg-[#182634a1] w-full h-screen z-30 flex justify-center items-center">
          <TableCreator
            setIsOpen={setIsOpen}
            onSaveTable={(tableData) => {
              if (isUpdate && viewTable) {
                handleUpdateTable(viewTable.tableId, tableData);
              } else {
                handleSaveTable(tableData);
              }
            }}
            isUpdate={isUpdate}
            tableData={
              viewTable
                ? {
                    tableName: viewTable.tableName,
                    description: viewTable.description,
                    columns: viewTable.columns.map((col) => ({
                      name: col.name,
                      type: col.type,
                      isPrimary: col.isPrimary,
                      isNullable: col.isNullable,
                      isForeign: false,
                      referencesTable: "",
                      description: col.description || "",
                    })),
                  }
                : undefined
            }
            disabled={isViewMode} // disable inputs if viewing only
          />
        </div>
      )}

      {isDelete && (
        <DeletePopup
          setIsDelete={setIsDelete}
          deleteItemId={deleteItemId}
          setDeleteItemId={setDeleteItemId}
          deleteItemName={deleteItemName}
          setDeleteItemName={setDeleteItemName}
          onDelete={handleDelete}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Tables;
