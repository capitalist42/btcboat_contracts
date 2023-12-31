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
} from "../../common";

export declare namespace IForwarder {
  export type DeployRequestStruct = {
    relayHub: AddressLike;
    from: AddressLike;
    to: AddressLike;
    tokenContract: AddressLike;
    recoverer: AddressLike;
    value: BigNumberish;
    nonce: BigNumberish;
    tokenAmount: BigNumberish;
    tokenGas: BigNumberish;
    validUntilTime: BigNumberish;
    index: BigNumberish;
    data: BytesLike;
  };

  export type DeployRequestStructOutput = [
    relayHub: string,
    from: string,
    to: string,
    tokenContract: string,
    recoverer: string,
    value: bigint,
    nonce: bigint,
    tokenAmount: bigint,
    tokenGas: bigint,
    validUntilTime: bigint,
    index: bigint,
    data: string
  ] & {
    relayHub: string;
    from: string;
    to: string;
    tokenContract: string;
    recoverer: string;
    value: bigint;
    nonce: bigint;
    tokenAmount: bigint;
    tokenGas: bigint;
    validUntilTime: bigint;
    index: bigint;
    data: string;
  };
}

export interface ISmartWalletFactoryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "createUserSmartWallet"
      | "getCreationBytecode"
      | "getSmartWalletAddress"
      | "nonce"
      | "relayedUserSmartWalletCreation"
      | "runtimeCodeHash"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Deployed"): EventFragment;

  encodeFunctionData(
    functionFragment: "createUserSmartWallet",
    values: [AddressLike, AddressLike, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCreationBytecode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSmartWalletAddress",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "nonce", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "relayedUserSmartWalletCreation",
    values: [IForwarder.DeployRequestStruct, BytesLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "runtimeCodeHash",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createUserSmartWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCreationBytecode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSmartWalletAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "relayedUserSmartWalletCreation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "runtimeCodeHash",
    data: BytesLike
  ): Result;
}

export namespace DeployedEvent {
  export type InputTuple = [addr: AddressLike, salt: BigNumberish];
  export type OutputTuple = [addr: string, salt: bigint];
  export interface OutputObject {
    addr: string;
    salt: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ISmartWalletFactory extends BaseContract {
  connect(runner?: ContractRunner | null): ISmartWalletFactory;
  waitForDeployment(): Promise<this>;

  interface: ISmartWalletFactoryInterface;

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

  createUserSmartWallet: TypedContractMethod<
    [
      owner: AddressLike,
      recoverer: AddressLike,
      index: BigNumberish,
      sig: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getCreationBytecode: TypedContractMethod<[], [string], "view">;

  getSmartWalletAddress: TypedContractMethod<
    [owner: AddressLike, recoverer: AddressLike, index: BigNumberish],
    [string],
    "view"
  >;

  nonce: TypedContractMethod<[from: AddressLike], [bigint], "view">;

  relayedUserSmartWalletCreation: TypedContractMethod<
    [
      req: IForwarder.DeployRequestStruct,
      suffixData: BytesLike,
      feesReceiver: AddressLike,
      sig: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  runtimeCodeHash: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createUserSmartWallet"
  ): TypedContractMethod<
    [
      owner: AddressLike,
      recoverer: AddressLike,
      index: BigNumberish,
      sig: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getCreationBytecode"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getSmartWalletAddress"
  ): TypedContractMethod<
    [owner: AddressLike, recoverer: AddressLike, index: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[from: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "relayedUserSmartWalletCreation"
  ): TypedContractMethod<
    [
      req: IForwarder.DeployRequestStruct,
      suffixData: BytesLike,
      feesReceiver: AddressLike,
      sig: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "runtimeCodeHash"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "Deployed"
  ): TypedContractEvent<
    DeployedEvent.InputTuple,
    DeployedEvent.OutputTuple,
    DeployedEvent.OutputObject
  >;

  filters: {
    "Deployed(address,uint256)": TypedContractEvent<
      DeployedEvent.InputTuple,
      DeployedEvent.OutputTuple,
      DeployedEvent.OutputObject
    >;
    Deployed: TypedContractEvent<
      DeployedEvent.InputTuple,
      DeployedEvent.OutputTuple,
      DeployedEvent.OutputObject
    >;
  };
}
