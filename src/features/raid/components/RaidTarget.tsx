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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRaidData } from "../api/getRaidData";

const RaidTarget = () => {
  const { data, isFetching } = useRaidData();
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
          onClick={() => window.open(data?.url || "", "_blank")}
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

interface SkeletonProps {
  width: number;
}

const SkeletonBullet: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <div className="flex gap-2 mt-4">
      <span className="flex h-[10px] items-center">•</span>
      <Skeleton
        className="h-[10px] rounded-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const SkeletonH2: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="my-6 h-[16px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const SkeletonH1: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="mt-4 h-[20px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const SkeletonP: React.FC<SkeletonProps> = ({ width }) => {
  return (
    <Skeleton
      className="mt-4 h-[10px] rounded-full"
      style={{ width: `${width}%` }}
    />
  );
};

const RaidSkeleton = () => {
  return (
    <>
      <SkeletonH1 width={85} />
      <SkeletonH2 width={30} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
      <Separator className="my-6 h-[2px] bg-[hsl(var(--primary))]" />
      <SkeletonH2 width={25} />
      <SkeletonBullet width={32} />
      <SkeletonBullet width={23} />
      <SkeletonBullet width={42} />
      <SkeletonBullet width={15} />
      <Separator className="my-6 h-[2px] bg-[hsl(var(--primary))]" />
      <SkeletonH2 width={42} />
      <SkeletonP width={100} />
      <SkeletonP width={100} />
    </>
  );
};
