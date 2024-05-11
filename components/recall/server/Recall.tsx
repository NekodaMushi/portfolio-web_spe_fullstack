"use server";
import { Carousel } from "@/components/recall/client/Carousel";
import { Card } from "@/components/ui/card";
import InfiniteCards from "./InfiniteCards";

// import LoadMore from "../client/LoadMore";

export default async function Recall() {
  return (
    <div className="flex flex-col divide-y">
      <div className="flex-1 py-6 ">
        <Carousel />
      </div>

      {/* Bottom Part */}
      <div className="flex-1 overflow-y-auto py-4">
        <InfiniteCards />

        {/* <LoadMore />
        </InfiniteCards> */}
      </div>
    </div>
  );
}
