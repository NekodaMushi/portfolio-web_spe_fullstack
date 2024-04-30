import { Button } from "../ui/button";

type Props = {
  onQuizGenerated: (data: any) => void;
  onSetQuizReady: () => void;
};

export function QuizStart({ onQuizGenerated, onSetQuizReady }: Props) {
  const handleGenerateClick = async () => {
    try {
      const response = await fetch("/api/ai/quiz/generating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onQuizGenerated(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleStartClick = () => {
    onSetQuizReady();
  };

  return (
    <div className="flex h-[40rem] flex-col items-center justify-center">
      <Button onClick={handleGenerateClick}>Generate</Button>
      <Button onClick={handleStartClick}>Start</Button>
    </div>
  );
}
