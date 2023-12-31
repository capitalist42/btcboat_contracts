/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IApproveAndCall,
  IApproveAndCallInterface,
} from "../../../../sovryn-mynt/contracts/interfaces/IApproveAndCall";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "receiveApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IApproveAndCall__factory {
  static readonly abi = _abi;
  static createInterface(): IApproveAndCallInterface {
    return new Interface(_abi) as IApproveAndCallInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IApproveAndCall {
    return new Contract(address, _abi, runner) as unknown as IApproveAndCall;
  }
}
