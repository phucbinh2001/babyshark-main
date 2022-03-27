import { Contract } from "@ethersproject/contracts";
import { getAddress } from "@ethersproject/address";
import {
  ADDRESS_ZERO,
  PRE_SALE_ADDRESS,
  ROUTER_ADDRESS,
} from "../configs/constants";
import PreSaleABI from "../abis/PreSale.json";

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// account is not optional
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library, account = undefined) {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address, ABI, library, account = undefined) {
  if (!isAddress(address) || address.toString() === ADDRESS_ZERO) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  if (!library) return new Error("No provider or signer");

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export async function callContract(contract, method, args, overrides = {}) {
  try {
    const tx = await contract[method](...args, {
      ...overrides,
    });
    if (typeof tx.wait !== "function") return tx;
    if (!tx) throw new Error("cannot create transaction");
    const res = await tx.wait();
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function getPreSaleContract(library, account = undefined) {
  return getContract(PRE_SALE_ADDRESS, PreSaleABI, library, account);
}