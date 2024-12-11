import type {
  AccountRoot,
  Amendments,
  Check,
  DepositPreauth,
  EmittedTxn,
  Escrow,
  FeeSettings,
  Hook,
  HookState,
  LedgerEntry,
  NegativeUNL,
  Offer,
  PayChannel,
  RippleState,
  SignerList,
} from '@transia/xahau-models/dist/models/ledger'
import { assert, fallback } from './helpers'
import type { ByteArray, HexString } from './types/global'
import {
  KEYLET_ACCOUNT,
  KEYLET_AMENDMENTS,
  KEYLET_CHECK,
  KEYLET_CHILD,
  KEYLET_DEPOSIT_PREAUTH,
  KEYLET_EMITTED_DIR,
  KEYLET_EMITTED_TXN,
  KEYLET_ESCROW,
  KEYLET_FEES,
  KEYLET_HOOK,
  KEYLET_HOOK_STATE,
  KEYLET_LINE,
  KEYLET_NEGATIVE_UNL,
  KEYLET_NFT_OFFER,
  KEYLET_OFFER,
  KEYLET_OWNER_DIR,
  KEYLET_PAGE,
  KEYLET_PAYCHAN,
  KEYLET_QUALITY,
  KEYLET_SIGNERS,
  KEYLET_SKIP,
  KEYLET_UNCHECKED,
} from './keylets'

export const getLedgerEntry = <T extends LedgerEntry = LedgerEntry>(
  key: ByteArray | HexString
): T | undefined => {
  const sno = slot_set(key, 0)
  return fallback(slot_json(sno)) as T | undefined
}

export const getHookState = (
  accountid: ByteArray | HexString,
  statekey: ByteArray | HexString,
  namespace: ByteArray | HexString
) => {
  const keylet = assert(
    util_keylet(KEYLET_HOOK_STATE, accountid, statekey, namespace)
  )
  return getLedgerEntry<HookState>(keylet)
}

export const getAmendments = () => {
  const keylet = assert(util_keylet(KEYLET_AMENDMENTS))
  return getLedgerEntry<Amendments>(keylet)
}

export const getFeeSettings = () => {
  const keylet = assert(util_keylet(KEYLET_FEES))
  return getLedgerEntry<FeeSettings>(keylet)
}

export const getNegativeUnl = () => {
  const keylet = assert(util_keylet(KEYLET_NEGATIVE_UNL))
  return getLedgerEntry<NegativeUNL>(keylet)
}

export const getEmittedDir = () => {
  const keylet = assert(util_keylet(KEYLET_EMITTED_DIR))
  return getLedgerEntry(keylet)
}

export const getSkip = (key: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_SKIP, key))
  return getLedgerEntry(keylet)
}
export const getTrustLine = (
  highaccountid: ByteArray | HexString,
  lowaccountid: ByteArray | HexString,
  currency: ByteArray | HexString
) => {
  const keylet = assert(
    util_keylet(KEYLET_LINE, highaccountid, lowaccountid, currency)
  )
  return getLedgerEntry<RippleState>(keylet)
}

export const getQuality = (
  key: ByteArray | HexString,
  high32bits: ByteArray | HexString,
  low32bits: ByteArray | HexString
) => {
  const keylet = assert(util_keylet(KEYLET_QUALITY, key, high32bits, low32bits))
  return getLedgerEntry(keylet)
}

export const getDepositPreauth = (
  owner: ByteArray | HexString,
  preauthorized: ByteArray | HexString
) => {
  const keylet = assert(
    util_keylet(KEYLET_DEPOSIT_PREAUTH, owner, preauthorized)
  )
  return getLedgerEntry<DepositPreauth>(keylet)
}

export const getUnchecked = (key: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_UNCHECKED, key))
  return getLedgerEntry(keylet)
}

export const getChild = (key: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_CHILD, key))
  return getLedgerEntry(keylet)
}

export const getEmittedTxn = (txid: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_EMITTED_TXN, txid))
  return getLedgerEntry<EmittedTxn>(keylet)
}

export const getOwnerDir = (accountid: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_OWNER_DIR, accountid))
  return getLedgerEntry(keylet)
}

export const getSigners = (accountid: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_SIGNERS, accountid))
  return getLedgerEntry<SignerList>(keylet)
}

export const getAccount = (accountid: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_ACCOUNT, accountid))
  return getLedgerEntry<AccountRoot>(keylet)
}

export const getHook = (accountid: ByteArray | HexString) => {
  const keylet = assert(util_keylet(KEYLET_HOOK, accountid))
  return getLedgerEntry<Hook>(keylet)
}

export const getPage = (
  key: ByteArray | HexString,
  high32bits: ByteArray | HexString,
  low32bits: ByteArray | HexString
) => {
  const keylet = assert(util_keylet(KEYLET_PAGE, key, high32bits, low32bits))
  return getLedgerEntry(keylet)
}

export const getOffer = (
  accountid: ByteArray | HexString,
  sequence_or_key: ByteArray | HexString | number
) => {
  const keylet = assert(util_keylet(KEYLET_OFFER, accountid, sequence_or_key))
  return getLedgerEntry<Offer>(keylet)
}

export const getCheck = (
  accountid: ByteArray | HexString,
  sequence_or_key: ByteArray | HexString | number
) => {
  const keylet = assert(util_keylet(KEYLET_CHECK, accountid, sequence_or_key))
  return getLedgerEntry<Check>(keylet)
}

export const getEscrow = (
  accountid: ByteArray | HexString,
  sequence_or_key: ByteArray | HexString | number
) => {
  const keylet = assert(util_keylet(KEYLET_ESCROW, accountid, sequence_or_key))
  return getLedgerEntry<Escrow>(keylet)
}

export const getNftOffer = (
  accountid: ByteArray | HexString,
  sequence_or_key: ByteArray | HexString | number
) => {
  const keylet = assert(
    util_keylet(KEYLET_NFT_OFFER, accountid, sequence_or_key)
  )
  return getLedgerEntry(keylet)
}

export const getPayChan = (
  src_accountid: ByteArray | HexString,
  dst_accountid: ByteArray | HexString
) => {
  const keylet = assert(
    util_keylet(KEYLET_PAYCHAN, src_accountid, dst_accountid)
  )
  return getLedgerEntry<PayChannel>(keylet)
}
