"use client";
import Image from "next/image";
import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/logo.png"
          alt="LOGO"
          width={width}
          height={height}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default Logo;
