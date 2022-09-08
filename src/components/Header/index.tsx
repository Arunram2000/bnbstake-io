import React from "react";
import { useWeb3React } from "@web3-react/core";

import "./Header.scss";
import logo from "assets/images/logo.png";
import UnlockWallet from "components/UnlockWallet";
import { getSlicedValue } from "helpers/utilities";
import Button from "components/Button";

const Header = () => {
  const { account } = useWeb3React();
  return (
    <header>
      <div className="mx pad header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        {account ? <Button>{getSlicedValue(account)}</Button> : <UnlockWallet />}
      </div>
    </header>
  );
};

export default Header;
