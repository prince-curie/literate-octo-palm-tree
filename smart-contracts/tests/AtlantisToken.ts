import { expect } from "chai";
import { Signer } from "ethers";
import { ethers } from "hardhat";

describe("Token", function () {
  let accounts: Signer[];
  let contract: any;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('Atlantis');
    contract = await Contract.deploy()

    await contract.deployed()

  });

  it("set distributor contract address expects set address", async function () {
    let distributorContractAddress = await accounts[1].getAddress();

    const setAddressTx = await contract.setDistributorContractAddress(distributorContractAddress);

    await setAddressTx.wait();

    expect(await contract.distributorContract()).to.equal(distributorContractAddress);
  });

  it("set service contract address should be a success", async function () {
    let serviceContractAddress = await accounts[1].getAddress();
    
    let setAddressTx = await contract.setServiceContractAddress(serviceContractAddress);
    
    await setAddressTx.wait();

    expect(await contract.serviceContract()).to.equal(serviceContractAddress);
  });
});