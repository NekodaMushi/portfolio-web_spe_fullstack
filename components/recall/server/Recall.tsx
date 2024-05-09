import { Carousel } from "@/components/recall/client/Carousel";
import { Card } from "@/components/ui/card";

import InfiniteCards from "./InfiniteCards";

export default function Recall() {
  return (
    <div
      className="flex flex-col gap-14 overflow-hidden"
      style={{ height: "1000px" }}
    >
      <Card className="flex-1 py-6" style={{ flex: "2" }}>
        <Carousel />
      </Card>

      {/* Bottom Part */}
      <div className="flex-1  py-4" style={{ flex: "3" }}>
        <InfiniteCards />
      </div>
    </div>
  );
}
{
  /* <FuturServerComponent>test</FuturServerComponent>; */
}
{
  /*  */
}
