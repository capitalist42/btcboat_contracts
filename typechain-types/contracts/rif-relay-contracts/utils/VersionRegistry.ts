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
} from "../../../common";

export interface VersionRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addVersion"
      | "cancelVersion"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "OwnershipTransferred"
      | "VersionAdded"
      | "VersionCanceled"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addVersion",
    values: [BytesLike, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelVersion",
    values: [BytesLike, BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "addVersion", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelVersion",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VersionAddedEvent {
  export type InputTuple = [
    id: BytesLike,
    version: BytesLike,
    value: string,
    time: BigNumberish
  ];
  export type OutputTuple = [
    id: string,
    version: string,
    value: string,
    time: bigint
  ];
  export interface OutputObject {
    id: string;
    version: string;
    value: string;
    time: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VersionCanceledEvent {
  export type InputTuple = [id: BytesLike, version: BytesLike, reason: string];
  export type OutputTuple = [id: string, version: string, reason: string];
  export interface OutputObject {
    id: string;
    version: string;
    reason: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface VersionRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): VersionRegistry;
  waitForDeployment(): Promise<this>;

  interface: VersionRegistryInterface;

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

  addVersion: TypedContractMethod<
    [id: BytesLike, version: BytesLike, value: string],
    [void],
    "nonpayable"
  >;

  cancelVersion: TypedContractMethod<
    [id: BytesLike, version: BytesLike, reason: string],
    [void],
    "nonpayable"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addVersion"
  ): TypedContractMethod<
    [id: BytesLike, version: BytesLike, value: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "cancelVersion"
  ): TypedContractMethod<
    [id: BytesLike, version: BytesLike, reason: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "VersionAdded"
  ): TypedContractEvent<
    VersionAddedEvent.InputTuple,
    VersionAddedEvent.OutputTuple,
    VersionAddedEvent.OutputObject
  >;
  getEvent(
    key: "VersionCanceled"
  ): TypedContractEvent<
    VersionCanceledEvent.InputTuple,
    VersionCanceledEvent.OutputTuple,
    VersionCanceledEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "VersionAdded(bytes32,bytes32,string,uint256)": TypedContractEvent<
      VersionAddedEvent.InputTuple,
      VersionAddedEvent.OutputTuple,
      VersionAddedEvent.OutputObject
    >;
    VersionAdded: TypedContractEvent<
      VersionAddedEvent.InputTuple,
      VersionAddedEvent.OutputTuple,
      VersionAddedEvent.OutputObject
    >;

    "VersionCanceled(bytes32,bytes32,string)": TypedContractEvent<
      VersionCanceledEvent.InputTuple,
      VersionCanceledEvent.OutputTuple,
      VersionCanceledEvent.OutputObject
    >;
    VersionCanceled: TypedContractEvent<
      VersionCanceledEvent.InputTuple,
      VersionCanceledEvent.OutputTuple,
      VersionCanceledEvent.OutputObject
    >;
  };
}