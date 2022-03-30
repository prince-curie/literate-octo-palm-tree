// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Atlantis is ERC20, Ownable {
    address public distributorContract;
    uint256 public totalMinted;
    address public serviceContract;

    error NotDistributionContractAddress();
    error NotServiceContractAddress();

    event SetDistributorContractAddress(address indexed admin, address contractAddress);
    event SetServiceContractAddress(address indexed admin, address contractAddress);

    modifier onlyDistributorContract() {
        if(msg.sender != distributorContract) {
            revert NotDistributionContractAddress();
        }
        _;
    }

    modifier onlyServiceContract() {
        if(serviceContract != msg.sender) {
            revert NotServiceContractAddress();
        }
        _;
    } 

    constructor() ERC20("Atlantis", "ALT") {}

    /**
     * @dev Calls the erc-20 burn function to destroy a given amount of token
     */
    function burn(uint256 _amount) external onlyServiceContract {
        _burn(msg.sender, _amount);
    }

    /**
     * @dev Sets the contract address for the distributor contract
     */
    function setDistributorContractAddress(address _distributorContract) public onlyOwner {
        distributorContract = _distributorContract;

        emit SetDistributorContractAddress(msg.sender, _distributorContract);
    }

    /**
     * @dev Sets the contract address for the service manager contract
     */
    function setServiceContractAddress(address _serviceContract) public onlyOwner {
        serviceContract = _serviceContract;

        emit SetServiceContractAddress(msg.sender, _serviceContract);
    }
    
    /**
     * @dev Generates new specified amount of tokens for the specified address
     */
    function mint(address _account, uint256 _amount) external onlyDistributorContract {
        totalMinted += _amount;

        _mint(_account, _amount);
    }
}
