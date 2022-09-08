import React from "react";
import statedapps from "../../assets/images/stateDapps.png";
import DappRadar from "../../assets/images/DappRadar.png";
import { ReactComponent as Facebook } from "../../assets/icons/bxl-facebook-square.svg.svg";
import { ReactComponent as Twitter } from "../../assets/icons/bxl-twitter.svg.svg";
import { ReactComponent as Telegram } from "../../assets/icons/bxl-telegram.svg.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="dapp-logo">
        <img src={statedapps} alt="" />
        <span></span>
        <img src={DappRadar} alt="" />
      </div>
      <div className="icon">
        <p>Follow us on</p>
        <div className="icons">
          <Twitter />
          <Facebook />
          <Telegram />
        </div>
      </div>
      <div className="copyright">
        <h4>
          <span>BNB Stake</span> BLOCKCHAIN INVESTMENT PLATFORM
        </h4>
        <p>&copy;bnbstake.io, 2021</p>
      </div>
    </div>
  );
};

export default Footer;
