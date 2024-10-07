import React from "react";
import { BackgroundLines } from "./ui/Background";
import Link from "next/link";
export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 mt-[2vw]">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-6xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      Empowering Decisions<br /> Decentralized by Blockchain
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Unlock Collective Wisdom, Earn Rewards, and Shape the Future of Decision-Making.
      </p>
      <Link href="/Vote">
      <button className="p-[3px] relative mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Start Voting
        </div>
      </button>
      </Link>
    </BackgroundLines>
  );
}
