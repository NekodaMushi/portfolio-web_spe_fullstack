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
    <div className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0 flex items-center gap-2">
              <Logo />
            </Link>
          </div>

          <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
            <Button variant="ghost">
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
            </Button>
          </nav>
          <div className="flex">
            <Sheet
              onOpenChange={(open) => {
                if (!open) {
                  setActiveSection(null);
                }
              }}
            >
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6 mr-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-5 mt-12">
                  <Button onClick={() => handleSectionClick("use")}>
                    <div className="block px-2 py-1 text-lg">Use</div>
                  </Button>
                  {activeSection === "use" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/use/quiz">
                          <h1>Quiz</h1>
                          <p>Main dish: challenge your knowledge</p>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/use/chat">
                          <h1>Chat</h1>
                          <p>Need a teacher? Get AI answers</p>
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
                  {activeSection === "learn" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/learn/recall">
                          <h1>Recall</h1>
                          <p>All your last sessions are stored here</p>
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link href="/learn/faq">
                          <h1>FAQ</h1>
                          <p>You’ve got questions, here the answers</p>
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
                  {activeSection === "dev" && (
                    <animated.div style={{ ...springs }}>
                      <SheetClose asChild>
                        <Link href="/dev/documentation">
                          <h1>Documentation</h1>
                          <p>Reference for builders</p>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <a>
                          <h1>Github</h1>
                          <p>NexLearn Repository</p>
                        </a>
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
