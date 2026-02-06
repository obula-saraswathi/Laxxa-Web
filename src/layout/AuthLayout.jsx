import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="h-full flex flex-col bg-[#fff7f200] text-slate-950">
      <div className="w-full p-0">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;