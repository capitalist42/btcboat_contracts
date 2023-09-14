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

export interface IForwarderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "directExecute"
      | "execute"
      | "getOwner"
      | "nonce"
      | "verify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "directExecute",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [BytesLike, IForwarder.ForwardRequestStruct, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [BytesLike, IForwarder.ForwardRequestStruct, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "directExecute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
}

export interface IForwarder extends BaseContract {
  connect(runner?: ContractRunner | null): IForwarder;
  waitForDeployment(): Promise<this>;

  interface: IForwarderInterface;

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

  directExecute: TypedContractMethod<
    [to: AddressLike, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  execute: TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      feesReceiver: AddressLike,
      signature: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;

  getOwner: TypedContractMethod<[], [string], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  verify: TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      signature: BytesLike
    ],
    [void],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "directExecute"
  ): TypedContractMethod<
    [to: AddressLike, data: BytesLike],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "execute"
  ): TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      feesReceiver: AddressLike,
      signature: BytesLike
    ],
    [[boolean, string] & { success: boolean; ret: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "verify"
  ): TypedContractMethod<
    [
      suffixData: BytesLike,
      forwardRequest: IForwarder.ForwardRequestStruct,
      signature: BytesLike
    ],
    [void],
    "view"
  >;

  filters: {};
}
