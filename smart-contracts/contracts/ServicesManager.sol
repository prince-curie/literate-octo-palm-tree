// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface ServiceInterface {
  // This is an interface to define a NestCoin service
  function getPrice() external returns(uint256);
  function addUser(address account) external;
}

contract AtlantisTokenServiceManager {
   mapping(address => bool) public serviceContracts;
   
   constructor(){}
   
   function isValidService(address service) external returns(bool){
        return serviceContracts[service];
    }
    
    // allows a user to subscribe for a NestCoin service
    function subscribeToService(address account, address service) public {
       // get the price of the service
       require(IERC20(atlantisToken).isValidService(service) == true, "not a valid service");
       uint256 servicePrice = ServiceInterface(service).getPrice();
       IERC20(atlantisToken).transferFrom(account, service, servicePrice);
       ServiceInterface(service).addUser(account);
    }
  
}
