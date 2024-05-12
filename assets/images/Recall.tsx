"use client";
import Image from "next/image";
import React from "react";

interface RecallProps {
  width?: number;
  height?: number;
}

const Recall: React.FC<RecallProps> = ({ width = 64, height = 64 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/recall.png"
          alt="RECALL"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default Recall;
