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
      className={`relative flex h-5/6 max-h-screen min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ${
        activeFieldset === "playground" ? "md:ml-24 lg:ml-40 xl:ml-28" : ""
      }`}
    >
      <ChatMessages
        aiTextColor={aiTextColor}
        userTextColor={userTextColor}
        className="flex-grow overflow-y-auto"
      />
      <form
        className="relative mt-1 flex items-center rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
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
            textarea.style.height = Math.min(textarea.scrollHeight, 384) + "px";
          }}
          id="message"
          placeholder="Type your message here..."
          value={input}
          disabled={isLoading}
          className="vertical-scroll flex-1 resize-none overflow-y-auto border-0 p-4 pt-3 shadow-none focus-visible:ring-0"
          style={{ maxHeight: "24rem" }}
        />
        <div className="flex items-center p-4">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!input.trim()}
            >
              <CornerDownLeft className="size-5" />
            </button>
          )}
        </div>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ChatBox;
