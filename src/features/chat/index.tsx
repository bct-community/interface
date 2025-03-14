"use client";

import React, { useEffect, useRef, useState } from "react";
import { type Socket, io } from "socket.io-client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import env from "@/config";

import { useRegisterChatMessage } from "./api/registerChatMessage";
import { ChatHeader, InputForm, Message, TypingAnimation } from "./components";
import {
  BlockedMessagePayload,
  BotMessage,
  ChatMessage,
  HandleSubmitType,
} from "./types";
import { recommendations } from "./utils/recommendations";

const socket: Socket = io(env.VITE_WS_URL, {
  transports: ["websocket"],
});

const Chat = () => {
  const { mutate: registerChatMessage } = useRegisterChatMessage();

  const isBlockedFromLocalStorage = localStorage.getItem("isBlocked");
  const unblockDate = localStorage.getItem("unblockDate");

  useEffect(() => {
    if (isBlockedFromLocalStorage === "true" && unblockDate) {
      const now = new Date();
      const expirationDate = new Date(unblockDate);

      if (now > expirationDate) {
        localStorage.removeItem("isBlocked");
        localStorage.removeItem("unblockDate");
        localStorage.removeItem("unblockDateFormatted");
        setIsBlocked(false);
      }
    }
  }, []);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(
    isBlockedFromLocalStorage === "true",
  );
  const [rawChatMessages, setRawChatMessages] = useState<ChatMessage[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(rawChatMessages.length);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("🔗 Connected to WebSocket");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    socket.on("bot-message", (message: BotMessage) => {
      addMessage("assistant", message);
      setIsLoading(false);
    });

    socket.on(
      "blocked",
      ({
        message,
        unblockDateFormatted,
        unblockDate,
      }: BlockedMessagePayload) => {
        addMessage("assistant", message);
        setIsLoading(false);

        localStorage.setItem("isBlocked", "true");
        localStorage.setItem("unblockDate", unblockDate);
        localStorage.setItem("unblockDateFormatted", unblockDateFormatted);
        setIsBlocked(true);
      },
    );

    return () => {
      socket.off("bot-message");
      socket.off("blocked");
    };
  }, []);

  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: ChatMessage = {
      id: String(Date.now() + Math.random()),
      role,
      content,
      createdAt: new Date(),
    };

    setRawChatMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChatSubmit: HandleSubmitType = (options?: {
    promptRecommendation?: string;
  }) => {
    const messageToSend = options?.promptRecommendation || input.trim();

    if (!messageToSend || isLoading || isBlocked) return;

    addMessage("user", messageToSend);

    setIsLoading(true);
    setInput("");

    registerChatMessage();
    socket.emit("message", messageToSend);
  };

  useEffect(() => {
    if (
      scrollRef.current &&
      prevMessagesLength.current !== rawChatMessages.length
    ) {
      const scrollArea = scrollRef.current.closest(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollArea) {
        scrollArea.scrollTo({
          top: scrollArea.scrollHeight,
          behavior: "smooth",
        });
      }
      prevMessagesLength.current = rawChatMessages.length;
    }
  }, [rawChatMessages]);

  return (
    <div className="relative mt-[30px] flex h-full max-h-[calc(100vh-30px)] w-full flex-1 flex-col items-center justify-center p-4">
      <Card className="flex h-full min-h-full w-full max-w-[720px] flex-1 flex-col overflow-hidden rounded-2xl border-none shadow-[0_0_45px_rgba(0,0,0,0.15)] duration-200 animate-in slide-in-from-bottom-2">
        <div className="z-1 relative flex h-[50px] min-h-[50px] items-center rounded-t-2xl border-b bg-background dark:border" />

        <ScrollArea className="relative z-0 flex flex-col flex-1 h-full min-h-0 px-4 overflow-auto">
          <div className="flex flex-col justify-between flex-1 h-full mt-4 space-y-6">
            <ChatHeader />

            {rawChatMessages.map((message: ChatMessage) => (
              <Message message={message} key={message.id} />
            ))}

            <div ref={scrollRef} />

            {isLoading &&
              (!rawChatMessages.length ||
                rawChatMessages[rawChatMessages.length - 1].role !==
                  "assistant") && <TypingAnimation />}
          </div>
        </ScrollArea>

        <InputForm
          input={input}
          setInput={setInput}
          handleInputChange={handleInputChange}
          handleSubmit={handleChatSubmit}
          isLoading={isLoading}
          isBlocked={isBlocked}
          recommendations={recommendations}
          shouldShowRecommendations={rawChatMessages.length === 0}
        />
      </Card>
    </div>
  );
};

export default Chat;
