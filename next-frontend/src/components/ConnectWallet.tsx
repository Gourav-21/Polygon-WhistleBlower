"use client";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SecretNetworkClient } from "secretjs";
import { secret } from "../store/secret";
import { useRouter } from 'next/navigation'
import { Button } from "./ui/button";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { walletState } from "@/store/walletConnected";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any
  }
}

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useRecoilState(walletState);
  const [userAddress, setUserAddress] = useState("");
  const router = useRouter()

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        setIsConnected(true);
        setUserAddress(await signer.getAddress());
        console.log("Connected", userAddress);

        setIsConnected(true);
      } catch (error) {
        alert("Error connecting to metamask")
        console.error("Error connecting to metamask", error);
        setIsConnected(false);
      }
    } else {
      alert("Please install metamask!");
      setIsConnected(false);
    }
    router.push('/post')
  };

  return (
    <div className="connect-wallet">
      <Button variant="outline" className="text-black" onClick={connectWalletHandler}>
        {isConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </div>
  );
};

export default ConnectWallet;
