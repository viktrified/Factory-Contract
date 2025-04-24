// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./ERC20FromScratch.sol";
import "./ERC721FromScratch.sol";

contract FactoryContractOpCode {
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

    uint public contractCount;
    address[] public contractAddress;
    mapping(address => address[]) public userERC20Tokens;
    mapping(address => address[]) public userERC721Tokens;

    function createERC20(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        bytes32 salt
    ) external returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(ERC20ForUsers).creationCode,
            abi.encode(msg.sender, name, symbol, initialSupply)
        );

        address token;
        assembly {
            token := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        require(token != address(0), "ERC20 deployment failed");

        contractAddress.push(token);
        userERC20Tokens[msg.sender].push(token);
        contractCount++;

        emit ERC20Created(token, name, symbol, initialSupply);
        return token;
    }

    function createERC721(
        string memory name,
        string memory symbol,
        bytes32 salt
    ) external returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(ERC721ForUsers).creationCode,
            abi.encode(name, symbol, msg.sender)
        );

        address token;
        assembly {
            token := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        require(token != address(0), "ERC721 deployment failed");

        contractAddress.push(token);
        userERC721Tokens[msg.sender].push(token);
        contractCount++;

        emit ERC721Created(token, name, symbol);
        return token;
    }

    function getERC20Address(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        bytes32 salt
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(ERC20ForUsers).creationCode,
            abi.encode(msg.sender, name, symbol, initialSupply)
        );

        return address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(bytecode)
        )))));
    }

    function getERC721Address(
        string memory name,
        string memory symbol,
        bytes32 salt
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(ERC721ForUsers).creationCode,
            abi.encode(name, symbol, msg.sender)
        );

        return address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(bytecode)
        )))));
    }

    function getUserERC20Tokens(
        address user
    ) external view returns (address[] memory) {
        return userERC20Tokens[user];
    }

    function getUserERC721Tokens(
        address user
    ) external view returns (address[] memory) {
        return userERC721Tokens[user];
    }
}
