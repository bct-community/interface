import {
  SiDiscord,
  SiGithub,
  SiSolana,
  SiTelegram,
  SiX,
} from "@icons-pack/react-simple-icons";
import { a, useTrail } from "@react-spring/web";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ShareButtonProps = {
  icon: JSX.Element;
  platform: string;
  url: string;
};

const AlertMessage = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-1 left-1 transform rounded-md p-4 text-white transition-colors hover:bg-[var(hsl(--muted))]">
      <Alert>
        <AlertTitle className="flex items-center gap-2">
          <Check size={16} /> Link copiado!
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
};

const ShareButton = ({ icon, platform, url }: ShareButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const openLink = () => window.open(url, "_blank");

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setAlertMessage("O link foi copiado para a área de transferência.");

    setTimeout(() => {
      setAlertMessage("");
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="m-2 flex select-none items-center justify-between rounded px-4 py-2 transition-colors hover:bg-[hsl(var(--hover-shade))]">
      <div className="flex items-center gap-3">
        <button
          className="rounded border p-1.5 hover:bg-accent hover:text-accent-foreground"
          onClick={openLink}
        >
          {icon}
        </button>
        <p
          className="text-sm hover:cursor-pointer hover:underline"
          onClick={openLink}
        >
          {platform}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1.5 hover:bg-accent hover:text-accent-foreground"
          onClick={copyLink}
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <button
          className="rounded border p-1.5 px-3 text-sm hover:bg-accent hover:text-accent-foreground"
          onClick={openLink}
        >
          Abrir link
        </button>
      </div>

      <AlertMessage message={alertMessage} />
    </div>
  );
};

const Links = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Links";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  const communityLinks = [
    {
      label: "Twitter",
      url: "https://x.com/BctCommunity",
      icon: <SiX size={16} />,
    },
    {
      label: "GitHub",
      url: "https://github.com/bct-community",
      icon: <SiGithub size={16} />,
    },
    {
      label: "Discord",
      url: "https://discord.gg/uZN7g5pqYS",
      icon: <SiDiscord size={16} />,
    },
  ];

  const tokenLinks = [
    {
      label: "Twitter Oficial",
      url: "https://x.com/bctbeicolatoken",
      icon: <SiX size={16} />,
    },
    {
      label: "Telegram Oficial",
      url: "https://t.me/comunidadeBCT",
      icon: <SiTelegram size={16} />,
    },
    {
      label: "Solscan",
      url: "https://solscan.io/token/8SFpQ1kRbfjbmpnhKzzgd6GA9PZwhiAMQywZh75Dpump",
      icon: <SiSolana size={16} />,
    },
    {
      label: "Rug Check",
      url: "https://rugcheck.xyz/tokens/8SFpQ1kRbfjbmpnhKzzgd6GA9PZwhiAMQywZh75Dpump",
      icon: <SiSolana size={16} />,
    },
    {
      label: "GeckoTerminal",
      url: "https://www.geckoterminal.com/solana/pools/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ",
      icon: <SiSolana size={16} />,
    },
    {
      label: "Como Comprar via Pix",
      url: "https://x.com/bctbeicolatoken/status/1877450259896619134",
      icon: <SiX size={16} />,
    },
    {
      label: "Como Comprar via OKX Wallet",
      url: "https://x.com/OKXBrasil/status/1870234004617658835",
      icon: <SiX size={16} />,
    },
    {
      label: "Como Comprar via Phantom Wallet",
      url: "https://x.com/eunetoleao/status/1869607136898027674",
      icon: <SiX size={16} />,
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.1 });

  const trail = useTrail(communityLinks.length + tokenLinks.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    from: { opacity: 0, y: 20 },
  });

  return (
    <div ref={ref} className="flex justify-center mx-2 mt-12">
      <div className="w-full max-w-[700px]">
        <h1 className="text-3xl font-bold text-center select-none">🔗 Links</h1>
        <h2 className="mt-8 text-xl font-bold select-none">🌐 Comunidade</h2>
        {communityLinks.map(({ label, url, icon }, index) => (
          <a.div
            key={label}
            style={{
              ...trail[index],
              transform: trail[index].y.to((y) => `translate3d(0, ${y}px, 0)`),
            }}
          >
            <ShareButton platform={label} url={url} icon={icon} />
          </a.div>
        ))}

        <h2 className="mt-8 text-xl font-bold select-none">💰 Token</h2>
        {tokenLinks.map(({ label, url, icon }, index) => (
          <a.div
            key={label}
            style={{
              ...trail[communityLinks.length + index],
              transform: trail[communityLinks.length + index].y.to(
                (y) => `translate3d(0, ${y}px, 0)`,
              ),
            }}
          >
            <ShareButton platform={label} url={url} icon={icon} />
          </a.div>
        ))}
      </div>
    </div>
  );
};

export default Links;
