"use client";
import Image from "next/image";
import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 80, height = 80 }) => {
  return (
    <div>
      <span>
        <Image
          src="/images/logos/logo.gif"
          alt="LOGO"
          width={width}
          height={height}
          unoptimized={true}
          priority={true}
        />
      </span>
    </div>
  );
};

export default Logo;
