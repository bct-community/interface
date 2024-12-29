import { Outlet } from "react-router-dom";
import Navigator from "./Navigator";

const Layout = () => {
  return (
    <div className="w-full min-h-screen p-2 XYZ">
      <Outlet />
      <Navigator />
    </div>
  );
};

export default Layout;
