import { IDepositStats } from "constants/types";
import { ethers, utils } from "ethers";
import { formatEther } from "helpers/utilities";
import stakeABi from "./abi/bnbstake.json";
import { STAKE_ADDRESS } from "./address";
import { getUserAllowance, getUserTokenBalance, increaseAllowance } from "./tokenMethods";

export const loadContract = (address: string, provider, chainid: string | number) => {
  const etherProvider = new ethers.providers.Web3Provider(provider);
  const signer = etherProvider.getSigner(address);
  const escrowContract = new ethers.Contract(STAKE_ADDRESS[chainid], stakeABi, signer);
  return escrowContract;
};

export const getMinimumDepositAmount = async (
  address: string,
  provider,
  chainid: number | string
) => {
  const stake = loadContract(address, provider, chainid);
  const minimumDepositAmt = await stake.INVEST_MIN_AMOUNT();
  return formatEther(minimumDepositAmt.toString());
};

export const getOwnerAddress = async (address: string, provider, chainid: number | string) => {
  const stakeContract = loadContract(address, provider, chainid);
  const ownerAddress = await stakeContract.ceoWallet1();
  return ownerAddress;
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
  const userAllowance = await getUserAllowance(address, provider, chainid);

  if (userAllowance < Number(amount)) {
    await increaseAllowance(address, provider, chainid);
  }
  const tx = await stake.invest(referrer, plan, amtinWei);
  await tx.wait();
};

export const withdraw = async (address: string, provider, chainid: number | string) => {
  const stake = loadContract(address, provider, chainid);
  const tx = await stake.withdraw();
  await tx.wait();
};

export const getUserData = async (address: string, provider, chainid: number | string) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserReferrer(address);
  const userData = await stake.getUserInfo(address);
  const userDividends = await stake.getUserDividends(address);
  const totalReferralCount = await stake.getUserTotalReferrals(address);
  const allowance = await getUserAllowance(address, provider, chainid);
  const balance = await getUserTokenBalance(address, provider, chainid);
  let isDeposited = false;

  try {
    await stake.getUserDepositInfo(address, 0);
    isDeposited = true;
  } catch (error) {
    isDeposited = false;
  }

  return {
    referrer,
    allowance,
    balance,
    isDeposited,
    totalDeposit: formatEther(userData[0].toString()),
    totalWithdrawn: formatEther(userData[1].toString()),
    totalReferrals: formatEther(userData[2].toString()),
    userDividends: formatEther(userDividends.toString()),
    totalReferralCount: Number(totalReferralCount.toString()),
    address,
  };
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

export const getUserDepositStats = async (
  address: string,
  provider,
  chainid: number | string
): Promise<IDepositStats[]> => {
  const stakeContract = loadContract(address, provider, chainid);
  const noOfDeposits = Number((await stakeContract.getUserAmountOfDeposits(address)).toString());

  const data = await Promise.all(
    Array.from({ length: noOfDeposits }).map(async (_, i) => {
      const depositInfo = await stakeContract.getUserDepositInfo(address, i);
      return {
        plan: Number(depositInfo[0].toString()),
        percent: Number(depositInfo[1].toString()),
        amount: formatEther(depositInfo[2].toString()),
        start: Number(depositInfo[3].toString()),
        finish: Number(depositInfo[4].toString()),
      };
    })
  );

  return data;
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

export const getUserCheckpoint = async (address: string, provider, chainid: number | string) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserCheckpoint();
  return referrer.toString();
};

export const getUserAvailable = async (address: string, provider, chainid: number | string) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserAvailable();
  return referrer.toString();
};

export const getUserTotalDeposits = async (address: string, provider, chainid: number | string) => {
  const stake = loadContract(address, provider, chainid);
  const referrer = await stake.getUserTotalDeposits();
  return referrer.toString();
};

export const getPlanInfo = async (address: string, provider, chainid: number | string) => {
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

export const getContractInfo = async (address: string, provider, chainid: number | string) => {
  const stakingContract = loadContract(address, provider, chainid);
  const data = await stakingContract.getSiteInfo();
  const result = {
    totalDeposited: Number(utils.formatUnits(data[0].toString()).toString()),
    totalBonus: Number(utils.formatUnits(data[1].toString()).toString()),
  };

  return result;
};
