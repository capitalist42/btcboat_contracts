/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC5267__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Permit__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712__factory>;
    getContractFactory(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ShortStrings__factory>;
    getContractFactory(
      name: "IndividualAccount",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IndividualAccount__factory>;
    getContractFactory(
      name: "IndividualAccountDeployVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IndividualAccountDeployVerifier__factory>;
    getContractFactory(
      name: "IndividualAccountFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IndividualAccountFactory__factory>;
    getContractFactory(
      name: "IndividualAccountRelayVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IndividualAccountRelayVerifier__factory>;
    getContractFactory(
      name: "TestDLLR",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestDLLR__factory>;
    getContractFactory(
      name: "IDeployVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDeployVerifier__factory>;
    getContractFactory(
      name: "IForwarder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IForwarder__factory>;
    getContractFactory(
      name: "IPenalizer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPenalizer__factory>;
    getContractFactory(
      name: "IRelayHub",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRelayHub__factory>;
    getContractFactory(
      name: "IRelayHub",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRelayHub__factory>;
    getContractFactory(
      name: "IRelayVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRelayVerifier__factory>;
    getContractFactory(
      name: "ISmartWalletFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISmartWalletFactory__factory>;
    getContractFactory(
      name: "IVersionRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVersionRegistry__factory>;
    getContractFactory(
      name: "IWalletFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWalletFactory__factory>;
    getContractFactory(
      name: "Penalizer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Penalizer__factory>;
    getContractFactory(
      name: "RelayHub",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RelayHub__factory>;
    getContractFactory(
      name: "TokenHandler",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenHandler__factory>;
    getContractFactory(
      name: "VersionRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VersionRegistry__factory>;
    getContractFactory(
      name: "IApproveAndCall",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IApproveAndCall__factory>;
    getContractFactory(
      name: "IProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IProxy__factory>;
    getContractFactory(
      name: "DLLR",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DLLR__factory>;
    getContractFactory(
      name: "MetaAssetToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MetaAssetToken__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "IERC5267",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC5267>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Permit",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Permit>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20Permit",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "EIP712",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712>;
    getContractAt(
      name: "ShortStrings",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ShortStrings>;
    getContractAt(
      name: "IndividualAccount",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IndividualAccount>;
    getContractAt(
      name: "IndividualAccountDeployVerifier",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IndividualAccountDeployVerifier>;
    getContractAt(
      name: "IndividualAccountFactory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IndividualAccountFactory>;
    getContractAt(
      name: "IndividualAccountRelayVerifier",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IndividualAccountRelayVerifier>;
    getContractAt(
      name: "TestDLLR",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TestDLLR>;
    getContractAt(
      name: "IDeployVerifier",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IDeployVerifier>;
    getContractAt(
      name: "IForwarder",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IForwarder>;
    getContractAt(
      name: "IPenalizer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IPenalizer>;
    getContractAt(
      name: "IRelayHub",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IRelayHub>;
    getContractAt(
      name: "IRelayHub",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IRelayHub>;
    getContractAt(
      name: "IRelayVerifier",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IRelayVerifier>;
    getContractAt(
      name: "ISmartWalletFactory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISmartWalletFactory>;
    getContractAt(
      name: "IVersionRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVersionRegistry>;
    getContractAt(
      name: "IWalletFactory",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IWalletFactory>;
    getContractAt(
      name: "Penalizer",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Penalizer>;
    getContractAt(
      name: "RelayHub",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.RelayHub>;
    getContractAt(
      name: "TokenHandler",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenHandler>;
    getContractAt(
      name: "VersionRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VersionRegistry>;
    getContractAt(
      name: "IApproveAndCall",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IApproveAndCall>;
    getContractAt(
      name: "IProxy",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IProxy>;
    getContractAt(
      name: "DLLR",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.DLLR>;
    getContractAt(
      name: "MetaAssetToken",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.MetaAssetToken>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC5267",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "ERC20Permit",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20Permit>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "EIP712",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "ShortStrings",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "IndividualAccount",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccount>;
    deployContract(
      name: "IndividualAccountDeployVerifier",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountDeployVerifier>;
    deployContract(
      name: "IndividualAccountFactory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountFactory>;
    deployContract(
      name: "IndividualAccountRelayVerifier",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountRelayVerifier>;
    deployContract(
      name: "TestDLLR",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TestDLLR>;
    deployContract(
      name: "IDeployVerifier",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IDeployVerifier>;
    deployContract(
      name: "IForwarder",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IForwarder>;
    deployContract(
      name: "IPenalizer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPenalizer>;
    deployContract(
      name: "IRelayHub",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayHub>;
    deployContract(
      name: "IRelayHub",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayHub>;
    deployContract(
      name: "IRelayVerifier",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayVerifier>;
    deployContract(
      name: "ISmartWalletFactory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISmartWalletFactory>;
    deployContract(
      name: "IVersionRegistry",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVersionRegistry>;
    deployContract(
      name: "IWalletFactory",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWalletFactory>;
    deployContract(
      name: "Penalizer",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Penalizer>;
    deployContract(
      name: "RelayHub",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.RelayHub>;
    deployContract(
      name: "TokenHandler",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenHandler>;
    deployContract(
      name: "VersionRegistry",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VersionRegistry>;
    deployContract(
      name: "IApproveAndCall",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IApproveAndCall>;
    deployContract(
      name: "IProxy",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IProxy>;
    deployContract(
      name: "DLLR",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.DLLR>;
    deployContract(
      name: "MetaAssetToken",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MetaAssetToken>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "IERC5267",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC5267>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "ERC20Permit",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20Permit>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20Permit",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "EIP712",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.EIP712>;
    deployContract(
      name: "ShortStrings",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ShortStrings>;
    deployContract(
      name: "IndividualAccount",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccount>;
    deployContract(
      name: "IndividualAccountDeployVerifier",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountDeployVerifier>;
    deployContract(
      name: "IndividualAccountFactory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountFactory>;
    deployContract(
      name: "IndividualAccountRelayVerifier",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IndividualAccountRelayVerifier>;
    deployContract(
      name: "TestDLLR",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TestDLLR>;
    deployContract(
      name: "IDeployVerifier",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IDeployVerifier>;
    deployContract(
      name: "IForwarder",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IForwarder>;
    deployContract(
      name: "IPenalizer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IPenalizer>;
    deployContract(
      name: "IRelayHub",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayHub>;
    deployContract(
      name: "IRelayHub",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayHub>;
    deployContract(
      name: "IRelayVerifier",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IRelayVerifier>;
    deployContract(
      name: "ISmartWalletFactory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISmartWalletFactory>;
    deployContract(
      name: "IVersionRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVersionRegistry>;
    deployContract(
      name: "IWalletFactory",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IWalletFactory>;
    deployContract(
      name: "Penalizer",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Penalizer>;
    deployContract(
      name: "RelayHub",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.RelayHub>;
    deployContract(
      name: "TokenHandler",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TokenHandler>;
    deployContract(
      name: "VersionRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VersionRegistry>;
    deployContract(
      name: "IApproveAndCall",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IApproveAndCall>;
    deployContract(
      name: "IProxy",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IProxy>;
    deployContract(
      name: "DLLR",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.DLLR>;
    deployContract(
      name: "MetaAssetToken",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MetaAssetToken>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
