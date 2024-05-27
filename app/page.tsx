// HomePage.tsx
"use client";
import React from "react";
import { jetBrainsMono } from "../fonts";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import LazyImage from "@/components/ui/custom/LazyImage"; // Import LazyImage component

export default function HomePage() {
  return (
    <TracingBeam className="px-6">
      <div className="relative mx-auto max-w-2xl pl-2 pt-4 antialiased">
        {Content.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="mb-4 w-fit rounded-full bg-black px-4 py-1 text-sm text-white">
              {item.badge}
            </h2>

            <p className={twMerge(jetBrainsMono.className, "mb-4 text-3xl")}>
              {item.title}
            </p>

            <div className="prose prose-sm dark:prose-invert space-y-10 text-center text-sm sm:text-lg">
              {item?.image && (
                <LazyImage
                  src={item.image}
                  placeholder={item.placeholder}
                  alt="blog thumbnail"
                  height={1000}
                  width={1000}
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

const Content = [
  {
    title: "Welcome to NexLearn",
    description: (
      <>
        <p>
          The ultimate platform for personalized learning and knowledge
          retention. This innovative project harnesses the power of cutting-edge
          technologies like Next.js, Tailwind CSS, TypeScript, Serverless Neon
          Postgres with Drizzle, and Vercel for seamless deployment.
        </p>
        <p>
          NexLearn is designed to improve the way you learn by adapting to your
          unique needs and preferences. Whether you're a student seeking to
          excel in your studies, a professional looking to upskill, or simply
          someone with a passion for lifelong learning, NexLearn provides a
          tailored experience that maximizes your potential.
        </p>
        <p>
          With our intuitive interface, engaging content, and powerful
          analytics, you'll embark on a transformative learning journey like
          never before.
        </p>
      </>
    ),
    image: "/images/homepage/cyber.png",
    placeholder: "/images/homepage/cyber-small.jpg",
  },
  {
    title: "AI and more...",
    description: (
      <>
        <p>
          By analyzing your interactions and performance, our system dynamically
          curates content and creates personalized learning paths that are
          optimized for your growth.
        </p>
        <p>
          Our advanced spaced repetition algorithms ensure that you retain
          knowledge effectively, with timely reminders and reinforcement quizzes
          that cement your understanding. With NexLearn, you're not just
          consuming information - you're building a solid foundation of
          knowledge that lasts a lifetime.
        </p>
      </>
    ),
    badge: "",
    image: "/images/homepage/space-learning-dark.png",
    placeholder: "/images/homepage/space-learning-dark-small.png",
  },
  {
    title: "Adaptative",
    description: (
      <>
        <p>
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
    placeholder: "/images/homepage/tree-traversal-small.png",
  },
];
