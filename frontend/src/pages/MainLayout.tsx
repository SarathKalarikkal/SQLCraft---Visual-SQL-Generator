import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import {  useState } from "react";

const MainLayout = () => {

const [isMenu, setIsMenu] =useState<boolean>(false)


  return (
    <div
      className=" flex size-full min-h-screen h-screen  flex-col dark:bg-[#101a23]  group/design-root "
      style={{ fontFamily: "Inter, Noto Sans, sans-serif" }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar isMenu={isMenu} setIsMenu={setIsMenu}/>
        <div className="gap-1 md:px-6 flex flex-1 h-[80%]">
          <Sidebar isMenu={isMenu}/>
          {/* This is where routed page components will render */}
          <main className="flex-1 py-6 px-6 md:p-10 overflow-auto ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
