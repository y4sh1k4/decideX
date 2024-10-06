"use client"
import React from 'react';
import Link from 'next/link';
import { useReadContract } from 'wagmi';
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
  const {data}:{data:Proposal[]}= useReadContract({
    abi,
    address: '0x1Cb69b1F1665E070FD645540F84F44804bb76886',
    functionName: 'getAllProposal',
  })
  console.log(data)
  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-white mb-10">
              Caste YOUR vote, earn YOUR rewards!
            </h1>
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