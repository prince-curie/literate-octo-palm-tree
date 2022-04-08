// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAtlantisToken is IERC20 {
    function mint(address account, uint256 amount) external; 
}

interface ServiceInterface {
  // This is an interface to define a NestCoin service
  function getPrice() external returns(uint256);
  function addUser(address account) external;
}


contract AtlantisDistributor {
    // Thsi is a smart contract for performing the batch distribution of the Atlantis tokens by the admins

    mapping(address=>bool)admins;
    address[] recievers;

    address public atlantisToken;
    uint256 public totalDistributed = 0;
    uint256 public totalRecievers = 0;

    event DistributionComplete(uint256 numberOfRecievers, uint256 amount);

    modifier isAdmin() {
        require(admins[msg.sender] == true);
        _;
    }

    struct Distribution {
        address admin;
        uint256 time;
        uint256 numRecievers;
        uint256 amountDisbursed;
    }

    Distribution[] distributions;

    constructor(address _atlantisToken) {
        atlantisToken = _atlantisToken;
        admins[msg.sender] = true;
    }
    
    // add admin to the list of admins
    function addAdmin(address newAdmin_) public isAdmin {
        admins[newAdmin_] = true;
    }

    // check if address is an admin
    function isAnAdmin(address admin) public view returns (bool){
        return admins[admin];
    }

    // distribute a certain amount of tokens to a list of addresses
    function distributeToken(address[] memory _addresses, uint256 _amount) public isAdmin {
        require(_addresses.length <= 200, "can not distribute to more than 200 at once");

        for(uint256 i=0; i < _addresses.length; i++) {
            IERC20(atlantisToken).mint(_addresses[i], _amount);
            addReciever(_addresses[i]);
            totalDistributed = totalDistributed + _amount;
            totalRecievers = totalRecievers + 1;
        }
        Distribution memory distribution = Distribution({admin: msg.sender, time: block.timestamp, numRecievers: _addresses.length, amountDisbursed: _addresses.length * _amount});
        distributions.push(distribution);
        emit DistributionComplete(_addresses.length, _amount);
    }
    // add a reciever to the list of recievers if the address is not already in the recievers list
    function addReciever(address reciever) private {
        for (uint256 i=0; i < recievers.length; i++){
            if(reciever == recievers[i]){
                return;
            }
        }
        recievers.push(reciever);
    }

    // check if an address is a reciever, ie has been distributed tokens from this contract
    function isReciever(address reciever) public view returns(bool){
        for (uint256 i=0; i < recievers.length; i++){
            if(reciever == recievers[i]){
                return true;
            }
        }

        return false;
    }

    // Get the balance of an address that was distributed tokens from this distributor
    function balanceOfReciever(address reciever) public view returns(uint256){
        require(isReciever(reciever), "address is not a reciever from this distributor");
        return IERC20(atlantisToken).balanceOf(reciever);
    }

    // allows a user to subscribe for a NestCoin service
    function subscribeToService(address account, address service) public {
       // get the price of the service
       uint256 servicePrice = ServiceInterface(service).getPrice();
       IERC20(atlantisToken).transferFrom(account, service, servicePrice);
       ServiceInterface(service).addUser(account);
    }
}
