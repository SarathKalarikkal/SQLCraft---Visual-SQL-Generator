

const Home = () => {
  return (
   <div className="flex flex-col flex-1 gap-6">
              <div className="flex flex-wrap justify-between gap-3">
                <p className="text-white tracking-light text-[24px] md:text-[32px] font-bold leading-tight min-w-72">
                  Welcome back, Sarah
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 items-center">
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
                  <h2 className="text-white text-base font-bold leading-tight">
                    Create Table
                  </h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 items-center">
                  <div
                    className="text-white"
                    data-icon="Code"
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
                      <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    Create SP
                  </h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 items-center">
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
                  <h2 className="text-white text-base font-bold leading-tight">
                    My Tables
                  </h2>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 items-center">
                  <div
                    className="text-white"
                    data-icon="Code"
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
                      <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-white text-base font-bold leading-tight">
                    My Procedures
                  </h2>
                </div>
              </div>
              <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                Recent Tables
              </h2>
              <div className="@container">
                <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-[#182634]">
                        <th className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          Name
                        </th>
                        <th className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          Description
                        </th>
                        <th className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          Created
                        </th>
                        <th className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-t-[#314d68]">
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                          Users
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-240 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          Stores user information
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-01-15
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-480 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-03-20
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#314d68]">
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                          Products
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-240 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          Stores product details
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-02-10
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-480 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-04-15
                        </td>
                      </tr>
                      <tr className="border-t border-t-[#314d68]">
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                          Orders
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-240 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          Stores order information
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-360 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-03-05
                        </td>
                        <td className="table-4c0a89fc-c6f4-4823-854f-66943afe2ff6-column-480 h-[72px] px-4 py-2 w-[400px] text-[#90adcb] text-sm font-normal leading-normal">
                          2023-05-10
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
   </div>
  )
}

export default Home