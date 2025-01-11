import { Bot, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { TwitterShareButton, XIcon } from "react-share";

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

const Raid = () => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0); // Início do dia (00:00)
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999); // Fim do dia (23:59)

      const totalMillisInDay = endOfDay.getTime() - startOfDay.getTime();
      const currentMillis = now.getTime() - startOfDay.getTime();

      const percentage = (currentMillis / totalMillisInDay) * 100;
      setProgress(percentage);
    };

    updateProgress(); // Atualiza o progresso imediatamente
    const interval = setInterval(updateProgress, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <Card className="card-shadow-sm w-[40%]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="w-fit select-none text-[32px]">
            Daily raid
          </CardTitle>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <TwitterShareButton
                  url={"https://twitter.com/share?ref_src=twsrc%5Etfw"}
                  title={"title"}
                  className="w-fit"
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
              </TooltipTrigger>
              <TooltipContent>
                <p className="select-none">Share on X</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <p className="select-none text-pretty break-words text-justify align-middle text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          quasi voluptate veniam vel possimus voluptatem, ipsum architecto aut
          minima blanditiis similique officiis aliquam laudantium adipisci,
          atque culpa, eveniet delectus explicabo?
        </p>

        <div className="mb-2 mt-8 w-full">
          <Progress value={progress} max={100} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <Button className="animate-wiggle select-none hover:animate-none">
            <Target />
            Raid
          </Button>

          <Button className="select-none">
            <Bot />
            Generate message
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Raid;
