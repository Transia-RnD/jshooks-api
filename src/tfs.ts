/** UniversalFlags.tfFullyCanonicalSig */
export const tfFullyCanonicalSig = 0x80000000

/** AccountSetFlags.tfRequireDestTag */
export const tfRequireDestTag = 0x00010000
/** AccountSetFlags.tfOptionalDestTag */
export const tfOptionalDestTag = 0x00020000
/** AccountSetFlags.tfRequireAuth */
export const tfRequireAuth = 0x00040000
/** AccountSetFlags.tfOptionalAuth */
export const tfOptionalAuth = 0x00080000
/** AccountSetFlags.tfDisallowXRP */
export const tfDisallowXRP = 0x00100000
/** AccountSetFlags.tfAllowXRP */
export const tfAllowXRP = 0x00200000

/** AccountFlags.asfRequireDest */
export const asfRequireDest = 1
/** AccountFlags.asfRequireAuth */
export const asfRequireAuth = 2
/** AccountFlags.asfDisallowXRP */
export const asfDisallowXRP = 3
/** AccountFlags.asfDisableMaster */
export const asfDisableMaster = 4
/** AccountFlags.asfAccountTxnID */
export const asfAccountTxnID = 5
/** AccountFlags.asfNoFreeze */
export const asfNoFreeze = 6
/** AccountFlags.asfGlobalFreeze */
export const asfGlobalFreeze = 7
/** AccountFlags.asfDefaultRipple */
export const asfDefaultRipple = 8
/** AccountFlags.asfDepositAuth */
export const asfDepositAuth = 9
/** AccountFlags.asfAuthorizedNFTokenMinter */
export const asfAuthorizedNFTokenMinter = 10
/** AccountFlags.asfTshCollect */
export const asfTshCollect = 11
/** AccountFlags.asfDisallowIncomingNFTokenOffer */
export const asfDisallowIncomingNFTokenOffer = 12
/** AccountFlags.asfDisallowIncomingCheck */
export const asfDisallowIncomingCheck = 13
/** AccountFlags.asfDisallowIncomingPayChan */
export const asfDisallowIncomingPayChan = 14
/** AccountFlags.asfDisallowIncomingTrustline */
export const asfDisallowIncomingTrustline = 15
/** AccountFlags.asfDisallowIncomingRemit */
export const asfDisallowIncomingRemit = 16

/** OfferCreateFlags.tfPassive */
export const tfPassive = 0x00010000
/** OfferCreateFlags.tfImmediateOrCancel */
export const tfImmediateOrCancel = 0x00020000
/** OfferCreateFlags.tfFillOrKill */
export const tfFillOrKill = 0x00040000
/** OfferCreateFlags.tfSell */
export const tfSell = 0x00080000

/** PaymentFlags.tfNoRippleDirect */
export const tfNoRippleDirect = 0x00010000
/** PaymentFlags.tfPartialPayment */
export const tfPartialPayment = 0x00020000
/** PaymentFlags.tfLimitQuality */
export const tfLimitQuality = 0x00040000

/** TrustSetFlags.tfSetfAuth */
export const tfSetfAuth = 0x00010000
/** TrustSetFlags.tfSetNoRipple */
export const tfSetNoRipple = 0x00020000
/** TrustSetFlags.tfClearNoRipple */
export const tfClearNoRipple = 0x00040000
/** TrustSetFlags.tfSetFreeze */
export const tfSetFreeze = 0x00100000
/** TrustSetFlags.tfClearFreeze */
export const tfClearFreeze = 0x00200000

/** EnableAmendmentFlags.tfGotMajority */
export const tfGotMajority = 0x00010000
/** EnableAmendmentFlags.tfLostMajority */
export const tfLostMajority = 0x00020000
/** EnableAmendmentFlags.tfTestSuite */
export const tfTestSuite = 0x80000000

/** PaymentChannelClaimFlags.tfRenew */
export const tfRenew = 0x00010000
/** PaymentChannelClaimFlags.tfClose */
export const tfClose = 0x00020000

/** NFTokenMintFlags.tfBurnable */
export const tfBurnable = 0x00000001
/** NFTokenMintFlags.tfOnlyXRP */
export const tfOnlyXRP = 0x00000002
/** NFTokenMintFlags.tfTrustLine */
export const tfTrustLine = 0x00000004
/** NFTokenMintFlags.tfTransferable */
export const tfTransferable = 0x00000008
/** NFTokenMintFlags.tfStrongTSH */
export const tfStrongTSH = 0x00008000

/** NFTokenCreateOfferFlags.tfSellNFToken */
export const tfSellNFToken = 0x00000001

/** ClaimRewardFlags.tfOptOut */
export const tfOptOut = 0x00000001
