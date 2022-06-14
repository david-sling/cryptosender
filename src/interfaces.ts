import { FC, SVGProps } from "react";
import { ERC20 } from "typechain-types/ERC20";

export type SVG = FC<
  SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export interface Chain {
  chainId: number;
  name: string;
  symbol: "ETH";
  currency: string;
  Logo: SVG;
  rpcUrls: string[];
}

export type Errored<T, Error = any> = T | { error: Error };

export interface Token {
  address: Record<number, string>;
  contracts?: Record<number, ERC20 | undefined>;
  name: string;
  symbol: string;
  Logo: SVG;
  Icon: SVG;
  decimals: number;
}

export interface Contact {
  nickname: string;
  address: string;
  isSelected?: boolean;
}
