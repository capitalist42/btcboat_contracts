import { ethers } from 'ethers';

export async function generateSignatureForOpenIndividualAccount(
    signer: ethers.Signer,
    individualAccountFactoryContractAddress: string,
    owner: string,
    recoverer: string,
    index: number,
  ) {
    // generate signature with accountFactoryContractAddress, user1EOAAddress, recovererEOAAddress, index
    const encodedMessage = ethers.solidityPacked(
      ['address', 'address', 'address', 'uint256'],
      [individualAccountFactoryContractAddress, owner, recoverer, index],
    );
    // console.log('testcase generate encodedMessage... done');
    // console.log('test encodedMessage', encodedMessage);
    const messageHash = ethers.keccak256(encodedMessage);
    // console.log('test messageHash', messageHash);
    // sign the hashed message
    const signature = await signer.signMessage(ethers.getBytes(messageHash));
    return signature;
  }


