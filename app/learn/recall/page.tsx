import RecallOrQuiz from "@/components/recall/client/RecallOrQuiz";
import Recall from "@/components/recall/server/Recall";
import { CarouselData } from "@/types/quiz";
import fetchCards from "@/components/recall/server/action";

export const dynamic = "force-dynamic";

export default async function RecallPage() {
  let data: CarouselData = [];

  try {
    data = await fetchCards(1);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  return (
    <div>
      <RecallOrQuiz>
        <Recall data={data} />
      </RecallOrQuiz>
    </div>
  );
}
