import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";

import "./Modal.scss";
import Backdrop from "./Backdrop";

import { Injected } from "../../utils/connectors";

import metamaskLogo from "../../assets/images/metamask.png";
// import walletconnectLogo from "../../assets/images/walletconnect.png";
import close from "../../assets/icons/close.svg";
import { modalVaraints } from "../../constants/variants";

interface IWalletModal {
  modal: boolean;
  handleClose: () => void;
}

const WalletModal: React.FC<IWalletModal> = ({ modal, handleClose }) => {
  const { activate } = useWeb3React();

  const handleConnect = async (connector: string) => {
    try {
      await activate(Injected);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={"wallet_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="wallet_modal-content">
              <div className="flex-gap">
                <h4 className="font-medium">Connect wallet</h4>
                <img src={close} alt="close" width={24} height={24} onClick={() => handleClose()} />
              </div>
              <div className="wallet_wrapper">
                <div className="wallet_wrapper-card" onClick={() => handleConnect("metamask")}>
                  <img src={metamaskLogo} alt="metamask logo" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  );
};

export default WalletModal;
