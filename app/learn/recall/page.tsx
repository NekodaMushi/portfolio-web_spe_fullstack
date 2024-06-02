"use client";
import { useEffect, useState } from "react";
import RecallOrQuiz from "@/components/recall/client/RecallOrQuiz";
import Recall from "@/components/recall/server/Recall";
import { CarouselData } from "@/types/quiz";
import fetchCards from "@/components/recall/server/action";
import Spinner from "@/components/ui/spinner";

export default function RecallPage() {
  const [data, setData] = useState<CarouselData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedData = await fetchCards(1);
        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <RecallOrQuiz>
        <Recall data={data} />
      </RecallOrQuiz>
    </div>
  );
}
