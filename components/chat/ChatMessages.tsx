import { MessagesContext } from "@/app/use/chat/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        "scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col-reverse gap-3 overflow-y-auto",
        className,
      )}
    >
      <div className="flex-1 flex-grow" />
      {inverseMessages.map((message) => {
        return (
          <div className="chat-message" key={`${message.id}-${message.id}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserMessage,
              })}
            >
              <div
                className={cn(
                  "mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden text-sm",
                  {
                    "order-1 items-end": message.isUserMessage,
                    "order-2 items-start": !message.isUserMessage,
                  },
                )}
              >
                <p
                  className={cn("rounded-lg px-4 py-2", {
                    "bg-primary text-white": message.isUserMessage,
                    "bg-gray-200 text-gray-900": !message.isUserMessage,
                  })}
                >
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
