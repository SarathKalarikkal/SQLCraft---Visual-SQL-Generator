import { NavLink } from "react-router-dom";

const Sidebar = ({isMenu}:{isMenu:boolean}) => {
  return (
    <aside className={`border-r border-[#223649]  md:flex transform transition-transform duration-300 ease-in-out ${isMenu ? "absolute z-10 translate-x-0 opacity-100" : "hidden "}`}>
      <div className="layout-content-container flex flex-col w-80">
        <div className="flex h-full md:min-h-[700px] flex-col justify-between bg-[#101a23] p-4">
          <div className="flex flex-col gap-4">
            {/* <h1 className="text-white text-base font-medium leading-normal">
              SQL Generator
            </h1> */}
            <div className="flex flex-col gap-2">
              <NavLink
                to={"/home"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }
              >
                <div
                  className="text-white"
                  data-icon="House"
                  data-size="24px"
                  data-weight="fill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  Home
                </p>
              </NavLink>
             
              <NavLink to={"/tables"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
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
                <p
                 
                  className="text-white text-sm font-medium leading-normal"
                >
                  Tables
                </p>
              </NavLink>
             
              <NavLink  to={"/storedProcedures"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
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
                <p
                 
                  className="text-white text-sm font-medium leading-normal"
                >
                  Stored Procedures
                </p>
              </NavLink>
              <NavLink to={"/functions"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
                <div
                  className="text-white"
                  data-icon="Function"
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
                    <path d="M208,40a8,8,0,0,1-8,8H170.71a24,24,0,0,0-23.62,19.71L137.59,120H184a8,8,0,0,1,0,16H134.68l-10,55.16A40,40,0,0,1,85.29,224H56a8,8,0,0,1,0-16H85.29a24,24,0,0,0,23.62-19.71l9.5-52.29H72a8,8,0,0,1,0-16h49.32l10-55.16A40,40,0,0,1,170.71,32H200A8,8,0,0,1,208,40Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  Functions
                </p>
              </NavLink>
              <NavLink to={"/triggers"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
                <div
                  className="text-white"
                  data-icon="Scissors"
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
                    <path d="M157.73,113.13A8,8,0,0,1,159.82,102L227.48,55.7a8,8,0,0,1,9,13.21l-67.67,46.3a7.92,7.92,0,0,1-4.51,1.4A8,8,0,0,1,157.73,113.13Zm80.87,85.09a8,8,0,0,1-11.12,2.08L136,137.7,93.49,166.78a36,36,0,1,1-9-13.19L121.83,128,84.44,102.41a35.86,35.86,0,1,1,9-13.19l143,97.87A8,8,0,0,1,238.6,198.22ZM80,180a20,20,0,1,0-5.86,14.14A19.85,19.85,0,0,0,80,180ZM74.14,90.13a20,20,0,1,0-28.28,0A19.85,19.85,0,0,0,74.14,90.13Z"></path>
                  </svg>
                </div>
                <p className="text-white text-sm font-medium leading-normal">
                  Triggers
                </p>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <NavLink to={"/helpandocs"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
              <div
                className="text-white"
                data-icon="Question"
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
                  <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              </div>
              <p className="text-white text-sm font-medium leading-normal">
                Help and docs
              </p>
            </NavLink>
            <NavLink to={"/inviteTeam"} className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive ? "bg-[#223649]" : ""
                  }`
                }>
              <div
                className="text-white"
                data-icon="Plus"
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
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
              </div>
              <p className="text-white text-sm font-medium leading-normal">
                Invite team
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
