"use client"
import {abi} from "@/app/utils/abi";
import { useReadContract} from 'wagmi';
import Image from "next/image";
import {useAccount } from 'wagmi'
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
const Card=({params}:{params:{id:number}})=>{
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
        functionName: 'getProposal',
        args:[params.id]
    }) as {data:Proposal}
    console.log(data);
    const router = useRouter();
    return(
        <div>
        <div className="absolute top-100 mt-12 left-10">
            <span onClick={()=>router.back()} className="hover:underline flex align-center gap-2 justify-center"> <FaArrowLeft className="mt-1"/> Back</span>
        </div>
        <div className="min-h-screen bg-black flex flex-col gap-5 items-center justify-center mt-5">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-4xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                Check Votes
            </h2>
                <div className="flex gap-[4rem]">
                    {data?.imgUrl.map((img,index)=>(
                        <div className="flex flex-col gap-[2rem] items-center justify-center" key={index}>
                            <button key={index} className={`p-2 border-[0.2vw] bg-black`}>
                                <Image src={`https://olive-fashionable-mule-815.mypinata.cloud/ipfs/${img}`} width={200} height={200} key={index} alt="vote these images" className="w-[15rem] h-[10rem]"/>
                            </button>
                            <div className="text-gray-500 text-xl">votes: <span className="text-white">{Number(data?.votesCount[index])}</span> </div>
                        </div>

                    ))}
                </div>
        </div>
        </div>
    )
}
export default Card;