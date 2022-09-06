import React from "react";
import UnlockWallet from "components/UnlockWallet";

import "./Header.scss";
import { useWeb3React } from "@web3-react/core";
import { getSlicedValue } from "helpers/utilities";

const Header = () => {
  const { account } = useWeb3React();
  return (
    <header>
      <div>Logo</div>
      {account ? <p>{getSlicedValue(account)}</p> : <UnlockWallet />}
    </header>
  );
};

export default Header;
