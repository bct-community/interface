export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  createdAt: Date;
  isTyping?: boolean;
};

export type ChatBotProps = {
  onSendMessage?: (message: string) => void;
  onReceiveMessage?: (message: string) => void;
};
