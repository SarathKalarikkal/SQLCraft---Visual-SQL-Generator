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
   <>
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
  <div
    className="flex flex-col bg-[#101a23] rounded-xl shadow-2xl w-[80%] h-[80%] overflow-hidden border border-white/10"
    style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
  >
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 bg-[#223649] border-b border-white/10 shrink-0">
      <h2 className="text-white text-2xl font-bold tracking-tight">Create Table</h2>
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
        <label className="block text-white font-medium mb-2">Table Name</label>
        <input
          type="text"
          placeholder="Enter table name"
          className="w-full h-14 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] px-4 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all"
        />
      </div>

      {/* Columns Table */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-3">Columns</h3>
        <div className="overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
          <table className="w-full">
            <thead>
              <tr className="bg-[#182634]">
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Column Name</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Data Type</th>
                <th className="px-4 py-3 text-left text-white text-sm font-medium">Constraints</th>
              </tr>
            </thead>
            <tbody>
              {Columns.map((col, i) => (
                <tr key={i} className="border-t border-[#314d68]">
                  <td className="px-4 py-2 text-white text-sm">{col.name}</td>
                  <td className="px-4 py-2 text-[#90adcb] text-sm">{col.type}</td>
                  <td className="px-4 py-2 text-[#90adcb] text-sm">{col.constraint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-3 px-4 py-2 bg-[#223649] hover:bg-[#314d68] text-white rounded-lg text-sm font-semibold">
          Add Column
        </button>
      </div>

      {/* Relationships */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-3">Relationships</h3>

        <div className="max-w-lg space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">Related Table</label>
            <select className="w-full h-14 rounded-lg border border-[#314d68] bg-[#182634] text-white px-4 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2]">
              <option>Select a table</option>
              <option>two</option>
              <option>three</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Foreign Key</label>
            <select className="w-full h-14 rounded-lg border border-[#314d68] bg-[#182634] text-white px-4 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2]">
              <option>Select a column</option>
              <option>two</option>
              <option>three</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 px-6 py-4 bg-[#223649] border-t border-white/10 shrink-0">
      <button className="px-4 py-2 bg-[#314d68] text-white rounded-lg hover:bg-[#3f5d7d] transition-colors">
        Preview SQL
      </button>
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 bg-[#0c7ff2] text-white rounded-lg hover:bg-[#0b6ad4] transition-colors"
      >
        Save Table
      </button>
    </div>
  </div>
</div>

   </>
  );
};

export default TableCreator;
