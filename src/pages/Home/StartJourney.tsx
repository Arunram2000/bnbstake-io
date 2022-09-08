import React from "react";
import { ReactComponent as Graph } from "../../assets/icons/graph.svg";
import { ReactComponent as Headphones } from "../../assets/icons/headphones.svg";
import { ReactComponent as Incognito } from "../../assets/icons/incognito.svg";

const StartJourney = () => {
  return (
    <div className="mx pad">
      <div className="start-journey">
        <div className="yield-farm">
          <h2>Start your yield farm journey</h2>
          <h3>with BNB Stake Community</h3>
        </div>
        <div className="stake-community">
          <div className="stake">
            <Incognito />
            <h3>Ironclad security</h3>
            <p>The smart contract code has been successful audited by 2 independent companies </p>
          </div>
          <div className="stake">
            <Graph />
            <h3>High & Stable APR</h3>
            <p>
              In the code sets the highest APR among all yield farms on BSC, rules of a smart
              contract can’t be changed, nothing can affect the amount of income.{" "}
            </p>
          </div>
          <div className="stake">
            <Headphones />
            <h3>Customer Support</h3>
            <p>
              BNB Stake 24/7 provides you our knowledgable and experienced customer support team in
              Telegram{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartJourney;
