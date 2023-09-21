import { ContractTransaction } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { getVerifiers } from './utils';

export const acceptTokens = async (
  taskArgs: { tokenlist: string },
  hre: HardhatRuntimeEnvironment
) => {
  const tokenAddresses = taskArgs.tokenlist.split(',');

  const {
    individualAccountDeployVerifier, individualAccountRelayVerifier,
  } = await getVerifiers(hre);


  for (const tokenAddress of tokenAddresses) {
      try {
        await individualAccountDeployVerifier.acceptToken(tokenAddress, { gasLimit: 1000000 });
      } catch (error) {
        console.error(
          `Error adding token with address ${tokenAddress} to allowed tokens on individualAccountDeployVerifier`
        );
        throw error;
      }
      
      try {
        await individualAccountRelayVerifier.acceptToken(tokenAddress, { gasLimit: 1000000 });
      } catch (error) {
        console.error(
          `Error adding token with address ${tokenAddress} to allowed tokens on individualAccountRelayVerifier`
        );
        throw error;
      }
    
  }
  console.log('Tokens allowed successfully!');
};
