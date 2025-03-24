interface Token {
  name: string;
  symbol: string;
  type: "ERC20" | "ERC721";
  address: string;
  imageUrl: string;
  holders: { address: string; balance: string }[];
}

interface ERC721Token extends Token {
  ownedTokenIds: number[];
}

interface TokenDetailsProps {
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({
  selectedToken,
  setSelectedToken,
}) => {
  if (!selectedToken) return null;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={selectedToken.imageUrl}
              alt={selectedToken.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedToken.name}
              </h3>
              <p className="text-gray-500">
                {selectedToken.symbol} • {selectedToken.type}
              </p>
              <p className="text-xs text-gray-400">{selectedToken.address}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedToken(null)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-medium text-lg mb-4">Token Holders</h4>
          {selectedToken.holders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedToken.holders.map((holder) => (
                    <tr key={holder.address}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {holder.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {holder.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No holders found.</p>
          )}
        </div>

        {selectedToken.type === "ERC721" && (
          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium text-lg mb-4">Your NFTs</h4>
            {(selectedToken as ERC721Token).ownedTokenIds.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(selectedToken as ERC721Token).ownedTokenIds.map((tokenId) => (
                  <div
                    key={tokenId}
                    className="border rounded-lg overflow-hidden"
                  >
                    <img
                      src={`/api/placeholder/200/200?text=NFT%20%23${tokenId}`}
                      alt={`NFT #${tokenId}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm font-medium">Token #{tokenId}</p>
                      <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                        Set Image
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                You don't own any NFTs from this collection.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenDetails;
