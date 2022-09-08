import { ethers, utils } from "ethers";
import stakeABi from "./abi/bnbstake.json";
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
    stakeABi,
    signer
  );
  return escrowContract;
};

export const getMinimumDepositAmount = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const minimumDepositAmt = await stake.INVEST_MIN_AMOUNT();
  return Number(minimumDepositAmt.toString());
};

export const invest = async (
  address: string,
  provider,
  chainid: number | string,
  referrer: string,
  plan: number,
  amount: string
) => {
  const stake = loadContract(address, provider, chainid);
  const amtinWei = utils.parseEther(amount.toString()).toString();
  const tx = await stake.invest(referrer, plan, amtinWei);
  await tx.wait();
};

export const withdraw = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const tx = await stake.withdraw();
  await tx.wait();
};

export const getUserReferrer = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserReferrer();
  return referrer;
};

export const getUserTotalReferrals = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserTotalReferrals();
  return referrer.toString();
};

export const getUserTotalWithdrawn = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserTotalWithdrawn();
  return referrer.toString();
};

export const getUserCheckpoint = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserCheckpoint();
  return referrer.toString();
};

export const getUserAvailable = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserAvailable();
  return referrer.toString();
};

export const getUserTotalDeposits = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserTotalDeposits();
  return referrer.toString();
};

export const getPlanInfo = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const data = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      const referrer = await stake.getPlanInfo(i);
      return {
        planId: i,
        time: Number(referrer[0].toString()),
        percent: Number(referrer[1].toString()) / 10,
      };
    })
  );

  return data;
};

export const getContractInfo = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stakingContract = loadContract(address, provider, chainid);
  const data = await stakingContract.getSiteInfo();
  const result = {
    totalDeposited: Number(utils.formatUnits(data[0].toString()).toString()),
    totalBonus: Number(utils.formatUnits(data[1].toString()).toString()),
  };

  console.log(result);
  return result;
};
