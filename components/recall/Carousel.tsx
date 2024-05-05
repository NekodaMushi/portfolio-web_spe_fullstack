"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import CustomCard from "./CustomCard";

export function Carousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla w-full overflow-hidden sm:mt-2" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide flex h-full flex-col items-center justify-center">
          <CustomCard
            title="305. Reusing Styles With React Components"
            length={20}
            lastScore={4}
            highestScore={14}
            lastAttempt="2"
            attemptNumber={6}
          />
        </div>
        <div className="embla__slide flex h-full flex-col items-center justify-center">
          <CustomCard
            title="306. Reusing Styles With React Components"
            length={20}
            lastScore={4}
            highestScore={14}
            lastAttempt="2"
            attemptNumber={6}
          />
        </div>
        <div className="embla__slide flex h-full flex-col items-center justify-center">
          <CustomCard
            title="307. Reusing Styles With React Components"
            length={20}
            lastScore={4}
            highestScore={14}
            lastAttempt="2"
            attemptNumber={6}
          />
        </div>
      </div>
    </div>
  );
}
