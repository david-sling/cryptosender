export interface Chain {
  chainId: number;
  name: string;
  currency: string;
}

export type Errored<T, Error = any> = T | { error: Error };

export interface Token {
  address: Record<number, string>;
  name: string;
  symbol: string;
}

export interface Contact {
  nickname: string;
  address: string;
  isSelected?: boolean;
}
