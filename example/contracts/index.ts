import { SignerEntry } from "../@types/objects"

const Hook = (arg: any) => {
  trace('HookOnTT.js: Called.', false)
  const obj = sto_to_json() as unknown as SignerEntry
  obj.SignerEntry.Account
  return accept('HookOnTT.js: Finished.', 13)
}

// REQUIRED FOR ESBUILD
export { Hook }