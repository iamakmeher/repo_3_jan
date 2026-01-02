// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {
    mapping(address => bool) public registeredUsers;

    function registerUser(address user) public {
        registeredUsers[user] = true;
    }

    function authenticate(address user) public view returns (bool) {
        return registeredUsers[user];
    }
}
