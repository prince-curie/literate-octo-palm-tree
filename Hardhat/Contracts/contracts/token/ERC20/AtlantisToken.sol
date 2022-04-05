// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../ERC20/ERC20.sol";
import "./extensions/ERC20Burnable.sol";

contract Atlantis is ERC20, ERC20Burnable {
    constructor() ERC20("Atlantis", "ATL") {}


    function tokenBurn (uint amount) external {
        _burn(msg.sender, amount);
    }
}