const TableCreator = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const Columns = [
    { name: "id", type: "INT", constraint: "PRIMARY KEY" },
    {
      name: "name",
      type: "VARCHAR(255)",
      constraint: "NOT NULL",
    },
    {
      name: "email",
      type: "VARCHAR(255)",
      constraint: "UNIQUE",
    },
  ];

  return (
    <div className="flex flex-col bg-[#101a23] dark group/design-root root w-[90%] h-[90%] overflow-auto p-10 rounded-md">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col flex-1">
           <div className="flex flex-row justify-between items-center">
             <h2 className="text-white text-[28px] font-bold px-4 pb-3 ">
              Create Table
            </h2>
             <button onClick={()=>setIsOpen(false)} className="h-10 px-4 bg-[#223649] hover:bg-[#314d68] text-white text-sm font-bold rounded-lg cursor-pointer">
                 Close
                </button>
           </div>

            {/* Table Name */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">
                  Table Name
                </p>
                <input
                  placeholder="Enter table name"
                  className="form-input h-14 text-white bg-[#182634] border border-[#314d68] rounded-lg p-[15px] text-base placeholder:text-[#90adcb]"
                  name="table"
                    type="text"
                />
              </label>
            </div>

            {/* Columns */}
            <h3 className="text-white text-lg font-bold px-4 pb-2 pt-4">
              Columns
            </h3>
            <div className="px-4 py-3 containerQuery">
              <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#182634]">
                      <th className="column120 px-4 py-3 text-left text-white text-sm font-medium`">
                        Column Name
                      </th>
                      <th className="column240 px-4 py-3 text-left text-white text-sm font-medium">
                        Data Type
                      </th>
                      <th className="column360 px-4 py-3 text-left text-white text-sm font-medium">
                        Constraints
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Columns.map((col, i) => (
                      <tr key={i} className="border-t border-t-[#314d68]">
                        <td className="column120 h-[72px] px-4 py-2 text-white text-sm">
                          {col.name}
                        </td>
                        <td className="column240 h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                          {col.type}
                        </td>
                        <td className="column360 h-[72px] px-4 py-2 text-[#90adcb] text-sm">
                          {col.constraint}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex px-4 py-3 justify-start">
              <button className="h-10 px-4 bg-[#223649] text-white text-sm font-bold rounded-lg">
                Add Column
              </button>
            </div>

            {/* Relationships */}
            <h3 className="text-white text-lg font-bold px-4 pb-2 pt-4">
              Relationships
            </h3>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">
                  Related Table
                </p>
                <select className="form-input h-14 text-white bg-[#182634] border border-[#314d68] rounded-lg p-[15px]">
                  <option>Select a table</option>
                  <option>two</option>
                  <option>three</option>
                </select>
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">
                  Foreign Key
                </p>
                <select className="form-input h-14 text-white bg-[#182634] border border-[#314d68] rounded-lg p-[15px]">
                  <option>Select a column</option>
                  <option>two</option>
                  <option>three</option>
                </select>
              </label>
            </div>

            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 px-4 py-3 justify-end">
                <button className="h-10 px-4 bg-[#223649] text-white text-sm font-bold rounded-lg">
                  Preview SQL
                </button>
                <button onClick={()=>setIsOpen(false)} className="h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold rounded-lg">
                  Save Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableCreator;
