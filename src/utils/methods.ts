import { ethers, utils } from "ethers";
import tokenABi from "./abi/bnbstake.json";
import { STAKE_ADDRESS } from "./address";

export const loadContract = (
  address: string,
  provider,
  chainid: string | number
) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const escrowContract = new ethers.Contract(
    STAKE_ADDRESS[chainid],
    tokenABi,
    signer
  );
  return escrowContract;
};

export const getMinimumDepositAmount = async (address, provider, chainid) => {
  const stake = loadContract(address, provider, chainid);
  const minimumDepositAmt = await stake.INVEST_MIN_AMOUNT();
  return minimumDepositAmt.toString();
};

export const invest = async (
  address,
  provider,
  chainid,
  referrer,
  plan,
  amount
) => {
  const stake = loadContract(address, provider, chainid);
  const amtinWei = utils.parseEther(amount.toString()).toString();
  const tx = await stake.invest(referrer, plan, {
    value: amtinWei,
  });
  await tx.wait();
};

export const withdraw = async (address, provider, chainid) => {
  const stake = loadContract(address, provider, chainid);
  const tx = await stake.withdraw();
  await tx.wait();
};
