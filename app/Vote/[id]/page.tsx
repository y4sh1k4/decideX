"use client"
import {abi} from "@/app/utils/abi";
import { useReadContract,useWriteContract } from 'wagmi';
import Image from "next/image";
import { useWatchContractEvent } from 'wagmi'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
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
      
    const {data}= useReadContract({
        abi,
        address: '0x49EEbE34b6ea44C602915C1724ff2845621A3585',
        functionName: 'getProposal',
        args:[params.id]
    }) as {data:Proposal}
    console.log(data);
  useWatchContractEvent({
    address: '0x49EEbE34b6ea44C602915C1724ff2845621A3585',
    abi,
    eventName: 'amountSend',
    onLogs(logs) {
      console.log('Amount send to your wallet ', logs)
    },
  })


    const handleProposalVote=(index:number)=>{
        setImageId(index);
    }
    const { writeContract ,isSuccess} = useWriteContract();
    const handleVote=()=>{
        console.log(data?.totalVoters)
        console.log(`v:${data?.voters.length}`)
        if(Number(data?.totalVoters)===data?.voters.length){
            toast.error('Votes Count reached. Thanks for your participation');
        }
        else{
            writeContract({ 
                abi,
                address: '0x49EEbE34b6ea44C602915C1724ff2845621A3585',
                functionName: 'castVote',
                args: [
                    params.id,
                    imageId
                ]
             })
             console.log(isSuccess)
        }
    }
    const router = useRouter();
    return(
        <div>
        <div className="absolute top-100 mt-12 left-10">
            <span onClick={()=>router.back()} className="hover:underline flex align-center gap-2 justify-center"> <FaArrowLeft className="mt-1"/> Back</span>
        </div>
        <div className="min-h-screen bg-black flex flex-col gap-5 items-center justify-center mt-12">
                <h1 className="text-xl font-bold text-white text-center">{data?.prompt}</h1>
                <p>Reward: {Number(data?.price/data?.totalVoters)/10**18} ETH</p>
                <div className="flex gap-[2rem]">
                    {data?.imgUrl.map((img,index)=>(
                        <button key={index} className={`p-2 border-[0.5vw] bg-black ${imageId==index?" border-purple-500":"border-white"}`} onClick={() => handleProposalVote(index)}>
                            <Image src={`https://olive-fashionable-mule-815.mypinata.cloud/ipfs/${img}`} width={100} height={100} key={index} alt="vote these images" className="w-[15rem] h-[10rem]"/>
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
        </div>
    )
}
export default Card;