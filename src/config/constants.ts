import { Chain, Token } from "interfaces";

export const ALLOWED_CHAINS: Chain[] = [
  {
    chainId: 3,
    name: "ropsten",
    currency: "ETH",
  },
  {
    chainId: 80001,
    name: "matic",
    currency: "MATIC",
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
  },
];
