"use client";
import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-auto"
          src="/images/logo.gif"
          alt="NexLearn"
          width={100}
          height={100}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default Logo;
