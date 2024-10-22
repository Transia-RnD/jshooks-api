import {
  arrayEqual,
  assert,
  ASSERT,
  buf2hex,
  buf2str,
  decodeArray,
  decodeBuffer,
  decodeJson,
  decodeString,
  encodeArray,
  encodeBuffer,
  encodeJson,
  encodeString,
  fallback,
  hex2buf,
  hex2str,
  hexToUInt16,
  hexToUInt224,
  hexToUInt32,
  hexToUInt64,
  hexToUInt8,
  readFrom,
  str2buf,
  str2hex,
  uint16FromNumber,
  uint16ToHex,
  uint16ToNumber,
  uint224ToHex,
  uint32FromNumber,
  uint32ToHex,
  uint32ToNumber,
  uint64FromBigInt,
  uint64ToBigInt,
  uint64ToHex,
  uint8FromNumber,
  uint8ToHex,
  uint8ToNumber,
  writeTo,
} from '@/helpers'

beforeAll(() => {
  global.rollback = (msg, code) => {
    throw new Error(`${msg}, code:${code}`)
  }
})

it('ASSERT', () => {
  expect(() => ASSERT(true)).not.toThrow()
  expect(() => ASSERT(false)).toThrow()
  expect(() => ASSERT(false, 'some error', 10)).toThrow(
    'Assertion failed: some error, code:10'
  )
})

it('hex2str', () => {
  expect(hex2str('414243')).toEqual('ABC')
})
it('str2hex', () => {
  expect(str2hex('ABC')).toEqual('414243')
})
it('buf2str', () => {
  expect(buf2str([0x41, 0x42, 0x43])).toEqual('ABC')
})
it('str2buf', () => {
  expect(str2buf('ABC')).toEqual([0x41, 0x42, 0x43])
})
it('buf2hex', () => {
  expect(buf2hex([0x41, 0x42, 0x43])).toEqual('414243')
})
it('hex2buf', () => {
  expect(hex2buf('414243')).toEqual([0x41, 0x42, 0x43])
})

describe('uint8ToHex', () => {
  it.each([
    [0, '00'],
    [1, '01'],
    [15, '0F'],
    [16, '10'],
    [255, 'FF'],
  ])('uint8ToHex(%i) -> %s', (uint8, hex) => {
    expect(uint8ToHex(uint8)).toBe(hex)
  })
  it('throws if value is out of range', () => {
    expect(() => uint8ToHex(-1)).toThrow()
    expect(() => uint8ToHex(256)).toThrow()
  })
})

describe('uint16ToHex', () => {
  it.each([
    [0, '0000'],
    [1, '0001'],
    [65535, 'FFFF'],
  ])('uint16ToHex(%i) -> %s', (uint16, hex) => {
    expect(uint16ToHex(uint16)).toBe(hex)
  })
  it('throws if value is out of range', () => {
    expect(() => uint16ToHex(-1)).toThrow()
    expect(() => uint16ToHex(65536)).toThrow()
  })
})

describe('uint32ToHex', () => {
  it.each([
    [0, '00000000'],
    [1, '00000001'],
    [4294967295, 'FFFFFFFF'],
  ])('uint32ToHex(%i) -> %s', (uint32, hex) => {
    expect(uint32ToHex(uint32)).toBe(hex)
  })
  it('throws if value is out of range', () => {
    expect(() => uint32ToHex(-1)).toThrow()
    expect(() => uint32ToHex(4294967296)).toThrow()
  })
})

describe('uint64ToHex', () => {
  it.each([
    [0n, '0000000000000000'],
    [1n, '0000000000000001'],
    [18446744073709551615n, 'FFFFFFFFFFFFFFFF'],
  ])('uint64ToHex(%s) -> %s', (uint64, hex) => {
    expect(uint64ToHex(uint64)).toBe(hex)
  })
  it('throws if value is out of range', () => {
    expect(() => uint64ToHex(-1n)).toThrow()
    expect(() => uint64ToHex(18446744073709551616n)).toThrow()
  })
})

