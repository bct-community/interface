import classNames from "classnames";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PromptRecommendation from "./PromptRecommendation";

type InputFormProps = {
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (options?: { promptRecommendation?: string }) => void;
  isLoading: boolean;
  isBlocked: boolean;
  recommendations: { title: string; content: string }[];
  shouldShowRecommendations: boolean;
};

const InputForm = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isLoading,
  isBlocked,
  recommendations,
  shouldShowRecommendations,
}: InputFormProps) => {
  const unblockDateFormatted = localStorage.getItem("unblockDateFormatted");

  return (
    <div className="px-4 pb-4 select-none bg-background">
      {shouldShowRecommendations && (
        <div className="flex flex-col flex-1 w-full min-w-0 px-4 mb-2 md:flex-row md:space-x-4">
          <div className="flex-1 w-full min-w-0 space-y-2">
            {recommendations.slice(0, 2).map((rec, index) => (
              <PromptRecommendation
                key={index}
                title={rec.title}
                content={rec.content}
                onClick={() => {
                  setInput(rec.content);
                }}
                handleSubmit={handleSubmit}
                isBlocked={isBlocked}
              />
            ))}
          </div>

          <div className="hidden md:flex md:w-full md:min-w-0 md:flex-1 md:flex-col md:space-y-2">
            {recommendations.slice(2).map((rec, index) => (
              <PromptRecommendation
                key={index}
                title={rec.title}
                content={rec.content}
                onClick={() => {
                  setInput(rec.content);
                }}
                handleSubmit={handleSubmit}
                isBlocked={isBlocked}
              />
            ))}
          </div>
        </div>
      )}

      {isBlocked && (
        <p className="flex gap-1 px-5 pb-1 text-xs text-red-500">
          <span className="hidden md:block">Limite atingido!</span>
          <span>Disponível em {unblockDateFormatted}. ⏳</span>
        </p>
      )}

      <div className="relative flex w-full items-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.075)]">
        <Input
          disabled={isLoading || isBlocked}
          placeholder="Envie uma mensagem para o ChatBCT"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() && !isLoading && !isBlocked) {
              handleSubmit();
            }
          }}
          className="w-full py-6 text-base leading-normal rounded-full pr-14"
        />

        <div
          className={classNames("absolute right-2 flex items-center", {
            "cursor-not-allowed": !input.trim() || isLoading || isBlocked, // ✅ Agora a div controla o cursor
          })}
        >
          <Button
            type="button"
            size="icon"
            disabled={!input.trim() || isLoading}
            onClick={() => handleSubmit()}
            className="rounded-full z-2 h-9 w-9 bg-primary hover:bg-primary/90"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
