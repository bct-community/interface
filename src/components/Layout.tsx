import { Outlet } from "react-router-dom";

import Navigator from "./Navigator";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="w-full min-h-screen XYZ">
      <>
        <Outlet />
        <Footer />
      </>
      <Navigator />
    </div>
  );
};

export default Layout;
