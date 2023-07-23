const {task} = require("hardhat/config")

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();
  
    for (const account of accounts) {
      console.log(account.address);
    }
  });

task("block-number", "Prints the current block number").setAction(
    async (testArgs, hre) => { //hre== Hardhat Runtime Environment
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
        
    }
)
  