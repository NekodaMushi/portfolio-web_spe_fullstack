"use server";
import RecallOrQuiz from "@/components/recall/client/RecallOrQuiz";
import Recall from "@/components/recall/server/Recall";

export default async function RecallServerComponent() {
  return (
    <RecallOrQuiz>
      <Recall />
    </RecallOrQuiz>
  );
}
