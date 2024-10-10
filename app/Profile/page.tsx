"use client"
import React from 'react';
import Link from 'next/link';
import { useReadContract ,useAccount} from 'wagmi';
import {abi} from "@/app/utils/abi";
import { BackgroundGradientDemo } from '../Component/Card';
const VotePage = () => {
    const { address } = useAccount();
    console.log("address",address);
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
    address: chain?.name=="Polygon Amoy"?'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c':'0x7270AddDAAcCd5F560A1b81140dfDD41cB392302',
    functionName: 'getAllProposal',
  }) as {data:Proposal[]}
  console.log(data)
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-4xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Your created Posts
      </h2>
            <div className="space-y-6 flex flex-col gap-4">
            {data && data.map((item) => {
                if(item.owner==address){
                    return(
                        <Link key={item.proposalId} href={`/Profile/${item.proposalId}`}>
                            <BackgroundGradientDemo key={item.proposalId} {...item}/>
                        </Link>
                    )
                }
            })}
            </div>
        </div>
    </div>
  );
};

export default VotePage;