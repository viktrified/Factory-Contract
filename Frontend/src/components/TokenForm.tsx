import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  usePublicClient,
} from "wagmi";
const CONTRACT_ADDRESS = "0x44d8340fE700B4cd490bE190B2565194d02068eb";
import abi from "./abi.json";

type TokenType = "ERC20" | "ERC721";

const RenderCreateTokenForm = () => {
  const { writeContractAsync } = useWriteContract();

  const [selectedTokenType, setSelectedTokenType] =
    useState<TokenType>("ERC20");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  // const [tokenImage, setTokenImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setTokenImage(URL.createObjectURL(file));
  //   }
  // };

  const createToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedTokenType === "ERC20") {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "createERC20",
          args: [tokenName, tokenSymbol, BigInt(tokenSupply)],
        });
      } else {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi,
          functionName: "createERC721",
          args: [tokenName, tokenSymbol],
        });
      }
      alert(
        `Created ${selectedTokenType} Token: ${tokenName} (${tokenSymbol})`
      );
    } catch (error) {
      console.error("Token creation failed", error);
      alert("Token creation failed");
    }
    setLoading(false);
  };
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Token</h2>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            selectedTokenType === "ERC20"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTokenType("ERC20")}
        >
          ERC20 Token
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            selectedTokenType === "ERC721"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTokenType("ERC721")}
        >
          ERC721 NFT Collection
        </button>
      </div>

      <form onSubmit={createToken}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Token Name
            </label>
            <input
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., My Awesome Token"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Token Symbol
            </label>
            <input
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., MAT"
              required
            />
          </div>

          {selectedTokenType === "ERC20" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Supply
              </label>
              <input
                type="text"
                value={tokenSupply}
                onChange={(e) => setTokenSupply(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1000000"
                required
              />
            </div>
          )}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              {selectedTokenType === "ERC20"
                ? "Token Logo"
                : "Collection Image"}
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {tokenImage && (
              <div className="mt-2">
                <img
                  src={tokenImage}
                  alt="Token preview"
                  className="h-20 w-20 object-cover rounded-md"
                />
              </div>
            )}
          </div> */}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Creating..." : `Create ${selectedTokenType} Token`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RenderCreateTokenForm;

