import React, { useState } from "react";
import { useReadContract } from "wagmi";
const CONTRACT_ADDRESS = "0x44d8340fE700B4cd490bE190B2565194d02068eb";
import abi from "./abi.json";

// Define the Token type
type Token = {
  id: number;
  name: string;
  symbol: string;
  totalSupply: number;
  type: "ERC20" | "ERC721";
};

// Props for the TokenManager component
interface TokenManagerProps {
  tokens: Token[];
}

const TokenManager: React.FC<TokenManagerProps> = ({ tokens }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {tokens.map((token) => (
          <div key={token.id} className="bg-white shadow rounded-lg p-6 w-full">
            <div className="flex justify-between">
              <div>
                <strong>#:</strong> {token.id}
              </div>
              <div>
                <strong>{token.type}</strong>
              </div>
            </div>

            <div>
              <strong>Name:</strong> {token.name}
            </div>
            <div>
              <strong>Symbol:</strong> {token.symbol}
            </div>
            <div className="flex justify-between">
              <div>
                <strong>Total supply:</strong> {token.totalSupply}
              </div>
              <button className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Mint
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TokenManager;
