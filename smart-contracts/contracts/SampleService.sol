// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;


contract SimpleSample {

    mapping(address=>bool)users;
    uint256 public price = 1000;

    modifier onlyUser(){
        require(users[msg.sender] == true, "must be a valid user of the contract");
        _;
    }

    constructor(){

    }

    function getPrice() public view returns(uint256){
        return price;
    }

    function saySomething(string memory message) onlyUser public view returns(string memory) {
        string memory a = "The message is : ";
        return string(bytes.concat(bytes(a), " ", bytes(message)));
    }
}
