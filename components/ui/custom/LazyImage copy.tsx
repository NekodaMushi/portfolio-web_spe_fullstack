// LazyImage.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const currentImgRef = imgRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [src]);

  return (
    <Image
      ref={imgRef}
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
