import { Payment } from '@transia/xahau-models'
import { DOESNT_EXIST } from 'jshooks-api'
import { myCustom } from './utils/custom'

const Hook = (arg: any) => {
  const tx = otxn_json() as Payment
  if (typeof tx === 'number' && tx === DOESNT_EXIST) {
    rollback('', DOESNT_EXIST)
  }
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
