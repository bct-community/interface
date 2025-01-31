import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Alert } from "@/components";
import { iconMap } from "@/utils/iconMap";

import { useRegisterLinkAccess } from "../api/registerLinkAccess";

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
      <button
        className="rounded border p-1.5 hover:bg-accent hover:text-accent-foreground"
        onClick={openLink}
      >
        {iconMap[icon](16)}
      </button>

      <p
        className="pl-2 overflow-hidden text-sm truncate shrink grow text-ellipsis whitespace-nowrap hover:cursor-pointer hover:underline"
        onClick={openLink}
      >
        {platform}
      </p>

      <div className="flex items-center gap-2 shrink-0">
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

      <Alert message={alertMessage} title={"Copiado!"} />
    </div>
  );
};

export default ShareButton;
