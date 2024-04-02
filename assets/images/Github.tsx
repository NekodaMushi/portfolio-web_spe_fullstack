"use client";
import Image from "next/image";

const Github = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-auto"
          src="/images/logos/github.png"
          alt="GITHUB"
          width={64}
          height={64}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default Github;
