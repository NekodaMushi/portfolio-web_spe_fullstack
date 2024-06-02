import { Carousel } from "@/components/recall/client/Carousel";
import { Card } from "@/components/ui/card";
import InfiniteCards from "./InfiniteCards";
import { CarouselData } from "@/types/quiz";

export default function Recall({ data }: { data: CarouselData }) {
  return (
    <div className="flex flex-col ">
      <div className="flex-1 py-6">
        <Carousel />
      </div>

      {/* Bottom Part */}
      <div className="my-4 flex items-center border-t-2 border-solid pt-4">
        <h1 className="ml-8 flex-1 text-center text-3xl font-bold">
          All Completed Quizzes
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <InfiniteCards data={data} />
      </div>
    </div>
  );
}
