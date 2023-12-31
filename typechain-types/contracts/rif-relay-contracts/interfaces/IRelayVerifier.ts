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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

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

export declare namespace EnvelopingTypes {
  export type RelayDataStruct = {
    gasPrice: BigNumberish;
    feesReceiver: AddressLike;
    callForwarder: AddressLike;
    callVerifier: AddressLike;
  };

  export type RelayDataStructOutput = [
    gasPrice: bigint,
    feesReceiver: string,
    callForwarder: string,
    callVerifier: string
  ] & {
    gasPrice: bigint;
    feesReceiver: string;
    callForwarder: string;
    callVerifier: string;
  };

  export type RelayRequestStruct = {
    request: IForwarder.ForwardRequestStruct;
    relayData: EnvelopingTypes.RelayDataStruct;
  };

  export type RelayRequestStructOutput = [
    request: IForwarder.ForwardRequestStructOutput,
    relayData: EnvelopingTypes.RelayDataStructOutput
  ] & {
    request: IForwarder.ForwardRequestStructOutput;
    relayData: EnvelopingTypes.RelayDataStructOutput;
  };
}

export interface IRelayVerifierInterface extends Interface {
  getFunction(
    nameOrSignature: "verifyRelayedCall" | "versionVerifier"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "verifyRelayedCall",
    values: [EnvelopingTypes.RelayRequestStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "versionVerifier",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "verifyRelayedCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "versionVerifier",
    data: BytesLike
  ): Result;
}

export interface IRelayVerifier extends BaseContract {
  connect(runner?: ContractRunner | null): IRelayVerifier;
  waitForDeployment(): Promise<this>;

  interface: IRelayVerifierInterface;

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

  verifyRelayedCall: TypedContractMethod<
    [relayRequest: EnvelopingTypes.RelayRequestStruct, signature: BytesLike],
    [string],
    "nonpayable"
  >;

  versionVerifier: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "verifyRelayedCall"
  ): TypedContractMethod<
    [relayRequest: EnvelopingTypes.RelayRequestStruct, signature: BytesLike],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "versionVerifier"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
