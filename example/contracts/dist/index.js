var DOESNT_EXIST = -5;

var Hook = (arg) => {
  const tx = otxn_json();
  if (tx.TransactionType === "Payment" && tx.Account === "rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn") {
    return rollback("", DOESNT_EXIST);
  }
  return accept("", 13);
};