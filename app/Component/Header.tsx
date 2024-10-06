"use client"
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";
export default function Header() {
    const { address } = useAccount();
    return (
      <header className="bg-black backdrop-blur-sm bg-opacity-10 shadow-md border-b-2 border-b-gray-700 fixed top-0 w-[100%] z-40">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
              <Link href="/">
              <Image src="/Images/logo.png" width={150} height={50} alt="logo"/>
              </Link>
            </div>
            {address&&
            <div className="flex text-sm gap-[3rem]">
              <div className=" text-white">
                <Link href="/Vote">Vote</Link>
              </div>
              <div className=" text-white">
                <Link href="/Create">Create</Link>
              </div>
            </div>
            }
            <ConnectKitButton/>
          </nav>
        </div>
      </header>
    )
  }