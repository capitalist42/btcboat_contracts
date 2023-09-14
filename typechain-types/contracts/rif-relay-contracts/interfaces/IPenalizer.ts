/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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

export interface IPenalizerInterface extends Interface {
  getFunction(
    nameOrSignature: "penalizeRepeatedNonce" | "versionPenalizer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "penalizeRepeatedNonce",
    values: [BytesLike, BytesLike, BytesLike, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "versionPenalizer",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "penalizeRepeatedNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "versionPenalizer",
    data: BytesLike
  ): Result;
}

export interface IPenalizer extends BaseContract {
  connect(runner?: ContractRunner | null): IPenalizer;
  waitForDeployment(): Promise<this>;

  interface: IPenalizerInterface;

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

  penalizeRepeatedNonce: TypedContractMethod<
    [
      unsignedTx1: BytesLike,
      signature1: BytesLike,
      unsignedTx2: BytesLike,
      signature2: BytesLike,
      hub: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  versionPenalizer: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "penalizeRepeatedNonce"
  ): TypedContractMethod<
    [
      unsignedTx1: BytesLike,
      signature1: BytesLike,
      unsignedTx2: BytesLike,
      signature2: BytesLike,
      hub: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "versionPenalizer"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}