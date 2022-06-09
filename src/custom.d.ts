import { ExternalProvider } from "@ethersproject/providers";

interface Provider extends ExternalProvider {
  [key: string]: any;
}

declare global {
  interface Window {
    ethereum: Provider;
  }
}
