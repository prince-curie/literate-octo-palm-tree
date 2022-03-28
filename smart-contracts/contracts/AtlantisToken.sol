// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Atlantis is ERC20, Ownable {
    address public distributionContract;

    error NotDistributionContractAddress();

    modifier onlyDistributionContract() {
        if(msg.sender != distributionContract) {
            revert NotDistributionContractAddress();
        }
        _;
    } 

    constructor() ERC20("Atlantis", "ALT") {}

    function burn(address account, uint256 amount) public onlyDistributionContract {
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }

    function setDistributionContractAddress(address _distributionContract) public onlyOwner {
        distributionContract = _distributionContract;
    }
}