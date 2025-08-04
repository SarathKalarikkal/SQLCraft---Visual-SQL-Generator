const SPcreator = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className=" flex size-full flex-col bg-[#101a23] w-[90%] h-[90%] overflow-auto p-10 rounded-md"
      style={{ fontFamily: 'Inter, Noto Sans, sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        <div className=" flex flex-1 justify-center ">
          <div className="layout-content-container flex flex-col py-5 flex-1">
           <div className="flex flex-row justify-between items-center">
             <h2 className="text-white text-[28px] font-bold px-4 pb-3 ">
              Create Table
            </h2>
             <button onClick={()=>setIsOpen(false)} className="h-10 px-4 bg-[#223649] hover:bg-[#314d68] text-white text-sm font-bold rounded-lg cursor-pointer">
                 Close
                </button>
           </div>

            {/* Procedure Name Input */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  Procedure Name
                </p>
                <input
                  placeholder="Enter procedure name"
                  className="form-input w-full flex-1 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] p-[15px] h-14 text-base font-normal leading-normal focus:outline-none focus:ring-0"
                  name="procedure"
                    type="text"
                />
              </label>
            </div>

            {/* Parameters Table */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Parameters
            </h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#182634]">
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">Name</th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">Data Type</th>
                      <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal w-[400px]">Default Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#314d68]">
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">param1</td>
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">INT</td>
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">0</td>
                    </tr>
                    <tr className="border-t border-[#314d68]">
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">param2</td>
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">VARCHAR</td>
                      <td className="px-4 py-2 text-sm font-normal leading-normal text-white w-[400px]">''</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Parameter */}
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#223649] text-white text-sm font-bold">
                <span className="truncate">Add Parameter</span>
              </button>
            </div>

            {/* Logic Blocks */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Logic Blocks
            </h3>
            {["INSERT", "UPDATE", "DELETE", "IF/ELSE", "CALL"].map((block, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-[#101a23] px-4 min-h-[72px] py-2"
              >
                <div className="text-white flex items-center justify-center rounded-lg bg-[#223649] shrink-0 size-12"></div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-base font-medium leading-normal line-clamp-1">
                    {block}
                  </p>
                  <p className="text-[#90adcb] text-sm font-normal leading-normal line-clamp-2">
                    {{
                      INSERT: "Insert data into a table",
                      UPDATE: "Update data in a table",
                      DELETE: "Delete data from a table",
                      "IF/ELSE": "Conditional logic",
                      CALL: "Execute another procedure",
                    }[block]}
                  </p>
                </div>
              </div>
            ))}

            {/* SQL Preview */}
            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              SQL Preview
            </h3>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">
                  SQL Preview
                </p>
                <textarea className="form-input w-full flex-1 rounded-lg border border-[#314d68] bg-[#182634] text-white placeholder-[#90adcb] p-[15px] min-h-36 text-base font-normal leading-normal focus:outline-none focus:ring-0"></textarea>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#223649] text-white text-sm font-bold">
                  Cancel
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold">
                  Save Procedure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPcreator;
