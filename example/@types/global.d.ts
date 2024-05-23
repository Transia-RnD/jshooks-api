/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Transaction,
  TransactionMetadata,
  CreatedNode,
  DeletedNode,
  ModifiedNode,
  PreviousFields,
  FinalFields,
  NewFields,
  Memo,
  SignerEntry,
  NFToken,
  EmitDetails,
  Hook,
  Signer,
  Majority,
  DisabledValidator,
  // EmittedTxn,
  HookExecution,
  HookDefinition,
  HookParameter,
  HookGrant,
  ActiveValidator,
  ImportVLKey,
  HookEmission,
  MintURIToken,
  AmountEntry,
  GenesisMint,
  // Misc
  IssuedCurrency,
  XRP,
  Amount,
  IssuedCurrencyAmount,
} from "@transia/xahau-models";

export type PreviousFields = { [field: string]: unknown };
export type FinalFields = { [field: string]: unknown };
export type NewFields = { [field: string]: unknown };

export type STObject =
  // Objects (IN ORDER)
  | TransactionMetadata
  | CreatedNode
  | DeletedNode
  | ModifiedNode
  | PreviousFields
  | FinalFields
  | NewFields
  | Memo
  | SignerEntry
  | NFToken
  | EmitDetails
  | Hook
  | Signer
  | Majority
  | DisabledValidator
  // | EmittedTxn
  | HookExecution
  | HookDefinition
  | HookParameter
  | HookGrant
  | ActiveValidator
  | ImportVLKey
  | HookEmission
  | MintURIToken
  | AmountEntry
  | GenesisMint
  // Misc
  | IssuedCurrency
  | XRP
  | Amount
  | IssuedCurrencyAmount;

declare global {
  /********************************************************************************************************************* */

  // Return number: int64
  //    An arbitrary return code you wish to return from your hook. This will be present in the metadata of the originating transaction.
  export type Hook = (reserved?: number) => bigint; /** int64 */

  // Arg: uint32 'what'
  //    0 = the emittted transaction to which this callback relates was successfully accepted into a ledger.
  //    1 = the emitted transaction to which the callback relates was NOT successfully accepted into a ledger before it expired.
  // Return number: int64
  //    An arbitrary return code you wish to return from your hook. This will be present in the metadata of the originating transaction.
  export type Callback = (emittedTxError?: number) => bigint; /** int64 */

  /********************************************************************************************************************* */

  type Trace = (message: string, data: any, hex?: boolean) => void;

  const trace: Trace;

  /********************************************************************************************************************* */

  // Rtrn
  type Accept = (error_msg: string, error_code: number) => bigint;

  const accept: Accept;

  /********************************************************************************************************************* */

  type Rollback = (error_msg: string, error_code: number) => bigint;

  const rollback: Rollback;

  /********************************************************************************************************************* */

  const util_raddr = (arg: any) => any;
  const util_accid = (arg: any) => any;
  const util_sha512h = (arg: any) => any;
  const hook_account = (arg?: any) => any;
  const state = (arg: any) => any;
  const hook_hash = (arg: any) => any;
  const state_set = (arg: any, arg: any) => any;
  const otxn_type = () => any;

  type OTXNTransaction = () => Transaction;
  const otxn_json: OTXNTransaction;

  type PrepareTransaction = (txn: Transaction) => any;
  const prepare: PrepareTransaction;

  type STOToJson = () => STObject;
  const sto_to_json: STOToJson;
}

export {};
