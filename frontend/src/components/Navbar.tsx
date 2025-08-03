import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({
  isMenu,
  setIsMenu,
}: {
  isMenu: boolean;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const navigate =useNavigate()


  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] px-4 md:px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          SQL Generator
        </h2>
      </div>
      <div className="flex flex-1 justify-end md:gap-8 gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMenu(!isMenu)}
            className="md:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3"
          >
            <AnimatePresence mode="wait">
              {isMenu ? (
                <motion.svg
                  key="close"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="hamburger"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    d="M3 6h18M3 12h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
          <button className="hidden md:flex  max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-white"
              data-icon="Bell"
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
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </div>
          </button>
          <button className="hidden md:flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-white"
              data-icon="Question"
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
                <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          className="size-10 cursor-pointer"
          onClick={() => setProfileMenu((prev: any) => !prev)}
        >
          <img
            className="rounded-full"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWlDDeQFs92kWGKMpf55x14lh5zcletjV85pAwtpXLTfobnn8fHXCBDBbhOwFzr5jgjbhcZv7iCmfI97mlyhYSZbaZ3ZclzZ9nb9n-nn1C96y9hz7_IAUDtpSip-dzXsRbIuqZw81yUHlOem0Llw4FE7P44MHrioz9y5iwShhYK2Qe4viWgS0P0hj3v5bHAGia3-TJyJk3VEnZZGvDEyHvtNhY4mmTXL_ZpgSr80LXMbWFfkBP35PyxRLlPE6bgKo6B140aUBvSsO2"
            alt=""
          />
        </div>
        {profileMenu && (
          <div className="absolute right-10 top-16 z-50 w-44 bg-[#223649] rounded-lg shadow-xl p-3 flex flex-col gap-1 transition-all duration-200 ease-in-out">
            <button className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-white rounded-md hover:bg-[#2e4a60] transition-colors">
              {/* Help Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10c0-2 2-2 2-4s-2-2-2-2-2 0-2 2m0 6h.01M12 16h.01"
                />
              </svg>
              Help
            </button>

            <div className="border-t border-[#2e4a60] my-1" />

            <button onClick={()=>navigate("/login")} className="flex items-center cursor-pointer gap-2 px-3 py-2 text-sm text-white rounded-md hover:bg-[#2e4a60] transition-colors">
              {/* Sign Out Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
