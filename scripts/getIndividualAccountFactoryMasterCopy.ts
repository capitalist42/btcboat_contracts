import hre from 'hardhat';
import fs from 'fs';

const CONTRACT_ADDRESSES_FILE = 'contract_adressess.json';

async function main() {
    const { chainId } = await hre.ethers.provider.getNetwork();
    const chainIdString = chainId.toString();
    // const signer = (await hre.ethers.getSigners())[0];
    // const signerAddress = await signer.getAddress();
    // const signerBalance = await signer.provider.getBalance(signerAddress); 
    console.log("Running getIndividualAccountFactoryMasterCopy Script...");
    console.log("Chain ID: ", chainId);
    // console.log("Signer Address: ", signerAddress);
    // console.log("Signer Balance: ", signerBalance);
    
    // const contractAddresses = await deployContracts();
    // console.table(contractAddresses);
    // writeToContractAddressConfigFile(chainId, contractAddresses);
    const data = fs.readFileSync(CONTRACT_ADDRESSES_FILE)
    console.debug("data", data.toString());
    const addresses = JSON.parse(data.toString())
    const individualAccountFactoryContractAddress = addresses[chainIdString]["IndividualAccountFactory"];

    console.log("individualAccountFactoryContractAddress", individualAccountFactoryContractAddress)
    const individualAccountFactoryContractFactory = await hre.ethers.getContractFactory('IndividualAccountFactory');
    const individualAccountFactoryContract = individualAccountFactoryContractFactory.attach(individualAccountFactoryContractAddress);
    const masterCopyAddress = await individualAccountFactoryContract.masterCopy();
    console.log("IndividualAccountFactory Master Copy Address: ", masterCopyAddress);
    return masterCopyAddress;
  }
  
  main()
  .then(() => {
    console.log("Deploy Script Complete.")
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  