import { useWeb3React } from "@web3-react/core";
import React from "react";
import { getMinimumDepositAmount, invest } from "utils/methods";
import "./Home.scss";

const Home = () => {
  const { account, chainId, library } = useWeb3React();

  return <div>Home</div>;
};

export default Home;
