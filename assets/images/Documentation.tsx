"use client";
import Image from "next/image";
import React from "react";

interface DocumentationProps {
  width?: number;
  height?: number;
}

const Documentation: React.FC<DocumentationProps> = ({
  width = 64,
  height = 64,
}) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/documentation.png"
          alt="DOCU"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default Documentation;
