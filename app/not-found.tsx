// NotFoundPage.tsx
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function NotFoundPage() {
  return (
    <>
      <main className="relative grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative z-10 text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="tracking-tightsm:text-5xl mt-4 text-3xl font-bold">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 ">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Go back home
            </Link>
          </div>
        </div>
        <BackgroundBeams className="absolute inset-0" />
      </main>
    </>
  );
}
