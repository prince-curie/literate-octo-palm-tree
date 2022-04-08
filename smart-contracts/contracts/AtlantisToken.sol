// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Atlantis is ERC20, Ownable {
    address public distributionContract;
    uint256 public totalMinted;
    mapping(address => bool) public serviceContracts;

    error NotDistributionContractAddress();
    error NotServiceContractAddress();

    event SetDistributionContractAddress(address indexed);
    event SetServiceContractAddress(address indexed);

    modifier onlyDistributionContract() {
        if(msg.sender != distributionContract) {
            revert NotDistributionContractAddress();
        }
        _;
    }

    modifier onlyServiceContracts() {
        if(!serviceContracts[msg.sender]) {
            revert NotServiceContractAddress();
        }
        _;
    } 

    constructor() ERC20("Atlantis", "ALT") {}

    function burn(uint256 _amount) external onlyServiceContracts {
        _burn(msg.sender, _amount);
    }

    function setDistributionContractAddress(address _distributionContract) public onlyOwner {
        distributionContract = _distributionContract;

        emit SetDistributionContractAddress(msg.sender);
    }

    function setServiceContractAddress(address _serviceContract) public onlyOwner {
        serviceContracts[_serviceContract] = true;

        emit SetServiceContractAddress(msg.sender);
    }
    
    function mint(address _account, uint256 _amount) external onlyDistributionContract {
        totalMinted += _amount;

        _mint(_account, _amount);
    }

}
