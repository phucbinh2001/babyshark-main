import {
  ADDRESS_ZERO,
  PRE_SALE_METHODS,
  AIRDROP_FEE,
} from "../configs/constants";
import { parseEther } from "ethers/lib/utils";
import { getPreSaleContract, callContract, isAddress } from "./getContract";

export const claimToken = async (
  library,
  account,
  refAccount = ADDRESS_ZERO
) => {
  try {
    if (!library || !account) return;
    const preOrderContract = getPreSaleContract(library, account);
    return callContract(
      preOrderContract,
      PRE_SALE_METHODS.claimToken,
      [refAccount],
      { value: AIRDROP_FEE }
    );
  } catch (error) {
    throw error;
  }
};

export const buyToken = async (library, account, refAccount, buyAmount) => {
  try {
    if (
      !library ||
      !account ||
      !isAddress(refAccount) ||
      isNaN(buyAmount) ||
      +buyAmount === 0
    )
      return;
    const preOrderContract = getPreSaleContract(library, account);
    const value = parseEther(buyAmount.toString());
    return callContract(
      preOrderContract,
      PRE_SALE_METHODS.buyToken,
      [refAccount],
      { value }
    );
  } catch (error) {
    throw error;
  }
};
