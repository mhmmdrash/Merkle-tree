const { expect } = require('chai')
const { ethers } = require('hardhat')
const { MerkleTree } = require('merkletreejs');

describe("WhiteList", function () {
    
    let owner
    let bob 
    let wl;

    describe("claim()", async function () {
        it("should verify the user", async function () {
            const WL = await ethers.getContractFactory('WhiteList');
            [owner, bob] = await ethers.getSigners()
            console.log("address of owner: ",owner.address)

            const wl = await WL.deploy()
            await wl.deployed()
            console.log("Contract deployed to: ",wl.address)

            await wl.setRoot("0x057e14adae71e0af947f295598bf36dc55c914237dc58ebe90ce9351f5d61def");
            expect( await wl.root()).to.eq("0x057e14adae71e0af947f295598bf36dc55c914237dc58ebe90ce9351f5d61def");
            console.log( "Merkle root: ",await wl.root())
            
            console.log("Claiming address: 0xdD870fA1b7C4700F2BD7f44238821C26f7392148");
            expect( await wl.whiteListAddresses(owner.address)).to.eq(false)
            await wl.connect(owner).claim(
                [
                    "0x702d0f86c1baf15ac2b8aae489113b59d27419b751fbf7da0ef0bae4688abc7a",
                    "0xb76018ce57bc57057fd7b1f2a9c3648646eb091e1d22b2cf5fe65eeff36286e0"
                ],
                "0xdD870fA1b7C4700F2BD7f44238821C26f7392148");
                console.log("verification successful");
            expect( await wl.whiteListAddresses(owner.address)).to.eq(true)
        })
    })
})