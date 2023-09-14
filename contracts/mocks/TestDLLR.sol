// SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract TestDLLR is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20('TestDLLR', 'tDLLR') {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        console.log("minting %s to %s", amount, to);
        _mint(to, amount);
    }

    function callBalanceOf(address account) public view virtual returns (uint256) {
        console.log("balanceOf %s", account);
        return balanceOf(account);
    }

}
