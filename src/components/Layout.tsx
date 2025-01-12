import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";

import Navigator from "./Navigator";
import TokenMarquee from "./TokenMarquee";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* <div className="absolute inset-0 z-[1001] mx-auto min-h-full w-[2px] bg-red-500"></div> */}
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
