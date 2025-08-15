const SPcreator = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {/* Outer modal overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
        {/* Modal container */}
        <div
          className="flex flex-col bg-[#1e2b38] rounded-xl shadow-2xl w-[80%] h-[80%] overflow-hidden border border-white/10"
          style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
        >
          {/* Fixed Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#223649] border-b border-white/10 shrink-0">
            <h2 className="text-white text-2xl font-bold tracking-tight">
              Create Table
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-[#314d68] hover:bg-[#3f5d7d] text-white text-sm font-semibold rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {/* Procedure Name */}
            <div className="max-w-lg">
              <label className="block text-white font-medium mb-2">
                Procedure Name
              </label>
              <input
                type="text"
                placeholder="Enter procedure name"
                className="w-full rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all"
              />
            </div>

            {/* Parameters Table */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">
                Parameters
              </h3>
              <div className="overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#182634]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Data Type
                      </th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium">
                        Default Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#314d68]">
                      <td className="px-4 py-2 text-white text-sm">param1</td>
                      <td className="px-4 py-2 text-white text-sm">INT</td>
                      <td className="px-4 py-2 text-white text-sm">0</td>
                    </tr>
                    <tr className="border-t border-[#314d68]">
                      <td className="px-4 py-2 text-white text-sm">param2</td>
                      <td className="px-4 py-2 text-white text-sm">VARCHAR</td>
                      <td className="px-4 py-2 text-white text-sm">""</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-3 px-4 py-2 bg-[#223649] hover:bg-[#314d68] text-white rounded-lg text-sm font-semibold">
                Add Parameter
              </button>
            </div>

            {/* Logic Blocks */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-3">
                Logic Blocks
              </h3>
              {["INSERT", "UPDATE", "DELETE", "IF/ELSE", "CALL"].map(
                (block, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[#101a23] px-4 py-3 rounded-lg mb-2"
                  >
                    <div className="w-12 h-12 bg-[#223649] rounded-lg"></div>
                    <div>
                      <p className="text-white font-medium">{block}</p>
                      <p className="text-[#90adcb] text-sm">
                        {
                          {
                            INSERT: "Insert data into a table",
                            UPDATE: "Update data in a table",
                            DELETE: "Delete data from a table",
                            "IF/ELSE": "Conditional logic",
                            CALL: "Execute another procedure",
                          }[block]
                        }
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* SQL Preview */}
            <div className="max-w-lg">
              <label className="block text-white font-medium mb-2">
                SQL Preview
              </label>
              <textarea className="w-full min-h-36 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0c7ff2] transition-all"></textarea>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-[#223649] border-t border-white/10 shrink-0">
            <button className="px-4 py-2 bg-[#314d68] text-white rounded-lg hover:bg-[#3f5d7d] transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#0c7ff2] text-white rounded-lg hover:bg-[#0b6ad4] transition-colors">
              Save Procedure
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SPcreator;
