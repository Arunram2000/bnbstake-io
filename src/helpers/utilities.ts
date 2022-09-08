import { utils } from "ethers";

export const getSlicedValue = (val: string, sliceLength = 6) => {
  return val.slice(0, sliceLength) + "..." + val.slice(val.length - sliceLength);
};

export const compareAddress = (address1: string, address2: string) =>
  address1.toLocaleLowerCase() === address2.toLocaleLowerCase();

export const formatNumber = (value: number, minDigit = 0, maxDigit = 6) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minDigit,
    maximumFractionDigits: maxDigit,
  }).format(value);
};

export const formatEther = (value: number | string, decimals = 18) =>
  Number(utils.formatUnits(value.toString(), decimals.toString()));

export const parseEther = (value: number | string, decimals = 18) =>
  Number(utils.parseUnits(value.toString(), decimals.toString()).toString());
