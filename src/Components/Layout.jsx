import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ mainDiv }) => {
  return (
    <div className="w-full min-h-screen dark:text-white dark:bg-neutral-900">
      <Navbar mainDiv={mainDiv} />
      <Outlet />
    </div>
  );
};

export default Layout;
