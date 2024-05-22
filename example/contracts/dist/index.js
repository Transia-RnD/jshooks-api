var myCustom = (thisis) => {
  return thisis == "that";
};

var ttINVOKE = 99;

var Hook = (arg) => {
  trace("HookOnTT.js: Called.", false);
  const isThis = myCustom("this");
  const tt = otxn_type();
  if (tt !== ttINVOKE) {
    return rollback("hook_on_tt: HookOn field is incorrectly set.", -37);
  }
  return accept("HookOnTT.js: Finished.", 13);
};