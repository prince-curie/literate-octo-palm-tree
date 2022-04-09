// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IAtlantisToken is IERC20 {
    function mint(address account, uint256 amount) external; 
}

/**
 * @dev This is a smart contract for performing the batch distribution 
 * of the Atlantis tokens by the admins
 */

contract AtlantisDistributor {
    mapping(address => bool) public admins;
    mapping(address => bool) receivers;
    
    struct SuggestAdminData {
        uint8 votes;
        mapping(address => bool) voters;
    }
    mapping(address => SuggestAdminData) public suggestNewAdmins;
    mapping(address => SuggestAdminData) public suggestAdminsRemoval;

    uint256 public totalDistributed = 0;
    uint256 public totalReceivers = 0;
    uint8 private constant maxNoOfAdmins = 5;
    uint8 private constant maxAdminVote = 3;
    uint8 public noOfAdmins;

    IAtlantisToken atlantisToken;

    event Distribution(uint256 numberOfReceivers, uint256 amount, uint256 time, address admin);
    event AddAdmin(address indexed admin, address newAdmin);
    event RemoveAdmin(address indexed admin, address removedAdmin);
    event SuggestAdmin(address indexed admin, address suggestedAdmin, bytes16 action);

    error NotAuthorised();

    modifier onlyAdmin() {
        if(!admins[msg.sender]) {
            revert NotAuthorised();
        }
        _;
    }

    /**
     * @dev Sets the address for atlantis token and the admin 
     */
    constructor(address _atlantisToken) {
        atlantisToken = IAtlantisToken(_atlantisToken);
        admins[msg.sender] = true;
    }

    /**
     * @dev add admin to the list of admins
     */
    function addAdmin(address _admin) external onlyAdmin {
        require(!admins[_admin], "Already an admin");
        require(noOfAdmins < maxNoOfAdmins, "Reached max number of admins");

        SuggestAdminData storage suggestAdminData = suggestNewAdmins[msg.sender];
        suggestAdminData.voters[msg.sender] = true;
        suggestAdminData.votes += 1;

        emit SuggestAdmin(msg.sender, _admin, 'add');

        if(suggestAdminData.votes >= maxAdminVote || noOfAdmins < maxAdminVote) {
            admins[_admin] = true;
        
            emit AddAdmin(msg.sender, _admin);
        } 
    }

    /**
     * @dev removes an admin
     */
    function removeAdmin(address _admin) external onlyAdmin {
        require(admins[_admin], "Already an admin.");
        require(noOfAdmins != 1, "Reached minimum number of admins");

        SuggestAdminData storage suggestAdminData = suggestAdminsRemoval[msg.sender];
        suggestAdminData.voters[msg.sender] = true;
        suggestAdminData.votes += 1;

        emit SuggestAdmin(msg.sender, _admin, 'remove');

        if(suggestAdminData.votes >= maxAdminVote) {
            admins[_admin] = false;
        
            emit RemoveAdmin(msg.sender, _admin);
        }
    }

    /**
     * @dev distribute a spaecify amount of tokens to each addresses
     */
    function distributeToken(address[] memory _addresses, uint256[] memory _amounts) external onlyAdmin {
        require(_addresses.length <= 200, "Can not distribute to more than 200 at once.");

        uint256 totalAmount;

        for(uint256 i=0; i < _addresses.length; i++) {
            if(_addresses[i] != address(0)) {
                atlantisToken.mint(_addresses[i], _amounts[i]);

                if(!isReceiver(_addresses[i])) {
                    totalReceivers = totalReceivers + 1;
                    receivers[_addresses[i]] == true;
                }

                totalAmount += _amounts[i];
                totalDistributed = totalDistributed + _amounts[i];
            }
        }

        emit Distribution(_addresses.length, totalAmount, block.timestamp, msg.sender);
    }

    /**
     * @dev check if an address is a receiver, i.e has been distributed tokens from this contract
     */
    function isReceiver(address _receiver) public view returns(bool){
        return receivers[_receiver];
    }
}
