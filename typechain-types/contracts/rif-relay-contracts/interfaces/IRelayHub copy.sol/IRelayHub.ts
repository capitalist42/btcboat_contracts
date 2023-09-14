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
} from "../../../../common";

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

  export type DeployRequestStruct = {
    request: IForwarder.DeployRequestStruct;
    relayData: EnvelopingTypes.RelayDataStruct;
  };

  export type DeployRequestStructOutput = [
    request: IForwarder.DeployRequestStructOutput,
    relayData: EnvelopingTypes.RelayDataStructOutput
  ] & {
    request: IForwarder.DeployRequestStructOutput;
    relayData: EnvelopingTypes.RelayDataStructOutput;
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

export declare namespace IRelayHub {
  export type RelayManagerDataStruct = {
    manager: AddressLike;
    currentlyStaked: boolean;
    registered: boolean;
    url: string;
  };

  export type RelayManagerDataStructOutput = [
    manager: string,
    currentlyStaked: boolean,
    registered: boolean,
    url: string
  ] & {
    manager: string;
    currentlyStaked: boolean;
    registered: boolean;
    url: string;
  };

  export type StakeInfoStruct = {
    stake: BigNumberish;
    unstakeDelay: BigNumberish;
    withdrawBlock: BigNumberish;
    owner: AddressLike;
  };

  export type StakeInfoStructOutput = [
    stake: bigint,
    unstakeDelay: bigint,
    withdrawBlock: bigint,
    owner: string
  ] & {
    stake: bigint;
    unstakeDelay: bigint;
    withdrawBlock: bigint;
    owner: string;
  };
}

export interface IRelayHubInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addRelayWorkers"
      | "deployCall"
      | "disableRelayWorkers"
      | "getRelayInfo"
      | "getStakeInfo"
      | "isRelayManagerStaked"
      | "maxWorkerCount"
      | "minimumEntryDepositValue"
      | "minimumStake"
      | "minimumUnstakeDelay"
      | "penalize"
      | "penalizer"
      | "registerRelayServer"
      | "relayCall"
      | "stakeForAddress"
      | "unlockStake"
      | "versionHub"
      | "withdrawStake"
      | "workerCount"
      | "workerToManager"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Penalized"
      | "RelayServerRegistered"
      | "RelayWorkersAdded"
      | "RelayWorkersDisabled"
      | "StakeAdded"
      | "StakePenalized"
      | "StakeUnlocked"
      | "StakeWithdrawn"
      | "TransactionRelayed"
      | "TransactionRelayedButRevertedByRecipient"
      | "TransactionResult"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addRelayWorkers",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "deployCall",
    values: [EnvelopingTypes.DeployRequestStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "disableRelayWorkers",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getRelayInfo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakeInfo",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isRelayManagerStaked",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "maxWorkerCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimumEntryDepositValue",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimumStake",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "minimumUnstakeDelay",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "penalize",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "penalizer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerRelayServer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "relayCall",
    values: [EnvelopingTypes.RelayRequestStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeForAddress",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockStake",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "versionHub",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawStake",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "workerCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "workerToManager",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addRelayWorkers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deployCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "disableRelayWorkers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRelayInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakeInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRelayManagerStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxWorkerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumEntryDepositValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "minimumUnstakeDelay",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "penalize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "penalizer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerRelayServer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "relayCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "stakeForAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "versionHub", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "workerCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "workerToManager",
    data: BytesLike
  ): Result;
}

export namespace PenalizedEvent {
  export type InputTuple = [
    relayWorker: AddressLike,
    sender: AddressLike,
    reward: BigNumberish
  ];
  export type OutputTuple = [
    relayWorker: string,
    sender: string,
    reward: bigint
  ];
  export interface OutputObject {
    relayWorker: string;
    sender: string;
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RelayServerRegisteredEvent {
  export type InputTuple = [relayManager: AddressLike, relayUrl: string];
  export type OutputTuple = [relayManager: string, relayUrl: string];
  export interface OutputObject {
    relayManager: string;
    relayUrl: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RelayWorkersAddedEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    newRelayWorkers: AddressLike[],
    workersCount: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    newRelayWorkers: string[],
    workersCount: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    newRelayWorkers: string[];
    workersCount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RelayWorkersDisabledEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    relayWorkers: AddressLike[],
    workersCount: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    relayWorkers: string[],
    workersCount: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    relayWorkers: string[];
    workersCount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakeAddedEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    owner: AddressLike,
    stake: BigNumberish,
    unstakeDelay: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    owner: string,
    stake: bigint,
    unstakeDelay: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    owner: string;
    stake: bigint;
    unstakeDelay: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakePenalizedEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    beneficiary: AddressLike,
    reward: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    beneficiary: string,
    reward: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    beneficiary: string;
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakeUnlockedEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    owner: AddressLike,
    withdrawBlock: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    owner: string,
    withdrawBlock: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    owner: string;
    withdrawBlock: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakeWithdrawnEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    owner: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    relayManager: string,
    owner: string,
    amount: bigint
  ];
  export interface OutputObject {
    relayManager: string;
    owner: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransactionRelayedEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    relayWorker: AddressLike,
    relayRequestSigHash: BytesLike,
    relayedCallReturnValue: BytesLike
  ];
  export type OutputTuple = [
    relayManager: string,
    relayWorker: string,
    relayRequestSigHash: string,
    relayedCallReturnValue: string
  ];
  export interface OutputObject {
    relayManager: string;
    relayWorker: string;
    relayRequestSigHash: string;
    relayedCallReturnValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransactionRelayedButRevertedByRecipientEvent {
  export type InputTuple = [
    relayManager: AddressLike,
    relayWorker: AddressLike,
    relayRequestSigHash: BytesLike,
    reason: BytesLike
  ];
  export type OutputTuple = [
    relayManager: string,
    relayWorker: string,
    relayRequestSigHash: string,
    reason: string
  ];
  export interface OutputObject {
    relayManager: string;
    relayWorker: string;
    relayRequestSigHash: string;
    reason: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransactionResultEvent {
  export type InputTuple = [returnValue: BytesLike];
  export type OutputTuple = [returnValue: string];
  export interface OutputObject {
    returnValue: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IRelayHub extends BaseContract {
  connect(runner?: ContractRunner | null): IRelayHub;
  waitForDeployment(): Promise<this>;

  interface: IRelayHubInterface;

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

  addRelayWorkers: TypedContractMethod<
    [newRelayWorkers: AddressLike[]],
    [void],
    "nonpayable"
  >;

  deployCall: TypedContractMethod<
    [deployRequest: EnvelopingTypes.DeployRequestStruct, signature: BytesLike],
    [void],
    "nonpayable"
  >;

  disableRelayWorkers: TypedContractMethod<
    [relayWorkers: AddressLike[]],
    [void],
    "nonpayable"
  >;

  getRelayInfo: TypedContractMethod<
    [relayManager: AddressLike],
    [IRelayHub.RelayManagerDataStructOutput],
    "view"
  >;

  getStakeInfo: TypedContractMethod<
    [relayManager: AddressLike],
    [IRelayHub.StakeInfoStructOutput],
    "view"
  >;

  isRelayManagerStaked: TypedContractMethod<
    [relayManager: AddressLike],
    [boolean],
    "view"
  >;

  maxWorkerCount: TypedContractMethod<[], [bigint], "view">;

  minimumEntryDepositValue: TypedContractMethod<[], [bigint], "view">;

  minimumStake: TypedContractMethod<[], [bigint], "view">;

  minimumUnstakeDelay: TypedContractMethod<[], [bigint], "view">;

  penalize: TypedContractMethod<
    [relayWorker: AddressLike, beneficiary: AddressLike],
    [void],
    "nonpayable"
  >;

  penalizer: TypedContractMethod<[], [string], "view">;

  registerRelayServer: TypedContractMethod<[url: string], [void], "nonpayable">;

  relayCall: TypedContractMethod<
    [relayRequest: EnvelopingTypes.RelayRequestStruct, signature: BytesLike],
    [boolean],
    "nonpayable"
  >;

  stakeForAddress: TypedContractMethod<
    [relayManager: AddressLike, unstakeDelay: BigNumberish],
    [void],
    "payable"
  >;

  unlockStake: TypedContractMethod<
    [relayManager: AddressLike],
    [void],
    "nonpayable"
  >;

  versionHub: TypedContractMethod<[], [string], "view">;

  withdrawStake: TypedContractMethod<
    [relayManager: AddressLike],
    [void],
    "nonpayable"
  >;

  workerCount: TypedContractMethod<[manager: AddressLike], [bigint], "view">;

  workerToManager: TypedContractMethod<[worker: AddressLike], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addRelayWorkers"
  ): TypedContractMethod<
    [newRelayWorkers: AddressLike[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "deployCall"
  ): TypedContractMethod<
    [deployRequest: EnvelopingTypes.DeployRequestStruct, signature: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "disableRelayWorkers"
  ): TypedContractMethod<[relayWorkers: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getRelayInfo"
  ): TypedContractMethod<
    [relayManager: AddressLike],
    [IRelayHub.RelayManagerDataStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStakeInfo"
  ): TypedContractMethod<
    [relayManager: AddressLike],
    [IRelayHub.StakeInfoStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "isRelayManagerStaked"
  ): TypedContractMethod<[relayManager: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "maxWorkerCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "minimumEntryDepositValue"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "minimumStake"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "minimumUnstakeDelay"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "penalize"
  ): TypedContractMethod<
    [relayWorker: AddressLike, beneficiary: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "penalizer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registerRelayServer"
  ): TypedContractMethod<[url: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "relayCall"
  ): TypedContractMethod<
    [relayRequest: EnvelopingTypes.RelayRequestStruct, signature: BytesLike],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "stakeForAddress"
  ): TypedContractMethod<
    [relayManager: AddressLike, unstakeDelay: BigNumberish],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "unlockStake"
  ): TypedContractMethod<[relayManager: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "versionHub"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawStake"
  ): TypedContractMethod<[relayManager: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "workerCount"
  ): TypedContractMethod<[manager: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "workerToManager"
  ): TypedContractMethod<[worker: AddressLike], [string], "view">;

  getEvent(
    key: "Penalized"
  ): TypedContractEvent<
    PenalizedEvent.InputTuple,
    PenalizedEvent.OutputTuple,
    PenalizedEvent.OutputObject
  >;
  getEvent(
    key: "RelayServerRegistered"
  ): TypedContractEvent<
    RelayServerRegisteredEvent.InputTuple,
    RelayServerRegisteredEvent.OutputTuple,
    RelayServerRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "RelayWorkersAdded"
  ): TypedContractEvent<
    RelayWorkersAddedEvent.InputTuple,
    RelayWorkersAddedEvent.OutputTuple,
    RelayWorkersAddedEvent.OutputObject
  >;
  getEvent(
    key: "RelayWorkersDisabled"
  ): TypedContractEvent<
    RelayWorkersDisabledEvent.InputTuple,
    RelayWorkersDisabledEvent.OutputTuple,
    RelayWorkersDisabledEvent.OutputObject
  >;
  getEvent(
    key: "StakeAdded"
  ): TypedContractEvent<
    StakeAddedEvent.InputTuple,
    StakeAddedEvent.OutputTuple,
    StakeAddedEvent.OutputObject
  >;
  getEvent(
    key: "StakePenalized"
  ): TypedContractEvent<
    StakePenalizedEvent.InputTuple,
    StakePenalizedEvent.OutputTuple,
    StakePenalizedEvent.OutputObject
  >;
  getEvent(
    key: "StakeUnlocked"
  ): TypedContractEvent<
    StakeUnlockedEvent.InputTuple,
    StakeUnlockedEvent.OutputTuple,
    StakeUnlockedEvent.OutputObject
  >;
  getEvent(
    key: "StakeWithdrawn"
  ): TypedContractEvent<
    StakeWithdrawnEvent.InputTuple,
    StakeWithdrawnEvent.OutputTuple,
    StakeWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "TransactionRelayed"
  ): TypedContractEvent<
    TransactionRelayedEvent.InputTuple,
    TransactionRelayedEvent.OutputTuple,
    TransactionRelayedEvent.OutputObject
  >;
  getEvent(
    key: "TransactionRelayedButRevertedByRecipient"
  ): TypedContractEvent<
    TransactionRelayedButRevertedByRecipientEvent.InputTuple,
    TransactionRelayedButRevertedByRecipientEvent.OutputTuple,
    TransactionRelayedButRevertedByRecipientEvent.OutputObject
  >;
  getEvent(
    key: "TransactionResult"
  ): TypedContractEvent<
    TransactionResultEvent.InputTuple,
    TransactionResultEvent.OutputTuple,
    TransactionResultEvent.OutputObject
  >;

  filters: {
    "Penalized(address,address,uint256)": TypedContractEvent<
      PenalizedEvent.InputTuple,
      PenalizedEvent.OutputTuple,
      PenalizedEvent.OutputObject
    >;
    Penalized: TypedContractEvent<
      PenalizedEvent.InputTuple,
      PenalizedEvent.OutputTuple,
      PenalizedEvent.OutputObject
    >;

    "RelayServerRegistered(address,string)": TypedContractEvent<
      RelayServerRegisteredEvent.InputTuple,
      RelayServerRegisteredEvent.OutputTuple,
      RelayServerRegisteredEvent.OutputObject
    >;
    RelayServerRegistered: TypedContractEvent<
      RelayServerRegisteredEvent.InputTuple,
      RelayServerRegisteredEvent.OutputTuple,
      RelayServerRegisteredEvent.OutputObject
    >;

    "RelayWorkersAdded(address,address[],uint256)": TypedContractEvent<
      RelayWorkersAddedEvent.InputTuple,
      RelayWorkersAddedEvent.OutputTuple,
      RelayWorkersAddedEvent.OutputObject
    >;
    RelayWorkersAdded: TypedContractEvent<
      RelayWorkersAddedEvent.InputTuple,
      RelayWorkersAddedEvent.OutputTuple,
      RelayWorkersAddedEvent.OutputObject
    >;

    "RelayWorkersDisabled(address,address[],uint256)": TypedContractEvent<
      RelayWorkersDisabledEvent.InputTuple,
      RelayWorkersDisabledEvent.OutputTuple,
      RelayWorkersDisabledEvent.OutputObject
    >;
    RelayWorkersDisabled: TypedContractEvent<
      RelayWorkersDisabledEvent.InputTuple,
      RelayWorkersDisabledEvent.OutputTuple,
      RelayWorkersDisabledEvent.OutputObject
    >;

    "StakeAdded(address,address,uint256,uint256)": TypedContractEvent<
      StakeAddedEvent.InputTuple,
      StakeAddedEvent.OutputTuple,
      StakeAddedEvent.OutputObject
    >;
    StakeAdded: TypedContractEvent<
      StakeAddedEvent.InputTuple,
      StakeAddedEvent.OutputTuple,
      StakeAddedEvent.OutputObject
    >;

    "StakePenalized(address,address,uint256)": TypedContractEvent<
      StakePenalizedEvent.InputTuple,
      StakePenalizedEvent.OutputTuple,
      StakePenalizedEvent.OutputObject
    >;
    StakePenalized: TypedContractEvent<
      StakePenalizedEvent.InputTuple,
      StakePenalizedEvent.OutputTuple,
      StakePenalizedEvent.OutputObject
    >;

    "StakeUnlocked(address,address,uint256)": TypedContractEvent<
      StakeUnlockedEvent.InputTuple,
      StakeUnlockedEvent.OutputTuple,
      StakeUnlockedEvent.OutputObject
    >;
    StakeUnlocked: TypedContractEvent<
      StakeUnlockedEvent.InputTuple,
      StakeUnlockedEvent.OutputTuple,
      StakeUnlockedEvent.OutputObject
    >;

    "StakeWithdrawn(address,address,uint256)": TypedContractEvent<
      StakeWithdrawnEvent.InputTuple,
      StakeWithdrawnEvent.OutputTuple,
      StakeWithdrawnEvent.OutputObject
    >;
    StakeWithdrawn: TypedContractEvent<
      StakeWithdrawnEvent.InputTuple,
      StakeWithdrawnEvent.OutputTuple,
      StakeWithdrawnEvent.OutputObject
    >;

    "TransactionRelayed(address,address,bytes32,bytes)": TypedContractEvent<
      TransactionRelayedEvent.InputTuple,
      TransactionRelayedEvent.OutputTuple,
      TransactionRelayedEvent.OutputObject
    >;
    TransactionRelayed: TypedContractEvent<
      TransactionRelayedEvent.InputTuple,
      TransactionRelayedEvent.OutputTuple,
      TransactionRelayedEvent.OutputObject
    >;

    "TransactionRelayedButRevertedByRecipient(address,address,bytes32,bytes)": TypedContractEvent<
      TransactionRelayedButRevertedByRecipientEvent.InputTuple,
      TransactionRelayedButRevertedByRecipientEvent.OutputTuple,
      TransactionRelayedButRevertedByRecipientEvent.OutputObject
    >;
    TransactionRelayedButRevertedByRecipient: TypedContractEvent<
      TransactionRelayedButRevertedByRecipientEvent.InputTuple,
      TransactionRelayedButRevertedByRecipientEvent.OutputTuple,
      TransactionRelayedButRevertedByRecipientEvent.OutputObject
    >;

    "TransactionResult(bytes)": TypedContractEvent<
      TransactionResultEvent.InputTuple,
      TransactionResultEvent.OutputTuple,
      TransactionResultEvent.OutputObject
    >;
    TransactionResult: TypedContractEvent<
      TransactionResultEvent.InputTuple,
      TransactionResultEvent.OutputTuple,
      TransactionResultEvent.OutputObject
    >;
  };
}
