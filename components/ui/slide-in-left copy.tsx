"use client";
import { useSpring, animated } from "@react-spring/web";

export default function MyComponent() {
  const springs = useSpring({
    from: { x: 0 },
    to: { x: 100 },
  });

  return (
    <animated.div
      style={{
        borderRadius: 8,
        ...springs,
      }}
    >
      <section>
        <h1>Test</h1>
        <div>All your last sessions are stored here</div>
      </section>
      <section>
        <h1>Test</h1>
        <div>All your last sessions are stored here</div>
      </section>
    </animated.div>
  );
}
