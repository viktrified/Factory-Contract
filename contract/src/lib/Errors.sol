// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

library Errors {
    error InsufficientBalance(uint availableBalance, uint requiredFunds);
    error InsufficientAllowance(uint spenderBalance, uint callerAllowance, uint needed);
}