// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "./lib/Errors.sol";
import "./lib/Events.sol";

contract ERC20ForUsers {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint public totalSupply;
    address public owner;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowances;

    modifier onlyOwner() {
        require(msg.sender == owner, "You're not the owner!");
        _;
    }

    constructor(
        address _owner,
        string memory _name,
        string memory _symbol,
        uint _totalSupply
    ) {
        owner = _owner;
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * 10 ** decimals;
        balances[owner] = totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(to != address(0), "Invalid recipient");
        if (balances[msg.sender] < value)
            revert Errors.InsufficientBalance(balances[msg.sender], value);

        balances[msg.sender] -= value;
        balances[to] += value;
        emit Events.Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        require(spender != address(0), "Invalid spender");
        if (balances[msg.sender] < value)
            revert Errors.InsufficientBalance(balances[msg.sender], value);

        allowances[msg.sender][spender] = value;
        emit Events.Approval(msg.sender, spender, value);
        return true;
    }

    function allowance(
        address _owner,
        address spender
    ) external view returns (uint256) {
        return allowances[_owner][spender];
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {
        if (balances[from] < value)
            revert Errors.InsufficientBalance(balances[from], value);
        if (allowances[from][msg.sender] < value)
            revert Errors.InsufficientAllowance(
                balances[from],
                allowances[from][msg.sender],
                value
            );

        allowances[from][msg.sender] -= value;
        balances[from] -= value;
        balances[to] += value;

        emit Events.Transfer(from, to, value);
        return true;
    }

    function mint(uint _amount) public onlyOwner {
        totalSupply += _amount;
        balances[owner] += _amount;

        emit Events.Transfer(address(0), owner, _amount);
    }

    function burn(uint _amount) public onlyOwner {
        if (balances[owner] <= _amount)revert Errors.InsufficientBalance(balances[msg.sender], _amount);
        totalSupply -= _amount;
        balances[owner] -= _amount;

        emit Events.Transfer(owner, address(0), _amount);
    }
}
