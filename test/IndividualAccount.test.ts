import { expect } from 'chai';

import { ethers } from 'ethers';
import hre from 'hardhat';
import { HardhatNetworkHDAccountsConfig } from 'hardhat/types';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { TypedDataUtils, SignTypedDataVersion } from '@metamask/eth-sig-util';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { TypedRequestData, TypedDeployRequestData } from './utils/EIP712';
import { generateSignatureForOpenIndividualAccount } from './utils/generateSignature'; 

import {
  EnvelopingTypes,
  IForwarder,
} from '../typechain-types/rif-relay-contracts/interfaces/IRelayHub';

import { getLocalEip712Signature } from './utils/EIP712';
import exp from 'constants';

const ZERO_ADDRESS = hre.ethers.ZeroAddress;

describe('IndividualAccount', () => {
  let chainId: bigint;

  before(async () => {
    //  get and set chainId
    ({ chainId } = await hre.ethers.provider.getNetwork());
  });

  const deployIndividualAccountFixture = async () => {
    // console.debug('forwarderTemplateAddress', forwarderTemplateAddress);
    const [owner, user1, user2] = await hre.ethers.getSigners();
    // const IndividualAccount = await ethers.getContractFactory('IndividualAccount');
    const individualAccountFactoryContract = await hre.ethers.deployContract(
      'IndividualAccountFactory',
      [],
    );
    const individualAccountFactoryContractAddress =
      await individualAccountFactoryContract.getAddress();
    const testDllrContract = await hre.ethers.deployContract('TestDLLR', [100]);
    const testDllrContractAddress = await testDllrContract.getAddress();
      const user1Address = await user1.getAddress();
      const user2Address = await user2.getAddress();
      const signatureForUser1 = await generateSignatureForOpenIndividualAccount(

        user1,
        individualAccountFactoryContractAddress,
        user1Address,
        user2Address,
        0,
      );
    const user1IndividualAccount = await individualAccountFactoryContract
      .connect(user1)
      .createUserSmartWallet(user1Address, user2Address, 0, signatureForUser1);
    return {
      individualAccountFactoryContract,
      individualAccountFactoryContractAddress,
      testDllrContract,
      testDllrContractAddress,
      owner,
      user1,
      user1IndividualAccount,
      user2,
    };
  }

  // describe('Upon deployment', () => {
//   });

  // describe('directExecute/2', () => {
  //   it('should transfer native currency without calling other contract', async () => {
  //     const {
  //       user1,
  //       user1IndividualAccount, 
  //       user2,
  //     } = loadFixture(deployIndividualAccountFixture);

  //     // const 
  //   });

  //   //   const {
  //   //     individualAccountContractAddress,
  //   //     individualAccountContract,
  //   //     user1,
  //   //     user2,
  //   //   } = await loadFixture(deployIndividualAccountFixture);
  //   //   const relayRequest = createRequest({
  //   //     from: owner.address,
  //   //     nonce: '0',
  //   //   });

  //   //   const typedRequestData = new TypedRequestData(
  //   //     HARDHAT_CHAIN_ID,
  //   //     mockSmartWallet.address,
  //   //     relayRequest
  //   //   );

  //   //   const privateKey = Buffer.from(owner.privateKey.substring(2, 66), 'hex');

  //   //   const suffixData = getSuffixData(typedRequestData);
  //   //   const signature = getLocalEip712Signature(typedRequestData, privateKey);

  //   //   await expect(
  //   //     individualAccountContract.verify(suffixData, relayRequest.request, signature)
  //   //   ).not.to.be.rejected;
  //   // //   const mailToAddress = user2.address;

  //   // //   const domain = {
  //   // //     name: 'IndividualAccount Enveloping Transaction',
  //   // //     version: '1',
  //   // //     chainId: chainId,
  //   // //     verifyingContract: individualAccountContractAddress,
  //   // //   };
  //   // //   const types = {
  //   // //     Mail: [
  //   // //       { name: 'to', type: 'address' },
  //   // //       { name: 'contents', type: 'string' },
  //   // //     ],
  //   // //   };
  //   // //   const value = {
  //   // //     to: mailToAddress,
  //   // //     contents: 'very interesting',
  //   // //   };

  //   // //   const signature = await user1.signTypedData(domain, types, value);
  //   // //   console.log(signature);

  //   // //   await individualAccountContract
  //   // //     .connect(user1)
  //   // //     .verify(signature, mailToAddress, 'very interesting');
  //   // });
  // });


  // async function generateSignatureForEIP712Deploy(data: TypedRequestData) {}

  function toDeployRequest(
    request: Partial<IForwarder.DeployRequestStruct>,
    relayData?: Partial<EnvelopingTypes.RelayDataStruct>,
  ): EnvelopingTypes.DeployRequestStruct {
    const defaultRequest: EnvelopingTypes.DeployRequestStruct = {
      request: {
        recoverer: ZERO_ADDRESS,
        relayHub: ZERO_ADDRESS,
        from: ZERO_ADDRESS,
        to: ZERO_ADDRESS,
        tokenContract: ZERO_ADDRESS,
        value: '0',
        index: 0,
        nonce: '0',
        tokenAmount: '0',
        tokenGas: '50000',
        validUntilTime: '0',
        data: '0x',
      },
      relayData: {
        gasPrice: 0,
        feesReceiver: ZERO_ADDRESS,
        callForwarder: ZERO_ADDRESS,
        callVerifier: ZERO_ADDRESS,
      },
    };
    return {
      request: {
        ...defaultRequest.request,
        ...request,
      },
      relayData: {
        ...defaultRequest.relayData,
        ...relayData,
      },
    };
  }

  function getSuffixData(typedRequestData: TypedRequestData): string {
    const ONE_FIELD_IN_BYTES = 32;

    const encoded = TypedDataUtils.encodeData(
      typedRequestData.primaryType,
      typedRequestData.message,
      typedRequestData.types,
      SignTypedDataVersion.V4,
    );

    const messageSize = Object.keys(typedRequestData.message).length;

    return (
      '0x' + encoded.slice(messageSize * ONE_FIELD_IN_BYTES).toString('hex')
    );
  }
});
