"use client";
import Link from "next/link";
import Container from "./ui/container";
import { ModeToggle } from "./themes/theme-toggle";
import { useSpring, animated } from "@react-spring/web";
import Logo from "@/assets/images/Logo";
import { useState } from "react";
import NavLinks from "./ui/custom/dropdown_nav";
import NavLinksRight from "./ui/custom/dropright_nav";
import Avatar from "./ui/custom/avatar";
import { FaGithub } from "react-icons/fa";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

const NavBar = () => {
  const { data: session } = useSession();

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
    <div className="sticky top-0 z-10 border-b px-4 py-3 backdrop-blur supports-[backgrop-filter]:bg-background/60">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="ml-4 flex items-center gap-2 lg:ml-0">
              <Logo />
            </Link>
          </div>

          <NavLinks />

          <div className="flex">
            <NavLinksRight
              activeSection={activeSection}
              handleSectionClick={handleSectionClick}
              springs={springs}
            />
            <ModeToggle />

            {session?.user ? (
              <div className="-mt-1 ml-4">
                <Avatar user={session.user} />
              </div>
            ) : (
              <div className="ml-4">
                <Link href="/profil">
                  <Button variant="outline">
                    <FaGithub className="mr-2" />
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
