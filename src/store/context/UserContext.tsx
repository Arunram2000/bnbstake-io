import { useWeb3React } from "@web3-react/core";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import { zeroAddress } from "constants/utils";
import { getUserData } from "utils/methods";

interface IUserContext {
  balance: number;
  allowance: number;
  referrer: string;
  address: string;
  totalDeposit: number;
  totalWithdrawn: number;
  totalReferrals: number;
  userDividends: number;
  isDeposited: boolean;
  totalReferralCount: number;
}

const initialState: IUserContext = {
  balance: 0,
  allowance: 0,
  referrer: zeroAddress,
  address: "",
  totalDeposit: 0,
  totalWithdrawn: 0,
  totalReferrals: 0,
  userDividends: 0,
  isDeposited: false,
  totalReferralCount: 0,
};

export const UserContext = createContext<IUserContext>(initialState);

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<IUserContext>(initialState);
  const { account, chainId, library } = useWeb3React();

  const handleGetUserData = useCallback(async () => {
    if (!chainId || !account) return;
    setUserData(await getUserData(account, library?.provider, chainId));
  }, [account, library, chainId]);
  console.log(userData);
  useEffect(() => {
    handleGetUserData();
  }, [handleGetUserData]);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
