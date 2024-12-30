import { coinImg } from "@/assets/images";
import { Player } from "../news/components";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative min-h-screen w-full">
        <div className="page-background"></div>
        <div className="relative flex justify-center items-end min-h-screen flex-col gap-4 z-10 w-[80%]">
          <img
            src={coinImg}
            className="w-[100px] animate-bounce select-none"
            draggable={false}
          />
        </div>
      </div>
      <div className="flex justify-between w-[75%] py-8">
        <Player />
        <Player />
        <Player />
      </div>
    </div>
  );
};

export default Home;
