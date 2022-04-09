import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("Distributor", function () {
  let accounts: Signer[];
  let contract: any;
  let adminOne: String; 
  let adminTwo: String; 
  let adminThree: String;
  let adminFour: String; 

  before(async function () {
    accounts = await ethers.getSigners();

    const TokenContract = await ethers.getContractFactory('Atlantis');
    let tokenContract = await TokenContract.deploy()
    await tokenContract.deployed()

    const Contract = await ethers.getContractFactory("AtlantisDistributor")
    contract = await Contract.deploy(tokenContract.address)
    await contract.deployed()

    const setDistributorAddressTx = await tokenContract.setDistributorContractAddress(contract.address)
    await setDistributorAddressTx.wait()

    adminOne = await accounts[1].getAddress();
    adminTwo = await accounts[2].getAddress();
    adminThree = await accounts[3].getAddress();
    adminFour = await accounts[4].getAddress();
    
  });

  it("set distributor contract address expects set address", async function () {
    const setAdmin1Tx = await contract.addAdmin(adminOne);
    const setAdmin2Tx = await contract.addAdmin(adminTwo);
    const setAdmin3Tx = await contract.addAdmin(adminThree);
    
    await setAdmin1Tx.wait();
    await setAdmin2Tx.wait();
    await setAdmin3Tx.wait();

    expect(await contract.admins(adminOne)).to.equal(true);
    expect(await contract.admins(adminTwo)).to.equal(true);
    expect(await contract.admins(adminThree)).to.equal(true);
    expect(await contract.admins(adminFour)).to.equal(false);
  });

  it("Distribute tokens", async function () {
    let addresses = [adminTwo, adminThree, adminFour];
    // let amounts = [1*10**18, 20*10**18, 3*10**18]
    let amounts = [1, 20, 3]  
    let setDistributeTx = await contract.distributeToken(addresses, amounts);
    
    await setDistributeTx.wait();

    // const receivers = await contract.totalReceivers()
    // console.log(receivers)
    expect(await contract.totalReceivers()).to.equal(addresses.length);
  });
});