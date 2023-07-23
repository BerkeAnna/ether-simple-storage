const { ethers, run, network } = require("hardhat")



async function main(){
  const simpleStorageFactory = await ethers.deployContract("SimpleStorage");
  await simpleStorageFactory.waitForDeployment();
  console.log("Deploying....");
  console.log(`Deployed contract to ${await simpleStorageFactory.getAddress() }`)
  if(network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY){
    console.log("Waiting for block txes...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorageFactory.retrieve()
  console.log(`Current value is ${currentValue}`)

  const transactionResponse = await simpleStorageFactory.store(7)
  await transactionResponse.wait(1)

  const updatedValue = await simpleStorageFactory.retrieve()
  console.log(`Updated value is: ${updatedValue}`)

}

async function verify(contractAddress, args){
    console.log("Verifying contract...")
    try{
      await run("verify:verify", {
        address: contractAddress,
        constractorArguments: args
      })
    } catch (e) {
      if( e.message.toLowerCase().inclides("already verified")){
        console.log("Already verified")
      }else{
        console.log(e)
      }
    }
}

main().then(()=> process.exit(0)).catch((error) => {
  console.error(error)
  process.exit(1)
});