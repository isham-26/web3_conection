//SPDX-License-Identifier: UNLICENSED

pragma solidity  ^0.8.19;

contract demo{
    uint public number=10;
    function set(uint _number) public{
        number=_number;
    }
    function get() public view returns(uint){
        return number;
    }
}