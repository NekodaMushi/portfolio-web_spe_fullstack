import { MessagesContext } from "@/app/use/chat/context/messages";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {
  aiTextColor: string;
  userTextColor: string;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  className,
  aiTextColor,
  userTextColor,
  ...props
}) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        " vertical-scroll flex flex-col-reverse gap-3 overflow-y-auto",
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
                  "mx-2 flex max-w-xl flex-col space-y-2 overflow-x-hidden text-xs sm:text-sm lg:text-base",
                  {
                    "order-1 items-end": message.isUserMessage,
                    "order-2 max-w-2xl items-start": !message.isUserMessage,
                  },
                )}
              >
                <p
                  className={cn("rounded-lg px-4 py-2", {
                    [`bg-${userTextColor} text-white`]: message.isUserMessage,
                    [`bg-${aiTextColor} text-gray-900`]: !message.isUserMessage,
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
