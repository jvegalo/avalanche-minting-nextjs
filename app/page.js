"use client";

import { Minter } from "./components/minter";
import { Web3ConnectionContextProvider } from "./context/web3-connection.context";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Web3ConnectionContextProvider>
          <Minter />
        </Web3ConnectionContextProvider>
      </div>
    </main>
  );
}
