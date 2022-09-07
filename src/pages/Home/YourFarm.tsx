import React from "react";
import Tire from "../../assets/images/tire.png";
import { Button } from "components";
const YourFarm = () => {
  return (
    <div className="your-farm-read">
      <div className="your-farm">
        <div className="tire-deposite">
          <img src={Tire} alt="" />
          <div className="total-deposite">
            <p>Total Value Deposited</p>
            <h3>22.84361 BNB</h3>
            <p>$ 6,412.43</p>
          </div>
          <div className="total-deposite">
            <p>Total Value Deposited</p>
            <h3>22.84361 BNB</h3>
            <p>$ 6,412.43</p>
          </div>
        </div>
        <div className="farm-deposits">
          <div className="farm">
            <div>
              <h3>Your Farm</h3>
            </div>
            <div className="withdraw">
              <div>
                <p>BNB to Harvest</p>
                <p>0.000000 BNB</p>
                <p>$ 0.00</p>
              </div>
              <Button children="Withdraw" variant="primary" />
            </div>
            <div className="withdraw">
              <div>
                <p>BNB in wallet</p>
                <p>0.000000 BNB</p>
                <p>$ 0.00</p>
              </div>
              <Button children="History" variant="primary" />
            </div>
          </div>
          <div className="last-deposits">
            <div>
              <h3>Last Deposits</h3>
            </div>
          </div>
          <div className="farm-buttons">
            <Button children="Affiliate Program" variant="primary" />
            <Button children="Verified Contract" variant="primary" />
            <Button children="Telegram" variant="primary" />
          </div>
        </div>
      </div>
      <div className="read">
        <h3>Read before use</h3>
        <p>
          The principal deposit cannot be withdrawn, the only return users can
          get are daily dividends and referral rewards. Payments is possible
          only if contract balance have enough BNB. Please analyze the
          transaction history and balance of the smart contract before
          investing. High risk - high profit, DYOR
        </p>
      </div>
    </div>
  );
};

export default YourFarm;
