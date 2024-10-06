"use client"
import {abi} from "@/app/utils/abi";
import { useReadContract,useWriteContract } from 'wagmi';
import Image from "next/image";
import { useState } from "react";
const Card=({params}:{params:{id:number}})=>{
    const [imageId,setImageId]=useState<number>();
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
      
    const {data}:{data:Proposal}= useReadContract({
        abi,
        address: '0x1Cb69b1F1665E070FD645540F84F44804bb76886',
        functionName: 'getProposal',
        args:[params.id]
    })
    console.log(data);
    const handleProposalVote=(index:number)=>{
        setImageId(index);
    }
    const { writeContract } = useWriteContract();
    const handleVote=()=>{
        writeContract({ 
            abi,
            address: '0x1Cb69b1F1665E070FD645540F84F44804bb76886',
            functionName: 'castVote',
            args: [
                params.id,
                imageId
            ]
         })
    }
    return(
        <div className="h-screen bg-black flex flex-col gap-5 items-center justify-center mt-12">
                <h1 className="text-3xl font-extrabold text-white">{data?.prompt}</h1>
                <p>Reward:{Number(data?.price/data?.totalVoters)}</p>
                <div className="flex gap-[2rem]">
                    {data?.imgUrl.map((img,index)=>(
                        <button key={index} className={`p-2 border-[0.5vw] bg-black ${imageId==index?" border-purple-500":"border-white"}`} onClick={() => handleProposalVote(index)}>
                            <Image src={`https://olive-fashionable-mule-815.mypinata.cloud/ipfs/${img}`} width={100} height={100} key={index} alt="vote these images" className="w-[15rem]"/>
                        </button>
                    ))}
                </div>
                <button className="p-[3px] relative mt-8" onClick={handleVote}>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                    <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Vote
                    </div>
                </button>
        </div>
    )
}
export default Card;