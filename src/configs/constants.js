if (!process.env.REACT_APP_CHAIN_ID) throw Error("ChainID is required");
if (!process.env.REACT_APP_RPC_NODE) throw Error("RPC node URL is required");
if (!process.env.REACT_APP_PRE_SALE_ADDRESS)
  throw Error("PreSale address is required");
if (!process.env.REACT_APP_URL) throw Error("App URL is required");

export const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
export const RPC_NODE = process.env.REACT_APP_RPC_NODE;

export const PRE_SALE_ADDRESS = process.env.REACT_APP_PRE_SALE_ADDRESS;
export const ROUTER_ADDRESS = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

export const APP_URL = process.env.REACT_APP_URL;

export const PRE_SALE_METHODS = {
  claimToken: "airdrop",
  buyToken: "buy",
};

export const AIRDROP_FEE = "2000000000000000"; // 0.002 BNB
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const MAX_UINT256 =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

// export const CHAIN_ID = 97;
// export const RPC_NODE = "https://data-seed-prebsc-1-s1.binance.org:8545/";
// export const PRE_SALE_ADDRESS = "0x2af1ed8e2027731f4ce45dc180845ff7710fa138";
