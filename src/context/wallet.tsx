import {
  useCallback,
  useEffect,
  useState,
  createContext,
  FC,
  useContext,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { ALLOWED_CHAINS } from "config/constants";
import { ethereum, checkMetamaskInstalled, provider } from "config/ethereum";
import { Chain } from "interfaces";

interface Props {
  account: string;
  balance: number;
  isMetaMaskInstalled: boolean;
  currentChain?: Chain;
  connect: () => Promise<string>;
  disconnect: () => void;
  isMatic: boolean;
  getBalance: (id?: string) => Promise<void>;
}
const WalletContext = createContext<Props>({
  account: "",
  balance: NaN,
  isMetaMaskInstalled: false,
  connect: async () => "",
  disconnect: () => {},
  isMatic: false,
  getBalance: async () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: FC<{ children: ReactNode }> = (props) => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(NaN);
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(
    undefined
  );
  const isMetaMaskInstalled = checkMetamaskInstalled();
  const [listeningForAccountChange, setListeningForAccountChange] =
    useState(false);

  const getCurrentChain = async (id?: string) => {
    try {
      const chainId = id
        ? parseInt(id)
        : (await provider?.getNetwork())?.chainId || NaN;
      setCurrentChain(
        ALLOWED_CHAINS.find((allowed) => chainId === allowed.chainId)
      );
    } catch (error) {
      console.error({ error });
    }
  };

  const getAccount = async (overRideListener?: boolean): Promise<string> => {
    if (!overRideListener && !listeningForAccountChange) return "";
    if (!checkMetamaskInstalled()) {
      setAccount("");
      return "";
    }
    const [account] =
      (await ethereum.request?.({
        method: "eth_requestAccounts",
      })) || [];
    setAccount(account);
    return account;
  };

  const getBalance = useCallback(
    async (id?: string) => {
      try {
        const acc = id ? await getAccount(true) : account;
        if (!checkMetamaskInstalled()) return setBalance(0);
        if (!acc) return;
        const balance = (await provider?.getBalance(acc)) || NaN;
        setBalance(parseFloat(ethers.utils.formatEther(balance)));
      } catch (error) {
        console.error({ error });
      }
    },
    [account]
  );

  const connect = async () => {
    const account = getAccount(true);
    if (!listeningForAccountChange) ethereum.on("accountsChanged", getAccount);
    setListeningForAccountChange(true);
    return account;
  };
  const disconnect = () => setAccount("");

  useEffect(() => {
    if (!checkMetamaskInstalled()) return setCurrentChain(undefined);
    getCurrentChain();
    ethereum.on("chainChanged", (id: string) => {
      getCurrentChain(id);
      getBalance(id);
    });
    provider?.listAccounts().then(([account]) => {
      if (account) setAccount(account);
    });
  }, []);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <WalletContext.Provider
      {...props}
      value={{
        account,
        balance,
        currentChain,
        isMetaMaskInstalled,
        connect,
        disconnect,
        isMatic: currentChain?.chainId === 80001,
        getBalance,
      }}
    />
  );
};
