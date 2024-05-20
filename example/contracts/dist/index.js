var ttINVOKE = 99;

var transactiontype = () => otxn_type();
var Hook = (arg) => {
  trace("HookOnTT.js: Called.", false);
  const tt = transactiontype();
  if (tt !== ttINVOKE) {
    return rollback("hook_on_tt: HookOn field is incorrectly set.", -37);
  }
  return accept("HookOnTT.js: Finished.", 13);
};