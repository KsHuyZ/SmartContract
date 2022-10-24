const { task } = require("hardhat/config");
task(
  "block-number",
  "Prints the current block numbers",
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`block number: ${blockNumber}`);
  }
);
