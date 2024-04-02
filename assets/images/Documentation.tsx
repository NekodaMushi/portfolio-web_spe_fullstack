"use client";
import Image from "next/image";

const DOCUMENTATION = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-auto"
          src="/images/logos/documentation.png"
          alt="DOCUMENTATION"
          width={64}
          height={64}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default DOCUMENTATION;
