/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace IForwarder {
  export type ForwardRequestStruct = {
    relayHub: AddressLike;
    from: AddressLike;
    to: AddressLike;
    tokenContract: AddressLike;
    value: BigNumberish;
    gas: BigNumberish;
    nonce: BigNumberish;
    tokenAmount: BigNumberish;
    tokenGas: BigNumberish;
    validUntilTime: BigNumberish;
    data: BytesLike;
  };

  export type ForwardRequestStructOutput = [
    relayHub: string,
    from: string,
    to: string,
    tokenContract: string,
    value: bigint,
    gas: bigint,
    nonce: bigint,
    tokenAmount: bigint,
    tokenGas: bigint,
    validUntilTime: bigint,
    data: string
  ] & {
    relayHub: string;
    from: string;
    to: string;
    tokenContract: string;
    value: bigint;
    gas: bigint;
    nonce: bigint;
    tokenAmount: bigint;
    tokenGas: bigint;
    validUntilTime: bigint;
    data: string;
  };
}

export interface IndividualAccountInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DATA_VERSION_HASH"
      | "directExecute(address,bytes)"
      | "directExecute(address,uint256,bytes)"
      | "eip712Domain"
      | "execute"
      | "getOwner"
      | "initialize"
      | "isInitialized"
      | "nonce"
      | "recover"
      | "verify(bytes32,(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)"
      | "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes32,bytes)"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;

  encodeFunctionData(
    functionFragment: "DATA_VERSION_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "directExecute(address,bytes)",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "directExecute(address,uint256,bytes)",
    values: [AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [BytesLike, IForwarder.ForwardRequestStruct, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike, AddressLike, AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "recover",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verify(bytes32,(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)",
    values: [BytesLike, IForwarder.ForwardRequestStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes32,bytes)",
    values: [IForwarder.ForwardRequestStruct, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "DATA_VERSION_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "directExecute(address,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "directExecute(address,uint256,bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "recover", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verify(bytes32,(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes32,bytes)",
    data: BytesLike
  ): Result;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IndividualAccount extends BaseContract {
  connect(runner?: ContractRunner | null): IndividualAccount;
  waitForDeployment(): Promise<this>;

  interface: IndividualAccountInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  DATA_VERSION_HASH: TypedContractMethod<[], [string], "view">;

  "directExecute(address,bytes)": TypedContractMethod<
    [to: AddressLike, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  "directExecute(address,uint256,bytes)": TypedContractMethod<
    [to: AddressLike, value: BigNumberish, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  execute: TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequset: IForwarder.ForwardRequestStruct,
      feesReceiver: AddressLike,
      sig: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  getOwner: TypedContractMethod<[], [string], "view">;

  initialize: TypedContractMethod<
    [
      owner: AddressLike,
      tokenAddr: AddressLike,
      tokenRecipient: AddressLike,
      tokenAmount: BigNumberish,
      tokenGas: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  isInitialized: TypedContractMethod<[], [boolean], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  recover: TypedContractMethod<
    [
      owner: AddressLike,
      factory: AddressLike,
      swTemplate: AddressLike,
      destinationContract: AddressLike,
      index: BigNumberish,
      data: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  "verify(bytes32,(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)": TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      signature: BytesLike
    ],
    [void],
    "view"
  >;

  "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes32,bytes)": TypedContractMethod<
    [
      forwardRequest: IForwarder.ForwardRequestStruct,
      suffixData: BytesLike,
      signature: BytesLike
    ],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DATA_VERSION_HASH"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "directExecute(address,bytes)"
  ): TypedContractMethod<
    [to: AddressLike, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "directExecute(address,uint256,bytes)"
  ): TypedContractMethod<
    [to: AddressLike, value: BigNumberish, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "execute"
  ): TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequset: IForwarder.ForwardRequestStruct,
      feesReceiver: AddressLike,
      sig: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      owner: AddressLike,
      tokenAddr: AddressLike,
      tokenRecipient: AddressLike,
      tokenAmount: BigNumberish,
      tokenGas: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isInitialized"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "recover"
  ): TypedContractMethod<
    [
      owner: AddressLike,
      factory: AddressLike,
      swTemplate: AddressLike,
      destinationContract: AddressLike,
      index: BigNumberish,
      data: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "verify(bytes32,(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes)"
  ): TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      signature: BytesLike
    ],
    [void],
    "view"
  >;
  getFunction(
    nameOrSignature: "verify((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes),bytes32,bytes)"
  ): TypedContractMethod<
    [
      forwardRequest: IForwarder.ForwardRequestStruct,
      suffixData: BytesLike,
      signature: BytesLike
    ],
    [void],
    "view"
  >;

  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;

  filters: {
    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
  };
}