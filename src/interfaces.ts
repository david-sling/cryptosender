import { FC, SVGProps } from "react";

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
}

export type Errored<T, Error = any> = T | { error: Error };

export interface Token {
  address: Record<number, string>;
  name: string;
  symbol: string;
  Logo: SVG;
  Icon: SVG;
}

export interface Contact {
  nickname: string;
  address: string;
  isSelected?: boolean;
}
