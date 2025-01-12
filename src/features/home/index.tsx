import { useEffect } from "react";

import { morpheusImg } from "@/assets/images";

import { Chart } from "./components";

const Home = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="relative min-h-screen w-full">
        <div className="page-background"></div>
        <div className="relative z-10 flex min-h-screen w-full items-end justify-center">
          <img
            src={morpheusImg}
            alt=""
            className="w-[850px] select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className="h-[500px] w-full px-4">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
