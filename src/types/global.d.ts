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

export type ByteArray = number[]
export type HexString = string

declare global {
  /********************************************************************************************************************* */

  /**
   * Write logging information to the trace log of nodes. Used for debugging purposes.
   *
   * @param message The 'logging key', message to output before the buffer (can be null)
   * @param data    The data to log
   * @param hex     Should it log formatted in HEX?
   * @returns       int64_t, value is 0 if successful, If negative, an error: OUT_OF_BOUNDS
   */
  const trace: (message: string | null, data: any, hex: boolean) => ErrorCode

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
  function accept(msg: string, code: number): ErrorCode

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
  const util_accid: (raddress: string) => ErrorCode | ByteArray

  /**
   * Format an Account ID as r-address.
   *
   * This function takes a HEX Account ID and converts it into the corresponding r-address format.
   *
   * @param accountid The HEX account ID to return as r-address, can be provided as an array of numbers or a string.
   * @returns ErrorCode if there is an error in formatting, otherwise returns the r-address as a string.
   */
  const util_raddr: (accountid: ByteArray | HexString) => ErrorCode | string

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
    signedData: ByteArray | HexString,
    signature: ByteArray | HexString,
    pubkey: ByteArray | HexString
  ) => 0 | 1

  /**
   * Compute a SHA512-half hash over some data.
   *
   * This function computes the SHA512-half hash of the provided data.
   *
   * @param data The data to compute the hash over, can be provided as an array of numbers or a string.
   * @returns ErrorCode if there is an error in computing the hash, otherwise returns the SHA512-half hash as an array of numbers.
   */
  const util_sha512h: (data: ByteArray | HexString) => ErrorCode | ByteArray

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
    keylet_data_a?: ByteArray | HexString | number,
    keylet_data_b?: ByteArray | HexString | number,
    keylet_data_c?: ByteArray | HexString | number
  ) => ErrorCode | ByteArray

  /********************************************************************************************************************* */
  // HOOK APIS

  /**
   * Retrieve the 20 byte Account ID the Hook is executing on.
   *
   * @returns The Account ID the Hook is executing on, or an error code if the retrieval fails.
   */
  const hook_account: () => ErrorCode | ByteArray

  /**
   * Look up the hash of the hook installed on the hook account at the specified position.
   *
   * @param hookno - The position in the hook chain the hook is located at, or -1 for the currently executing hook.
   * @returns The Namespace biased SHA512H of the currently executing Hook, or an error code if the lookup fails.
   */
  const hook_hash: (hookno: number) => ErrorCode | ByteArray

  /**
   * Set a parameter for the hook with the specified value and key, and associate it with a hash.
   *
   * @param val - The value to set for the parameter.
   * @param key - The key associated with the parameter.
   * @param hash - The hash to associate with the parameter.
   * @returns A status code indicating the result of the operation.
   */
  const hook_param_set: (
    val: ByteArray | HexString,
    key: ByteArray | HexString,
    hash: ByteArray | HexString
  ) => number

  /**
   * Retrieve the value of a parameter associated with the specified key.
   *
   * @param key - The key for which to retrieve the parameter value.
   * @returns The value associated with the key, or an error code if the retrieval fails.
   */
  const hook_param: (key: ByteArray | HexString) => ErrorCode | ByteArray

  /**
   * Skip the execution of a hook based on the provided hash and flag.
   *
   * @param hash - The hash of the hook to skip.
   * @param flag - A flag indicating the reason for skipping the hook.
   * @returns A status code indicating the result of the operation.
   */
  const hook_skip: (
    hash: ByteArray | HexString,
    flag: number
  ) => ErrorCode | number

  /**
   * Retrieve the current position in the hook chain.
   *
   * @returns The current position in the hook chain, or an error code if the retrieval fails.
   */
  const hook_pos: () => ErrorCode | number

  /**
   * Re-execute the current hook.
   *
   * @returns A status code indicating the result of the operation.
   */
  const hook_again: () => ErrorCode | number

  /********************************************************************************************************************* */
  // OTXN APIS

  /**
   * Look up the value for a named parameter specified on the originating transaction.
   *
   * @param name - The name of the parameter to look up, specified as a ByteArray or string.
   * @returns The value of the specified parameter, or an ErrorCode if the lookup fails.
   */
  const otxn_param: (name: ByteArray | HexString) => ErrorCode | ByteArray

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
  const otxn_id: (flag?: number) => ErrorCode | ByteArray

  /**
   * Retrieve the value associated with a specific slot number in the originating transaction.
   *
   * @param slotno - The slot number to look up.
   * @returns The value associated with the specified slot number as an array of numbers,
   *          or an ErrorCode if the lookup fails.
   */
  const otxn_slot: (slotno: number) => ErrorCode | ByteArray

  /**
   * Retrieve the value of a specific field in the originating transaction.
   *
   * @param field_id - The ID of the field to look up.
   * @returns The value of the specified field as an array of numbers,
   *          or an ErrorCode if the lookup fails.
   */
  const otxn_field: (field_id: number) => ErrorCode | ByteArray

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
   * @returns An error code or the float representation as a bigint.
   */
  const float_one: () => ErrorCode | bigint

  /**
   * Sets the exponent and mantissa for a float representation.
   * @param exponent - The exponent to set.
   * @param mantissa - The mantissa to set.
   * @returns An error code or the resulting bigint.
   */
  const float_set: (exponent: number, mantissa: number) => ErrorCode | bigint

  /**
   * Multiplies two float representations.
   * @param f1 - The first float as a bigint.
   * @param f2 - The second float as a bigint.
   * @returns An error code or the product as a bigint.
   */
  const float_multiply: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Multiplies a float by a ratio defined by a numerator and denominator.
   * @param f1 - The float to multiply.
   * @param round_up - Indicates whether to round up.
   * @param numerator - The numerator of the ratio.
   * @param denominator - The denominator of the ratio.
   * @returns An error code or the resulting bigint.
   */
  const float_mulratio: (
    f1: bigint,
    round_up: number,
    numerator: number,
    denominator: number
  ) => ErrorCode | bigint

  /**
   * Negates a float representation.
   * @param f1 - The float to negate.
   * @returns An error code or the negated float as a bigint.
   */
  const float_negate: (f1: bigint) => ErrorCode | bigint

  /**
   * Compares two float representations.
   * @param f1 - The first float to compare.
   * @param f2 - The second float to compare.
   * @param mode - The comparison mode (e.g., less than, equal to, greater than).
   * @returns An error code or the comparison result as a number.
   */
  const float_compare: (
    f1: bigint,
    f2: bigint,
    mode: number
  ) => ErrorCode | number

  /**
   * Sums two float representations.
   * @param f1 - The first float to sum.
   * @param f2 - The second float to sum.
   * @returns An error code or the sum as a bigint.
   */
  const float_sum: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Stores a float representation into a specified field.
   * @param cur - The current value to store into.
   * @param isu - The value to store.
   * @param f1 - The float to store.
   * @param field_code - The field code indicating where to store the float.
   * @returns An error code or the updated value as an array of numbers.
   */
  const float_sto: (
    cur: ByteArray | HexString | undefined,
    isu: ByteArray | HexString | undefined,
    f1: bigint,
    field_code: number
  ) => ErrorCode | ByteArray

  /**
   * Sets the buffer for storing float representations.
   * @param buf - The buffer to set.
   * @returns An error code or the result as a number.
   */
  const float_sto_set: (buf: ByteArray | HexString) => ErrorCode | number

  /**
   * Inverts a float representation.
   * @param f1 - The float to invert.
   * @returns An error code or the inverted float as a bigint.
   */
  const float_invert: (f1: bigint) => ErrorCode | bigint

  /**
   * Divides one float representation by another.
   * @param f1 - The dividend float.
   * @param f2 - The divisor float.
   * @returns An error code or the quotient as a bigint.
   */
  const float_divide: (f1: bigint, f2: bigint) => ErrorCode | bigint

  /**
   * Retrieves the mantissa of a float representation.
   * @param f1 - The float to retrieve the mantissa from.
   * @returns An error code or the mantissa as a bigint.
   */
  const float_mantissa: (f1: bigint) => ErrorCode | bigint

  /**
   * Retrieves the sign of a float representation.
   * @param f1 - The float to check the sign of.
   * @returns An error code or the sign as a bigint.
   */
  const float_sign: (f1: bigint) => ErrorCode | bigint

  /**
   * Converts a float representation to an integer with specified decimal places.
   * @param f1 - The float to convert.
   * @param decimal_places - The number of decimal places to consider.
   * @param abs - Indicates whether to take the absolute value.
   * @returns An error code or the resulting integer as a number.
   */
  const float_int: (
    f1: bigint,
    decimal_places: number,
    abs: number
  ) => ErrorCode | number

  /**
   * Calculates the logarithm of a float representation.
   * @param f1 - The float to calculate the logarithm of.
   * @returns An error code or the logarithm as a bigint.
   */
  const float_log: (f1: bigint) => ErrorCode | bigint

  /**
   * Calculates the nth root of a float representation.
   * @param f1 - The float to calculate the root of.
   * @param n - The degree of the root to calculate.
   * @returns An error code or the resulting root as a bigint.
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
    blob: ByteArray | HexString
  ) => ErrorCode | Record<string, any> | Transaction

  /**
   * Validate an STO object (binary encoded ledger data).
   *
   * This function checks if the STObject pointed to by the read pointer is valid.
   *
   * @param blob The blob (e.g. serialized transaction) to be validated.
   * @returns Returns number 1 if the STObject is valid, 0 if it isn't, or an error code if validation fails.
   */
  const sto_validate: (blob: ByteArray | HexString) => ErrorCode | number

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
  ) => ErrorCode | ByteArray

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
    sto: ByteArray | HexString,
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
    sto: ByteArray | HexString,
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
    sto: ByteArray | HexString,
    field_bytes: ByteArray | HexString,
    field_id: number
  ) => ErrorCode | ByteArray

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
    sto: ByteArray | HexString,
    field_id: number
  ) => ErrorCode | ByteArray

  /********************************************************************************************************************* */
  // LEDGER APIS

  /**
   * Searches for a keylet within a specified range on the current ledger.
   * This function searches the ledger for the first (lowest) Keylet of this type in the given range.
   *
   * @param low - Pointer to the 34-byte serialized Keylet that represents the lower boundary of the Keylet range to search.
   * @param high - Pointer to the 34-byte serialized Keylet that represents the upper boundary of the Keylet range to search.
   * @returns Returns the number of bytes written (34 bytes) on success, or an error code if an error occurs.
   */
  const ledger_keylet: (
    low: ByteArray | HexString,
    high: ByteArray | HexString
  ) => ErrorCode | ByteArray

  /**
   * Retrieves the hash of the last ledger.
   * @returns Returns an error code if an error occurs, or an array representing the hash of the last ledger.
   */
  const ledger_last_hash: () => ErrorCode | ByteArray

  /**
   * Retrieves the timestamp of the last ledger.
   * @returns Returns an error code if an error occurs, or a number representing the timestamp of the last ledger.
   */
  const ledger_last_time: () => ErrorCode | number

  /**
   * Retrieves the nonce of the current ledger.
   * @returns Returns an error code if an error occurs, or an array representing the nonce of the current ledger.
   */
  const ledger_nonce: () => ErrorCode | ByteArray

  /**
   * Retrieves the sequence number of the current ledger.
   * @returns Returns an error code if an error occurs, or a number representing the sequence number of the current ledger.
   */
  const ledger_seq: () => ErrorCode | number

  /**
   * Retrieves the base fee for transactions.
   * @returns Returns the base fee for transactions.
   */
  const fee_base: () => number

  /********************************************************************************************************************* */
  // SLOT APIS

  /**
   * Retrieves the JSON representation of the specified slot.
   * @param slotno - The slot number to retrieve.
   * @returns Returns an error code or the slot's JSON data.
   */
  const slot_json: (slotno: number) => ErrorCode | ByteArray

  /**
   * Retrieves the data associated with the specified slot.
   * @param slotno - The slot number to retrieve.
   * @returns Returns an error code or the slot's data.
   */
  const slot: (slotno: number) => ErrorCode | ByteArray

  /**
   * Clears the data in the specified slot.
   * @param slotno - The slot number to clear.
   * @returns Returns an error code or the result of the clear operation.
   */
  const slot_clear: (slotno: number) => ErrorCode | number

  /**
   * Counts the number of entries in the specified slot.
   * @param slotno - The slot number to count entries in.
   * @returns Returns an error code or the count of entries.
   */
  const slot_count: (slotno: number) => ErrorCode | number

  /**
   * Sets the data for the specified slot.
   * @param kl - The data to set in the slot, can be an array or a string.
   * @param slotno - The slot number to set data for.
   * @returns Returns an error code or the result of the set operation.
   */
  const slot_set: (
    kl: ByteArray | HexString,
    slotno: number
  ) => ErrorCode | number

  /**
   * Retrieves the size of the specified slot.
   * @param slotno - The slot number to check the size of.
   * @returns Returns an error code or the size of the slot.
   */
  const slot_size: (slotno: number) => ErrorCode | number

  /**
   * Creates a subarray in the specified parent slot.
   * @param parent_slotno - The parent slot number.
   * @param array_id - The ID of the array to create a subarray for.
   * @param new_slotno - The new slot number for the subarray.
   * @returns Returns an error code or the result of the subarray creation.
   */
  const slot_subarray: (
    parent_slotno: number,
    array_id: number,
    new_slotno: number
  ) => ErrorCode | number

  /**
   * Creates a subfield in the specified parent slot.
   * @param parent_slotno - The parent slot number.
   * @param field_id - The ID of the field to create a subfield for.
   * @param new_slotno - The new slot number for the subfield.
   * @returns Returns an error code or the result of the subfield creation.
   */
  const slot_subfield: (
    parent_slotno: number,
    field_id: number,
    new_slotno: number
  ) => ErrorCode | number

  /**
   * Retrieves the type of the specified slot.
   * @param slotno - The slot number to check the type of.
   * @param flags - Flags to determine the type.
   * @returns Returns an error code or the type of the slot.
   */
  const slot_type: (slotno: number, flags: number) => ErrorCode | number

  /**
   * Retrieves the float value associated with the specified slot.
   * @param slotno - The slot number to retrieve the float value from.
   * @returns Returns an error code or the float value.
   */
  const slot_float: (slotno: number) => ErrorCode | number

  /**
   * Retrieves metadata associated with the specified slot.
   * @param slotno - The slot number to retrieve metadata for.
   * @returns Returns an error code or the slot's metadata.
   */
  const meta_slot: (slotno: number) => ErrorCode | number

  /**
   * Pops the specified transaction and metadata slots.
   * @param slotno_tx - The transaction slot number to pop.
   * @param slotno_meta - The metadata slot number to pop.
   * @returns Returns an error code or the result of the pop operation.
   */
  const xpop_slot: (
    slotno_tx: number,
    slotno_meta: number
  ) => ErrorCode | number

  /********************************************************************************************************************* */
  // STATE APIS

  /**
   * Retrieves the Hook State value associated with the specified key.
   * @param key - The key of the Hook State to retrieve the value from.
   * @returns Returns an error code or the Hook State value for the key.
   */
  const state: (key: ByteArray | HexString) => ErrorCode | ByteArray

  /**
   * Sets the Hook State with the specified value and key.
   * @param value - The value of data to persist.
   * @param key - The key of the Hook State to set the value for.
   * @returns Returns the number of bytes written to Hook State (the length of the data), negative on error.
   */
  const state_set: (
    value: ByteArray | HexString | undefined | null,
    key: ByteArray | HexString
  ) => ErrorCode | number

  /**
   * Retrieves the Foreign Hook State value belonging to another account for the specified key.
   * @param key - The key of the Hook State to retrieve the value from.
   * @param namespace - The Hook namespace to look in.
   * @param accountid - The owner of the state.
   * @returns Returns an error code or the Hook State value for the key.
   */
  const state_foreign: (
    key: ByteArray | HexString,
    namespace: ByteArray | HexString | undefined | null,
    accountid: ByteArray | HexString | undefined | null
  ) => ErrorCode | ByteArray

  /**
   * Sets the Foreign Hook State with the specified value, key, namespace, and account ID.
   * This operation requires authorization and a Grant to allow this action.
   * @param value - The value of data to persist.
   * @param key - The key of the Hook State to set the value for.
   * @param namespace - The Hook namespace to look in.
   * @param accountid - The owner of the state.
   * @returns Returns the number of bytes written to Hook State (the length of the data), negative on error.
   */
  const state_foreign_set: (
    value: ByteArray | HexString | undefined | null,
    key: ByteArray | HexString,
    namespace: ByteArray | HexString | undefined | null,
    accountid: ByteArray | HexString | undefined | null
  ) => ErrorCode | number

  /********************************************************************************************************************* */
  // EMIT APIS

  /**
   * Prepares a JSON transaction for emission.
   *
   * This function takes a transaction JSON object and prepares it for emission.
   * The transaction must be complete except for the Account field, which should
   * always be the Hook account.
   *
   * @param txJson - The transaction JSON, must be a complete transaction except for Account (always the Hook account).
   * @returns {ErrorCode | Record<string, any> | Transaction} An ErrorCode if there is an error, or the prepared transaction JSON or Transaction object.
   */
  const prepare: (
    txJson: Record<string, any> | Transaction
  ) => ErrorCode | Record<string, any> | Transaction

  /**
   * Emits a transaction.
   *
   * This function emits the provided transaction JSON. On success, it returns
   * the number of emitted transaction hashes. If there is an error, it returns
   * an error code.
   *
   * @param txJson - The TX JSON to emit.
   * @returns An ErrorCode if there is an error, or an array of emitted transaction hashes on success.
   */
  const emit: (
    txJson: Record<string, any> | Transaction
  ) => ErrorCode | ByteArray

  /**
   * Configures the maximum number of transactions this Hook is allowed to emit.
   *
   * This function sets a limit on the number of transactions that can be emitted
   * by the Hook during its lifecycle.
   *
   * @param txCount - The maximum amount of transactions this Hook is allowed to emit.
   * @returns An ErrorCode if there is an error, or the configured transaction count on success.
   */
  const etxn_reserve: (txCount: number) => ErrorCode | number

  /**
   * Calculates the base fee for a transaction.
   *
   * This function computes the base fee for the given transaction blob.
   *
   * @param txblob - The transaction blob, which can be an array of numbers or a string.
   * @returns An ErrorCode if there is an error, or the calculated base fee on success.
   */
  const etxn_fee_base: (txblob: ByteArray | HexString) => ErrorCode | number

  /**
   * Gets the burden of the transaction.
   *
   * This function retrieves the current burden associated with the transaction.
   *
   * @returns An ErrorCode if there is an error, or the current burden value on success.
   */
  const etxn_burden: () => ErrorCode | number

  /**
   * Retrieves details of the transaction.
   *
   * This function provides detailed information about the transaction.
   *
   * @returns An ErrorCode if there is an error, or an array of transaction details on success.
   */
  const etxn_details: () => ErrorCode | ByteArray

  /**
   * Gets the nonce for the transaction.
   *
   * This function retrieves the nonce associated with the transaction.
   *
   * @returns An ErrorCode if there is an error, or an array containing the nonce value on success.
   */
  const etxn_nonce: () => ErrorCode | ByteArray

  /**
   * Generates a new transaction.
   *
   * This function generates a new transaction and returns a code indicating
   * the result of the generation process.
   *
   * @returns An ErrorCode if there is an error, or a number indicating the generation result on success.
   */
  const etxn_generation: () => ErrorCode | number
}

export {}
