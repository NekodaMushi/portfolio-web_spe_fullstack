"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Quiz from "@/assets/images/Quiz";
import Chat from "@/assets/images/Chat";
import Recall from "@/assets/images/Recall";
import FAQ from "@/assets/images/FAQ";
import Documentation from "@/assets/images/Documentation";
import Github from "@/assets/images/Github";

interface FlyoutLinkProps {
  link: string;
  children: React.ReactNode;
  FlyoutContent: React.FC;
}

const NavLinks = () => {
  return (
    <nav className="mx-6 hidden items-center space-x-4 md:flex lg:space-x-6  ">
      <NavLink link="Use" FlyoutContent={UseContent}>
        Use
      </NavLink>
      <NavLink link="Learn" FlyoutContent={LearnContent}>
        Learn
      </NavLink>
      <NavLink link="Dev" FlyoutContent={DevContent}>
        Dev
      </NavLink>
    </nav>
  );
};

export const NavLink = ({ link, children, FlyoutContent }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      <a href={`/${link.toLowerCase()}`} className="relative ">
        {children}
      </a>
      <span
        style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
        className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-primary transition-transform duration-300 ease-out"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-14"
            style={{ x: "-50%" }}
          >
            <div className="absolute -top-[35px] left-0 right-0 h-[50px] bg-transparent"></div>
            {/* <div className="absolute left-1/2 bottom-24 h-3 w-3 -translate-x-1/2 -translte-y-1/2 rotate-45 bg-primary"></div> */}
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const UseContent = () => {
  return (
    <Card className=" w-[448px] flex-col p-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link href="/" className="m-2 flex items-center gap-8 ">
          <div className="  basis-1/3 ">
            <Quiz width={96} height={96} />
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">Quiz</CardTitle>

            <CardContent className="p-2 text-left">
              <p>Main dish: challenge your knowledge</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
      <div className="my-4 w-1/2 mx-auto border-t " />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link href="/" className="m-2 flex items-center gap-8 ">
          <div className="  basis-1/3 ">
            <Chat width={96} height={96} />
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">Chat</CardTitle>

            <CardContent className="p-2 text-left">
              <p>Need a teacher? Get AI answers</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
    </Card>
  );
};

export const LearnContent = () => {
  return (
    <Card className=" w-[448px] flex-col p-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link href="/" className="m-2 flex items-center gap-8 ">
          <div className=" pl-2 basis-1/3 ">
            <Recall width={88} height={88} />
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">Recall</CardTitle>

            <CardContent className="p-2 text-left">
              <p>All your last sessions are stored here</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
      <div className="my-4 w-1/2 mx-auto border-t " />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        
        <Link href="/" className="m-2 flex items-center gap-8 ">
          <div className=" pl-3 basis-1/3 ">
            <FAQ width={80} height={80} />
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">FAQ</CardTitle>

            <CardContent className="p-2 text-left">
              <p>You've got questions, here the answers</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
    </Card>
  );
};

export const DevContent = () => {
  return (
    <Card className=" w-[448px]  flex-col p-2">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link href="/" className="m-2 flex items-center gap-8  ">
          <div className=" pl-2 basis-1/3 ">
            <Documentation width={80} height={80} />
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">Documentation</CardTitle>

            <CardContent className="p-2 text-left">
              <p>Everything referenced for builders</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
      <div className="my-4 w-1/2 mx-auto border-t " />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        
        <Link href="/" className="m-2 flex items-center gap-8 ">
          <div className="  ml-1 -mr-1 basis-1/3">
            <Github width={80} height={80}/>
          </div>
          <div className="basis-2/3 ">
            <CardTitle className="p-2 text-left">Github</CardTitle>

            <CardContent className="p-2 text-left">
              <p>NexLearn Project : Repository</p>
            </CardContent>
          </div>
        </Link>
        </motion.div>
      
    </Card>
    
  );
};

export default NavLinks;
