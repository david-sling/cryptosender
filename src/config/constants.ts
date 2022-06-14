import { BTClogo, BTCsymbol, ETHlogo, POLYlogo } from "assets";
import { Chain, Token } from "interfaces";

export const ALLOWED_CHAINS: Chain[] = [
  {
    chainId: 3,
    name: "ropsten",
    symbol: "ETH",
    currency: "ETH",
    Logo: ETHlogo,
    rpcUrls: ["https://ropsten.infura.io/v3/0e7868c9f0bb4eb1afa50fd007a7f23f"],
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
  },
];
