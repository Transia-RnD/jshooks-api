import { writeFileSync } from 'fs'

const baseURL = 'https://raw.githubusercontent.com/Xahau/xahaud'
const branch = 'jshooks'

const fetchFromSource = async (path: string) => await (await fetch(`${baseURL}/${branch}/${path}`)).text()

const txFormats = await fetchFromSource(`src/ripple/protocol/TxFormats.h`)
const txFlags = await fetchFromSource(`src/ripple/protocol/TxFlags.h`)
const hookEnum = await fetchFromSource(`src/ripple/app/hook/Enum.h`)
const sfieldh = await fetchFromSource(`src/ripple/protocol/SField.h`)
const sfieldcpp = await fetchFromSource(`src/ripple/protocol/impl/SField.cpp`)

// tts.ts
const tts = txFormats
  .match(/enum TxType : std::uint16_t\n\{(.+?)\}/gmsi)![0]
  .match(/tt.+?,/g)!
  .map(t =>
    t.replace(/(^)/g, '$1export const ')
      .replace(/,/, '')
      .replace(/^(.*?) (\[\[.*?\]\]) (.*?)$/, '// $1 $3 // deprecated')
  ).join('\n')

// tfs.ts
const tfs = txFlags
  .match(/enum (.+?)Flags : (std::)?uint32_t \{(.+?)\}/gims)!
  .map(
    (t) => {
      const flagGroup =/enum (.*?) :.*?{/g.exec(t)![1]
      return t
        .replace(/(.*{)|(}.*)|(    )|(\n)/g, '')
        .replace(/,/g, '\n')
        .replace(/(^|\n)(.+?)(\n)/gims, '$1export const $2$3')
        .replace(/(export const )(.*?)( =)/g, `/** ${flagGroup}.$2 */\n$1$2$3`)
    }
  ).join('\n')

// keylets.ts
const keylets = hookEnum
  .match(/enum keylet_code : uint32_t \{(.+?)\}/gmsi)![0]
  .match(/.*\=.*/g)!
  .filter((k) => !k.includes('LAST_KLTYPE'))
  .map((k) =>
    k.replace(/^ */, 'export const KEYLET_')
      .replace(',', '')
  ).join('\n')

// error.ts
const error = hookEnum
  .match(/enum hook_return_code : int64_t \{(.+?)\}/gmsi)![0]
  .replace(/\/\/.*/g, '')
  .replace(/\=\n */gm, '= ')
  .match(/.*\=.*/g)!
  .map((k) =>
    k.replace(/(^ *)|(\, *$)/g, '')
      .replace(/^/, 'export const ')
  ).join('\n')

// sfcodes.ts
const typeid = sfieldh
  .match(/enum SerializedTypeID {(.+?)\}/gmsi)![0]
  .replace(/\/\/.*/g, '')
  .replace(/( )|(\,)|(STI_)/g, '')
  .match(/.*\=.*/g)!
  .reduce((prev, k) => {
    const key = k.split('=')[0].trim()
    const val = parseFloat(k.split('=')[1].trim())
    if (val < 1 || 10000 < val) return prev
    return { ...prev, [key]: val }
  }, {})
const sfcodes = sfieldcpp
  .match(/^(CONSTRUCT_TYPED_SFIELD|CONSTRUCT_UNTYPED_SFIELD)\(.*?\);/gmsi)!
  .map((f) => {
    const r = f.replace(/(^.*\()|(\).*$)|( )/g, '')
    const name = r.split(',')[0].trim()
    const tid = typeid[r.split(',')[2].trim()]
    if (tid === undefined) return null
    const fieldid = parseInt(r.split(',')[3].trim())
    return `export const ${name} = 0x${((tid << 16) + fieldid).toString(16).toUpperCase()}`
  })
  .filter((f) => f !== null)
  .join('\n')

writeFileSync('src/tts.ts', tts)
writeFileSync('src/tfs.ts', tfs)
writeFileSync('src/keylets.ts', keylets)
writeFileSync('src/error.ts', error)
writeFileSync('src/sfcodes.ts', sfcodes)

