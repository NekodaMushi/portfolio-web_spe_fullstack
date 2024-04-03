"use client";
import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { ModeToggle } from "./themes/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";

import { Ghost, Menu } from "lucide-react";
import Logo from "@/assets/images/Logo";
import { useState } from "react";

import { useSpring, animated } from "@react-spring/web";

import FAQ from "@/assets/images/FAQ";
import Github from "@/assets/images/Github";
import Chat from "@/assets/images/Chat";
import Documentation from "@/assets/images/Documentation";
import Quiz from "@/assets/images/Quiz";
import Recall from "@/assets/images/Recall";
import NavLinks from "./ui/dropdown_nav";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const springs = useSpring({
    from: { x: 200 },
    to: { x: activeSection ? 0 : 100 },
    reset: true,
  });

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="border-b px-4 py-3 sm:flex sm:justify-between">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="ml-4 flex items-center gap-2 lg:ml-0">
              <Logo />
            </Link>
          </div>

          <NavLinks />
          <div className="flex">
            <Sheet
              onOpenChange={(open) => {
                if (!open) {
                  setActiveSection(null);
                }
              }}
            >
              <SheetTrigger>
                <Menu className="mr-4 h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="mt-12 flex flex-col gap-5">
                  <Button
                    variant="ghost"
                    onClick={() => handleSectionClick("use")}
                  >
                    <div className="block px-2 py-1 text-lg">Use</div>
                  </Button>
                  {/* USE */}
                  {activeSection === "use" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/use/quiz">
                          <div className="group relative flex items-center gap-10 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex-shrink-0">
                              <Quiz width={64} height={64} />
                            </div>
                            <div className="z-10">
                              <h1>Quiz</h1>
                              <p className="text-sm lg:text-lg">
                                Main dish: challenge your knowledge
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/use/chat">
                          <div className="group relative flex items-center gap-10 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex-shrink-0">
                              <Chat />
                            </div>
                            <div className="z-10">
                              <h1>Chat</h1>
                              <p className="text-sm lg:text-lg">
                                Need a teacher? Get AI answers
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                    </animated.div>
                  )}

                  <Button
                    onClick={() => handleSectionClick("learn")}
                    variant="ghost"
                  >
                    <div className="block px-2 py-1 text-lg">Learn</div>
                  </Button>
                  {/* LEARN */}
                  {activeSection === "learn" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/learn/recall">
                          <div className="group relative flex items-center gap-6 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex items-center justify-center">
                              <Recall />
                            </div>
                            <div className="z-10">
                              <h1>Recall</h1>
                              <p className="text-sm lg:text-lg">
                                All your last sessions are stored here
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link href="/learn/faq">
                          <div className="group relative flex items-center gap-6 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex items-center justify-center">
                              <FAQ />
                            </div>
                            <div className="z-10">
                              <h1>FAQ</h1>
                              <p className="text-sm lg:text-lg">
                                You've got questions, here the answers
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                    </animated.div>
                  )}
                  <Button
                    onClick={() => handleSectionClick("dev")}
                    variant="ghost"
                  >
                    <div className="block px-2 py-1 text-lg">Dev</div>
                  </Button>
                  {/* DEV */}
                  {activeSection === "dev" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/dev/documentation">
                          <div className="group relative flex items-center gap-10 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex items-center justify-center">
                              <Documentation />
                            </div>
                            <div className="z-10">
                              <h1>Documentation</h1>
                              <p className="text-sm lg:text-lg">
                                Reference for builders
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/">
                          <div className="group relative flex items-center gap-10 p-2">
                            <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                            <div className="z-10 flex items-center justify-center">
                              <Github />
                            </div>
                            <div className="z-10">
                              <h1>Github</h1>
                              <p className="text-sm lg:text-lg">
                                NexLearn Repository
                              </p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                    </animated.div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;

{
  /* <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
            {/* <Button variant="ghost" >
              <Link href="/" className="text-sm font-medium transition-colors">
                Use
              </Link>
            </Button>
            <Button variant="ghost">
              <Link href="/" className="text-sm font-medium transition-colors">
                Learn
              </Link>
            </Button>
            <Button variant="ghost">
              <Link href="/" className="text-sm font-medium transition-colors">
                Dev
              </Link>
            </Button> */
}
//             {/* START */}<div className="inline-block">
//             <NavLink name="Use" FlyoutContent={UseContent}>
//   Use
// </NavLink>
// </div>
// <NavLink name="Learn" FlyoutContent={LearnContent} >
//   Learn
// </NavLink>
// <NavLink name="Dev" FlyoutContent={DevContent}>
//   Dev
// </NavLink>
{
  /* END */
}
//  </nav> */}
