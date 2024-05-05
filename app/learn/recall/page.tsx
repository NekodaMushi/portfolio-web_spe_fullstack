import { Carousel } from "@/components/recall/Carousel";
import CustomCard from "@/components/recall/CustomCard";
import { Card } from "@/components/ui/card";
import React from "react";

export default function Recall() {
  return (
    <div className="flex h-screen flex-col gap-2">
      <Card className=" h-2/5 py-6 ">
        <Carousel />
      </Card>
      <Card className="h-3/5" />
    </div>
  );
}
