import classNames from "classnames";
import Marquee from "react-fast-marquee";

import { tokenImg } from "@/assets/images";

const CoinImageMarquee = ({ upSideDown }: { upSideDown?: boolean }) => {
  const direction = upSideDown ? "left" : "right";

  return (
    <Marquee
      className={classNames({
        "relative z-0 flex h-[110px] w-full select-none items-center overflow-hidden":
          true,
        "rotate-180": upSideDown,
      })}
      direction={direction}
      autoFill
    >
      <img
        src={tokenImg}
        className="mx-7 w-[100px] translate-y-[50%] transform overflow-hidden transition-transform duration-300 hover:translate-y-[5%]"
        draggable={false}
      />

      <div className="z-1 absolute bottom-0 left-0 h-[3px] w-full translate-y-[200%] bg-[var(--coin-pink)] dark:bg-black"></div>
    </Marquee>
  );
};

export default CoinImageMarquee;
