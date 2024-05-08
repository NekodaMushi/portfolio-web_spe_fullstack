import { Carousel } from "@/components/recall/Carousel";
import { Card } from "@/components/ui/card";

// import InfiniteCards from "@/components/recall/InfiniteCards";

import { fetchRecallAll } from "@/app/api/action";
import FuturServerComponent from "./FuturServerComponent";

export default function Recall() {
  return (
    <div
      className="flex flex-col gap-2 overflow-hidden"
      style={{ height: "1000px" }}
    >
      <Card className="flex-1 py-6" style={{ flex: "2" }}>
        <Carousel />
      </Card>

      {/* Bottom Part */}
      <div
        className="vertical-scroll flex-1 overflow-y-scroll"
        style={{ flex: "3" }}
      >
        {/* <FuturServerComponent>test</FuturServerComponent> */}
        {/* <InfiniteCards /> */}
      </div>
    </div>
  );
}
