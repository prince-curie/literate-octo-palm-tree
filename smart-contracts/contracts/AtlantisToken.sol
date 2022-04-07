// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Atlantis is ERC20, Ownable {
    address public distributionContract;

    error NotDistributionContractAddress(); 

    event SetDistributionContractAddress(address indexed);

    modifier onlyDistributionContract() {
        if(msg.sender != distributionContract) {
            revert NotDistributionContractAddress();
        }
        _;
    } 
    // constructor mints 1 million Atlantis token
    constructor() ERC20("Atlantis", "ALT") {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    // To mint tokens 
    function mint(address _to, uint _amount) public onlyDistributionContract {
        _mint(_to, _amount);
    }

    function burn(address account, uint256 amount) public onlyDistributionContract {
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }

    function setDistributionContractAddress(address _distributionContract) public onlyOwner {
        distributionContract = _distributionContract;

        emit SetDistributionContractAddress(msg.sender);
    }
}