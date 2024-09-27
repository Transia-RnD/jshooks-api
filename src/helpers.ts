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

export const uint8FromNumber = (value: number) => {
  if (value < 0 || 0xff < value)
    rollback('uint8FromNumber: value out of range', -1)
  return [value]
}
export const uint8ToNumber = (value: number[]) => {
  return value[0]
}

export const uint16FromNumber = (value: number) => {
  if (value < 0 || 0xffff < value)
    rollback('uint16FromNumber: value out of range', -1)
  return [(value >> 8) & 0xff, value & 0xff]
}
export const uint16ToNumber = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getUint16(0))
}

export const uint32FromNumber = (value: number) => {
  if (value < 0 || 0xffffffff < value)
    rollback('uint32FromNumber: value out of range', -1)
  return [
    (value >> 24) & 0xff,
    (value >> 16) & 0xff,
    (value >> 8) & 0xff,
    value & 0xff,
  ]
}

export const uint32ToNumber = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getUint32(0))
}

export const uint64FromBigInt = (value: bigint) => {
  if (value < 0n || 0xffffffffffffffffn < value)
    rollback('uint64FromBigInt: value out of range', -1)
  return [
    Number((value >> 56n) & 0xffn),
    Number((value >> 48n) & 0xffn),
    Number((value >> 40n) & 0xffn),
    Number((value >> 32n) & 0xffn),
    Number((value >> 24n) & 0xffn),
    Number((value >> 16n) & 0xffn),
    Number((value >> 8n) & 0xffn),
    Number(value & 0xffn),
  ]
}

export const uint64ToBigInt = (value: number[]) => {
  const view = new DataView(new Uint8Array(value).buffer)
  return Number(view.getBigUint64(0))
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

export const decodeString = decodeArray
export function decodeArray(a: number[] | string): string {
  let s = ''
  for (let i = 0; i < a.length; i++) {
    s += String.fromCharCode(Number(a[i]))
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

type ExcludeErrorCode<T> = Exclude<T, number> extends never
  ? T
  : Exclude<T, number>

export const assert = <T>(data: T) => {
  if (typeof data === 'number' && data < 0) {
    rollback('assert.error', data)
  }
  return data as ExcludeErrorCode<T>
}

export const fallback = <T>(
  data: T,
  codes: number[] = [DOESNT_EXIST]
): ExcludeErrorCode<T> | undefined => {
  if (typeof data === 'number' && data < 0) {
    if (codes.includes(data)) {
      return undefined
    }
    rollback('fallback.error', data)
  }
  return data as ExcludeErrorCode<T>
}

export const balance = (account: number[] | string) => {
  const keylet = util_keylet(KEYLET_ACCOUNT, account)
  let slotno = slot_set(keylet as number[], 0)
  if (slotno < 0)
    rollback('helpers.balance: Could not load account keylet', slotno)

  slotno = slot_subfield(slotno, sfBalance, slotno)
  if (slotno < 0)
    rollback(
      'helpers.balance: Could not load account keylet `sfBalance`',
      slotno
    )
  return float_int(slot_float(slotno) as bigint, 0, 1)
}

export const iouBalance = (
  account: number[] | string,
  currency: number[] | string,
  issuer: number[] | string
) => {
  const keylet = util_keylet(KEYLET_LINE, account, currency, issuer)
  let slotno = slot_set(keylet as number[], 0)
  if (slotno < 0)
    rollback('helpers.iouBalance: Could not load line keylet', slotno)

  slotno = slot_subfield(slotno, sfBalance, slotno)
  if (slotno < 0)
    rollback(
      'helpers.iouBalance: Could not load line keylet `sfBalance`',
      slotno
    )
  return float_int(slot_float(slotno) as bigint, 0, 1)
}

type FieldType =
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'uint64'
  | 'account'
  | 'hash256'

type FieldTypeToValue<T extends FieldType> = T extends 'uint8'
  ? number
  : T extends 'uint16'
  ? number
  : T extends 'uint32'
  ? number
  : T extends 'uint64'
  ? bigint
  : T extends 'account'
  ? number[]
  : T extends 'hash256'
  ? number[]
  : never

type FieldTypeToValues<T extends FieldType[]> = {
  [K in keyof T]: FieldTypeToValue<T[K]>
}

type Mutable<T> = {
  -readonly [K in keyof T]: Mutable<T[K]>
}

export const encodeBuffer = <const T extends readonly FieldType[]>(
  values: FieldTypeToValues<Mutable<T>>,
  types: T
): number[] => {
  return types.flatMap((t, i) => {
    const v = values[i]
    switch (t) {
      case 'uint8': {
        return uint8FromNumber(v as number)
      }
      case 'uint16': {
        return uint16FromNumber(v as number)
      }
      case 'uint32': {
        return uint32FromNumber(v as number)
      }
      case 'uint64': {
        return uint64FromBigInt(v as bigint)
      }
      case 'account': {
        return v as number[]
      }
      case 'hash256': {
        return v as number[]
      }
      default:
        throw new Error('Invalid type')
    }
  })
}

export const decodeBuffer = <const T extends readonly FieldType[]>(
  buffer: number[],
  types: T
): FieldTypeToValues<Mutable<T>> => {
  let offset = 0
  return types.map((type) => {
    if (offset >= buffer.length)
      rollback('decodeBuffer: buffer length is too short', 0)

    switch (type) {
      case 'uint8': {
        const value = uint8ToNumber(buffer.slice(offset, offset + 1))
        offset += 1
        return value
      }
      case 'uint16': {
        const value = uint16ToNumber(buffer.slice(offset, offset + 2))
        offset += 2
        return value
      }
      case 'uint32': {
        const value = uint32ToNumber(buffer.slice(offset, offset + 4))
        offset += 4
        return value
      }
      case 'uint64': {
        const value = uint64ToBigInt(buffer.slice(offset, offset + 8))
        offset += 8
        return value
      }
      case 'account': {
        const value = buffer.slice(offset, offset + 20)
        offset += 20
        return value
      }
      case 'hash256': {
        const value = buffer.slice(offset, offset + 32)
        offset += 32
        return value
      }
      default:
        throw new Error('Invalid type')
    }
  }) as FieldTypeToValues<Mutable<T>>
}
