"use client"
import {abi} from "@/app/utils/abi";
import { useReadContract, useWriteContract} from 'wagmi';
import Image from "next/image";
import {useAccount } from 'wagmi'
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import toast  from "react-hot-toast";
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
        address: chain?.name=="Polygon Amoy"?'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c':'0x7270AddDAAcCd5F560A1b81140dfDD41cB392302',
        functionName: 'getProposal',
        args:[params.id]
    }) as {data:Proposal}

    
    const handleBalanceCheck=()=>{
        console.log(data?.price)
        console.log(data?.totalVoters)
        console.log(data?.voters.length)
        const balance=Number(data?.price)-(Number(data?.price/data?.totalVoters)*Number(data?.voters.length));
        toast.success(`Balance left: ${balance/10**18} ETH`);
    }
    const { writeContract,isSuccess} = useWriteContract();
    const handleWithdrawBalance=()=>{
        writeContract({ 
            abi,
            address: chain?.name=="Polygon Amoy"?'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c':'0x7270AddDAAcCd5F560A1b81140dfDD41cB392302',
            functionName: 'withdraw',
            args: [params.id]
         })
         if(isSuccess){
            toast.success("Succesfully withdrawn!!");
         }
    }
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
                <div className="flex gap-[2rem]">
                    <button className="p-[2px] relative mt-8" onClick={handleBalanceCheck}>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-3 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Check Balance
                        </div>
                    </button>
                    <button className="p-[2px] relative mt-8" onClick={handleWithdrawBalance}>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-3 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Withdraw
                        </div>
                    </button>
                </div>
        </div>
        </div>
    )
}
export default Card;