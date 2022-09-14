import React from "react";
import AffilateProgram from "./AffilateProgram";
import Depoist from "./Deposit";

const CalculateProfit = () => {
  return (
    <div className="calculate_profit" id="affiliate_program">
      <div className="mx pad">
        <h2 className="mb-32 section_title">Deposit And Earn $GRONA</h2>
        <div className="grid">
          <Depoist />
          <AffilateProgram />
        </div>
      </div>
    </div>
  );
};

export default CalculateProfit;
