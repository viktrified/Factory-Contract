// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library Events {
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}