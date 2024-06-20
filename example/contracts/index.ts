import { Payment } from "@transia/xahau-models";
import { DOESNT_EXIST } from "jshooks-api";
import { accept, otxn_json, rollback } from "jshooks-api";

const Hook = (arg: any) => {
  const tx = otxn_json() as Payment;
  if (
    tx.TransactionType === "Payment" &&
    tx.Account === "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn"
  ) {
    return rollback("", DOESNT_EXIST);
  }

  return accept('', 13);
};

// REQUIRED FOR ESBUILD
export { Hook };
