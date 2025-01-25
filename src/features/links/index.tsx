import {
  SiDiscord,
  SiGithub,
  SiSolana,
  SiTelegram,
  SiX,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Alert } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";

import { useLinks } from "./api/getLinks";
import { useRegisterLinkAccess } from "./api/registerLinkAccess";

const iconMap: Record<string, JSX.Element> = {
  SiGithub: <SiGithub size={16} />,
  SiDiscord: <SiDiscord size={16} />,
  SiX: <SiX size={16} />,
  SiTelegram: <SiTelegram size={16} />,
  SiSolana: <SiSolana size={16} />,
};

type ShareButtonProps = {
  linkId: string;
  icon: string;
  platform: string;
  url: string;
};

const ShareButton = ({ linkId, icon, platform, url }: ShareButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { mutate } = useRegisterLinkAccess();

  const openLink = () => {
    mutate(linkId);
    window.open(url, "_blank");
  };

  const copyLink = () => {
    mutate(linkId);

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
          {iconMap[icon]}
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

      <Alert message={alertMessage} />
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

  const { data: links, isFetching } = useLinks();

  const communityLinks =
    links?.filter((link) => link.type === "community-links") || [];

  const tokenLinks =
    links?.filter((link) => link.type === "official-links") || [];

  const { ref, inView } = useInView({ threshold: 0.1 });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="mt-12 flex justify-center">
      <div className="w-full max-w-[700px]">
        <h1 className="select-none text-center text-3xl font-bold">🔗 Links</h1>
        <h2 className="mt-8 select-none text-xl font-bold">🌐 Comunidade</h2>
        {isFetching
          ? Array.from({ length: 3 }).map((_v, i) => <LinkSkeleton key={i} />)
          : communityLinks.map(({ _id, label, url, icon }, index) => (
              <motion.div
                key={_id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ShareButton
                  linkId={_id}
                  platform={label}
                  url={url}
                  icon={icon}
                />
              </motion.div>
            ))}

        <h2 className="mt-8 select-none text-xl font-bold">💰 Token</h2>
        {isFetching
          ? Array.from({ length: 5 }).map((_v, i) => <LinkSkeleton key={i} />)
          : tokenLinks.map(({ _id, label, url, icon }, index) => (
              <motion.div
                key={_id}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{
                  delay: (communityLinks.length + index) * 0.1,
                  duration: 0.5,
                }}
              >
                <ShareButton
                  linkId={_id}
                  platform={label}
                  url={url}
                  icon={icon}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Links;

interface SkeletonProps {
  width: number;
  height?: number;
  borderRadius?: number;
}

const SkeletonButton = ({ width, borderRadius, height }: SkeletonProps) => {
  return (
    <Skeleton
      className="mt-4 rounded-full"
      style={{
        width: `${width}px`,
        borderRadius: `${borderRadius}px`,
        height: `${height}px`,
      }}
    />
  );
};

const SkeletonP: React.FC<SkeletonProps> = ({ width }: SkeletonProps) => {
  return (
    <Skeleton
      className="mt-4 h-[10px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const LinkSkeleton = () => {
  return (
    <div className="mx-2 flex items-center justify-between px-4 py-2">
      <div className="flex grow items-center gap-3">
        <SkeletonButton height={30} width={30} borderRadius={4} />
        <SkeletonP width={50} />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonButton height={30} width={30} borderRadius={4} />
        <SkeletonButton height={34} width={84} borderRadius={4} />
      </div>
    </div>
  );
};
