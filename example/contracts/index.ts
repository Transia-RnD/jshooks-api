import { Payment } from '@transia/xahau-models'
import { assert } from 'jshooks-api'
import { myCustom } from './utils/custom'

const Hook = (arg: any) => {
  const tx = assert(otxn_json()) as Payment
  if (
    tx.TransactionType === 'Payment' &&
    tx.Account === 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn'
  ) {
    rollback('Blocked Payment', 0)
  }

  myCustom('some')

  accept('', 13)
}

// REQUIRED FOR ESBUILD
export { Hook }
