"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head"; // Import the Head component

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Quiz from "@/assets/images/Quiz";
import Chat from "@/assets/images/Chat";
import Recall from "@/assets/images/Recall";
import FAQ from "@/assets/images/FAQ";
import Documentation from "@/assets/images/Documentation";
import Github from "@/assets/images/Github";
import Image from "next/image";

interface FlyoutLinkProps {
  link?: string;
  children: React.ReactNode;
  FlyoutContent: React.FC;
}

const NavLinks = () => {
  return (
    <>
      <Head>
        {/* Preload the Quiz image */}
        <link rel="preload" href="/images/logos/quiz.png" as="image" />
      </Head>
      <nav className="mx-6 hidden items-center space-x-4 sm:flex lg:space-x-6">
        <NavLink FlyoutContent={UseContent}>Use</NavLink>
        <NavLink FlyoutContent={LearnContent}>Learn</NavLink>
        <NavLink FlyoutContent={DevContent}>Dev</NavLink>
      </nav>
    </>
  );
};
export const NavLink = ({ link, children, FlyoutContent }: FlyoutLinkProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative h-fit w-fit"
    >
      <a className="relative ">{children}</a>
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

            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const UseContent = () => {
  return (
    <Card className="w-[448px] flex-col p-2">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link
          href="/use/quiz"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary"
        >
          <div className="basis-1/3">
            <Quiz width={96} height={96} />
          </div>
          <div className="basis-2/3">
            <CardTitle className="p-2 text-left">Quiz</CardTitle>

            <CardContent className="p-2 text-left">
              <p>Main dish: challenge your knowledge</p>
            </CardContent>
          </div>
        </Link>
      </motion.div>
      <div className="mx-auto my-4 w-1/2 border-t" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link
          href="/use/chat"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary"
        >
          <div className="basis-1/3">
            <Image
              src="/images/logos/chat.png"
              alt="CHAT"
              width={96}
              height={96}
              unoptimized={true}
            />
          </div>
          <div className="basis-2/3">
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
        <Link
          href="/learn/recall"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary"
        >
          <div className=" basis-1/3 pl-2 ">
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
      <div className="mx-auto my-4 w-1/2 border-t " />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link
          href="/learn/faq"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary"
        >
          <div className=" basis-1/3 pl-3 ">
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
        <Link
          href="/dev/documentation"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary"
        >
          <div className=" basis-1/3 pl-2 ">
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
      <div className="mx-auto my-4 w-1/2 border-t " />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Link
          href="/"
          className="m-2 flex items-center gap-8 rounded transition duration-300 ease-in-out hover:bg-primary "
        >
          <div className="  -mr-1 ml-1 basis-1/3">
            <Github width={80} height={80} />
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
