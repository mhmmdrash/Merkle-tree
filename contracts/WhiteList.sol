//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WhiteList {

    address public admin;
    mapping (address => bool) public whiteListAddresses;
    bytes32 public root;

    constructor() {
        admin = msg.sender;
    }

    function setRoot(bytes32 _root) external {
        require(msg.sender == admin, "Only admin can set root");
        root = _root;
    } 

    function claim(bytes32[] calldata proof, address addr) external {
        require(!whiteListAddresses[msg.sender], "mint already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(addr));
        require(MerkleProof.verify(proof, root, leaf), "Invalid merkle path");
        whiteListAddresses[msg.sender] = true;
    }
}