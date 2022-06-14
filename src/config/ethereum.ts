import { ethers } from "ethers";
import ERC20ABI from "artifacts/ERC20.json";
import { ERC20 as ERC20Props } from "typechain-types/ERC20";

export const { ethereum } = window;
export const checkMetamaskInstalled = () =>
  typeof window.ethereum !== "undefined";

export const provider = checkMetamaskInstalled()
  ? new ethers.providers.Web3Provider(ethereum, "any")
  : undefined;

export const signer = checkMetamaskInstalled()
  ? provider?.getSigner()
  : undefined;

const getContract = <T extends ethers.Contract>(
  addressOrName: string,
  contractInterface: ethers.ContractInterface,
  signerOrProvider?: ethers.providers.Provider | ethers.Signer | undefined
) =>
  new ethers.Contract(addressOrName, contractInterface, signerOrProvider) as T;

export const createERC20Token = (CONTRACT_ADDRESS: string) =>
  getContract<ERC20Props>(CONTRACT_ADDRESS, ERC20ABI, signer);
