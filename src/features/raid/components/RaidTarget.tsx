import { a, useTrail } from "@react-spring/web";
import { Bot, Target } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { TwitterShareButton, XIcon } from "react-share";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const data = {
  platform: "CoinMarketCap",
  url: "https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ/",
  share: "Participe do Raid da $BCT no CoinMarketCap! 🚀🔥 #BCT",
  content: `
## 🚀 Organize-se para o Raid do **BEIÇOLA TOKEN (BCT)** no CoinMarketCap! 🔥

### 📢 O que está acontecendo?  
A **BCT** ainda **não está verificada** no CoinMarketCap! 😱  
Precisamos da sua ajuda para mudar isso. **Vote agora** para que o token seja verificado e ganhe mais visibilidade na comunidade!  

---

### 🌟 Por que votar na BCT?  
- 💎 **Projetos promissores merecem destaque!**  
- 📈 A verificação no CoinMarketCap traz mais confiança e engajamento para o token.  
- 💬 Vamos unir a comunidade da BCT para mostrar nossa força!  

---

### 📲 Como votar?  
1. Acesse o link do token no CoinMarketCap:  
   👉 [BCT/BEIÇOLA TOKEN no CMC](https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ/)  
2. Clique no **joinha** 👍 e ajude a **BCT** a ser reconhecida! 🗳️  

---

### ✊ Vamos juntos!  
Mostre que a **comunidade BEIÇOLA** é forte e apoia o projeto! Compartilhe esta mensagem e convoque seus amigos para o **Raid da BCT no CMC**! 🌐🔥  

---

**🔗 Link direto para votação:**  
👉 [Vote aqui!](https://coinmarketcap.com/dexscan/solana/Cwa4wde1oAbiwDZuEykwiebPr3CbayoMfTbATM4MXxgJ/)  

**🌍 Juntos, somos mais fortes. Vamos fazer a BCT brilhar! 💪**`,
};

const RaidTarget = () => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const totalMillisInDay = endOfDay.getTime() - startOfDay.getTime();
      const currentMillis = now.getTime() - startOfDay.getTime();

      const percentage = (currentMillis / totalMillisInDay) * 100;
      setProgress(percentage);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);

    return () => clearInterval(interval);
  }, []);

  const { url, content, share } = data;

  const elements = [
    <CardHeader className="pb-0" key="header">
      <div className="flex items-center justify-between">
        <CardTitle className="w-fit select-none text-[32px]">
          Daily raid
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TwitterShareButton url={url} title={share} className="w-fit">
                <XIcon size={32} round />
              </TwitterShareButton>
            </TooltipTrigger>
            <TooltipContent>
              <p className="select-none">Compartilhe no X</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardHeader>,
    <CardContent key="content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
        {content}
      </ReactMarkdown>
      <div className="w-full mt-8 mb-2">
        <Progress value={progress} max={100} />
      </div>
    </CardContent>,
    <CardFooter key="footer">
      <div className="flex items-center justify-between w-full">
        <Button
          className="select-none animate-wiggle hover:animate-none"
          onClick={() => window.open(url, "_blank")}
        >
          <Target />
          Raid
        </Button>
        <Button className="select-none">
          <Bot />
          Gerar mensagem IA
        </Button>
      </div>
    </CardFooter>,
  ];

  const trail = useTrail(elements.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 20 },
  });

  return (
    <Card className="card-shadow-sm w-[80%]">
      <a.div className="w-full">
        {trail.map(({ y, ...style }, index) => (
          <a.div
            key={index}
            style={{
              ...style,
              transform: y.to(
                (value) => `translate3d(0, ${value}px, 0) w-full`,
              ),
            }}
          >
            {elements[index]}
          </a.div>
        ))}
      </a.div>
    </Card>
  );
};

export default RaidTarget;
