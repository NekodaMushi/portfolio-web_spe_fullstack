"use client";
import React, { useContext, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "@reduxjs/toolkit";
import { Message } from "@/lib/validators/message";
import { MessagesContext } from "@/app/use/chat/context/messages";
import ChatMessages from "./ChatMessages";
import { Toaster, toast } from "sonner";

interface ChatBoxProps {
  activeFieldset: string;
  aiTextColor: string;
  userTextColor: string;
  maxTokens: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  activeFieldset,
  aiTextColor,
  userTextColor,
  maxTokens,
}) => {
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const textareaRef = useRef<null | HTMLTextAreaElement>(null);

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ messages: [message], max_tokens: maxTokens }),
      });

      if (!response.ok) {
        throw new Error("User notified through toast");
      }
      return response.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
        console.log(chunkValue);
      }

      // clean up
      setIsMessageUpdating(false);
      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
      setIsLoading(false);
    },
    onError(_, message) {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again");
      removeMessage(message.id);
      textareaRef.current?.focus();
    },
  });

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const message: Message = {
      id: nanoid(),
      isUserMessage: true,
      text: input,
    };

    sendMessage(message);
  };

  return (
    <div
      className={`relative flex h-5/6 min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 max-h-screen${
        activeFieldset === "playground" ? "md:ml-24 lg:ml-40 xl:ml-28" : ""
      }`}
    >
      <ChatMessages aiTextColor={aiTextColor} userTextColor={userTextColor} />
      <div className="flex-1" />
      <form
        className="relative mt-1 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring "
        x-chunk="dashboard-03-chunk-1"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <div className="flex flex-row">
          <Textarea
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            onInput={(e) => {
              const textarea = e.target as HTMLTextAreaElement;
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + "px";
            }}
            id="message"
            placeholder="Type your message here..."
            value={input}
            disabled={isLoading}
            className="vertical-scroll   max-h-96 min-h-36 resize-none overflow-y-auto border-0 p-4 pt-8 shadow-none focus-visible:ring-0"
            style={{ scrollbarColor: `${userTextColor} secondary` }}
          />

          <div className="flex items-center p-4">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <button type="submit" onClick={handleSubmit}>
                <CornerDownLeft className="size-5" />
              </button>
            )}
          </div>
        </div>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ChatBox;
