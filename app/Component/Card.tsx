"use client";
import React from "react";
import { BackgroundGradient } from "@/app/Component/ui/Gradient";
import Image from "next/image";
interface Proposal{
    imgUrl:string[],
    owner:string,
    price:number,
    prompt:string,
    proposalId:number,
    totalVoters:number,
    voters:string[],
    votesCount:number[]
  }
export function BackgroundGradientDemo({ imgUrl, prompt, totalVoters, voters, price}:Proposal) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col items-center gap-3">
        <h2 className=" text-lg text-white mb-2">{prompt}</h2>
        <div className="flex justify-evenly">
                    {imgUrl.map((img,index)=>(
                        <button key={index} className={`p-2 border border-3 border-black`}>
                            <Image src={`https://olive-fashionable-mule-815.mypinata.cloud/ipfs/${img}`} width={200} height={200} key={index} alt="vote these images" className="w-[10rem] h-[8rem]"/>
                        </button>
                    ))}
        </div>
        <div className="flex justify-between w-full mt-5">
            <span className="text-gray-400">Total Votes allowed: {Number(totalVoters)}</span>
            <span className="text-gray-400">Total Voters: {voters.length}</span>
            <span className="text-gray-400">Reward bounty: {Number(price)/10**18}</span>
        </div>
      </BackgroundGradient>
    </div>
  );
}
