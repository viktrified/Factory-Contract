import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import {
//   useAccount,
//   useReadContract,
//   useWriteContract,
//   useWaitForTransactionReceipt,
//   usePublicClient,
// } from "wagmi";
import RenderCreateTokenForm from "./components/TokenForm";
const CONTRACT_ADDRESS = "0x44d8340fE700B4cd490bE190B2565194d02068eb";
import abi from "./components/abi.json";
import TokenManager from "./components/manageTokens";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const tokens = [
    { id: 1, name: "Ethereum", symbol: "ETH", balance: 3.5 },
    { id: 2, name: "Bitcoin", symbol: "BTC", balance: 0.8 },
    { id: 3, name: "Solana", symbol: "SOL", balance: 50 },
  ];

  // const { writeContractAsync, data: writeData } = useWriteContract();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Token Factory</h1>
            <div>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 ${
              activeTab === "create"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create Token
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "manage"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Tokens
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTab === "create" ? (
            <>
              <div className="md:col-span-2">
                <RenderCreateTokenForm />
              </div>
              <div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Token Factory Guide
                  </h2>
                  <div className="space-y-4 text-sm">
                    <p>
                      <strong>ERC20 Tokens:</strong> Fungible tokens ideal for
                      currencies, rewards, or voting rights.
                    </p>
                    <p>
                      <strong>ERC721 NFTs:</strong> Non-fungible tokens perfect
                      for digital art, collectibles, or certificates.
                    </p>
                    <p>
                      You can set custom names, symbols, and images for your
                      tokens. Once created, you can manage and monitor your
                      tokens.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="md:col-span-2">
                <TokenManager tokens={tokens} />{" "}
              </div>
              <div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Your Token Portfolio
                  </h2>
                  <div className="space-y-4">
                    <p className="text-sm">
                      <strong>Total Tokens:</strong>
                    </p>
                    <p className="text-sm">
                      <strong>ERC20 Tokens:</strong>{" "}
                    </p>
                    <p className="text-sm">
                      <strong>ERC721 Collections:</strong>{" "}
                    </p>
                    <hr />
                    <button
                      onClick={() => setActiveTab("create")}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Create New Token
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
