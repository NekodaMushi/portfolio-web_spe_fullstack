import Link from "next/link";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { ModeToggle } from "./themes/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/assets/images/Logo";

const NavBar = () => {
  return (
    <div className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        {" "}
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0 flex items-center gap-2">
              <Logo />
              {/* <h1 className="text-xl font-bold">NexLearn</h1> */}
            </Link>
          </div>

          <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:block">
            <Button>
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
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6 mr-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-12">
                  <Button>
                    <Link href="/" className="block px-2 py-1 text-lg">
                      Use
                    </Link>
                  </Button>

                  {/* test */}
                  <Button variant="ghost">
                    <Link href="/" className="block px-2 py-1 text-lg">
                      Learn
                    </Link>
                  </Button>
                  <Button variant="ghost">
                    <Link href="/" className="block px-2 py-1 text-lg">
                      Dev
                    </Link>
                  </Button>
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
