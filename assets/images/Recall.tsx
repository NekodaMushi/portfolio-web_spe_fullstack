"use client";
import Image from "next/image";

const RECALL = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-auto"
          src="/images/logos/recall.png"
          alt="RECALL"
          width={120}
          height={120}
          objectFit="cover"
          objectPosition="center"
        />
      </span>
    </div>
  );
};

export default RECALL;
