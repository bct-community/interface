import { Outlet } from "react-router-dom";

import Navigator from "./Navigator";
import Footer from "./Footer";
import TokenMarquee from "./TokenMarquee";

const Layout = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className="absolute inset-0 w-[2px] bg-red-500 mx-auto z-[1001] min-h-full"></div>
      <TokenMarquee />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Navigator />
    </div>
  );
};

export default Layout;

