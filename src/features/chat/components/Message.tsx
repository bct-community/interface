import { Avatar } from "@radix-ui/react-avatar";
import classNames from "classnames";
import { Bot } from "lucide-react";

import { ChatMessage } from "../types";

const Message = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      className={classNames({
        "flex flex-col": true,
        "items-end": message.role === "user",
        "items-start": message.role !== "user",
      })}
    >
      <div
        className={classNames({
          "relative flex": true,
          "justify-end": message.role === "user",
          "items-end justify-start gap-3": message.role !== "user",
        })}
      >
        {message.role !== "user" && (
          <Avatar className="flex items-center justify-center w-8 h-8 rounded-md bg-border/60">
            <Bot width={18} height={18} className="text-accent-foreground" />
          </Avatar>
        )}

        <div className="relative group">
          <div
            className={classNames({
              "max-w-auto whitespace-pre-wrap rounded-md px-2 py-1.5": true,
              "ml-8 rounded-br-none bg-primary text-primary-foreground":
                message.role === "user",
              "font-inter text-md mr-8 rounded-bl-none bg-border/70 font-light":
                message.role !== "user",
            })}
          >
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
