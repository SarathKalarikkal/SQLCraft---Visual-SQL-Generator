import { useState } from "react";
import "./Tables.css";
import TableCreator from "../../components/TableCreator";

const Tables = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const users = [
    {
      name: "Users",
      columns: "id, name, email, password",
      created: "2023-08-15",
    },
    {
      name: "Products",
      columns: "id, name, description, price",
      created: "2023-08-16",
    },
    {
      name: "Orders",
      columns: "id, user_id, product_id, quantity",
      created: "2023-08-17",
    },
    {
      name: "Reviews",
      columns: "id, product_id, user_id, rating, comment",
      created: "2023-08-18",
    },
    {
      name: "Categories",
      columns: "id, name",
      created: "2023-08-19",
    },
  ];

  return (
    <div
      className="root  flex flex-col bg-[#101a23] dark group-design-root overflow-hidden "
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">
        <div className="">
          <div className="flex flex-col flex-1 gap-4">
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
                onClick={() => setIsOpen(true)}
                className="p-4 flex gap-3 rounded-lg border border-[#314d68] bg-[#182634] hover:bg-[#314d68]  items-center cursor-pointer"
              >
                <div
                  className="text-white"
                  data-icon="Table"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,112H80v32H40Zm56,0H216v32H96ZM216,64V96H40V64ZM40,160H80v32H40Zm176,32H96V160H216v32Z"></path>
                  </svg>
                </div>
                <span className="text-white text-base font-bold leading-tight">
                  Create Table
                </span>
              </div>
            </div>

            <div className="">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div
                    className="text-[#90adcb] flex border-none bg-[#223649] items-center justify-center pl-4 rounded-l-lg border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Search tables"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#223649] focus:border-none h-full placeholder:text-[#90adcb] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    name="search"
                    type="text"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#223649] pl-4 pr-2">
                <p className="text-white text-sm font-medium leading-normal">
                  Created
                </p>
                <div
                  className="text-white"
                  data-icon="CaretDown"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
              <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#223649] pl-4 pr-2">
                <p className="text-white text-sm font-medium leading-normal">
                  Last Edited
                </p>
                <div
                  className="text-white"
                  data-icon="CaretDown"
                  data-size="20px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </div>
              </button>
            </div>

            <div className="container-query">
              <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#182634]">
                      <th className="table-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Table Name
                      </th>
                      <th className="table-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Columns
                      </th>
                      <th className="table-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                        Created
                      </th>
                      <th className="table-column-480 px-4 py-3 text-left text-white w-60 text-[#90adcb] text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(({ name, columns, created }, i) => (
                      <tr
                        key={name}
                        className="border-t border-t-[#314d68] hover:bg-[#1b2b3a] transition"
                      >
                        <td className=" table-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                          {name}
                        </td>
                        <td className=" table-column-240 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          {columns}
                        </td>
                        <td className=" table-column-360 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          {created}
                        </td>
                        <td className=" table-column-480 h-[72px] px-4 py-2 w-60 text-[#90adcb] text-sm font-bold leading-normal tracking-[0.015em]">
                          Edit | Delete | Duplicate
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-0 left-0 bg-[#182634a1] w-full h-screen z-30 flex justify-center items-center">
          <TableCreator setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Tables;
