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
                  {/* USE */}
                  {activeSection === "use" && (
  <animated.div style={{ ...springs }}>
    <SheetClose asChild>
      <Link href="/use/quiz">
        <div className="flex items-center p-2 gap-10 hover:bg#[4EC5D9]">
          <div className="flex-shrink-0">
            <Quiz />
          </div>
          <div>
            <h1>Quiz</h1>
            <p className="text-sm lg:text-lg">Main dish: challenge your knowledge</p>
          </div>
        </div>
      </Link>
    </SheetClose>
    <SheetClose asChild>
      <Link href="/use/chat">
        <div className="flex items-center p-2 gap-10 hover:bg#[4EC5D9]">
          <div className="flex-shrink-0">
            <Chat />
          </div>
          <div>
            <h1>Chat</h1>
            <p className="text-sm lg:text-lg">Need a teacher? Get AI answers</p>
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
                        <div className="flex items-center p-2 gap-6 hover:bg#[4EC5D9]">
                            <div className="flex items-center justify-center">
                              <Recall/>
                            </div>
                            <div>
                              <h1>Recall</h1>
                              <p className="text-sm lg:text-lg">All your last sessions are stored here</p>
                            </div>
                          </div>
                         
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link href="/learn/faq">
                        <div className="flex items-center p-2 gap-6 hover:bg#[4EC5D9]">
                            <div className="flex items-center justify-center">
                              <FAQ />
                            </div>
                            <div>
                              <h1>FAQ</h1>
                              <p className="text-sm lg:text-lg">You’ve got questions, here the answers</p>
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
                          <div className="flex items-center p-2 gap-10 hover:bg#[4EC5D9]">
                            <div className="flex items-center justify-center">
                              <Documentation/>
                            </div>
                            <div>
                              <h1>Documentation</h1>
                              <p className="text-sm lg:text-lg">Reference for builders</p>
                            </div>
                          </div>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                      <Link href="/">
                          <div className="flex items-center p-2 gap-10 hover:bg#[4EC5D9]">
                            <div className="flex items-center justify-center">
                              <Github/>
                            </div>
                            <div>
                              <h1>Github</h1>
                              <p className="text-sm lg:text-lg">NexLearn Repository</p>
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
