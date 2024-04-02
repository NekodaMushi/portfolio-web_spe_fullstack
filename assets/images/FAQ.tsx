"use client";
import Image from "next/image";

const FAQ = () => {
  return (
    <div>
      <span>
        <Image
          className="h-10 w-auto"
          src="/images/logos/faq.png"
          alt="FAQ"
          width={120}
          height={120}
          unoptimized={true}
        />
      </span>
    </div>
  );
};

export default FAQ;
