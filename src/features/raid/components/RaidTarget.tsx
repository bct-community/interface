import { motion } from "framer-motion";
import { Bot, Check, Copy, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { TwitterShareButton, XIcon } from "react-share";
import remarkGfm from "remark-gfm";

import { Alert } from "@/components";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRaidData } from "../api/getRaidData";
import { useRegisterChatMessageInRaid } from "../api/registerChatMessageInRaid";
import { useRegisterRaidAccess } from "../api/registerRaidAccess";
import RaidSkeleton from "./RaidSkeleton";

const RaidTarget = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { mutate: registerRaidAccess } = useRegisterRaidAccess();
  const { mutate: registerChatMessageInRaid } = useRegisterChatMessageInRaid();

  const { data, isFetching } = useRaidData();
  const [progress, setProgress] = useState(20);
  const [isCopied, setIsCopied] = useState(false);
  const [botMessage, _setBotMessage] = useState("Participio do raid diário!");
  const [alertMessage, setAlertMessage] = useState("");

  const openLink = () => {
    registerRaidAccess();
    window.open(data?.url || "", "_blank");
  };

  const generateAiMessage = () => {
    // limit: 1 per user in a day
    registerChatMessageInRaid();
  };

  const copyAiMessage = () => {
    navigator.clipboard.writeText(botMessage);

    setIsCopied(true);
    setAlertMessage("A mensagem foi copiada para a área de transferência.");
    setTimeout(() => {
      setIsCopied(false);
      setAlertMessage("");
    }, 3000);
  };

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

  const elements = [
    <CardHeader className="pb-0" key="header">
      <div className="flex items-center justify-between">
        <CardTitle className="w-fit select-none text-[32px]">
          Daily raid
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TwitterShareButton
                url={data?.url || ""}
                title={data?.shareMessage || ""}
                className="w-fit"
              >
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
      {isFetching ? (
        <RaidSkeleton />
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
          {data?.content || ""}
        </ReactMarkdown>
      )}

      <div className="w-full mt-8 mb-2">
        <Progress value={progress} max={100} />
      </div>
    </CardContent>,
    <CardFooter key="footer">
      <div className="flex items-center justify-between w-full">
        <Button
          className="select-none animate-wiggle hover:animate-none"
          onClick={openLink}
        >
          <Target />
          Raid
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={generateAiMessage}>
              <Bot />
              Gerar mensagem IA
            </Button>
          </SheetTrigger>
          <SheetContent className="space-between mt-[30px] flex h-full w-[400px] flex-col sm:w-[540px]">
            <div className="flex flex-col justify-between w-full h-full pb-4">
              <SheetHeader>
                <SheetTitle className="select-none">Mensagem gerada</SheetTitle>
                <SheetDescription>{botMessage}</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button className="w-full select-none" onClick={copyAiMessage}>
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  Copiar mensagem
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </CardFooter>,
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="card-shadow-sm w-full lg:w-[80%]" ref={ref}>
      <motion.div
        className="w-full"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        {elements.map((element, index) => (
          <motion.div key={index} variants={item}>
            {element}
          </motion.div>
        ))}
      </motion.div>
      <Alert message={alertMessage} title="Copiada!" />
    </Card>
  );
};

export default RaidTarget;
