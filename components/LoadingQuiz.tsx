"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef } from "react";

import { Card } from "@/components/ui/card";
import { FaArrowDown } from "react-icons/fa";

import Quiz from "@/assets/images/Quiz";

const LoadingQuiz: React.FC = () => {
  const transcript =
    "For Inter Miami, such fanfare was once unfathomable. Ten months ago, it was a last-place club in American professional soccer's highest tier, valued just above league average at $600 million, with minimal global fame despite being partly owned by David Beckham. Now you have to be under a rock to not know that Lionel Messi plays at Inter Miami, the 61-year-old Mas says. Securing Messi didn't come cheap—even if his Inter Miami salary is far less than the reported $400 million–a-year offer the Argentine star spurned from the Saudi Pro League. Mas says Messi will earn between $50 million and $60 million in guaranteed money annually, with the potential for more through individual revenue sharing deals with Apple and Adidas. Messi also has an option to take ownership in the club, which does not require a buy-in if exercised. But the South Florida-based franchise has already proven the reward was more than worthy of the financial risk";

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const onType = () => {
        container.scrollTop = container.scrollHeight;
      };
      container.addEventListener("DOMSubtreeModified", onType);
      return () => {
        container.removeEventListener("DOMSubtreeModified", onType);
      };
    }
  }, []);

  return (
    <div className="m-4 flex min-h-screen bg-gray-400 p-4">
      <div className="flex h-96 w-full flex-col sm:flex-row">
        <Card className="relative flex basis-2/3">
          <Card className="absolute inset-1 p-4">
            <div
              className="transcript-container scrollbar-hidden h-full w-full overflow-auto"
              ref={containerRef}
            >
              <TypeAnimation
                sequence={[transcript]}
                wrapper="div"
                cursor={true}
                speed={90}
                className="text-lg font-medium "
              />
            </div>
          </Card>
        </Card>
        <Card className="relative basis-1/3">
          <Card className="absolute inset-0 flex items-center justify-center">
            <FaArrowDown className="arrow-icon animate-pulse text-6xl sm:hidden" />
            <p className="mx-1 animate-pulse md:mx-0">Feeding Quiz</p>
            <FaArrowDown className="arrow-icon animate-pulse text-6xl sm:-rotate-90" />
          </Card>
        </Card>
        <Card className="relative basis-2/3">
          <Card className="absolute inset-1/4 h-1/2 w-1/2">
            <div className="animate-spring flex h-full w-full items-center justify-center">
              <Quiz height={120} width={120} />
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default LoadingQuiz;
