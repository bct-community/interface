"use client";

import React, { useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChatHeader, InputForm, Message, TypingAnimation } from "./components";
import { ChatBotProps, ChatMessage } from "./types";
import { recommendations } from "./utils/recommendations";

export default function ChatBot({
  onSendMessage,
  onReceiveMessage,
}: ChatBotProps = {}) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rawChatMessages, setRawChatMessages] = useState<ChatMessage[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);

    const newMessage: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    setRawChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: "This is a mock response from the assistant.",
        createdAt: new Date(),
      };

      setRawChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const chatMessages = rawChatMessages.map((message) => ({
    ...message,
    createdAt: message.createdAt || new Date(),
  }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(chatMessages.length);

  useEffect(() => {
    if (
      scrollRef.current &&
      prevMessagesLength.current !== chatMessages.length
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
      prevMessagesLength.current = chatMessages.length;
    }
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSendMessage) {
      onSendMessage(input);
    }

    await handleChatSubmit(e);
  };

  useEffect(() => {
    if (onReceiveMessage && chatMessages.length > 0) {
      const lastMessage = chatMessages[chatMessages.length - 1];
      if (lastMessage.role === "assistant") {
        onReceiveMessage(lastMessage.content);
      }
    }
  }, [chatMessages, onReceiveMessage]);

  return (
    <div className="relative mt-[30px] flex h-full max-h-[calc(100vh-30px)] w-full flex-1 flex-col items-center justify-center p-4">
      <Card className="flex h-full min-h-full w-full max-w-[720px] flex-1 flex-col overflow-hidden rounded-2xl border-none shadow-[0_0_45px_rgba(0,0,0,0.15)] duration-200 animate-in slide-in-from-bottom-2">
        <div className="z-1 relative flex h-[50px] min-h-[50px] items-center rounded-t-2xl border-b bg-background dark:border" />

        <ScrollArea className="relative z-0 flex flex-col flex-1 h-full min-h-0 px-4 overflow-auto">
          <div className="flex flex-col justify-between flex-1 h-full mt-4 space-y-6">
            <ChatHeader />

            {chatMessages.map((message: ChatMessage, _index: number) => (
              <Message message={message} key={message.id} />
            ))}

            <div ref={scrollRef} />

            {true &&
              (!chatMessages.length ||
                chatMessages[chatMessages.length - 1].role !== "assistant") && (
                <TypingAnimation />
              )}
          </div>
        </ScrollArea>

        <InputForm
          input={input}
          setInput={setInput}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          recommendations={recommendations}
          shouldShowRecommendations={chatMessages.length === 0}
        />
      </Card>
    </div>
  );
}
