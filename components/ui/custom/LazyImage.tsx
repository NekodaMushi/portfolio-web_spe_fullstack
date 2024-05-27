// LazyImage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  placeholder: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  placeholder,
  alt,
  width,
  height,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <Image
      src={isLoaded ? src : placeholder}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? "loaded" : "blurred-img"}`}
      loading="lazy"
    />
  );
};

export default LazyImage;
