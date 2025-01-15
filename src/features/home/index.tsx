import { useEffect } from "react";
import Marquee from "react-fast-marquee";

import { morpheusImg } from "@/assets/images";

import { Chart, MatrixRainingCode } from "./components";

const Home = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-12">
      <MatrixRainingCode />

      <div className="relative min-h-screen w-full">
        <div className="z-1 relative flex min-h-screen w-full items-end justify-center">
          <img
            src={morpheusImg}
            alt=""
            className="w-[850px] select-none"
            draggable={false}
          />
        </div>

        <div className="bg-red h-[30px] border-y-2 border-[var(--coin-pink)] backdrop-blur-md backdrop-filter">
          <Marquee className="bg-red h-[30px]">
            <p className="select-none text-xl font-bold">
              This is your last chance. After this, there is no turning back.
              You take the Bitcoin – the story ends, you wake up in your bed and
              believe whatever you want to believe. You take the $BCT – you stay
              in Wonderland, and I show you how deep the rabbit hole goes.
              Remember, all I'm offering is the truth. Nothing more.
            </p>
          </Marquee>
        </div>
      </div>

      <div className="h-[500px] w-full px-4">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
