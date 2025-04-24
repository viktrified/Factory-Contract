// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./ERC20FromScratch.sol";
import "./ERC721FromScratch.sol";

contract FactoryContract {
    event ERC20Created(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 initialSupply
    );
    event ERC721Created(
        address indexed tokenAddress,
        string name,
        string symbol
    );

    struct TokenDetails {
        string name;
        string symbol;
        address tokenAddress;
        uint totalSupply;
    }

    struct ERC721TokenDetails {
        string name;
        string symbol;
        address tokenAddress;
    }

    mapping(address => TokenDetails[]) public userTokens;
    mapping(address => ERC721TokenDetails[]) public userERC721Tokens;

    uint public contractCount;
    address[] public contractAddress;
    ERC20ForUsers[] erc20Instance;
    ERC721ForUsers[] erc721Instance;

    function createERC20(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) external returns (address) {
        ERC20ForUsers token = new ERC20ForUsers(
            msg.sender,
            name,
            symbol,
            initialSupply
        );

        userTokens[msg.sender].push(
            TokenDetails({
                name: name,
                symbol: symbol,
                tokenAddress: address(token),
                totalSupply: initialSupply
            })
        );

        contractCount++;
        emit ERC20Created(address(token), name, symbol, initialSupply);
        return address(token);
    }

    function createERC721(
        string memory name,
        string memory symbol
    ) external returns (address) {
        ERC721ForUsers token = new ERC721ForUsers(name, symbol, msg.sender);

        userERC721Tokens[msg.sender].push(
            ERC721TokenDetails({
                name: name,
                symbol: symbol,
                tokenAddress: address(token)
            })
        );

        contractCount++;
        emit ERC721Created(address(token), name, symbol);
        return address(token);
    }

    function getTokensByUser(
        address user
    ) public view returns (TokenDetails[] memory) {
        return userTokens[user];
    }

    function getERC721TokensByUser(
        address user
    ) public view returns (ERC721TokenDetails[] memory) {
        return userERC721Tokens[user];
    }
}
