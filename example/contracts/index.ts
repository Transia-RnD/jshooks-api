import { myCustom } from "./utils/custom"
import { ttINVOKE } from "jshooks-api"

const Hook = (arg: any) => {
  trace('HookOnTT.js: Called.', false)
  // _g(1, 1)

  const isThis = myCustom("this")

  const tt = otxn_type()
  if (tt !== ttINVOKE) {
    return rollback('hook_on_tt: HookOn field is incorrectly set.', -37)
  }
  return accept('HookOnTT.js: Finished.', 13)
}

// PURGED ON BUILD
export { Hook }