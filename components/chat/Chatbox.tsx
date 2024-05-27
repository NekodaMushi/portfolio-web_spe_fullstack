"use client";
import React, { useContext, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "@reduxjs/toolkit";
import { Message } from "@/lib/validators/message";
import { MessagesContext } from "@/app/use/chat/context/messages";
import ChatMessages from "./ChatMessages";

interface ChatBoxProps {
  activeFieldset: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ activeFieldset }) => {
  const [input, setInput] = useState<string>("");
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
        body: JSON.stringify({ messages: [message] }),
      });
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
    },
  });

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    e.preventDefault();

    const message: Message = {
      id: nanoid(),
      isUserMessage: true,
      text: input,
    };

    sendMessage(message);
  };

  return (
    <div
      className={`relative flex h-5/6 min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 ${
        activeFieldset === "playground" ? "md:ml-24 lg:ml-40 xl:ml-28" : ""
      }`}
    >
      <Badge variant="outline" className="absolute right-3 top-3">
        Output
      </Badge>
      <ChatMessages />
      <div className="flex-1" />
      <form
        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        x-chunk="dashboard-03-chunk-1"
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
          id="message"
          placeholder="Type your message here..."
          value={input}
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center p-3 pt-0">
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;

{
  /* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip> */
}
