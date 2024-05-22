var myCustom = (thisis) => {
  return thisis == "that";
};

var DOESNT_EXIST = -5;

var ttINVOKE = 99;

var Hook = (arg) => {
  trace("HookOnTT.js: Called.", false);
  const isThis = myCustom("this");
  const tt = otxn_type();
  const txn = otxn_json();
  trace(txn.Account, 1);
  if (tt !== ttINVOKE) {
    return rollback("hook_on_tt: HookOn field is incorrectly set.", DOESNT_EXIST);
  }
  return accept("HookOnTT.js: Finished.", 13);
};