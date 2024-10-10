"use client"
import {abi} from "@/app/utils/abi";
import { useReadContract,useWriteContract } from 'wagmi';
import Image from "next/image";
import { useAccount } from 'wagmi'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
const Card=({params}:{params:{id:number}})=>{
    const [imageId,setImageId]=useState<number>();
    const {chain,address}= useAccount();
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
        address: chain?.name=="Polygon Amoy"?'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c':'0xc0Da0B87D791c41a33531A61eE18ecfdF29E9c78',
        functionName: 'getProposal',
        args:[params.id]
    }) as {data:Proposal}
    console.log(data);


    const handleProposalVote=(index:number)=>{
        setImageId(index);
    }
    const { writeContract ,isSuccess} = useWriteContract();
    const handleVote=()=>{
        if(Number(data?.totalVoters)===data?.voters.length){
            toast.error('Votes Count reached. Thanks for your participation');
        }
        else if(address && data?.voters.includes(address)){
            toast.error("Already Voted")
        }
        else{
            writeContract({ 
                abi,
                address: chain?.name=="Polygon Amoy"?'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c':'0xc0Da0B87D791c41a33531A61eE18ecfdF29E9c78',
                functionName: 'castVote',
                args: [
                    params.id,
                    imageId
                ]
             })
             if(isSuccess){
                toast.success("succesfully voted!!Amount sent to wallet");
             }
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