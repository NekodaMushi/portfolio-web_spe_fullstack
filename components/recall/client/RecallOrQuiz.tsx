"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import RecallQuizLayout from "@/components/recall/client/RecallQuizLayout";

export default function RecallOrQuiz({
  children,
}: {
  children: React.ReactNode;
}) {
  const quizStart = useAppSelector((state) => state.recall.quizStart);

  return (
    <>
      {quizStart ? (
        <RecallQuizLayout />
      ) : (
        children // Server Component
      )}
    </>
  );
}
