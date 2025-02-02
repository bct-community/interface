import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const PromptRecommendation = ({
  title,
  content,
  onClick,
}: {
  title: string;
  content: string;
  onClick: () => void;
}) => (
  <div
    className="flex w-full cursor-pointer items-center gap-2 rounded-lg border px-2 py-1.5"
    onClick={onClick}
  >
    <div className="flex-1 w-0 min-w-0 overflow-hidden text-left">
      <h3 className="font-normal truncate">{title}</h3>
      <p className="text-sm font-light truncate text-muted-foreground">
        {content}
      </p>
    </div>

    <Button
      size="icon"
      className="w-6 h-6 ml-auto rounded-full shrink-0 bg-primary"
    >
      <ArrowUp className="w-3 h-3" />
    </Button>
  </div>
);

export default PromptRecommendation;
