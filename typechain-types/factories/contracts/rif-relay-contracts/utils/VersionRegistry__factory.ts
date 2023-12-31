/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  VersionRegistry,
  VersionRegistryInterface,
} from "../../../../contracts/rif-relay-contracts/utils/VersionRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "version",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "VersionAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "version",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "VersionCanceled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "version",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
    ],
    name: "addVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "version",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "cancelVersion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6104b88061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063715018a611610050578063715018a6146100945780638da5cb5b1461009c578063f2fde38b146100bb57600080fd5b8063089eae7e1461006c578063219ae67214610081575b600080fd5b61007f61007a36600461035b565b6100ce565b005b61007f61008f36600461035b565b6101b9565b61007f6101f5565b600054604080516001600160a01b039092168252519081900360200190f35b61007f6100c93660046103db565b610209565b6100d6610299565b836101285760405162461bcd60e51b815260206004820152600a60248201527f6d697373696e672069640000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b826101755760405162461bcd60e51b815260206004820152600f60248201527f6d697373696e672076657273696f6e0000000000000000000000000000000000604482015260640161011f565b837f56950023a84954108e1797b4f116b9339e395c7dfe94f9dd60b64806de93d3f8848484426040516101ab9493929190610434565b60405180910390a250505050565b6101c1610299565b837f488c2df78ad692792ecea5763ee0cb43065ea3110cf94e887b6f870129b70b508484846040516101ab9392919061045f565b6101fd610299565b61020760006102f3565b565b610211610299565b6001600160a01b03811661028d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161011f565b610296816102f3565b50565b6000546001600160a01b031633146102075760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161011f565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806000806060858703121561037157600080fd5b8435935060208501359250604085013567ffffffffffffffff8082111561039757600080fd5b818701915087601f8301126103ab57600080fd5b8135818111156103ba57600080fd5b8860208285010111156103cc57600080fd5b95989497505060200194505050565b6000602082840312156103ed57600080fd5b81356001600160a01b038116811461040457600080fd5b9392505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b84815260606020820152600061044e60608301858761040b565b905082604083015295945050505050565b83815260406020820152600061047960408301848661040b565b9594505050505056fea2646970667358221220e3971732e5d483afd92cf2a90811db1cc193d6a693de1be180858ee35b82305164736f6c63430008130033";

type VersionRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VersionRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VersionRegistry__factory extends ContractFactory {
  constructor(...args: VersionRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      VersionRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): VersionRegistry__factory {
    return super.connect(runner) as VersionRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VersionRegistryInterface {
    return new Interface(_abi) as VersionRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): VersionRegistry {
    return new Contract(address, _abi, runner) as unknown as VersionRegistry;
  }
}
