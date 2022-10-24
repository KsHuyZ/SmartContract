const { ethers, run, network } = require("hardhat");
require("dotenv").config();

const main = async () => {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploy contract...");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Deploy contract to:" + simpleStorage.address);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  //get favourite number
  let currentValue = await simpleStorage.retrieve();
  console.log(currentValue);
  //udpate favouriteNumber
  const transactionReponse = await simpleStorage.store(12);
  transactionReponse.wait(1);

  currentValue = await simpleStorage.retrieve();
  console.log(currentValue);
};

const verify = async (contractAddress, agrs) => {
  console.log("Verify contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: agrs,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log(error);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
