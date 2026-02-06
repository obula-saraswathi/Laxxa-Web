// import Footer from "@/components/layout/Footer";
// import Navbar from "@/components/layout/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    // <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
    //bg-[#fff2e5]
    <div className="min-h-screen flex flex-col bg-[#FFF7F2] text-slate-950">
      {/* <Navbar /> */}
      {/* <main className="flex-1 w-full max-w-[1350px] mx-auto px-4 py-6"> */}
      <main className="flex-1 w-full mx-auto px-2 md:px-3 py-2 md:py-3">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;