describe('uint224ToHex', () => {
  it.each([
    [0n, '00000000000000000000000000000000000000000000000000000000'],
    [1n, '00000000000000000000000000000000000000000000000000000001'],
    [
      26959946667150639794667015087019630673637144422540572481103610249215n,
      'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ],
  ])('uint224ToHex(%s) -> %s', (uint224, hex) => {
    expect(uint224ToHex(uint224)).toBe(hex)
  })
  it('throws if value is out of range', () => {
    expect(() => uint224ToHex(-1n)).toThrow()
    expect(() =>
      uint224ToHex(
        26959946667150639794667015087019630673637144422540572481103610249216n
      )
    ).toThrow()
  })
})

describe('hexToUInt8', () => {
  it.each([
    ['00', 0],
    ['01', 1],
    ['0F', 15],
    ['10', 16],
    ['FF', 255],
  ])('hexToUInt8(%s) -> %i', (hex, uint8) => {
    expect(hexToUInt8(hex)).toBe(uint8)
  })
})

describe('hexToUInt16', () => {
  it.each([
    ['0000', 0],
    ['0001', 1],
    ['FFFF', 65535],
  ])('hexToUInt16(%s) -> %i', (hex, uint16) => {
    expect(hexToUInt16(hex)).toBe(uint16)
  })
})

describe('hexToUInt32', () => {
  it.each([
    ['00000000', 0],
    ['00000001', 1],
    ['FFFFFFFF', 4294967295],
  ])('hexToUInt32(%s) -> %i', (hex, uint32) => {
    expect(hexToUInt32(hex)).toBe(uint32)
  })
})

describe('hexToUInt64', () => {
  it.each([
    ['0000000000000000', 0n],
    ['0000000000000001', 1n],
    ['FFFFFFFFFFFFFFFF', 18446744073709551615n],
  ])('hexToUInt64(%s) -> %s', (hex, uint64) => {
    expect(hexToUInt64(hex)).toBe(uint64)
  })
})

describe('hexToUInt224', () => {
  it.each([
    ['00000000000000000000000000000000000000000000000000000000', 0n],
    ['00000000000000000000000000000000000000000000000000000001', 1n],
    [
      'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      26959946667150639794667015087019630673637144422540572481103610249215n,
    ],
  ])('hexToUInt224(%s) -> %s', (hex, uint224) => {
    expect(hexToUInt224(hex)).toBe(uint224)
  })
})

describe('uint8FromNumber, uint8ToNumber', () => {
  it.each([
    [0, [0]],
    [1, [1]],
    [255, [255]],
  ])('uint8ToHex,uint8ToNumber(%i) -> %s', (uint8, buf) => {
    expect(uint8FromNumber(uint8)).toStrictEqual(buf)
    expect(uint8ToNumber(buf)).toStrictEqual(uint8)
  })
  it('throws if value is out of range', () => {
    expect(() => uint8ToHex(-1)).toThrow()
    expect(() => uint8ToHex(256)).toThrow()
  })
})

describe('uint16FromNumber, uint16ToNumber', () => {
  it.each([
    [0, [0, 0]],
    [1, [0, 1]],
    [65535, [255, 255]],
  ])('uint16FromNumber,uint16ToNumber(%i) -> %s', (uint16, buf) => {
    expect(uint16FromNumber(uint16)).toStrictEqual(buf)
    expect(uint16ToNumber(buf)).toStrictEqual(uint16)
  })
  it('throws if value is out of range', () => {
    expect(() => uint16FromNumber(-1)).toThrow()
    expect(() => uint16FromNumber(65536)).toThrow()
  })
})

describe('uint32FromNumber, uint32ToNumber', () => {
  it.each([
    [0, [0, 0, 0, 0]],
    [1, [0, 0, 0, 1]],
    [4294967295, [255, 255, 255, 255]],
  ])('uint32FromNumber,uint32ToNumber(%i) -> %s', (uint32, buf) => {
    expect(uint32FromNumber(uint32)).toStrictEqual(buf)
    expect(uint32ToNumber(buf)).toStrictEqual(uint32)
  })
  it('throws if value is out of range', () => {
    expect(() => uint32FromNumber(-1)).toThrow()
    expect(() => uint32FromNumber(4294967296)).toThrow()
  })
})

describe('uint64FromBigInt, uint64ToBigInt', () => {
  it.each([
    [0n, [0, 0, 0, 0, 0, 0, 0, 0]],
    [1n, [0, 0, 0, 0, 0, 0, 0, 1]],
    [18446744073709551615n, [255, 255, 255, 255, 255, 255, 255, 255]],
  ])('uint64FromNumber,uint64ToNumber(%s) -> %s', (uint64, buf) => {
    expect(uint64FromBigInt(uint64)).toStrictEqual(buf)
    expect(uint64ToBigInt(buf)).toStrictEqual(uint64)
  })
  it('throws if value is out of range', () => {
    expect(() => uint64FromBigInt(-1n)).toThrow()
    expect(() => uint64FromBigInt(18446744073709551616n)).toThrow()
  })
})

describe('arrayEqual', () => {
  it('returns true for equal arrays', () => {
    expect(arrayEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(arrayEqual(['1', '2', '3'], ['1', '2', '3'])).toBe(true)
  })
  it('returns false for different arrays', () => {
    expect(arrayEqual([1, 2, 3], [1, 2, 4])).toBe(false)
    expect(arrayEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false)
    expect(arrayEqual(['1', '2', '3'], [1, 2, 3] as unknown as string[])).toBe(
      false
    )
  })
})

it('encodeJson, decodeJson', () => {
  const obj = { a: 1, b: '2', c: [3, 4], d: { e: 5 } }
  expect(decodeJson(hex2buf(encodeJson(obj)))).toStrictEqual(obj)
})

it('encodeString, decodeString', () => {
  const str = 'hello'
  let encoded = encodeString(str)
  expect(decodeString(encoded)).toBe(str)
  expect(decodeString(hex2buf(encoded))).toBe(str)
})

it.todo('encodeArray, decodeArray', () => {
  // const arr = [1, 16, 255]
  // const encoded = encodeArray(arr)
  // console.log(encoded)
  // expect(decodeArray(hex2buf(encoded))).toStrictEqual(arr)
})

it('readFrom', () => {
  const arr = [1, 2, 3, 4]
  expect(readFrom(arr, 0, 2)).toStrictEqual([1, 2])
  expect(readFrom(arr, 2, 2)).toStrictEqual([3, 4])
})

it('writeTo', () => {
  {
    const arr = [1, 2, 3, 4]
    writeTo(arr, 0, [5, 6])
    expect(arr).toStrictEqual([5, 6, 3, 4])
  }
  {
    const arr = [1, 2, 3, 4]
    writeTo(arr, 2, [5, 6, 7])
    expect(arr).toStrictEqual([1, 2, 5, 6, 7])
  }
})

describe.todo('hookParam')
describe.todo('otxnParam')
describe.todo('getState')

it('assert', () => {
  expect(assert(1)).toBe(1)
  expect(assert([1, 2, 3])).toStrictEqual([1, 2, 3])
  expect(() => assert(-1)).toThrow()
})

it('fallback', () => {
  expect(fallback(1)).toBe(1)
  expect(fallback([1, 2, 3])).toStrictEqual([1, 2, 3])
  expect(fallback(-5)).toBeUndefined()
  expect(() => fallback(-1)).toThrow()
  expect(() => fallback(-5, [])).toThrow()
  expect(fallback(-10, [-1, -10])).toBeUndefined()
})

describe.todo('balance')
describe.todo('iouBalance')

it('encodeBuffer,decodeBuffer', () => {
  const Model = [
    'uint8',
    'uint16',
    'uint32',
    'uint64',
    'account',
    'hash256',
  ] as const
  const acc = [
    0x6b, 0x30, 0xe2, 0x94, 0xf3, 0x40, 0x3f, 0xf8, 0x7c, 0xef, 0x9e, 0x72,
    0x21, 0x7f, 0xf7, 0xeb, 0x4a, 0x6a, 0x43, 0xf4,
  ]
  const hash = [
    0x40, 0x84, 0x55, 0xdc, 0x2c, 0xdd, 0x7c, 0x27, 0x66, 0x45, 0xe3, 0xaf,
    0x94, 0x44, 0x95, 0xda, 0x88, 0xb7, 0xeb, 0x1d, 0x86, 0x9d, 0x11, 0x0e,
    0x9c, 0xa8, 0x36, 0x8a, 0x35, 0x88, 0xaa, 0x48,
  ]
  const buffer = encodeBuffer([0xff, 0xffff, 0xffff, 1000n, acc, hash], Model)
  const [
    uint8value,
    uint16value,
    uint32value,
    uint64value,
    accountvalue,
    hash256value,
  ] = decodeBuffer(buffer, Model)
  expect(uint8value).toBe(0xff)
  expect(uint16value).toBe(0xffff)
  expect(uint32value).toBe(0xffff)
  expect(uint64value).toBe(1000n)
  expect(accountvalue).toStrictEqual(acc)
  expect(hash256value).toStrictEqual(hash)
})
