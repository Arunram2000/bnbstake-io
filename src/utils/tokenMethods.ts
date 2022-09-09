import { ethers } from "ethers";
import { formatEther } from "helpers/utilities";
import tokenABi from "./abi/tokenabi.json";
import { STAKE_ADDRESS, TOKEN_ADDRESS } from "./address";

export const loadTokenContract = (address: string, provider, chainid: string | number) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const escrowContract = new ethers.Contract(TOKEN_ADDRESS[chainid], tokenABi, signer);
  return escrowContract;
};

export const getUserAllowance = async (address: string, provider: any, chainId: any) => {
  const tokenContract = loadTokenContract(address, provider, chainId);
  const allowance = await tokenContract.allowance(address, STAKE_ADDRESS[chainId]);
  return formatEther(allowance);
};

export const getUserTokenBalance = async (
  address: string,
  provider: any,
  chainId: number | string
) => {
  const token = loadTokenContract(address, provider, chainId);
  const balance = (await token.balanceOf(address)).toString();
  return formatEther(balance);
};

export const increaseAllowance = async (
  address: string,
  provider: any,
  chainId: number | string
) => {
  const token = loadTokenContract(address, provider, chainId);
  const tx = await token.increaseAllowance(STAKE_ADDRESS[chainId], "10000000000000000000000");
  await tx.wait();
};

export const getTokenDetails = async (address: string, provider: any, tokenaddress: string) => {
  const tokenContract = loadTokenContract(address, provider, tokenaddress);

  const symbol = (await tokenContract.symbol()).toString() as string;
  const decimals = (await tokenContract.decimals()).toString() as string;

  return { symbol: symbol.toUpperCase(), decimals };
};
