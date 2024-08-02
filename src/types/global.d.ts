import type { Transaction } from '@transia/xahau-models'
import {
  SUCCESS,
  OUT_OF_BOUNDS,
  INTERNAL_ERROR,
  TOO_BIG,
  TOO_SMALL,
  DOESNT_EXIST,
  NO_FREE_SLOTS,
  INVALID_ARGUMENT,
  ALREADY_SET,
  PREREQUISITE_NOT_MET,
  FEE_TOO_LARGE,
  EMISSION_FAILURE,
  TOO_MANY_NONCES,
  TOO_MANY_EMITTED_TXN,
  NOT_IMPLEMENTED,
  INVALID_ACCOUNT,
  GUARD_VIOLATION,
  INVALID_FIELD,
  PARSE_ERROR,
  RC_ROLLBACK,
  RC_ACCEPT,
  NO_SUCH_KEYLET,
  NOT_AN_ARRAY,
  NOT_AN_OBJECT,
  INVALID_FLOAT,
  DIVISION_BY_ZERO,
  MANTISSA_OVERSIZED,
  MANTISSA_UNDERSIZED,
  EXPONENT_OVERSIZED,
  EXPONENT_UNDERSIZED,
  XFL_OVERFLOW,
  NOT_IOU_AMOUNT,
  NOT_AN_AMOUNT,
  CANT_RETURN_NEGATIVE,
  NOT_AUTHORIZED,
  PREVIOUS_FAILURE_PREVENTS_RETRY,
  TOO_MANY_PARAMS,
  INVALID_TXN,
  RESERVE_INSUFFICIENT,
  COMPLEX_NOT_SUPPORTED,
  DOES_NOT_MATCH,
  INVALID_KEY,
  NOT_A_STRING,
  MEM_OVERLAP,
  TOO_MANY_STATE_MODIFICATIONS,
  TOO_MANY_NAMESPACES,
} from '../error.ts'

export type ErrorCode =
  | typeof SUCCESS
  | typeof OUT_OF_BOUNDS
  | typeof INTERNAL_ERROR
  | typeof TOO_BIG
  | typeof TOO_SMALL
  | typeof DOESNT_EXIST
  | typeof NO_FREE_SLOTS
  | typeof INVALID_ARGUMENT
  | typeof ALREADY_SET
  | typeof PREREQUISITE_NOT_MET
  | typeof FEE_TOO_LARGE
  | typeof EMISSION_FAILURE
  | typeof TOO_MANY_NONCES
  | typeof TOO_MANY_EMITTED_TXN
  | typeof NOT_IMPLEMENTED
  | typeof INVALID_ACCOUNT
  | typeof GUARD_VIOLATION
  | typeof INVALID_FIELD
  | typeof PARSE_ERROR
  | typeof RC_ROLLBACK
  | typeof RC_ACCEPT
  | typeof NO_SUCH_KEYLET
  | typeof NOT_AN_ARRAY
  | typeof NOT_AN_OBJECT
  | typeof INVALID_FLOAT
  | typeof DIVISION_BY_ZERO
  | typeof MANTISSA_OVERSIZED
  | typeof MANTISSA_UNDERSIZED
  | typeof EXPONENT_OVERSIZED
  | typeof EXPONENT_UNDERSIZED
  | typeof XFL_OVERFLOW
  | typeof NOT_IOU_AMOUNT
  | typeof NOT_AN_AMOUNT
  | typeof CANT_RETURN_NEGATIVE
  | typeof NOT_AUTHORIZED
  | typeof PREVIOUS_FAILURE_PREVENTS_RETRY
  | typeof TOO_MANY_PARAMS
  | typeof INVALID_TXN
  | typeof RESERVE_INSUFFICIENT
  | typeof COMPLEX_NOT_SUPPORTED
  | typeof DOES_NOT_MATCH
  | typeof INVALID_KEY
  | typeof NOT_A_STRING
  | typeof MEM_OVERLAP
  | typeof TOO_MANY_STATE_MODIFICATIONS
  | typeof TOO_MANY_NAMESPACES

