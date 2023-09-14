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

const ZERO_ADDRESS = hre.ethers.ZeroAddress;

describe('IndividualAccountFactory', () => {
  let chainId: bigint;

  before(async () => {
    //  get and set chainId
    ({ chainId } = await hre.ethers.provider.getNetwork());
  });

  const deployIndividualAccountFactoryFixture = async () => {
    // console.debug('forwarderTemplateAddress', forwarderTemplateAddress);
    const [owner, user1, user2] = await hre.ethers.getSigners();
    // const IndividualAccountFactory = await ethers.getContractFactory('IndividualAccountFactory');
    const individualAccountFactoryContract = await hre.ethers.deployContract(
      'IndividualAccountFactory',
    );
    const individualAccountFactoryContractAddress =
      await individualAccountFactoryContract.getAddress();
    // console.log(
    //   'individualAccountFactoryContract was deployed to address:',
    //   individualAccountFactoryContractAddress,
    // );
    const testDllrContract = await hre.ethers.deployContract('TestDLLR', [100]);
    const testDllrContractAddress = await testDllrContract.getAddress();
    // console.log('dllrContract', dllrContract);
    // console.log(individualAccountFactoryContract.getAddress)
    return {
      individualAccountFactoryContract,
      individualAccountFactoryContractAddress,
      testDllrContract,
      testDllrContractAddress,
      owner,
      user1,
      user2,
    };
  }

  describe('Upon deployment', () => {
    it('should update masterCopyAddress', async () => {
      const { individualAccountFactoryContract } = await loadFixture(
        deployIndividualAccountFactoryFixture,
      );
      await expect(
        individualAccountFactoryContract.masterCopy(),
        'invalid masterCopyAddress',
      ).to.eventually.be.exist;
    });
  });

  describe('getSmartWalletAddress/3', () => {
    it('should calculates the counterfactual address of an individual account', async () => {
      const { individualAccountFactoryContract, user1, user2 } =
        await loadFixture(deployIndividualAccountFactoryFixture);
      // get the smart wallet address for user1 given index 0, configure user2 as recoverer
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const index = 0;
      const theIndividualAccountAddress = await individualAccountFactoryContract
        .connect(user1)
        .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      // console.log('theIndividualAccountAddress', theIndividualAccountAddress);
      // const theIndividualAccountAddress2 = await individualAccountFactoryContract.connect(user1).getSmartWalletAddress2(user1EOAAddress, recovererEOAAddress, index);
      // console.log("theIndividualAccountAddress2", theIndividualAccountAddress2);

      expect(theIndividualAccountAddress).to.be.exist;
    });
  });

  describe('createUserSmartWallet/4', () => {
    it('should create a new individual account', async () => {
      const { individualAccountFactoryContract, user1, user2 } =
        await loadFixture(deployIndividualAccountFactoryFixture);
      const individualAccountFactoryContractAddress =
        await individualAccountFactoryContract.getAddress();
      // get the smart wallet address for user1 given index 0, configure user2 as recoverer
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const index = 0;
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const signature = await generateSignatureForOpenIndividualAccount(
        user1,
        individualAccountFactoryContractAddress,
        user1EOAAddress,
        recovererEOAAddress,
        index,
      );
      const salt = hre.ethers.keccak256(
        hre.ethers.solidityPacked(
          ['address', 'address', 'uint256'],
          [user1EOAAddress, recovererEOAAddress, index],
        ),
      );

      const user1BalanceAtT0 = await hre.ethers.provider.getBalance(
        user1.address,
      );
      const theCreateUserSmartWalletContractCall =
        await individualAccountFactoryContract
          .connect(user1)
          .createUserSmartWallet(
            user1EOAAddress,
            recovererEOAAddress,
            index,
            signature,
          );
      const theCreateUserSmartWalletContractCalltTransactionReceipt: ethers.ContractTransactionReceipt =
        (await (
          await theCreateUserSmartWalletContractCall
        ).wait(1)) as ethers.ContractTransactionReceipt;
      const user1BalanceAtT1 = await hre.ethers.provider.getBalance(
        user1.address,
      );
      await expect(theCreateUserSmartWalletContractCall)
        .to.emit(individualAccountFactoryContract, 'Deployed')
        .withArgs(expectedIndividualAccountAddress, salt);
      // console.log(theCreateUserSmartWalletContractCalltTransactionReceipt.fee);
      expect(
        theCreateUserSmartWalletContractCalltTransactionReceipt.from,
      ).to.be.equal(user1.address);
      expect(
        theCreateUserSmartWalletContractCalltTransactionReceipt.fee,
      ).to.not.be.equal(0);
      expect(
        user1BalanceAtT0 -
          theCreateUserSmartWalletContractCalltTransactionReceipt.fee,
      ).to.be.equal(user1BalanceAtT1);
      expect(await individualAccount.getDeployedCode()).to.be.exist;
    });

    it('should failed to create a new individual account due to invalid signature', async () => {
      const { individualAccountFactoryContract, user1, user2 } =
        await loadFixture(deployIndividualAccountFactoryFixture);
      const individualAccountFactoryContractAddress =
        await individualAccountFactoryContract.getAddress();

      // get the smart wallet address for user1 given index 0, configure user2 as recoverer
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const index = 1;

      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const signature = await generateSignatureForOpenIndividualAccount(
        user2,
        individualAccountFactoryContractAddress,
        user1EOAAddress,
        recovererEOAAddress,
        index,
      );
      const theCreateUserSmartWalletContractCall =
        individualAccountFactoryContract
          .connect(user1)
          .createUserSmartWallet(
            user1EOAAddress,
            recovererEOAAddress,
            index,
            signature,
          );
      await expect(theCreateUserSmartWalletContractCall).to.be.revertedWith(
        'IndividualAccountFactory: Invalid Signature',
      );

      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
    });

    it('should not able to create with owner address as zero address', async () => {
      const { individualAccountFactoryContract, user1, user2 } =
        await loadFixture(deployIndividualAccountFactoryFixture);
      const individualAccountFactoryContractAddress =
        await individualAccountFactoryContract.getAddress();
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const index = 2;
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const signature = await generateSignatureForOpenIndividualAccount(
        user1,
        individualAccountFactoryContractAddress,
        ZERO_ADDRESS,
        recovererEOAAddress,
        index,
      );
      const theCreateUserSmartWalletContractCall =
        individualAccountFactoryContract
          .connect(user1)
          .createUserSmartWallet(
            user1EOAAddress,
            recovererEOAAddress,
            index,
            signature,
          );
      await expect(theCreateUserSmartWalletContractCall).to.be.revertedWith(
        'IndividualAccountFactory: Invalid Signature',
      );

      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
    });

    it('should not able to create same individual account twice', async () => {
      const { individualAccountFactoryContract, user1, user2 } =
        await loadFixture(deployIndividualAccountFactoryFixture);
      const individualAccountFactoryContractAddress =
        await individualAccountFactoryContract.getAddress();
      // get the smart wallet address for user1 given index 0, configure user2 as recoverer
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const index = 3;
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const signature = await generateSignatureForOpenIndividualAccount(
        user1,
        individualAccountFactoryContractAddress,
        user1EOAAddress,
        recovererEOAAddress,
        index,
      );
      const theCreateUserSmartWalletContractCall =
        individualAccountFactoryContract
          .connect(user1)
          .createUserSmartWallet(
            user1EOAAddress,
            recovererEOAAddress,
            index,
            signature,
          );
      await expect(theCreateUserSmartWalletContractCall).to.not.be.reverted;
      // call the same function again
      const sameContractCall = individualAccountFactoryContract
        .connect(user1)
        .createUserSmartWallet(
          user1EOAAddress,
          recovererEOAAddress,
          index,
          signature,
        );

      await expect(sameContractCall).to.be.reverted;

      expect(await individualAccount.getDeployedCode()).to.be.exist;
    });
  });

  describe('relayedUserSmartWalletCreation/4', () => {
    it('should fail to create a new individual account when caller is not relayhub', async () => {
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const feesReceiverAddress = owner.address;
      const index = 1;
      // expect account not exist yet

      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const randomWallet = hre.ethers.Wallet.createRandom();
      const deployRequest = toDeployRequest(
        {
          relayHub: randomWallet.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: 0,
          tokenGas: 0,
          recoverer: user2.address,
          index: index,
          nonce: 0,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      const suffixData = getSuffixData(typedDeployRequestData);

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;
      // console.log('accounts', accounts);
      const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/1`,
      );
      const user1PrivateKey = Buffer.from(
        user1Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user1PrivateKey,
      );

      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.be.rejectedWith(
        'IndividualAccountFactory: relayedUserSmartWalletCreation expect relayHub to be caller',
      );
    });

    it('should fail to create a new individual account due to user insuiffient balance', async () => {
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const feesReceiverAddress = owner.address;
      const index = 4;
      const tokenGas = 55000;
      const tokenAmount = hre.ethers.parseEther('6').toString();
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;

      const deployRequest = toDeployRequest(
        {
          relayHub: owner.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: tokenAmount,
          tokenGas: tokenGas,
          recoverer: user2.address,
          index: index,
          nonce: 0,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      const suffixData = getSuffixData(typedDeployRequestData);

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;
      // console.log('accounts', accounts);
      const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/1`,
      );
      const user1PrivateKey = Buffer.from(
        user1Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user1PrivateKey,
      );

      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.be.rejectedWith('failed to initialize IndividualAccount');
    });

    // it('should fail to create a new individual account with zero tokenGas (user paying fee with ERC20 token', async() => {

    // });

    it('should fail to create a new individual account due to mismatch nonce', async () => {
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const feesReceiverAddress = owner.address;
      const index = 4;
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;

      const deployRequest = toDeployRequest(
        {
          relayHub: owner.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: 0,
          tokenGas: 0,
          recoverer: user2.address,
          index: index,
          nonce: 10,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      const suffixData = getSuffixData(typedDeployRequestData);

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;
      // console.log('accounts', accounts);
      const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/1`,
      );
      const user1PrivateKey = Buffer.from(
        user1Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user1PrivateKey,
      );

      // const ownerBalanceAtT0 = await hre.ethers.provider.getBalance(
      //   owner.address,
      // );

      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.be.rejectedWith('IndividualAccountFactory: nonce mismatch');
      // const ownerBalanceAtT1 = await hre.ethers.provider.getBalance(owner.address);

      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      // expect(ownerBalanceAtT0).to.be.equal(ownerBalanceAtT1);
    });

    it('should fail to create a new individual account due to mismatch signature', async () => {
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const feesReceiverAddress = owner.address;
      const index = 5;
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const deployRequest = toDeployRequest(
        {
          relayHub: owner.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: 0,
          tokenGas: 0,
          recoverer: user2.address,
          index: index,
          nonce: 0,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // console.log('deployRequest', deployRequest);
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      // console.log('typedDeployRequestData', typedDeployRequestData);
      const suffixData = getSuffixData(typedDeployRequestData);
      // console.log('suffixData', suffixData);
      // All properties on a domain are optional

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;
      // console.log('accounts', accounts);
      const user2Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/2`,
      );
      // console.log('user1Wallet.privateKey', user1Wallet.privateKey);
      const user2PrivateKey = Buffer.from(
        user2Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user2PrivateKey,
      );

      // const ownerBalanceAtT0 = await hre.ethers.provider.getBalance(
      //   owner.address,
      // );

      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.be.rejectedWith('IndividualAccountFactory: Invalid Signature');
      // const ownerBalanceAtT1 = await hre.ethers.provider.getBalance(owner.address);
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
    });

    it('should fail to create a new individual account due to expiry', async () => {
      const timestampAtT0 = await time.latest();
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const user1EOAAddress = user1.address;
      const recovererEOAAddress = user2.address;
      const feesReceiverAddress = owner.address;
      const index = 6;
      // expect account not exist yet
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1EOAAddress, recovererEOAAddress, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;

      const deployRequest = toDeployRequest(
        {
          relayHub: owner.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: 0,
          tokenGas: 0,
          recoverer: user2.address,
          index: index,
          nonce: 0,
          validUntilTime: timestampAtT0,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      const suffixData = getSuffixData(typedDeployRequestData);

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;

      const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/1`,
      );
      const user1PrivateKey = Buffer.from(
        user1Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user1PrivateKey,
      );

      // const ownerBalanceAtT0 = await hre.ethers.provider.getBalance(
      //   owner.address,
      // );

      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.be.rejectedWith('IndividualAccountFactory: request expired');
    });

    it('should create a new individual account in the expected address without user paying fee', async () => {
      const {
        individualAccountFactoryContract,
        individualAccountFactoryContractAddress,
        testDllrContractAddress,
        owner,
        user1,
        user2,
      } = await loadFixture(deployIndividualAccountFactoryFixture);
      const feesReceiverAddress = owner.address;
      const index = 3;
      const expectedIndividualAccountAddress =
        await individualAccountFactoryContract
          .connect(user1)
          .getSmartWalletAddress(user1.address, user2.address, index);
      const individualAccount = await hre.ethers.getContractAt(
        'IndividualAccount',
        expectedIndividualAccountAddress,
      );
      expect(await individualAccount.getDeployedCode()).to.not.be.exist;
      const deployRequest = toDeployRequest(
        {
          relayHub: owner.address,
          from: user1.address,
          tokenContract: testDllrContractAddress,
          tokenAmount: 0,
          tokenGas: 0,
          recoverer: user2.address,
          index: index,
        },
        {
          callForwarder: individualAccountFactoryContractAddress,
          feesReceiver: feesReceiverAddress,
        },
      );
      // console.log('deployRequest', deployRequest);
      // generate suffixData
      // generate signature
      const typedDeployRequestData = new TypedDeployRequestData(
        Number(chainId.toString()),
        individualAccountFactoryContractAddress,
        deployRequest,
      );
      // console.log('typedDeployRequestData', typedDeployRequestData);
      const suffixData = getSuffixData(typedDeployRequestData);
      // console.log('suffixData', suffixData);
      // All properties on a domain are optional

      const accounts = hre.config.networks.hardhat
        .accounts as HardhatNetworkHDAccountsConfig;
      // console.log('accounts', accounts);
      const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
        hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
        accounts.path + `/1`,
      );
      // console.log('user1Wallet.privateKey', user1Wallet.privateKey);
      const user1PrivateKey = Buffer.from(
        user1Wallet.privateKey.substring(2, 66),
        'hex',
      );

      const signature = getLocalEip712Signature(
        typedDeployRequestData,
        user1PrivateKey,
      );

      const ownerBalanceAtT0 = await hre.ethers.provider.getBalance(
        owner.address,
      );
      // console.debug('ownerBalanceAtT0', ownerBalanceAtT0);
      await expect(
        individualAccountFactoryContract
          .connect(owner)
          .relayedUserSmartWalletCreation(
            deployRequest.request,
            suffixData,
            feesReceiverAddress,
            signature,
          ),
      ).to.not.be.reverted;
      const ownerBalanceAtT1 = await hre.ethers.provider.getBalance(
        owner.address,
      );
      expect(individualAccount).to.be.exist;
      expect(ownerBalanceAtT0).to.not.be.equal(ownerBalanceAtT1);
    });

    // it('should create a new individual account in the expected address with user paying fee', async () => {
    //   const {
    //     individualAccountFactoryContract,
    //     individualAccountFactoryContractAddress,
    //     testDllrContractAddress,
    //     testDllrContract,
    //     owner,
    //     user1,
    //     user2,
    //   } = await loadFixture(deployIndividualAccountFactoryFixture);
    //   const tokenAmount = hre.ethers.parseEther('1').toString();
    //   const tokenGas = 55000;
    //   const feesReceiverAddress = owner.address;
    //   const index = 6;
    //   const expectedIndividualAccountAddress =
    //     await individualAccountFactoryContract
    //       .connect(user1)
    //       .getSmartWalletAddress(user1.address, user2.address, index);
    //   const individualAccount = await hre.ethers.getContractAt(
    //     'IndividualAccount',
    //     expectedIndividualAccountAddress,
    //   );
    //   expect(await individualAccount.getDeployedCode()).to.not.be.exist;

    //   // mint DLLR token to user1
    //   await testDllrContract.connect(owner).mint(user1.address, tokenAmount);
        
    //   expect(await testDllrContract.balanceOf(user1.address)).to.be.equal(hre.ethers.parseEther('1'));
    //   const deployRequest = toDeployRequest(
    //     {
    //       relayHub: owner.address,
    //       from: user1.address,
    //       tokenContract: testDllrContractAddress,
    //       tokenAmount: tokenAmount,
    //       tokenGas: tokenGas,
    //       recoverer: user2.address,
    //       index: index,
    //     },
    //     {
    //       callForwarder: individualAccountFactoryContractAddress,
    //       feesReceiver: feesReceiverAddress,
    //     },
    //   );
    //   // console.log('deployRequest', deployRequest);
    //   // generate suffixData
    //   // generate signature
    //   const typedDeployRequestData = new TypedDeployRequestData(
    //     Number(chainId.toString()),
    //     individualAccountFactoryContractAddress,
    //     deployRequest,
    //   );
    //   // console.log('typedDeployRequestData', typedDeployRequestData);
    //   const suffixData = getSuffixData(typedDeployRequestData);
    //   // console.log('suffixData', suffixData);
    //   // All properties on a domain are optional

    //   const accounts = hre.config.networks.hardhat
    //     .accounts as HardhatNetworkHDAccountsConfig;
    //   // console.log('accounts', accounts);
    //   const user1Wallet = hre.ethers.HDNodeWallet.fromMnemonic(
    //     hre.ethers.Mnemonic.fromPhrase(accounts.mnemonic),
    //     accounts.path + `/1`,
    //   );
    //   // console.log('user1Wallet.privateKey', user1Wallet.privateKey);
    //   const user1PrivateKey = Buffer.from(
    //     user1Wallet.privateKey.substring(2, 66),
    //     'hex',
    //   );

    //   const signature = getLocalEip712Signature(
    //     typedDeployRequestData,
    //     user1PrivateKey,
    //   );

    //   // const ownerBalanceAtT0 = await hre.ethers.provider.getBalance(
    //   //   owner.address,
    //   // );
    //   // console.debug('ownerBalanceAtT0', ownerBalanceAtT0);
    //   expect(await individualAccountFactoryContract
    //     .connect(owner)
    //     .relayedUserSmartWalletCreation(
    //       deployRequest.request,
    //       suffixData,
    //       feesReceiverAddress,
    //       signature,
    //     )).to.not.be.reverted;

    //   // const ownerBalanceAtT1 = await hre.ethers.provider.getBalance(
    //   //   owner.address,
    //   // );
    //   // const individualAccount = await hre.ethers.getContractAt(
    //   //   'IndividualAccount',
    //   //   expectedIndividualAccountAddress,
    //   // );
    //   // expect(individualAccount).to.be.exist;
    //   // expect(ownerBalanceAtT0).to.not.be.equal(ownerBalanceAtT1);
    // });
  });

  // describe('verify', () => {
  //   it('pass', async () => {
  //     const {
  //       individualAccountFactoryContractAddress,
  //       individualAccountFactoryContract,

  //       user1,
  //       user2,
  //     } = await loadFixture(deployIndividualAccountFactoryFixture);

  //     const mailToAddress = user2.address;

  //     const domain = {
  //       name: 'IndividualAccountFactory Enveloping Transaction',
  //       version: '1',
  //       chainId: chainId,
  //       verifyingContract: individualAccountFactoryContractAddress,
  //     };
  //     const types = {
  //       Mail: [
  //         { name: 'to', type: 'address' },
  //         { name: 'contents', type: 'string' },
  //       ],
  //     };
  //     const value = {
  //       to: mailToAddress,
  //       contents: 'very interesting',
  //     };

  //     const signature = await user1.signTypedData(domain, types, value);
  //     console.log(signature);

  //     await individualAccountFactoryContract
  //       .connect(user1)
  //       .verify(signature, mailToAddress, 'very interesting');
  //   });
  // });

  // describe('verify2', () => {
  //   it('pass', async () => {
  //     const {
  //       individualAccountFactoryContractAddress,
  //       individualAccountFactoryContract,
  //       dllrContractAddress,
  //       owner,
  //       user1,
  //       user2,
  //     } = await loadFixture(deployIndividualAccountFactoryFixture);
  //     console.log('chainId', chainId);

  //     const deployRequest = toDeployRequest(
  //       {
  //         relayHub: owner.address,
  //         from: user1.address,
  //         tokenContract: dllrContractAddress,
  //         tokenAmount: 0,
  //         tokenGas: 0,
  //         recoverer: user2.address,
  //         index: 0,
  //       },
  //       {
  //         callForwarder: individualAccountFactoryContractAddress,
  //       },
  //     );
  //     console.log('deployRequest', deployRequest);
  //     const domain = {
  //       name: 'IndividualAccountFactory Enveloping Transaction',
  //       version: '1',
  //       chainId: chainId,
  //       verifyingContract: individualAccountFactoryContractAddress,
  //     };

  //     const types = {
  //       RelayRequest: [
  //         { name: 'relayHub', type: 'address' },
  //         { name: 'from', type: 'address' },
  //         { name: 'to', type: 'address' },
  //         { name: 'recoverer', type: 'address' },
  //         { name: 'tokenContract', type: 'address' },
  //         { name: 'tokenAmount', type: 'uint256' },
  //         { name: 'tokenGas', type: 'uint256' },
  //         { name: 'value', type: 'uint256' },
  //         { name: 'nonce', type: 'uint256'},
  //         { name: 'validUntilTime', type: 'uint256' },
  //         { name: 'index', type: 'uint256' },
  //         { name: 'data', type: 'bytes' },

  //       ],
  //       // RelayData: [
  //       //   { name: 'gasPrice', type: 'uint256' },
  //       //   { name: 'feesReceiver', type: 'address' },
  //       //   { name: 'callForwarder', type: 'address' },
  //       //   { name: 'callVerifier', type: 'address' },
  //       // ]
  //     };
  //     const value = {
  //       relayHub: deployRequest.request.relayHub.toString().toLowerCase(),
  //       from: deployRequest.request.from.toString().toLowerCase(),
  //       to: deployRequest.request.to.toString().toLowerCase(),
  //       recoverer: deployRequest.request.recoverer.toString().toLowerCase(),
  //       tokenContract: deployRequest.request.tokenContract.toString().toLowerCase(),
  //       tokenAmount: deployRequest.request.tokenAmount,
  //       tokenGas: deployRequest.request.tokenGas,
  //       value: deployRequest.request.value,
  //       nonce: deployRequest.request.nonce,
  //       validUntilTime: deployRequest.request.validUntilTime,
  //       index: deployRequest.request.index,
  //       data: deployRequest.request.data,
  //       // data: {
  //       //   gasPrice: deployRequest.relayData.gasPrice,
  //       //   feesReceiver: deployRequest.relayData.feesReceiver.toString().toLowerCase(),
  //       //   callForwarder: deployRequest.relayData.callForwarder.toString().toLowerCase(),
  //       //   callVerifier: deployRequest.relayData.callVerifier.toString().toLowerCase(),
  //       // },
  //     };

  //     console.log("value", value)
  //     console.log("user1.adress", user1.address);
  //     const signature = await user1.signTypedData(domain, types, value);
  //     console.log("user1.signTypedData signature", signature);

  //     await individualAccountFactoryContract
  //       .connect(user1)
  //       .verify2(deployRequest.request, signature);
  //   });
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
