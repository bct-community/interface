import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PromptRecommendation from "./PromptRecommendation";

type InputFormProps = {
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  recommendations: { title: string; content: string }[];
  shouldShowRecommendations: boolean;
};

const InputForm = ({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isLoading,
  recommendations,
  shouldShowRecommendations,
}: InputFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 pb-4 select-none bg-background"
    >
      {shouldShowRecommendations && (
        <div className="flex flex-col flex-1 w-full min-w-0 mb-2 md:flex-row md:space-x-4">
          <div className="flex-1 w-full min-w-0 space-y-2">
            {recommendations.slice(0, 2).map((rec, index) => (
              <PromptRecommendation
                key={index}
                title={rec.title}
                content={rec.content}
                onClick={() => {
                  setInput(rec.content);
                }}
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
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative flex w-full items-center rounded-full shadow-[0_0_10px_rgba(0,0,0,0.075)]">
        <Input
          placeholder="Envie uma mensagem para o ChatBCT"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          className="w-full py-6 text-base leading-normal rounded-full pr-14"
        />
        <div className="absolute flex items-center right-2">
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-full h-9 w-9 bg-primary hover:bg-primary/90"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
