const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  it("Should start with favourute of 0", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectValue = "0";
    assert.equal(currentValue.toString(), expectValue);
  });
  it("Should update when we call store", async () => {
    const transactionReponse = await simpleStorage.store(12);
    transactionReponse.wait(1);
    const currentValue = await simpleStorage.retrieve();
    const expectValue = "12";
    assert.equal(currentValue.toString(), expectValue);
  });
});
