const ASSERT = (x, code) => {
  if (!x) {
    trace('error', 0, false)
    rollback(x.toString(), code)
  }
}

const Hook = (arg) => {
  const id = otxn_id(0)
  trace('id', id, true)
  ASSERT(id.length === 32)

  // slot the otxn then generate a canonical hash over it
  ASSERT(otxn_slot(1) === 1)

  const buf = slot(1)
  const size = buf.length

  trace('buf', buf, false)

  ASSERT(size > 0)
  buf.unshift(0)
  buf.pop()
  buf.unshift(0x4e)
  buf.pop()
  buf.unshift(0x58)
  buf.pop()
  buf.unshift(0x54)
  buf.pop()
  // buf[0] = 0x54
  // buf[1] = 0x58
  // buf[2] = 0x4e
  // buf[3] = 0

  trace('buf', buf, false)
  trace('buf', buf, true)

  const hash = util_sha512h(buf)
  ASSERT(hash.length === 32)

  trace('hash', hash, true)

  for (let i = 0; i < 32; ++i) ASSERT(hash[i] === id[i])

  accept('', 0)
}
