import { ALLOWED_CHAINS, DEFAULT_CHAINS } from "config/constants";
import { ethereum } from "config/ethereum";
import { ERC20 } from "typechain-types/ERC20";

export const changeChain = (chainId: number) => {
  const chain = ALLOWED_CHAINS.find((c) => c.chainId === chainId);
  if (!chain) throw new Error("Invalid chainId");
  const isSwitch = DEFAULT_CHAINS.includes(chain.chainId);
  ethereum?.request?.(
    isSwitch
      ? {
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x" + chain.chainId.toString(16),
            },
          ],
        }
      : {
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x" + chain.chainId.toString(16),
              rpcUrls: chain.rpcUrls,
              chainName: chain.name,
              nativeCurrency: {
                name: chain.name,
                symbol: chain.currency,
                decimals: 18,
              },
            },
          ],
        }
  );
};
