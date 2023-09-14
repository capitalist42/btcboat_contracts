import hre from 'hardhat';
import fs from 'fs';

const ADDRESSES_FILE = 'contract_adressess.json';
 interface ContractAddresses {
  Penalizer: string,
  RelayHub: string,
  IndividualAccountFactory: string,
  IndividualAccountDeployVerifier: string,
  IndividualAccountRelayVerifier: string
  VersionRegistry: string
}
const deployContracts = async(): Promise<ContractAddresses> => {
  // console.log(ethers)
  const relayHubContractFactory = await hre.ethers.getContractFactory('RelayHub');
  const penalizerContractFactory = await hre.ethers.getContractFactory('Penalizer');
  const individualAccountFactoryContractFactory = await hre.ethers.getContractFactory('IndividualAccountFactory');
  const individualAccountDeployVerifierContractFactory = await hre.ethers.getContractFactory('IndividualAccountDeployVerifier');
  const individualAccountRelayVerifierContractFactory = await hre.ethers.getContractFactory('IndividualAccountRelayVerifier');
  const versionRegistryContractFactory = await hre.ethers.getContractFactory('VersionRegistry');

  console.log("Deploying Penalizer contract...")
  // const tx = await penalizerContractFactory.getDeployTransaction();

  const penalizerContract = await penalizerContractFactory.deploy({gasLimit: 6800000});
  // console.debug("penalizerContract: ", penalizerContract);
  const penalizerContractAddress = await penalizerContract.getAddress();

  console.log("Deploying RelayHub contract...")
  const maxWokerCount = 1;
  const minimumEntryDepositValue = 1;
  const minimumUnstakeDelay = 1;
  const minimumStake = 1;

  const relayHubContract = await relayHubContractFactory.deploy(
      penalizerContractAddress, maxWokerCount, minimumEntryDepositValue, minimumUnstakeDelay, minimumStake, 
      {gasLimit: 6800000} 
  )
  // console.debug("relayHubContract: ", relayHubContract);
  const relayHubContractAddress = await relayHubContract.getAddress();

  console.log("Deploying IndividualAccountFactory");
  const individualAccountFactoryContract = await individualAccountFactoryContractFactory.deploy({gasLimit: 6800000});
  const individualAccountFactoryContractAddress = await individualAccountFactoryContract.getAddress();

  console.log("Deploying IndividualAccountDeployVerifier");
  const individualAccountDeployVerifierContract = await individualAccountDeployVerifierContractFactory.deploy(
    individualAccountFactoryContractAddress,
    {gasLimit: 6800000}
  ); 
  const individualAccountDeployVerifierContractAddress = await individualAccountDeployVerifierContract.getAddress();

  console.log("Deploying IndividualAccountRelayVerifier");
    const individualAccountRelayVerifierContract = await individualAccountRelayVerifierContractFactory.deploy(
      individualAccountFactoryContractAddress,
      {gasLimit: 6800000}
    );
  const individualAccountRelayVerifierContractAddress = await individualAccountRelayVerifierContract.getAddress();

  console.log("Deploying VersionRegistry");
  const versionRegistryContract = await versionRegistryContractFactory.deploy({gasLimit: 6800000});
  const versionRegistryContractAddress = await versionRegistryContract.getAddress();

  return {
    Penalizer: penalizerContractAddress,
    RelayHub: relayHubContractAddress,
    IndividualAccountFactory: individualAccountFactoryContractAddress,
    IndividualAccountDeployVerifier: individualAccountDeployVerifierContractAddress,
    IndividualAccountRelayVerifier: individualAccountRelayVerifierContractAddress,
    VersionRegistry: versionRegistryContractAddress
  }
}


const writeToContractAddressConfigFile = (chainId: bigint, contractAddresses: ContractAddresses) => {
  const data = JSON.stringify({[`${chainId}`]: contractAddresses});
  fs.writeFileSync(ADDRESSES_FILE, data);
};

async function main() {
  const { chainId } = await hre.ethers.provider.getNetwork();
  const signer = (await hre.ethers.getSigners())[0];
  const signerAddress = await signer.getAddress();
  const signerBalance = await signer.provider.getBalance(signerAddress); 
  console.log("Running Deploy Script...");
  console.log("Chain ID: ", chainId);
  console.log("Signer Address: ", signerAddress);
  console.log("Signer Balance: ", signerBalance);
  
  const contractAddresses = await deployContracts();
  console.table(contractAddresses);
  writeToContractAddressConfigFile(chainId, contractAddresses);
}

main()
.then(() => {
  console.log("Deploy Script Complete.")
})
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
