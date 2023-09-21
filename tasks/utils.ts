import fs from 'fs';
import { HardhatRuntimeEnvironment } from 'hardhat/types/runtime';

const CONTRACT_ADDRESSES_FILE = 'contract_adressess.json';

export type ContractAddresses = {
  [key in
    | 'IndividualAccountRelayVerifier'
    | 'IndividualAccountDeployVerifier']: string | undefined;
};

export type AddressesConfig = { [key: string]: ContractAddresses };

export const parseJsonFile = <T>(filePath: string) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' })) as T;
  }
  throw new Error(`The file ${filePath} doesn't exist`);
};
export const getExistingConfig = (
  addressFile?: string,
): AddressesConfig | undefined => {
  try {
    return parseJsonFile<AddressesConfig>(
      addressFile || CONTRACT_ADDRESSES_FILE,
    );
  } catch (error) {
    console.warn(error);
  }

  return undefined;
};

export const getVerifiers = async (hre: HardhatRuntimeEnvironment) => {
  const { ethers, network } = hre;

  if (!network) {
    throw new Error('Unknown Network');
  }

  const { chainId } = network.config;

  if (!chainId) {
    throw new Error('Unknown Chain Id');
  }

  const contractAddresses = getExistingConfig();

  if (!contractAddresses) {
    throw new Error('No contracts deployed');
  }

  const networkChainKey = `${chainId}`;
  const contractAddressesDeployed = contractAddresses[networkChainKey];
  if (!contractAddressesDeployed) {
    throw new Error(`Contracts not deployed for chain ID ${chainId}`);
  }

  const individualAccountDeployVerifierContractAddress = contractAddressesDeployed.IndividualAccountDeployVerifier;
  const individualAccountRelayVerifierContractAddress = contractAddressesDeployed.IndividualAccountRelayVerifier;

  if (!individualAccountDeployVerifierContractAddress) {
    throw new Error('Could not obtain individualAccountDeployVerifierContractAddress');
  }

  if (!individualAccountRelayVerifierContractAddress) {
    throw new Error('Could not obtain individualAccountRelayVerifierContractAddress');
  }


  const individualAccountDeployVerifier = await ethers.getContractAt(
    'IndividualAccountDeployVerifier',
    individualAccountDeployVerifierContractAddress,
  );
  const individualAccountRelayVerifier = await ethers.getContractAt(
    'IndividualAccountRelayVerifier',
    individualAccountRelayVerifierContractAddress,
  );

  return {
    individualAccountDeployVerifier,
    individualAccountRelayVerifier,
  };
};
