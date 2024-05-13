"use client";
import React from "react";

import { jetBrainsMono } from "../fonts";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function HomePage() {
  return (
    <TracingBeam className="px-6">
      <div className="relative mx-auto max-w-2xl pt-4 antialiased">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="mb-4 w-fit rounded-full bg-black px-4 py-1 text-sm text-white">
              {item.badge}
            </h2>

            <p className={twMerge(jetBrainsMono.className, "mb-4 text-3xl")}>
              {item.title}
            </p>

            <div className="prose  prose-sm dark:prose-invert text-sm">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="mb-10 rounded-lg object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "Welcome to NexLearn",
    description: (
      <>
        <p className="sm:text-lg">
          The ultimate platform for personalized learning and knowledge
          retention. Our innovative project harnesses the power of cutting-edge
          technologies like Next.js, Tailwind CSS, TypeScript, Serverless Neon
          Postgres with Drizzle, and Vercel for seamless deployment.
        </p>
        <p className="sm:text-lg">
          NexLearn is designed to revolutionize the way you learn by adapting to
          your unique needs and preferences. Whether you're a student seeking to
          excel in your studies, a professional looking to upskill, or simply
          someone with a passion for lifelong learning, NexLearn provides a
          tailored experience that maximizes your potential.
        </p>
        <p className="sm:text-lg">
          With our intuitive interface, engaging content, and powerful
          analytics, you'll embark on a transformative learning journey like
          never before.
        </p>
      </>
    ),
    image: "/images/homepage/cyber1.png",
  },
  {
    title: "AI and more...",
    description: (
      <>
        <p className="sm:text-lg">
          At the heart of NexLearn lies a sophisticated AI-powered
          recommendation engine that understands your strengths, weaknesses, and
          learning style. By analyzing your interactions, performance, and
          feedback, our system dynamically curates content and creates
          personalized learning paths that are optimized for your growth.
        </p>
        <p className="sm:text-lg">
          Our advanced spaced repetition algorithms ensure that you retain
          knowledge effectively, with timely reminders and reinforcement
          exercises that cement your understanding. With NexLearn, you're not
          just consuming information - you're building a solid foundation of
          knowledge that lasts a lifetime.
        </p>
      </>
    ),
    badge: "",
    image: "/images/homepage/space-learning-dark.png",
  },
  {
    title: "Adaptative",
    description: (
      <>
        <p className="sm:text-lg">
          Whether you prefer to learn on your desktop, tablet, or smartphone,
          our responsive design adapts to your needs. With serverless Neon
          Postgres and Drizzle, we ensure lightning-fast performance and
          reliable data management, while Vercel enables effortless deployment
          and scaling..
        </p>
      </>
    ),
    badge: "",
    image: "/images/homepage/tree-traversal.png",
  },
];
