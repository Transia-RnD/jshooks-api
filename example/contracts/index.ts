import { myCustom } from "./utils/custom"
import { DOESNT_EXIST, ttINVOKE } from "jshooks-api"

const Hook = (arg: any) => {
  trace('HookOnTT.js: Called.', false)
  // _g(1, 1)

  const isThis = myCustom("this")

  const tt = otxn_type()
  const txn = otxn_json()
  trace(txn.Account, 1)
  if (tt !== ttINVOKE) {
    return rollback('hook_on_tt: HookOn field is incorrectly set.', DOESNT_EXIST)
  }
  return accept('HookOnTT.js: Finished.', 13)
}

// PURGED ON BUILD
export { Hook }