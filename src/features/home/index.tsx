import { useEffect } from "react";

import { coinImg } from "@/assets/images";

import { Player } from "../news/components";
import Chart from "./components/Chart";

const Home = () => {
  useEffect(() => {
    document.title = "XYZ Community";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative min-h-screen w-full">
        <div className="page-background"></div>
        <div className="relative z-10 flex min-h-screen w-[80%] flex-col items-end justify-center gap-4">
          <img
            src={coinImg}
            className="w-[100px] animate-bounce select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex w-[75%] justify-between py-8">
        <Player />
        <Player />
        <Player />
      </div>

      <div className="h-[500px] w-full px-4">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
