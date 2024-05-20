export function g(guard_id: number, maxiter: number): number {
    return 0;
}

export function accept(message: string, error_code: number): string | number {
    return 0;
}

export function emit(write_ptr: number, write_len: number, read_ptr: number, read_len: number): number {
    return 0;
}

export function etxn_burden(): number {
    return 0;
}

export function etxn_details(write_ptr: number, write_len: number): number {
    return 0;
}

export function etxn_fee_base(read_ptr: number, read_len: number): number {
    return 0;
}

export function etxn_generation(): number {
    return 0;
}

export function etxn_nonce(write_ptr: number, write_len: number): number {
    return 0;
}

export function etxn_reserve(count: number): number {
    return 0;
}

export function fee_base(): number {
    return 0;
}

export function float_compare(float1: number, float2: number, mode: number): number {
    return 0;
}

export function float_divide(float1: number, float2: number): number {
    return 0;
}

export function float_exponent(float1: number): number {
    return 0;
}

export function float_exponent_set(float1: number, exponent: number): number {
    return 0;
}

export function float_int(float1: number, decimal_places: number, abs: number): number {
    return 0;
}

export function float_invert(float1: number): number {
    return 0;
}

export function float_log(float1: number): number {
    return 0;
}

export function float_mantissa(float1: number): number {
    return 0;
}

export function float_mantissa_set(float1: number, mantissa: number): number {
    return 0;
}

export function float_mulratio(float1: number, round_up: number, numerator: number, denominator: number): number {
    return 0;
}

export function float_multiply(float1: number, float2: number): number {
    return 0;
}

export function float_negate(float1: number): number {
    return 0;
}

export function float_one(): number {
    return 0;
}

export function float_root(float1: number, n: number): number {
    return 0;
}

export function float_set(exponent: number, mantissa: number): number {
    return 0;
}

export function float_sign(float1: number): number {
    return 0;
}

export function float_sign_set(float1: number, negative: number): number {
    return 0;
}

export function float_sto(write_ptr: number, write_len: number, cread_ptr: number, cread_len: number, iread_ptr: number, iread_len: number, float1: number, field_code: number): number {
    return 0;
}

export function float_sto_set(read_ptr: number, read_len: number): number {
    return 0;
}

export function float_sum(float1: number, float2: number): number {
    return 0;
}

export function hook_account(write_ptr: number, write_len: number): number {
    return 0;
}

export function hook_again(): number {
    return 0;
}

export function hook_hash(write_ptr: number, write_len: number, hook_no: number): number {
    return 0;
}

export function hook_param(write_ptr: number, write_len: number, read_ptr: number, read_len: number): number {
    return 0;
}

export function otxn_param(write_ptr: number, write_len: number, read_ptr: number, read_len: number): number {
    return 0;
}

export function hook_param_set(read_ptr: number, read_len: number, kread_ptr: number, kread_len: number, hread_ptr: number, hread_len: number): number {
    return 0;
}

export function hook_pos(): number {
    return 0;
}

export function hook_skip(read_ptr: number, read_len: number, flags: number): number {
    return 0;
}

export function ledger_keylet(write_ptr: number, write_len: number, lread_ptr: number, lread_len: number, hread_ptr: number, hread_len: number): number {
    return 0;
}

export function ledger_last_hash(write_ptr: number, write_len: number): number {
    return 0;
}

export function ledger_last_time(): number {
    return 0;
}

export function ledger_nonce(write_ptr: number, write_len: number): number {
    return 0;
}

export function ledger_seq(): number {
    return 0;
}

export function meta_slot(slot_no: number): number {
    return 0;
}

export function otxn_burden(): number {
    return 0;
}

export function otxn_field(write_ptr: number, write_len: number, field_id: number): number {
    return 0;
}

export function otxn_field_txt(write_ptr: number, write_len: number, field_id: number): number {
    return 0;
}

export function otxn_generation(): number {
    return 0;
}

export function otxn_id(write_ptr: number, write_len: number, flags: number): number {
    return 0;
}

export function otxn_slot(slot_no: number): number {
    return 0;
}

export function otxn_type(): number {
    return 0;
}

export function rollback(message: string, error_code: number): string | number {
    return 0;
}

export function slot(write_ptr: number, write_len: number, slot: number): number {
    return 0;
}

export function slot_clear(slot: number): number {
    return 0;
}

export function slot_count(slot: number): number {
    return 0;
}

export function slot_float(slot_no: number): number {
    return 0;
}

export function slot_id(write_ptr: number, write_len: number, slot: number): number {
    return 0;
}

export function slot_set(read_ptr: number, read_len: number, slot: number): number {
    return 0;
}

export function slot_size(slot: number): number {
    return 0;
}

export function slot_subarray(parent_slot: number, array_id: number, new_slot: number): number {
    return 0;
}

export function slot_subfield(parent_slot: number, field_id: number, new_slot: number): number {
    return 0;
}

export function slot_type(slot_no: number, flags: number): number {
    return 0;
}

export function state(write_ptr: number, write_len: number, kread_ptr: number, kread_len: number): number {
    return 0;
}

export function state_foreign(write_ptr: number, write_len: number, kread_ptr: number, kread_len: number, nread_ptr: number, nread_len: number, aread_ptr: number, aread_len: number): number {
    return 0;
}

export function state_foreign_set(read_ptr: number, read_len: number, kread_ptr: number, kread_len: number, nread_ptr: number, nread_len: number, aread_ptr: number, aread_len: number): number {
    return 0;
}

export function state_set(read_ptr: number, read_len: number, kread_ptr: number, kread_len: number): number {
    return 0;
}

export function sto_emplace(write_ptr: number, write_len: number, sread_ptr: number, sread_len: number, fread_ptr: number, fread_len: number, field_id: number): number {
    return 0;
}

export function sto_erase(write_ptr: number, write_len: number, read_ptr: number, read_len: number, field_id: number): number {
    return 0;
}

export function sto_subarray(read_ptr: number, read_len: number, array_id: number): number {
    return 0;
}

export function sto_subfield(read_ptr: number, read_len: number, field_id: number): number {
    return 0;
}

export function sto_validate(tread_ptr: number, tread_len: number): number {
    return 0;
}

export function trace(message: string, as_hex: any): string | number {
    return 0;
}

export function trace_float(read_ptr: number, read_len: number, float1: number): number {
    return 0;
}

export function trace_num(read_ptr: number, read_len: number, number: number): number {
    return 0;
}

export function trace_slot(read_ptr: number, read_len: number, slot: number): number {
    return 0;
}

export function util_accid(raddr: any): number | string {
    return 0;
}

export function util_keylet(write_ptr: number, write_len: number, keylet_type: number, a: number, b: number, c: number, d: number, e: number, f: number): number {
    return 0;
}

export function util_raddr(acc_id: any): number | string {
    return 0;
}

export function util_sha512h(write_ptr: number, write_len: number, read_ptr: number, read_len: number): number {
    return 0;
}

export function util_verify(dread_ptr: number, dread_len: number, sread_ptr: number, sread_len: number, kread_ptr: number, kread_len: number): number {
    return 0;
}