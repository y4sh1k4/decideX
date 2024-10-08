"use client"
import React from 'react';
import Link from 'next/link';
import { useReadContract,useAccount } from 'wagmi';
import {abi} from "@/app/utils/abi";
import { BackgroundGradientDemo } from '../Component/Card';
const VotePage = () => {
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
  const {chain}= useAccount();
  const {data}= useReadContract({
    abi,
    address: chain?.name=="Polygon Amoy"?'0x49EEbE34b6ea44C602915C1724ff2845621A3585':'0x91904E665Cb56a4c3edB067D65a9852d547F8F85',
    functionName: 'getAllProposal',
  }) as {data:Proposal[]}
  console.log(data)
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-4xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Caste a vote, Earn interesting awards
      </h2>
            <div className="space-y-6 flex flex-col gap-4">
            {data && data.map((item) => (
                <Link key={item.proposalId} href={`/Vote/${item.proposalId}`}>
                  <BackgroundGradientDemo key={item.proposalId} {...item}/>
                </Link>
            ))}
            </div>
        </div>
    </div>
  );
};

export default VotePage;