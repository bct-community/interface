import Marquee from "react-fast-marquee";

import { iconMap } from "../utils/iconMap";
import { logoMap } from "../utils/logoMap";

const TrendingMetricsMarquee = ({
  links,
  raids,
  producers,
}: {
  links?: { count: number; label: string; icon: string }[];
  raids?: { count: number; date: string; platform: string }[];
  producers?: {
    creator: string;
    xProfile: string;
    count: number;
    approvedCount: number;
  }[];
}) => {
  return (
    <div className="h-[80px] w-full overflow-hidden">
      <Marquee
        pauseOnHover
        autoFill
        className="h-[80px] select-none overflow-hidden"
        direction="right"
      >
        {raids &&
          raids.map((raid, index) => (
            <div
              key={`raid-${index}`}
              className="flex h-[80px] w-[120px] flex-col items-center justify-between gap-2 p-2"
            >
              <div>{logoMap[raid.platform] || logoMap["Solana"]}</div>
              <span className="text-xs">{raid.count} acessos</span>
            </div>
          ))}

        {links &&
          links.map((link, index) => (
            <div
              key={`link-${index}`}
              className="flex h-[80px] w-[120px] flex-col items-center justify-between gap-2 p-2"
            >
              <div>{iconMap[link.icon] || iconMap["SiSolana"]}</div>
              <span className="text-xs">{link.count} acessos</span>
            </div>
          ))}

        {producers &&
          producers.map((producer, index) => (
            <div
              key={`producer-${index}`}
              className="flex h-[60px] w-[120px] flex-col items-center justify-between gap-1 p-2"
            >
              <p
                className="max-w-[120px] truncate hover:cursor-pointer hover:underline"
                onClick={() => window.open(producer.xProfile, "_blank")}
              >
                {producer.creator}
              </p>
              <span className="text-xs">
                {producer.count} {producer.count === 1 ? "post" : "posts"}
              </span>
            </div>
          ))}
      </Marquee>
    </div>
  );
};

export default TrendingMetricsMarquee;
