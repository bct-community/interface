import { Outlet } from "react-router-dom";

import Navigator from "./Navigator";
import Footer from "./Footer";
import TokenMarquee from "./TokenMarquee";

const Layout = () => {
  return (
    <div className="w-full min-h-screen XYZ">
      <TokenMarquee />
      <>
        <Outlet />
        <Footer />
      </>
      <Navigator />
    </div>
  );
};

export default Layout;
