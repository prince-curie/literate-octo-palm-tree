// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAtlantisToken is IERC20 {
    function mint(address account, uint256 amount) external; 
}

contract AtlantisDistributor {
    // This is a smart contract for performing the batch distribution of the Atlantis tokens by the admins

    mapping(address=>bool) admins;
    mapping(address => bool) receivers;

    uint256 public totalDistributed = 0;
    uint256 public totalReceivers = 0;

    IAtlantisToken atlantisToken;

    event DistributionComplete(uint256 numberOfReceivers, uint256 amount);

    modifier isAdmin() {
        require(admins[msg.sender] == true, "user must be an `admin`");
        _;
    }

    constructor(address _atlantisToken) {
        atlantisToken = IAtlantisToken(_atlantisToken);
        admins[msg.sender] = true;
    }
    
    // add admin to the list of admins
    function addAdmin(address _newAdmin) external isAdmin {
        require(!isAnAdmin(_newAdmin), "user is already an `admin`");
        admins[_newAdmin] = true;
    }

    // check if address is an admin
    function isAnAdmin(address admin) public view returns (bool){
        return admins[admin];
    }

    // distribute a certain amount of tokens to a list of addresses
    function distributeToken(address[] memory _addresses, uint256[] memory _amounts) public isAdmin {
        require(_addresses.length <= 200, "can not distribute to more than 200 at once");

        uint256 totalAmount;

        for(uint256 i=0; i < _addresses.length; i++) {
            atlantisToken.mint(_addresses[i], _amounts[i]);

            if(receivers[_addresses[i]] != true) {
                totalReceivers = totalReceivers + 1;
                receivers[_addresses[i]] == true;
            }

            totalAmount += _amounts[i];
            totalDistributed = totalDistributed + _amounts[i];
        }

        emit DistributionComplete(_addresses.length, totalAmount);
    }

    // check if an address is a receiver, ie has been distributed tokens from this contract
    function isReceiver(address _receiver) public view returns(bool){
        return receivers[_receiver];
    }
}
