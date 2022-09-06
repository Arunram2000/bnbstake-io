import { Button } from "components";
import React from "react";

const AffilateProgram = () => {
  return (
    <div className="affilate_program">
      <h3>Affiliate Program</h3>
      <p>
        Referral Bonus <b>12%</b>
      </p>
      <div className="affilate_stats">
        <div>
          <p>
            level <b>1</b>
          </p>
          <strong>5%</strong>
        </div>
        <div>
          <p>
            level <b>2</b>
          </p>
          <strong>3%</strong>
        </div>
        <div>
          <p>
            level <b>3</b>
          </p>
          <strong>2%</strong>
        </div>
        <div>
          <p>
            level <b>4</b>
          </p>
          <strong>1%</strong>
        </div>
        <div>
          <p>
            level <b>5</b>
          </p>
          <strong>1%</strong>
        </div>
      </div>
      <section className="referral_link">
        <p>Your personal link</p>
        <div>
          <p>
            <span>Not activated yet!</span>
          </p>
          <Button>Copy</Button>
        </div>
      </section>
      <div className="flex-between">
        <p>
          Invited Users <b>0</b>
        </p>
        <p>
          Total Earnings <b>0 BNB</b>
        </p>
      </div>
    </div>
  );
};

export default AffilateProgram;
