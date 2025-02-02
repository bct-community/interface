import { Bot } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

const TypingAnimation = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-start gap-3">
        <Avatar className="flex items-center justify-center w-8 h-8 rounded-md bg-border/60">
          <Bot width={18} height={18} className="text-accent-foreground" />
        </Avatar>
        <div className="relative group">
          <EllipsisAnimation />
        </div>
      </div>
      <div className="mt-1 mb-4 text-xs text-left ml-11 text-muted-foreground">
        ChatBCT · pensando...
      </div>
    </div>
  );
};

const EllipsisAnimation = () => (
  <div className="flex p-4 mr-8 space-x-1 whitespace-pre-wrap rounded-md max-w-auto bg-border/60">
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
  </div>
);

export default TypingAnimation;
