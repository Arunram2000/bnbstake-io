import { Button } from "components";
import React from "react";

const Depoist = () => {
  return (
    <div className="deposit">
      <section className="deposit_controls">
        <div>
          <p>Deposit Period (days)</p>
          <select>
            <option value="10">10</option>
            <option value="10">10</option>
            <option value="10">10</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
          <p>Deposit Amount</p>
          <div>
            <input type="number" />
            <button>Max</button>
          </div>
        </div>
      </section>
      <section className="deposit_stats">
        <div>
          <p>Daily ROI</p>
          <span>4</span>
        </div>
        <div>
          <p>Total Profit</p>
          <span>25%</span>
        </div>
        <div>
          <p>In 50 days you will earn</p>
          <span>2.00000 BNB</span>
        </div>
      </section>
      <Button variant="secondary">Invest</Button>
    </div>
  );
};

export default Depoist;
