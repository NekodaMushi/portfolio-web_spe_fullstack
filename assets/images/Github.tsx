"use client";
import Image from "next/image";
import React from "react";

interface GithubProps {
  width?: number;
  height?: number;
}

const Github: React.FC<GithubProps> = ({ width = 120, height = 120 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/github.png"
          alt="GITHUB"
          width={width}
          height={height}
          unoptimized={true}
          priority
        />
      </span>
    </div>
  );
};

export default Github;
