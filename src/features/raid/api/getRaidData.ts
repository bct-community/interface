import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const RaidDataSchema = z.object({
  date: z.string(),
  platform: z.string(),
  url: z.string(),
  shareMessage: z.string(),
  content: z.string(),
});

export type RaidData = z.infer<typeof RaidDataSchema>;

const getRaidData = async () => {
  try {
    const response = await fetch(`${env.VITE_API_URL}/raid`);

    if (!response.ok) {
      console.error("Erro ao buscar dados:", response.statusText);
      return defaultRaidData;
    }

    const data = await response.json();

    return data as RaidData;
  } catch (error) {
    console.error("Erro ao realizar a requisição:", error);
    return defaultRaidData;
  }
};

export const useRaidData = () =>
  useQuery({
    queryKey: ["raidData"],
    queryFn: getRaidData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

const defaultRaidData: RaidData = {
  date: "14/01/2025",
  platform: "CoinMarketCap",
  url: "https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ",
  shareMessage: "Participe do Raid da $BCT no CoinMarketCap! 🚀🔥 #BCT",
  content:
    "## 🚀 Organize-se para o Raid do **BEIÇOLA TOKEN (BCT)** no CoinMarketCap! 🔥\n\n### 📢 O que está acontecendo?  \nA **BCT** ainda **não está verificada** no CoinMarketCap! 😱  \nPrecisamos da sua ajuda para mudar isso. **Vote agora** para que o token seja verificado e ganhe mais visibilidade na comunidade!  \n\n---\n\n### 🌟 Por que votar na BCT?  \n- 💎 **Projetos promissores merecem destaque!**  \n- 📈 A verificação no CoinMarketCap traz mais confiança e engajamento para o token.  \n- 💬 Vamos unir a comunidade da BCT para mostrar nossa força!  \n\n---\n\n### 📲 Como votar?  \n1. Acesse o link do token no CoinMarketCap:  \n   👉 [BCT/BEIÇOLA TOKEN no CMC](https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ/)  \n2. Clique no **joinha** 👍 e ajude a **BCT** a ser reconhecida! 🗳️  \n\n---\n\n### ✊ Vamos juntos!  \nMostre que a **comunidade BEIÇOLA** é forte e apoia o projeto! Compartilhe esta mensagem e convoque seus amigos para o **Raid da BCT no CMC**! 🌐🔥  \n\n---\n\n**🔗 Link direto para votação:**  \n👉 [Vote aqui!](https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ/)  \n\n**🌍 Juntos, somos mais fortes. Vamos fazer a BCT brilhar! 💪**",
};
