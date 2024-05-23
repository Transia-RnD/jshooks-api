interface XRP {
  currency: 'XAH'
}

interface IssuedCurrency {
  currency: string
  issuer: string
}

export type Currency = IssuedCurrency | XRP

export interface IssuedCurrencyAmount extends IssuedCurrency {
  value: string
}

export type Amount = IssuedCurrencyAmount | string

// START LedgerObjectFormats

/**
 * This information is added to emitted Transactions.
 */
export interface EmitDetails {
  EmitBurden: number
  EmitGeneration: number
  EmitHookHash: string
  EmitParentTxnID: string
}

/**
 * The object that describes the signer in SignerEntries.
 */
export interface SignerEntry {
  /**
   * The object that describes the signer in SignerEntries.
   */
  SignerEntry: {
    /**
     * An XRP Ledger address whose signature contributes to the multi-signature.
     * It does not need to be a funded address in the ledger.
     */
    Account: string
    /**
     * The weight of a signature from this signer.
     * A multi-signature is only valid if the sum weight of the signatures provided meets
     * or exceeds the signer list's SignerQuorum value.
     */
    SignerWeight: number
    /**
     * An arbitrary 256-bit (32-byte) field that can be used to identify the signer, which
     * may be useful for smart contracts, or for identifying who controls a key in a large
     * organization.
     */
    WalletLocator?: string
  }
}

export interface Signer {
  Signer: {
    Account: string
    TxnSignature: string
    SigningPubKey: string
  }
}

export interface Majority {
  Majority: {
    Amendment: string
    CloseTime: number
  }
}

export interface DisabledValidator {
  DisabledValidator: {
    PublicKey: string
    FirstLedgerSequence: number
  }
}

export interface HookExecution {
  HookExecution: {
    HookAccount: string
    HookEmitCount: number
    HookExecutionIndex: number
    HookHash: string
    HookInstructionCount: string
    HookResult: number
    HookReturnCode: string
    HookReturnString: string
    HookStateChangeCount: number
    Flags: number
  }
}

export interface HookEmission {
  HookEmission: {
    EmittedTxnID: string
    HookAccount: string
    HookHash: string
    EmitNonce: string
  }
}
export interface HookDefinition {
  HookDefinition: {
    Flags: number
    HookHash: string
    HookOn?: string
    HookNamespace?: string
    HookApiVersion?: string
    HookParameters?: HookParameter[]
    CreateCode?: string
    HookSetTxnID?: string
    ReferenceCount?: number
    Fee?: string
    HookCallbackFee?: number
  }
}

/**
 * The object that describes the hook in Hooks.
 */
export interface Hook {
  /**
   * The object that describes the hook in Hooks.
   */
  Hook: {
    HookHash?: string
    /**
     * The code that is executed when the hook is triggered.
     */
    CreateCode?: string
    /**
     * The flags that are set on the hook.
     */
    Flags?: number
    /**
     * The transactions that triggers the hook. Represented as a 256Hash
     */
    HookOn?: string
    /**
     * The namespace of the hook.
     */
    HookNamespace?: string
    /**
     * The API version of the hook.
     */
    HookApiVersion?: number
    /**
     * The parameters of the hook.
     */
    HookParameters?: HookParameter[]
    /**
     * The grants of the hook.
     */
    HookGrants?: HookGrant[]
  }
}

/**
 * The object that describes the grant in HookGrants.
 */
export interface HookGrant {
  /**
   * The object that describes the grant in HookGrants.
   */
  HookGrant: {
    /**
     * The hook hash of the grant.
     */
    HookHash: string
    /**
     * The account authorized on the grant.
     */
    Authorize?: string
  }
}

/**
 * The object that describes the parameter in HookParameters.
 */
export interface HookParameter {
  /**
   * The object that describes the parameter in HookParameters.
   */
  HookParameter: {
    /**
     * The name of the parameter.
     */
    HookParameterName: string
    /**
     * The value of the parameter.
     */
    HookParameterValue: string
  }
}

export interface NFToken {
  NFToken: {
    NFTokenID: string
    URI?: string
  }
}

export interface GenesisMint {
  GenesisMint: {
    Destination: string
    Amount?: Amount
    GovernanceFlags?: string
    GovernanceMarks?: string
  }
}

export interface ActiveValidator {
  ActiveValidator: {
    PublicKey: string
    Account?: string
  }
}

export interface ImportVLKey {
  ImportVLKey: {
    PublicKey: string
    Account?: string
  }
}

export type AmountEntry = Amount

/**
 * The object that describes the uritoken in MintURIToken.
 */
export interface MintURIToken {
  /**
   *
   */
  URI: string
  /**
   *
   */
  Digest?: string
  /**
   * The flags that are set on the uritoken.
   */
  Flags?: number
}

// DONE LedgerObjectFormats

export interface Memo {
  Memo: {
    MemoData?: string
    MemoType?: string
    MemoFormat?: string
  }
}

export interface CreatedNode {
  CreatedNode: {
    LedgerEntryType: string
    LedgerIndex: string
    NewFields: { [field: string]: unknown }
  }
}

export interface ModifiedNode {
  ModifiedNode: {
    LedgerEntryType: string
    LedgerIndex: string
    FinalFields?: { [field: string]: unknown }
    PreviousFields?: { [field: string]: unknown }
    PreviousTxnID?: string
    PreviousTxnLgrSeq?: number
  }
}

export interface DeletedNode {
  DeletedNode: {
    LedgerEntryType: string
    LedgerIndex: string
    FinalFields: { [field: string]: unknown }
  }
}

export type Node = CreatedNode | ModifiedNode | DeletedNode

export interface TransactionMetadata {
  HookExecutions?: HookExecution[]
  HookEmissions?: HookEmission[]
  AffectedNodes: Node[]
  DeliveredAmount?: Amount
  // "unavailable" possible for transactions before 2014-01-20
  delivered_amount?: Amount | 'unavailable'
  TransactionIndex: number
  TransactionResult: string
}

export type PreviousFields = { [field: string]: unknown }
export type FinalFields = { [field: string]: unknown }
export type NewFields = { [field: string]: unknown }

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
  | DisabledValidator
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
  | IssuedCurrencyAmount

// export type STArray =
//   // Arrays (In Order)
//   | Majorities;
//   | DisabledValidators;
//   | HookExecutions;
//   | HookExecution;
//   | HookParameters;
//   | Hooks;
//   | HookGrants;
//   | GenesisMints;
//   | ActiveValidators;
//   | ImportVLKeys;
//   | HookEmissions;
//   | Amounts;