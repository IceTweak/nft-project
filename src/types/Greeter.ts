/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface GreeterInterface extends utils.Interface {
  contractName: "Greeter";
  functions: {
    "greet()": FunctionFragment;
    "setGreeting(string)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "greet", values?: undefined): string;
  encodeFunctionData(functionFragment: "setGreeting", values: [string]): string;

  decodeFunctionResult(functionFragment: "greet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGreeting",
    data: BytesLike
  ): Result;

  events: {
    "GreetingChanged(string,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GreetingChanged"): EventFragment;
}

export type GreetingChangedEvent = TypedEvent<
  [string, string],
  { greeting: string; newGreeting: string }
>;

export type GreetingChangedEventFilter = TypedEventFilter<GreetingChangedEvent>;

export interface Greeter extends BaseContract {
  contractName: "Greeter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GreeterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    greet(overrides?: CallOverrides): Promise<[string]>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  greet(overrides?: CallOverrides): Promise<string>;

  setGreeting(
    _greeting: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    greet(overrides?: CallOverrides): Promise<string>;

    setGreeting(_greeting: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "GreetingChanged(string,string)"(
      greeting?: null,
      newGreeting?: null
    ): GreetingChangedEventFilter;
    GreetingChanged(
      greeting?: null,
      newGreeting?: null
    ): GreetingChangedEventFilter;
  };

  estimateGas: {
    greet(overrides?: CallOverrides): Promise<BigNumber>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    greet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setGreeting(
      _greeting: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
