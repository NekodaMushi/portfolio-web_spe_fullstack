import { Carousel } from "@/components/recall/Carousel";
import { Card } from "@/components/ui/card";

// import InfiniteCards from "@/components/recall/InfiniteCards";

import { fetchRecallAll } from "@/app/api/action";

export default async function Recall() {
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
        {/* <InfiniteCards /> */}
      </div>
    </div>
  );
}

// export default function Recall() {
//   return (
//     <div className="flex h-[1000px] flex-col gap-2 overflow-hidden">
//       <Card className="basis-2/7 flex flex-col py-6">
//         <Carousel />
//       </Card>
//       <Card className="basis-5/7 flex flex-col"></Card>
//     </div>
//   );
// }
