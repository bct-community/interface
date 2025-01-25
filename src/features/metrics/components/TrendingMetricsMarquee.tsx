import {
  SiDiscord,
  SiGithub,
  SiSolana,
  SiTelegram,
  SiX,
} from "@icons-pack/react-simple-icons";
import Marquee from "react-fast-marquee";

import {
  discordLogo,
  facebookLogo,
  instagramLogo,
  redditLogo,
  solLogo,
  telegramLogo,
  whatsappLogo,
  xLogo,
  youtubeLogo,
} from "@/assets/logos";

const iconMap: Record<string, JSX.Element> = {
  SiGithub: <SiGithub size={32} />,
  SiDiscord: <SiDiscord size={32} />,
  SiX: <SiX size={32} />,
  SiTelegram: <SiTelegram size={32} />,
  SiSolana: <SiSolana size={32} />,
};

const logoMap: Record<string, JSX.Element> = {
  Discord: (
    <img
      draggable={false}
      src={discordLogo}
      width={32}
      alt="Discord Logo"
      className="select-none"
    />
  ),
  Facebook: (
    <img
      draggable={false}
      src={facebookLogo}
      width={32}
      alt="Facebook Logo"
      className="select-none"
    />
  ),
  Instagram: (
    <img
      draggable={false}
      src={instagramLogo}
      width={32}
      alt="Instagram Logo"
      className="select-none"
    />
  ),
  Reddit: (
    <img
      draggable={false}
      src={redditLogo}
      width={32}
      alt="Reddit Logo"
      className="select-none"
    />
  ),
  Telegram: (
    <img
      draggable={false}
      src={telegramLogo}
      width={32}
      alt="Telegram Logo"
      className="select-none"
    />
  ),
  WhatsApp: (
    <img
      draggable={false}
      src={whatsappLogo}
      width={32}
      alt="WhatsApp Logo"
      className="select-none"
    />
  ),
  X: (
    <img
      draggable={false}
      src={xLogo}
      width={32}
      alt="X Logo"
      className="select-none"
    />
  ),
  YouTube: (
    <img
      draggable={false}
      src={youtubeLogo}
      width={32}
      alt="YouTube Logo"
      className="select-none"
    />
  ),
  Solana: (
    <img
      draggable={false}
      src={solLogo}
      width={32}
      alt="Sol Outline Logo"
      className="select-none"
    />
  ),
};

const TrendingMetricsMarquee = ({
  links,
  raids,
}: {
  links?: { count: number; label: string; icon: string }[];
  raids?: { count: number; date: string; platform: string }[];
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
      </Marquee>
    </div>
  );
};

export default TrendingMetricsMarquee;
