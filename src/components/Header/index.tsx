import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { NavLink } from "react-router-dom";

import "./Header.scss";
import logo from "assets/images/logo.png";
import UnlockWallet from "components/UnlockWallet";
import { getSlicedValue } from "helpers/utilities";
import Button from "components/Button";
import { ReactComponent as Menu } from "assets/icons/menu.svg";
import Sidebar from "./Sidebar";

const Header = () => {
  const { account } = useWeb3React();
  const [sidebar, setSidebar] = useState(false);

  const navlinks = (
    <ul className="nav_links">
      <li>
        <NavLink to="/">$GRONA vault</NavLink>
      </li>
      <li style={{ pointerEvents: "none" }}>
        <NavLink to="/mmf">$MMF(soon)</NavLink>
      </li>
      <li style={{ pointerEvents: "none" }}>
        <NavLink to="/vvs">$VVS(soon)</NavLink>
      </li>
      <li style={{ pointerEvents: "none" }}>
        <NavLink to="/fira">$FIRA(soon)</NavLink>
      </li>
    </ul>
  );

  return (
    <>
      <header>
        <div className="mx pad header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          {navlinks}
          <div className="nav_controls">
            {account ? <Button>{getSlicedValue(account)}</Button> : <UnlockWallet />}
            <div className="menu" onClick={() => setSidebar(true)}>
              <Menu />
            </div>
          </div>
        </div>
      </header>
      <Sidebar sidebar={sidebar} handleClose={() => setSidebar(false)}>
        {navlinks}
      </Sidebar>
    </>
  );
};

export default Header;
