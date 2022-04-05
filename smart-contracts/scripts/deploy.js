async function main() {

    /***********************************************************************
     *********************** DEPLOY ATLANTIS-TOKEN *************************
     ***********************************************************************/
    const AtlantisToken = await ethers.getContractFactory("AtlantisToken");
    const altantisTokenContract = await AtlantisToken.deploy();

    console.log(`Contract address => ${altantisTokenContract.address}`);

}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1)
    });