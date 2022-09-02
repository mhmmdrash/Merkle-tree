const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');


let whitelistAddresses = [
    "0Xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0X5A641E5FB72A2FD9137312E7694D42996D689D99",
    "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
    "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
    "0X09BAAB19FC77C19898140DADD30C4685C597620B",
    "0XCC4C29997177253376528C05D3DF91CF2D69061A",
    "0xdD870fA1b7C4700F2BD7f44238821C26f7392148" // The address in remix
  ];

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});

const rootHash = merkleTree.getRoot();
console.log(leafNodes);
console.log('Whitelist Merkle Tree\n', merkleTree.toString());
console.log("Root Hash: ", rootHash);

const claimingAddress = keccak256("0xdD870fA1b7C4700F2BD7f44238821C26f7392148");
console.log("Claiming address: ", claimingAddress);

const hexProof = merkleTree.getHexProof(claimingAddress);
console.log(hexProof);

console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));
