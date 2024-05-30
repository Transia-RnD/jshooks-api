export const encodeArray = (a: number[]) => {
  return a
    .map((v: number) => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
};

export const uint8FromBuf = (buf: number[], offset: number = 0): number => {
  return buf[offset] >>> 0;
};

export const uint16FromBuf = (buf: number[], offset: number = 0): number => {
  return ((buf[offset] << 8) + (buf[offset + 1] << 0)) >>> 0;
};

export const uint32FromBuf = (buf: number[], offset: number = 0): number => {
  return (
    ((buf[offset] << 24) >>> 0) +
    ((buf[offset + 1] << 16) >>> 0) +
    ((buf[offset + 2] << 8) >>> 0) +
    (buf[offset + 3] >>> 0)
  );
};

export const uint64FromBuf = (buf: number[], offset: number = 0): bigint => {
  return (
    (BigInt(buf[offset]) << 56n) +
    (BigInt(buf[offset + 1]) << 48n) +
    (BigInt(buf[offset + 2]) << 40n) +
    (BigInt(buf[offset + 3]) << 32n) +
    (BigInt(buf[offset + 4]) << 24n) +
    (BigInt(buf[offset + 5]) << 16n) +
    (BigInt(buf[offset + 6]) << 8n) +
    BigInt(buf[offset + 7])
  );
};

export function arrayEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export function encodeJson(obj: Record<string, any>): string {
  const jsonString = JSON.stringify(obj)
  let hexString = ''
  for (let i = 0; i < jsonString.length; i++) {
    hexString += jsonString.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return hexString.toUpperCase()
}

export function encodeString(v: string): string {
  let s = ''
  for (let i = 0; i < v.length; i++) {
    s += v.charCodeAt(i).toString(16).padStart(2, '0')
  }
  return s.toUpperCase()
}

export function decodeHexArray(hexArray: number[]): Record<string, any> {
  let jsonString = ''
  for (let i = 0; i < hexArray.length; i++) {
    jsonString += String.fromCharCode(hexArray[i])
  }
  return JSON.parse(jsonString)
}