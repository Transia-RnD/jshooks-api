import { DOESNT_EXIST } from './error'
import { KEYLET_ACCOUNT, KEYLET_LINE } from './keylets'
import { sfBalance } from './sfcodes'

// Types
type Bool = boolean
type UInt8 = number
type UInt16 = number
type UInt32 = number
type UInt64 = bigint
type UInt224 = bigint
type Model = {
  [key: string]:
    | Bool
    | UInt8
    | UInt16
    | UInt32
    | UInt64
    | UInt224
    | Model
    | VarModelArray
}
type VarModelArray = Model[]

export { Bool, UInt8, UInt16, UInt32, UInt64, UInt224, Model, VarModelArray }

// Not to change this to arrow functions: see https://github.com/microsoft/TypeScript/issues/34523
export const ASSERT: (
  cond: boolean,
  msg?: string,
  code?: number
) => asserts cond = (cond, msg = '', code = 0) => {
  if (!cond) rollback(`Assertion failed: ${msg}`, code)
}

export function uint8ToHex(value: UInt8): string {
  if (value < 0 || value > 0xff) {
    throw Error(`Integer ${value} is out of range for uint8 (0-255)`)
  }
  return value.toString(16).padStart(2, '0').toUpperCase()
}

export function uint16ToHex(value: UInt16): string {
  if (value < 0 || value > 0xffff) {
    throw Error(`Integer ${value} is out of range for uint16 (0-65535)`)
  }
  return value.toString(16).padStart(4, '0').toUpperCase()
}

export function uint32ToHex(value: UInt32): string {
  if (value < 0 || value > 0xffff_ffff) {
    throw Error(`Integer ${value} is out of range for uint32 (0-4294967295)`)
  }
  return value.toString(16).padStart(8, '0').toUpperCase()
}

export function uint64ToHex(value: UInt64): string {
  if (value < 0 || value > BigInt(0xffff_ffff_ffff_ffffn)) {
    throw Error(
      `Integer ${value} is out of range for uint64 (0-18446744073709551615)`
    )
  }
  return value.toString(16).padStart(16, '0').toUpperCase()
}

export function uint224ToHex(value: UInt224): string {
  if (
    value < 0 ||
    value >
      BigInt(
        0xffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffff_ffffn
      )
  ) {
    throw Error(
      `Integer ${value} is out of range for uint224 (0-26959946667150639794667015087019630673637144422540572481103610249215)`
    )
  }
  return value.toString(16).padStart(56, '0').toUpperCase()
}

export function hexToUInt8(hex: string): UInt8 {
  return parseInt(hex, 16)
}

export function hexToUInt16(hex: string): UInt16 {
  return parseInt(hex, 16)
}

export function hexToUInt32(hex: string): UInt32 {
  return parseInt(hex, 16)
}

export function hexToUInt64(hex: string): UInt64 {
  return BigInt(`0x${hex}`)
}

export function hexToUInt224(hex: string): UInt224 {
  return BigInt(`0x${hex}`)
}

export function arrayEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }
  return true
}

export const encodeJson = (data: any) => {
  const jsonStr = JSON.stringify(data)
  const jsonBytes = new TextEncoder().encode(jsonStr)
  return Array.from(jsonBytes)
    .map((byte) => byte.toString(16).toUpperCase().padStart(2, '0'))
    .join('')
}

export function encodeString(v: string): string {
  let s = ''
  for (let i = 0; i < v.length; i++) {
    s += v.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return s.toUpperCase()
}

export const encodeArray = (a: number[]) => {
  return a
    .map((v: number) => v.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

export function decodeArray(a: number[]): string {
  let s = ''
  for (let i = 0; i < a.length; i++) {
    s += String.fromCharCode(a[i])
  }
  return s
}

export function decodeJson(a: number[]): Record<string, any> {
  return JSON.parse(decodeArray(a))
}

export function readFrom(array: number[], startIndex: number, offset: number) {
  return array.slice(startIndex, startIndex + offset)
}

export function writeTo(
  array: number[],
  startIndex: number,
  elements: number[]
) {
  for (let i = 0; i < elements.length; i++) {
    array[startIndex + i] = elements[i]
  }
}

// Hook API Helpers

export const hookParam = (key: string, isHex = false) => {
  return hook_param(isHex ? key : encodeString(key))
}

export const otxnParam = (key: string, isHex = false) => {
  return otxn_param(isHex ? key : encodeString(key))
}

export const getState = (key: string, isHex = false) => {
  return state(isHex ? key : encodeString(key))
}

export const assert = <T>(data: T) => {
  if (typeof data === 'number' && data < 0) {
    rollback('assert.error', data)
  }
  return data as Exclude<T, number> extends never ? T : Exclude<T, number>
}

export const fallback = <T>(data: T, codes: number[] = [DOESNT_EXIST]) => {
  if (typeof data === 'number' && data < 0) {
    if (codes.includes(data)) {
      return undefined
    }
    rollback('api.error', data)
  }
  return data as Exclude<T, number> extends never ? T : Exclude<T, number>
}

export const balance = (account: number[] | string) => {
  const keylet = util_keylet(KEYLET_ACCOUNT, account)
  if (slot_set(keylet as number[], 1) != 1)
    accept('keylet.c: Could not load account keylet', 0)

  if (slot_subfield(1, sfBalance, 1) != 1)
    accept('keylet.c: Could not load account keylet `sfBalance`', 0)

  return float_int(slot_float(1), 0, 1)
}

export const iouBalance = (
  account: number[] | string,
  currency?: number[] | string,
  issuer?: number[] | string
) => {
  const keylet = util_keylet(KEYLET_LINE, account, currency, issuer)
  if (slot_set(keylet as number[], 1) != 1)
    accept('keylet.c: Could not load line keylet', 0)

  if (slot_subfield(1, sfBalance, 1) != 1)
    accept('keylet.c: Could not load line keylet `sfBalance`', 0)

  return float_int(slot_float(1), 0, 1)
}
