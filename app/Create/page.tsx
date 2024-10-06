"use client"
import Image from 'next/image';
import { useWriteContract } from 'wagmi';
import React, { useState } from 'react';
import {abi} from "../utils/abi"
import { parseEther } from 'viem';
import { PinataSDK } from "pinata-web3";
import { BackgroundGradient } from "@/app/Component/ui/Gradient";
interface FileWithPreview {
    file: File;
    preview: string;
}
const VotePage = () => {
  const [title, setTitle] = useState('');
  const [noOfVotes, setNoOfVotes] = useState(0);
  const [rewards, setRewards] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const[imageHash,setImageHash]= useState<string[]>([])
  const { writeContract } = useWriteContract()
  const pinata = new PinataSDK({
    pinataJwt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMTY3MDQ4Yi1kNWJhLTRjNGYtOTY0NS03NWE4ZmQ1NWQ3YmQiLCJlbWFpbCI6InNha3NoYW1iaHVncmE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI0NWRmMzQ4ZTMzNjk5ZmEzZjM5NSIsInNjb3BlZEtleVNlY3JldCI6IjYzZjk5NWUyYzM3NjE3NmI3Y2JkOWM5NzVhMmFlNzAxYWFiOTBlZTY1MzE5MDkwMjdiNzVkNzZiMDc5MzNjYTMiLCJleHAiOjE3NTg5NTQ0MDF9.rxNO6L5RoS_615dhsNmH5Fxdz-QmiZ0fTapMxsFxd50",
    pinataGateway: "olive-fashionable-mule-815.mypinata.cloud",
  });
  const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    let upload;
    if (event.target.files) {
      Array.from(event.target.files).map(async(file)=>{
        upload = await pinata.upload.file(file)
        console.log(file)
        console.log(upload)
        setImageHash(prev=>[...prev,upload.IpfsHash])
      })
      const filesArray: {file: File,preview: string}[] = Array.from(event.target.files as FileList).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
    }
  };
  const previews= imageHash.map(item=>item)
  console.log(previews)
  console.log(noOfVotes)
  console.log(title)
  console.log(parseEther(rewards))
  const handleSubmit=(e:any)=>{
    e.preventDefault();
    writeContract({ 
      abi,
      address: '0x1Cb69b1F1665E070FD645540F84F44804bb76886',
      functionName: 'createProposal',
      args: [
          previews,
          noOfVotes,
          title
      ],
      value:parseEther(rewards)
   })
  }
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center mt-[6rem]">
        <h1 className="text-3xl font-bold text-center text-white">Create new post</h1>
        <p className='text-lg text-white mb-8'>upload your images and let your community decide for you</p>
        <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 w-[70vw] bg-white dark:bg-zinc-900 flex flex-col items-center gap-3">
        <div className="flex perspective-1000 justify-evenly w-full gap-[4rem]">
          {/* Left side - Uploader */}
          <div className='w-1/2 p-6 shadow-lg transform -rotate-y-10 origin-right border-r-2 border-r-gray-700'>
            <h2 className="text-xl font-semibold mb-4 text-white">Upload</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <div className="mb-4 grid grid-cols-2 gap-2">
                {selectedFiles.map((file, index) => (
                  <Image
                    key={index}
                    src={file.preview}
                    alt={`preview ${index}`}
                    className="object-cover rounded w-[50rem] h-[10rem]"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
              <input
                type="file"
                accept='image/*'
                multiple
                onChange={handleFileChange}
                className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
              />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 shadow-lg transform rotate-y-10 origin-left">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-white rounded-md shadow-sm p-2 text-black"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="noOfVotes" className="block text-sm font-medium text-white">No. of Votes</label>
                <input
                  type="number"
                  id="noOfVotes"
                  value={noOfVotes}
                  onChange={(e) => setNoOfVotes(parseInt(e.target.value))}
                  className="mt-1 block w-full border border-white rounded-md shadow-sm p-2 text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="usdValue" className="block text-sm font-medium text-white">USD Value</label>
                <input
                  type="text"
                  id="usdValue"
                  onChange={(e) => setRewards(e.target.value)}
                  className="mt-1 block w-full border border-white rounded-md shadow-sm p-2 text-black"
                />
              </div>
              <div className="text-center">
              <button className="p-[3px] relative mt-8" type='submit'>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-2  bg-zinc-900 rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                    upload
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default VotePage;