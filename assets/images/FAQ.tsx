"use client";
import Image from "next/image";
import React from "react";

interface FAQProps {
  width?: number;
  height?: number;
}

const FAQ: React.FC<FAQProps> = ({ width = 120, height = 120 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/faq.png"
          alt="FAQ"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default FAQ;
