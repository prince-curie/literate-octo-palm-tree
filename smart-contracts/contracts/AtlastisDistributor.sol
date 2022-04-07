// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);


    /**
     * @dev Mints `amount` tokens from to the specified address
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function mint(address account, uint256 amount) external ;

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol



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

}
