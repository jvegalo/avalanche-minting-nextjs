"use client";

import { useWeb3ConnectionContext } from "../context/web3-connection.context";
import { NoCoreWalletError } from "@avalabs/web3-react-core-connector";
import { useState, useCallback } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import contractABI from "../contractABI";

export function Minter() {
  const { connector, useIsActive, useAccount, useProvider } =
    useWeb3ConnectionContext();
  const isActive = useIsActive();
  const activeAccount = useAccount();
  const provider = useProvider();
  const [activationError, setActivationError] = useState();
  // Deploy the contract in the file minting-example.sol using Remix IDE, then you will get the contractAddress
  const contractAddress = "0x4da1ffc30fa7dafbafc72a0dbaee4856093b7b2a";

  const mintNFT = useCallback(async () => {
    if (!isActive || !connector.provider) {
      console.error("Wallet not connected or provider not available!");
      return;
    }

    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI, // You can copy the ABI after you deployed the contract using Remix IDE
        provider.getSigner()
      );
      const transaction = contract.safeMint(activeAccount);
      transaction.then(function (transactionResponse) {
        console.log("NFT minted successfully!", transactionResponse);
      });
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  }, [isActive, connector.provider, provider, activeAccount]);

  if (activationError instanceof NoCoreWalletError) {
    return <p>No Chrome extension found</p>;
  }

  if (!isActive) {
    return (
      <button
        onClick={() => connector.activate().catch((e) => setActivationError(e))}
        className="flex items-center gap-2 bg-black hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded"
      >
        Connect Core
        <Image
          src="/core_owl_white.svg"
          alt="Core Logo"
          width={20}
          height={10}
          priority
        />
      </button>
    );
  }

  return (
    <div>
      <strong>Connected:</strong>
      <br />
      {activeAccount}
      <div>
        <button
          onClick={mintNFT}
          className="mt-2 bg-black hover:bg-zinc-400 text-white font-bold py-2 px-4 rounded"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}
