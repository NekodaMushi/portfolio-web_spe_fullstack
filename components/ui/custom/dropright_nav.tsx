import React from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./../sheet";
import { Button } from "./../button";
import { Menu } from "lucide-react";
import { animated } from "@react-spring/web";
import Link from "next/link";
import Quiz from "@/assets/images/Quiz";
import Chat from "@/assets/images/Chat";
import Recall from "@/assets/images/Recall";
import FAQ from "@/assets/images/FAQ";
import Documentation from "@/assets/images/Documentation";
import Github from "@/assets/images/Github";

interface NavLinksRight_navProps {
  activeSection: string | null;
  handleSectionClick: (sectionId: string) => void;
  springs: any;
}

const NavLinksRight_nav: React.FC<NavLinksRight_navProps> = ({
  activeSection,
  handleSectionClick,
  springs,
}) => {
  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) {
          handleSectionClick("");
        }
      }}
    >
      <SheetTrigger>
        <Menu className="mr-4 h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="mt-12 flex flex-col gap-5">
          <Button variant="ghost" onClick={() => handleSectionClick("use")}>
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
                      <Quiz width={70} height={70} />
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
                      <Chat width={70} height={70} />
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

          <Button onClick={() => handleSectionClick("learn")} variant="ghost">
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
                      <Recall width={100} height={100} />
                    </div>
                    <div className="z-10 ml-5">
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
                      <FAQ width={100} height={100} />
                    </div>
                    <div className="z-10  ml-5">
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
          <Button onClick={() => handleSectionClick("dev")} variant="ghost">
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
                      <Documentation width={120} height={120} />
                    </div>
                    <div className="z-10">
                      <h1>Documentation</h1>
                      <p className="text-sm lg:text-lg">
                        Everything referenced for builders
                      </p>
                    </div>
                  </div>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/">
                  <div className="group relative flex items-center gap-10 p-2 pl-2">
                    <div className="group-hover:delay-400 absolute top-1/2 h-0 w-0.5 -translate-y-1/2 transform rounded-md bg-primary duration-700 group-hover:h-full group-hover:w-full group-hover:transition-[width]"></div>
                    <div className="z-10 flex items-center justify-center md:max-lg:ml-3">
                      <Github width={70} height={70} />
                    </div>
                    <div className="z-10">
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
  );
};

export default NavLinksRight_nav;
