"use client";

import { TypeAnimation } from "react-type-animation";
import { useEffect, useRef, useState } from "react";

import { FaArrowDown } from "react-icons/fa";

import Quiz from "@/assets/images/Quiz";
import transcripts from "@/transcripts.json";

const LoadingQuiz: React.FC = () => {
  const [transcript, setTranscript] = useState<string>(transcripts.transcript);
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
    <div className="m-4 flex min-h-screen p-4">
      <div className="sm:h-96:md flex w-full flex-col sm:flex-row">
        <section className="relative flex basis-2/3">
          <section className="absolute inset-1 p-4">
            <div
              className="transcript-container h-full w-full overflow-auto scrollbar-hidden"
              ref={containerRef}
            >
              {transcript ? (
                <TypeAnimation
                  sequence={[transcript]}
                  wrapper="div"
                  cursor={true}
                  speed={80}
                  className="text-lg font-medium"
                />
              ) : (
                <p className="text-lg font-medium">Waiting for Transcript</p>
              )}
            </div>
          </section>
        </section>
        <section className="relative basis-1/3">
          <section className="absolute inset-0 flex items-center justify-center">
            <FaArrowDown className="arrow-icon animate-pulse text-6xl sm:hidden" />
            <p className="mx-1 animate-pulse md:mx-0">Feeding Quiz</p>
            <FaArrowDown className="arrow-icon animate-pulse text-6xl sm:-rotate-90" />
          </section>
        </section>
        <section className="relative basis-1/3">
          <section className="absolute inset-1/4 h-1/2 w-1/2">
            <div className="flex h-full w-full animate-spring items-center justify-center">
              <Quiz height={120} width={120} />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default LoadingQuiz;
