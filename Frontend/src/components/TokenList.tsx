import React from "react";

type ERC20Token = {
  address: string;
  name: string;
  symbol: string;
  type: "ERC20";
  imageUrl: string;
  totalSupply: number;
};

type ERC721Token = {
  address: string;
  name: string;
  symbol: string;
  type: "ERC721";
  imageUrl: string;
  ownedTokenIds: number[];
};

type Token = ERC20Token | ERC721Token;

type TokensListProps = {
  userTokens: Token[];
  setActiveTab: (tab: string) => void;
  selectToken: (token: Token) => void;
};

const TokensList: React.FC<TokensListProps> = ({
  userTokens,
  setActiveTab,
  selectToken,
}) => {
  return userTokens.length === 0 ? (
    <div className="text-center py-10">
      <p className="text-gray-500">You haven't created any tokens yet.</p>
      <button
        onClick={() => setActiveTab("create")}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Create Your First Token
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {userTokens.map((token) => (
        <div
          key={token.address}
          className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => selectToken(token)}
        >
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <img
                src={token.imageUrl}
                alt={token.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {token.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {token.symbol} • {token.type}
                </p>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-500">
                {token.type === "ERC20"
                  ? `Total Supply: ${(token as ERC20Token).totalSupply}`
                  : `Owned NFTs: ${
                      (token as ERC721Token).ownedTokenIds.length
                    }`}
              </p>
              <p className="text-xs text-gray-400 truncate">{token.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokensList;
