import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Target, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import { TwitterShareButton, XIcon } from "react-share";

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
    <Card className="w-[40%] card-shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-[32px] select-none w-fit">
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
                <p>Share on X</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed select-none text-sm text-pretty text-justify break-words align-middle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          quasi voluptate veniam vel possimus voluptatem, ipsum architecto aut
          minima blanditiis similique officiis aliquam laudantium adipisci,
          atque culpa, eveniet delectus explicabo?
        </p>

        <div className="w-full mt-8 mb-2">
          <Progress value={progress} max={100} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <Button className="select-none animate-wiggle hover:animate-none">
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
