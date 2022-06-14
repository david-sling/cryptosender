import { BTClogo, BTCsymbol, ETHlogo, POLYlogo } from "assets";
import { Chain, Token } from "interfaces";
import { createERC20Token } from "./ethereum";

export const DEFAULT_CHAINS = [3];

export const ALLOWED_CHAINS: Chain[] = [
  {
    chainId: 3,
    name: "ropsten",
    symbol: "ETH",
    currency: "Ethereum",
    Logo: ETHlogo,
    rpcUrls: ["https://ropsten.infura.io/v3"],
  },
  {
    chainId: 80001,
    name: "matic",
    symbol: "ETH",
    currency: "MATIC",
    Logo: POLYlogo,
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
  },
];

export const ERC20Tokens: Token[] = [
  {
    name: "Wrapped BTC",
    symbol: "WBTC",
    address: {
      3: "0x65058d7081FCdC3cd8727dbb7F8F9D52CefDd291",
      80001: "0x0d787a4a1548f673ed375445535a6c7A1EE56180",
    },
    Logo: BTClogo,
    Icon: BTCsymbol,
    decimals: 8,
  },
].map((token) => ({
  ...token,
  contracts: ALLOWED_CHAINS.reduce((acc, chain) => {
    const address = token.address[chain.chainId as keyof typeof token.address];
    if (!address) return acc;
    return {
      ...acc,
      [chain.chainId]: createERC20Token(address),
    };
  }, {}),
}));