declare global {
  /********************************************************************************************************************* */

  /**
   * Write logging information to the trace log of nodes. Used for debugging purposes.
   *
   * @param message The 'logging key', message to output before the buffer (can be null)
   * @param data    The data to log
   * @param hex     (Optional) Should it log formatted in HEX? (default: false)
   * @returns       int64_t, value is 0 if successful, If negative, an error: OUT_OF_BOUNDS
   */
  const trace: (message: string | null, data: any, hex?: boolean) => ErrorCode

  /********************************************************************************************************************* */

  /**
   * Definition of a Hook (smart contract) written in TS/JS.
   *
   * @param reserved uint32_t, Reserved for future use.
   * @returns        int64_t, An arbitrary return code you wish to return from your hook. This will
   *                 be present in the metadata of the originating transaction.
   */
  type Hook = (reserved?: number) => ErrorCode

  /**
   * Definition of a Hook Callback - user defined function called in order to inform your hook about the
   * status of a previously emitted transaction. State changes and further emit calls can be made from
   * cbak but it cannot rollback a transaction. When Callback is executed the emitted transaction to
   * which the callback relates is now the originating transaction.
   *
   * @param reserved uint32_t, If 0: the emittted transaction to which this callback
   *                       relates was successfully accepted into a ledger.
   *                       If 1: the emitted transaction to which the callback relates was NOT
   *                       successfully accepted into a ledger before it expired.
   * @returns              int64_t, An arbitrary return code you wish to return from your hook.
   *                       This will be present in the metadata of the originating transaction.
   */
  type Callback = (reserved?: number) => ErrorCode

  /********************************************************************************************************************* */

  /**
   * Accept the originating transaction and commit any changes the hook made. End the execution of the hook
   * with status: success. Record a return string and return code in transaction metadata. Commit all state
   * changes. Submit all emit() transactions, allow originating transaction to continue.
   *
   * @param msg    String to be stored in execution metadata. This is any string the
   *               hook-developer wishes to return with the acceptance.
   * @param code   A return code specific to this hook to be stored in execution metadata.
   *               Similar to the return code of an application on a *nix system.
   *               By convention success is zero.
   * @returns      int64_t, accept ends the hook, therefore no value is returned to the
   *               caller. By convention all Hook APIs return int64_t, but in this
   *               case nothing is returned.
   */
  const accept: (msg: string, code: number) => ErrorCode

  /********************************************************************************************************************* */

  /**
   * Reject the originating transaction and discard any changes the hook made. End the execution of the
   * hook with status: reject. Record a return string and return code in transaction metadata. Discard all
   * state changes. Discard all emit() transactions. Disallow originating transaction to continue.
   *
   * The originating transaction will fail with tecHOOK_REJECTED and a fee will be charged
   *
   * @param error_msg     String to be stored in execution metadata. This is any string the
   *                      hook-developer wishes to return with the rollback.
   * @param error_code    A return code specific to this hook to be stored in execution metadata.
   *                      Similar to the return code of an application on a *nix system.
   *                      By convention success is zero.
   * @returns             int64_t, rollback ends the hook, therefore no value is returned to
   *                      the caller. By convention all Hook APIs return int64_t, but in this
   *                      case nothing is returned.
   */
  const rollback: (error_msg: string, error_code: number) => ErrorCode

  /********************************************************************************************************************* */
  // UTIL APIS

  /**
   * Format an r-address as Account ID.
   *
   * This function takes an r-address as input and converts it into a HEX Account ID format.
   *
   * @param raddress The r-address to format as HEX account ID.
   * @returns ErrorCode if there is an error in formatting, otherwise returns the HEX Account ID as an array of numbers.
   */
  const util_accid: (raddress: string) => ErrorCode | number[]

  /**
   * Format an Account ID as r-address.
   *
   * This function takes a HEX Account ID and converts it into the corresponding r-address format.
   *
   * @param accountid The HEX account ID to return as r-address, can be provided as an array of numbers or a string.
   * @returns ErrorCode if there is an error in formatting, otherwise returns the r-address as a string.
   */
  const util_raddr: (accountid: number[] | string) => ErrorCode | string

  /**
   * Verify a cryptographic signature.
   *
   * This function verifies a signature against the provided signed data using the appropriate public key type.
   * If the public key is prefixed with 0xED, it uses ED25519; otherwise, it assumes SECP256k1.
   *
   * @param signedData The signed data to verify, can be provided as an array of numbers or a string.
   * @param signature The signature to verify, can be provided as an array of numbers or a string.
   * @param pubkey The public key responsible for the signature, can be provided as an array of numbers or a string.
   * @returns 1 if validation succeeded (the signature is valid), 0 if the signature is invalid.
   */
  const util_verify: (
    signedData: number[] | string,
    signature: number[] | string,
    pubkey: number[] | string
  ) => 0 | 1

  /**
   * Compute a SHA512-half hash over some data.
   *
   * This function computes the SHA512-half hash of the provided data.
   *
   * @param data The data to compute the hash over, can be provided as an array of numbers or a string.
   * @returns ErrorCode if there is an error in computing the hash, otherwise returns the SHA512-half hash as an array of numbers.
   */
  const util_sha512h: (data: number[] | string) => ErrorCode | number[]

  /**
   * Create a keylet based on the specified type and data.
   *
   * This function generates a keylet using the provided keylet type and optional keylet data.
   *
   * @param keylet_type The type of the keylet to create.
   * @param keylet_data_a Optional first piece of data for the keylet, can be an array of numbers, a string, or a number.
   * @param keylet_data_b Optional second piece of data for the keylet, can be an array of numbers, a string, or a number.
   * @param keylet_data_c Optional third piece of data for the keylet, can be an array of numbers, a string, or a number.
   * @returns ErrorCode if there is an error in creating the keylet, otherwise returns the generated keylet as an array of numbers.
   */
  const util_keylet: (
    keylet_type: number,
    keylet_data_a?: number[] | string | number,
    keylet_data_b?: number[] | string | number,
    keylet_data_c?: number[] | string | number
  ) => ErrorCode | number[]

  /********************************************************************************************************************* */
  // HOOK APIS

  /**
   * Retrieve the 20 byte Account ID the Hook is executing on.
   *
   * @returns {ErrorCode | number[]} The Account ID the Hook is executing on, or an error code if the retrieval fails.
   */
  const hook_account: () => ErrorCode | number[]

  /**
   * Look up the hash of the hook installed on the hook account at the specified position.
   *
   * @param {number} hookno - The position in the hook chain the hook is located at, or -1 for the currently executing hook.
   * @returns {ErrorCode | number[]} The Namespace biased SHA512H of the currently executing Hook, or an error code if the lookup fails.
   */
  const hook_hash: (hookno: number) => ErrorCode | number[]

  /**
   * Set a parameter for the hook with the specified value and key, and associate it with a hash.
   *
   * @param {number[] | string} val - The value to set for the parameter.
   * @param {number[] | string} key - The key associated with the parameter.
   * @param {number[] | string} hash - The hash to associate with the parameter.
   * @returns {number} A status code indicating the result of the operation.
   */
  const hook_param_set: (
    val: number[] | string,
    key: number[] | string,
    hash: number[] | string
  ) => number

  /**
   * Retrieve the value of a parameter associated with the specified key.
   *
   * @param {number[] | string} key - The key for which to retrieve the parameter value.
   * @returns {ErrorCode | number[]} The value associated with the key, or an error code if the retrieval fails.
   */
  const hook_param: (key: number[] | string) => ErrorCode | number[]

  /**
   * Skip the execution of a hook based on the provided hash and flag.
   *
   * @param {number[] | string} hash - The hash of the hook to skip.
   * @param {number} flag - A flag indicating the reason for skipping the hook.
   * @returns {ErrorCode | number} A status code indicating the result of the operation.
   */
  const hook_skip: (hash: number[] | string, flag: number) => ErrorCode | number

  /**
   * Retrieve the current position in the hook chain.
   *
   * @returns {ErrorCode | number} The current position in the hook chain, or an error code if the retrieval fails.
   */
  const hook_pos: () => ErrorCode | number

  /**
   * Re-execute the current hook.
   *
   * @returns {ErrorCode | number} A status code indicating the result of the operation.
   */
  const hook_again: () => ErrorCode | number

  /********************************************************************************************************************* */
  // OTXN APIS

  /**
   * Look up the value for a named parameter specified on the originating transaction.
   *
   * @param name - The name of the parameter to look up, specified as a number[] or string.
   * @returns The value of the specified parameter, or an ErrorCode if the lookup fails.
   */
  const otxn_param: (name: number[] | string) => ErrorCode | number[]

  /**
   * Return the Transaction Type of the originating transaction.
   *
   * @returns The Transaction Type as a number, or an ErrorCode if the retrieval fails.
   */
  const otxn_type: () => ErrorCode | number

  /**
   * Output the canonical hash of the originating transaction.
   *
   * @param flag - Optional parameter; 0 returns the hash of the originating transaction,
   *               while flag 1 (and emit_failure) returns the hash of the emitting transaction (default: 0).
   * @returns The transaction hash as an array of numbers, or an ErrorCode if the retrieval fails.
   */
  const otxn_id: (flag?: number) => ErrorCode | number[]

  /**
   * Retrieve the value associated with a specific slot number in the originating transaction.
   *
   * @param slotno - The slot number to look up.
   * @returns The value associated with the specified slot number as an array of numbers,
   *          or an ErrorCode if the lookup fails.
   */
  const otxn_slot: (slotno: number) => ErrorCode | number[]

  /**
   * Retrieve the value of a specific field in the originating transaction.
   *
   * @param field_id - The ID of the field to look up.
   * @returns The value of the specified field as an array of numbers,
   *          or an ErrorCode if the lookup fails.
   */
  const otxn_field: (field_id: number) => ErrorCode | number[]

  /**
   * Output the originating transaction in JSON format.
   *
   * @returns The originating transaction as a JSON object or Transaction,
   *          or an ErrorCode if the retrieval fails.
   */
  const otxn_json: () => ErrorCode | Record<string, any> | Transaction

  /**
   * Retrieve the burden of the originating transaction.
   *
   * @returns The burden as a number, or an ErrorCode if the retrieval fails.
   */
  const otxn_burden: () => ErrorCode | number

  /**
   * Retrieve the generation number of the originating transaction.
   *
   * @returns The generation number as a number.
   */
  const otxn_generation: () => number

  /********************************************************************************************************************* */
  // FLOAT APIS

  /**
   * Retrieves the float representation of a number.
   * @returns {ErrorCode | bigint} An error code or the float representation as a bigint.
   */
  const float_one: () => ErrorCode | bigint

  /**
   * Sets the exponent and mantissa for a float representation.
   * @param {number} exponent - The exponent to set.
   * @param {number} mantissa - The mantissa to set.
   * @returns {ErrorCode | bigint} An error code or the resulting bigint.
   */
  const float_set: (exponent: number, mantissa: number) => ErrorCode | bigint

  /**
   * Multiplies two float representations.
   * @param {bigint} f1 - The first float as a bigint.
   * @param {bigint} f2 - The second float as a bigint.
   * @returns {ErrorCode | bigint} An error code or the product as a bigint.
   */
  const float_multiply: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Multiplies a float by a ratio defined by a numerator and denominator.
   * @param {bigint} f1 - The float to multiply.
   * @param {number} round_up - Indicates whether to round up.
   * @param {number} numerator - The numerator of the ratio.
   * @param {number} denominator - The denominator of the ratio.
   * @returns {ErrorCode | bigint} An error code or the resulting bigint.
   */
  const float_mulratio: (
    f1: bigint,
    round_up: number,
    numerator: number,
    denominator: number
  ) => ErrorCode | bigint

  /**
   * Negates a float representation.
   * @param {bigint} f1 - The float to negate.
   * @returns {ErrorCode | bigint} An error code or the negated float as a bigint.
   */
  const float_negate: (f1: bigint) => ErrorCode | bigint

  /**
   * Compares two float representations.
   * @param {bigint} f1 - The first float to compare.
   * @param {bigint} f2 - The second float to compare.
   * @param {number} mode - The comparison mode (e.g., less than, equal to, greater than).
   * @returns {ErrorCode | number} An error code or the comparison result as a number.
   */
  const float_compare: (
    f1: bigint,
    f2: bigint,
    mode: number
  ) => ErrorCode | number

  /**
   * Sums two float representations.
   * @param {bigint} f1 - The first float to sum.
   * @param {bigint} f2 - The second float to sum.
   * @returns {ErrorCode | bigint} An error code or the sum as a bigint.
   */
  const float_sum: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Stores a float representation into a specified field.
   * @param {number[] | string | undefined} cur - The current value to store into.
   * @param {number[] | string | undefined} isu - The value to store.
   * @param {bigint} f1 - The float to store.
   * @param {number} field_code - The field code indicating where to store the float.
   * @returns {ErrorCode | number[]} An error code or the updated value as an array of numbers.
   */
  const float_sto: (
    cur: number[] | string | undefined,
    isu: number[] | string | undefined,
    f1: bigint,
    field_code: number
  ) => ErrorCode | number[]

  /**
   * Sets the buffer for storing float representations.
   * @param {number[] | string} buf - The buffer to set.
   * @returns {ErrorCode | number} An error code or the result as a number.
   */
  const float_sto_set: (buf: number[] | string) => ErrorCode | number

  /**
   * Inverts a float representation.
   * @param {bigint} f1 - The float to invert.
   * @returns {ErrorCode | bigint} An error code or the inverted float as a bigint.
   */
  const float_invert: (f1: bigint) => ErrorCode | bigint

  /**
   * Divides one float representation by another.
   * @param {bigint} f1 - The dividend float.
   * @param {bigint} f2 - The divisor float.
   * @returns {ErrorCode | bigint} An error code or the quotient as a bigint.
   */
  const float_divide: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Retrieves the mantissa of a float representation.
   * @param {bigint} f1 - The float to retrieve the mantissa from.
   * @returns {ErrorCode | bigint} An error code or the mantissa as a bigint.
   */
  const float_mantissa: (f1: bigint) => ErrorCode | bigint

  /**
   * Retrieves the sign of a float representation.
   * @param {bigint} f1 - The float to check the sign of.
   * @returns {ErrorCode | bigint} An error code or the sign as a bigint.
   */
  const float_sign: (f1: bigint) => ErrorCode | bigint

  /**
   * Converts a float representation to an integer with specified decimal places.
   * @param {bigint} f1 - The float to convert.
   * @param {number} decimal_places - The number of decimal places to consider.
   * @param {number} abs - Indicates whether to take the absolute value.
   * @returns {ErrorCode | number} An error code or the resulting integer as a number.
   */
  const float_int: (
    f1: bigint,
    decimal_places: number,
    abs: number
  ) => ErrorCode | number

  /**
   * Calculates the logarithm of a float representation.
   * @param {bigint} f1 - The float to calculate the logarithm of.
   * @returns {ErrorCode | bigint} An error code or the logarithm as a bigint.
   */
  const float_log: (f1: bigint) => ErrorCode | bigint

  /**
   * Calculates the nth root of a float representation.
   * @param {bigint} f1 - The float to calculate the root of.
   * @param {number} n - The degree of the root to calculate.
   * @returns {ErrorCode | bigint} An error code or the resulting root as a bigint.
   */
  const float_root: (f1: bigint, n: number) => ErrorCode | bigint

  /********************************************************************************************************************* */
  // STO APIS

  /**
   * Format an STO object (binary encoded ledger data) as JSON format.
   *
   * This function takes a serialized transaction blob and converts it into a human-readable JSON format.
   *
   * @param blob The blob (e.g. serialized transaction) to be converted.
   * @returns Decoded JSON representation of the STO object, or an error code if the conversion fails.
   */
  const sto_to_json: (
    blob: number[] | string
  ) => ErrorCode | Record<string, any> | Transaction

  /**
   * Validate an STO object (binary encoded ledger data).
   *
   * This function checks if the STObject pointed to by the read pointer is valid.
   *
   * @param blob The blob (e.g. serialized transaction) to be validated.
   * @returns Returns number 1 if the STObject is valid, 0 if it isn't, or an error code if validation fails.
   */
  const sto_validate: (blob: number[] | string) => ErrorCode | number

  /**
   * Format JSON as an STO object (binary encoded ledger data).
   *
   * This function takes a JSON object and converts it into a binary encoded ledger data format.
   *
   * @param jsonobj JSON object to be converted into an STO object.
   * @returns STO Object in binary encoded ledger data format, or an error code if the conversion fails.
   */
  const sto_from_json: (
    jsonobj: Record<string, any> | Transaction
  ) => ErrorCode | number[]

  /**
   * Retrieve a subfield from an STO object.
   *
   * This function extracts a specific field from the given STO object based on the provided field ID.
   *
   * @param sto The STO object (binary encoded ledger data) from which to extract the subfield.
   * @param field_id The ID of the field to be extracted.
   * @returns The value of the specified subfield, or an error code if the extraction fails.
   */
  const sto_subfield: (
    sto: number[] | string,
    field_id: number
  ) => ErrorCode | number

  /**
   * Retrieve a subarray from an STO object.
   *
   * This function extracts a specific array from the given STO object based on the provided array ID.
   *
   * @param sto The STO object (binary encoded ledger data) from which to extract the subarray.
   * @param array_id The ID of the array to be extracted.
   * @returns The value of the specified subarray, or an error code if the extraction fails.
   */
  const sto_subarray: (
    sto: number[] | string,
    array_id: number
  ) => ErrorCode | number

  /**
   * Emplace a field into an STO object.
   *
   * This function adds a new field to the given STO object using the provided field bytes and field ID.
   *
   * @param sto The STO object (binary encoded ledger data) to which the field will be added.
   * @param field_bytes The bytes representing the field to be added.
   * @param field_id The ID of the field to be added.
   * @returns The updated STO object in binary encoded ledger data format, or an error code if the operation fails.
   */
  const sto_emplace: (
    sto: number[] | string,
    field_bytes: number[] | string,
    field_id: number
  ) => ErrorCode | number[]

  /**
   * Erase a field from an STO object.
   *
   * This function removes a specific field from the given STO object based on the provided field ID.
   *
   * @param sto The STO object (binary encoded ledger data) from which the field will be removed.
   * @param field_id The ID of the field to be erased.
   * @returns The updated STO object in binary encoded ledger data format, or an error code if the operation fails.
   */
  const sto_erase: (
    sto: number[] | string,
    field_id: number
  ) => ErrorCode | number[]

  /********************************************************************************************************************* */
  // LEDGER APIS

  /**
   * Search for a keylet within a specified range on the current ledger
   * Search the ledger for the first (lowest) Keylet of this type in this range
   *
   * @param low Pointer to the 34 byte serialised Keylet that represents the lower boundary of the Keylet range to search
   * @param high Pointer to the 34 byte serialised Keylet that represents the upper boundary of the Keylet range to search
   * @returns The number of bytes written (34 bytes) on success
   */
  const ledger_keylet: (
    low: number[] | string,
    high: number[] | string
  ) => ErrorCode | number[]

  /**
   * Retrieves the hash of the last ledger.
   * @returns {ErrorCode | number[]} - Returns an error code if an error occurs, or an array representing the hash of the last ledger.
   */
  const ledger_last_hash: () => ErrorCode | number[]

  /**
   * Retrieves the timestamp of the last ledger.
   * @returns {ErrorCode | number} - Returns an error code if an error occurs, or a number representing the timestamp of the last ledger.
   */
  const ledger_last_time: () => ErrorCode | number

  /**
   * Retrieves the nonce of the current ledger.
   * @returns {ErrorCode | number[]} - Returns an error code if an error occurs, or an array representing the nonce of the current ledger.
   */
  const ledger_nonce: () => ErrorCode | number[]

  /**
   * Retrieves the sequence number of the current ledger.
   * @returns {ErrorCode | number} - Returns an error code if an error occurs, or a number representing the sequence number of the current ledger.
   */
  const ledger_seq: () => ErrorCode | number
  const fee_base: () => number

  /********************************************************************************************************************* */
  // SLOT APIS

  /**
   * Retrieves the JSON representation of the specified slot.
   * @param {number} slotno - The slot number to retrieve.
   * @returns {ErrorCode | number[]} - Returns an error code or the slot's JSON data.
   */
  const slot_json: (slotno: number) => ErrorCode | number[]

  /**
   * Retrieves the data associated with the specified slot.
   * @param {number} slotno - The slot number to retrieve.
   * @returns {ErrorCode | number[]} - Returns an error code or the slot's data.
   */
  const slot: (slotno: number) => ErrorCode | number[]

  /**
   * Clears the data in the specified slot.
   * @param {number} slotno - The slot number to clear.
   * @returns {ErrorCode | number} - Returns an error code or the result of the clear operation.
   */
  const slot_clear: (slotno: number) => ErrorCode | number

  /**
   * Counts the number of entries in the specified slot.
   * @param {number} slotno - The slot number to count entries in.
   * @returns {ErrorCode | number} - Returns an error code or the count of entries.
   */
  const slot_count: (slotno: number) => ErrorCode | number

  /**
   * Sets the data for the specified slot.
   * @param {number[] | string} kl - The data to set in the slot, can be an array or a string.
   * @param {number} slotno - The slot number to set data for.
   * @returns {ErrorCode | number} - Returns an error code or the result of the set operation.
   */
  const slot_set: (kl: number[] | string, slotno: number) => ErrorCode | number

  /**
   * Retrieves the size of the specified slot.
   * @param {number} slotno - The slot number to check the size of.
   * @returns {ErrorCode | number} - Returns an error code or the size of the slot.
   */
  const slot_size: (slotno: number) => ErrorCode | number

  /**
   * Creates a subarray in the specified parent slot.
   * @param {number} parent_slotno - The parent slot number.
   * @param {number} array_id - The ID of the array to create a subarray for.
   * @param {number} new_slotno - The new slot number for the subarray.
   * @returns {ErrorCode | number} - Returns an error code or the result of the subarray creation.
   */
  const slot_subarray: (
    parent_slotno: number,
    array_id: number,
    new_slotno: number
  ) => ErrorCode | number

  /**
   * Creates a subfield in the specified parent slot.
   * @param {number} parent_slotno - The parent slot number.
   * @param {number} field_id - The ID of the field to create a subfield for.
   * @param {number} new_slotno - The new slot number for the subfield.
   * @returns {ErrorCode | number} - Returns an error code or the result of the subfield creation.
   */
  const slot_subfield: (
    parent_slotno: number,
    field_id: number,
    new_slotno: number
  ) => ErrorCode | number

  /**
   * Retrieves the type of the specified slot.
   * @param {number} slotno - The slot number to check the type of.
   * @param {number} flags - Flags to determine the type.
   * @returns {ErrorCode | number} - Returns an error code or the type of the slot.
   */
  const slot_type: (slotno: number, flags: number) => ErrorCode | number

  /**
   * Retrieves the float value associated with the specified slot.
   * @param {number} slotno - The slot number to retrieve the float value from.
   * @returns {ErrorCode | number} - Returns an error code or the float value.
   */
  const slot_float: (slotno: number) => ErrorCode | number

  /**
   * Retrieves metadata associated with the specified slot.
   * @param {number} slotno - The slot number to retrieve metadata for.
   * @returns {ErrorCode | number} - Returns an error code or the slot's metadata.
   */
  const meta_slot: (slotno: number) => ErrorCode | number

  /**
   * Pops the specified transaction and metadata slots.
   * @param {number} slotno_tx - The transaction slot number to pop.
   * @param {number} slotno_meta - The metadata slot number to pop.
   * @returns {ErrorCode | number} - Returns an error code or the result of the pop operation.
   */
  const xpop_slot: (
    slotno_tx: number,
    slotno_meta: number
  ) => ErrorCode | number

  /********************************************************************************************************************* */
  // STATE APIS
  /**
   * Get Hook State
   *
   * @param key Key of the Hook State
   * @returns Hook State value for key
   */
  const state: (key: number[] | string) => ErrorCode | number[]

  /**
   * Set Hook State
   *
   * @param value The value of data to persist
   * @param key Key of the Hook State
   * @returns The number of bytes written to Hook State (the length of the data), negative on error.
   */
  const state_set: (
    value: number[] | string | undefined | null,
    key: number[] | string
  ) => ErrorCode | number

  /**
   * Get Foreign Hook State (belonging to another account)
   *
   * @param key Key of the Hook State
   * @param namespace The Hook namespace to look in
   * @param accountid The owner of the state
   * @returns Hook State value for key
   */
  const state_foreign: (
    key: number[] | string,
    namespace: number[] | string | undefined | null,
    accountid: number[] | string | undefined | null
  ) => ErrorCode | number[]

  /**
   * Set Foreign Hook State - Authorized, needs a Grant to allows this
   *
   * @param value The value of data to persist
   * @param key Key of the Hook State
   * @param namespace The Hook namespace to look in
   * @param accountid The owner of the state
   * @returns The number of bytes written to Hook State (the length of the data), negative on error.
   */
  const state_foreign_set: (
    value: number[] | string | undefined | null,
    key: number[] | string,
    namespace: number[] | string | undefined | null,
    accountid: number[] | string | undefined | null
  ) => ErrorCode | number

  /********************************************************************************************************************* */
  // EMIT APIS

  /**
   * Prepare a JSON transaction for being emitted.
   *
   * This function takes a transaction JSON object and prepares it for emission.
   * The transaction must be complete except for the Account field, which should
   * always be the Hook account.
   *
   * @param txJson The transaction JSON, must be a complete transaction except for Account (always the Hook account).
   * @returns An ErrorCode if there is an error, or the prepared transaction JSON or Transaction object.
   */
  const prepare: (
    txJson: Record<string, any> | Transaction
  ) => ErrorCode | Record<string, any> | Transaction

  /**
   * Emit a transaction.
   *
   * This function emits the provided transaction JSON. On success, it returns
   * the number of emitted transaction hashes. If there is an error, it returns
   * an error code.
   *
   * @param txJson The TX JSON to emit.
   * @returns An ErrorCode if there is an error, or an array of emitted transaction hashes on success.
   */
  const emit: (
    txJson: Record<string, any> | Transaction
  ) => ErrorCode | number[]

  /**
   * Configure the maximum number of transactions this Hook is allowed to emit.
   *
   * This function sets a limit on the number of transactions that can be emitted
   * by the Hook during its lifecycle.
   *
   * @param txCount The maximum amount of transactions this Hook is allowed to emit.
   * @returns An ErrorCode if there is an error, or the configured transaction count on success.
   */
  const etxn_reserve: (txCount: number) => ErrorCode | number

  /**
   * Calculate the base fee for a transaction.
   *
   * This function computes the base fee for the given transaction blob.
   *
   * @param txblob The transaction blob, which can be an array of numbers or a string.
   * @returns An ErrorCode if there is an error, or the calculated base fee on success.
   */
  const etxn_fee_base: (txblob: number[] | string) => ErrorCode | number

  /**
   * Get the burden of the transaction.
   *
   * This function retrieves the current burden associated with the transaction.
   *
   * @returns An ErrorCode if there is an error, or the current burden value on success.
   */
  const etxn_burden: () => ErrorCode | number

  /**
   * Retrieve details of the transaction.
   *
   * This function provides detailed information about the transaction.
   *
   * @returns An ErrorCode if there is an error, or an array of transaction details on success.
   */
  const etxn_details: () => ErrorCode | number[]

  /**
   * Get the nonce for the transaction.
   *
   * This function retrieves the nonce associated with the transaction.
   *
   * @returns An ErrorCode if there is an error, or an array containing the nonce value on success.
   */
  const etxn_nonce: () => ErrorCode | number[]

  /**
   * Generate a new transaction.
   *
   * This function generates a new transaction and returns a code indicating
   * the result of the generation process.
   *
   * @returns An ErrorCode if there is an error, or a number indicating the generation result on success.
   */
  const etxn_generation: () => ErrorCode | number
}

export {}
