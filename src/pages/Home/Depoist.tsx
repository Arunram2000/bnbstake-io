import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { Button } from "components";
import { getPlanInfo } from "utils/methods";
import { formatNumber } from "helpers/utilities";
import { TransactionContext } from "store/context/TransactionContext";

type IPlan = {
  planId: number;
  time: number;
  percent: number;
};

const Depoist = () => {
  const { account, chainId, library } = useWeb3React();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | undefined>();
  const [depositAmount, setDepositAmount] = useState("");
  const { setTransaction } = useContext(TransactionContext);

  const handleGetplansData = useCallback(async () => {
    if (!account || !chainId) return;
    const data = await getPlanInfo(account, library?.provider, chainId);
    setPlans(data);
    setSelectedPlan(data[0]);
  }, [account, chainId, library]);

  useEffect(() => {
    handleGetplansData();
  }, [handleGetplansData]);

  const totalReturns = useMemo(() => {
    if (!depositAmount) return 1;
    if (!selectedPlan) return 1;

    return (selectedPlan.percent / 100) * Number(depositAmount) * selectedPlan.time;
  }, [depositAmount, selectedPlan]);

  const handleInvest = async () => {
    try {
      if (!account || !chainId || !selectedPlan) return;
      setTransaction({ loading: true, status: "pending" });
      setTransaction({ loading: true, status: "success" });
      const { invest } = await import("utils/methods");
      await invest(account, library?.provider, chainId, "", selectedPlan.planId, depositAmount);
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  return (
    <div className="deposit">
      <section className="deposit_controls">
        <div>
          <p>Deposit Period (days)</p>
          <select
            onChange={(e) => setSelectedPlan(plans.find((f) => f.time === Number(e.target.value)))}
          >
            {plans.map((plan, index) => (
              <option key={index.toString()} value={plan.time}>
                {plan.time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Deposit Amount</p>
          <div>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <button>Max</button>
          </div>
        </div>
      </section>
      <section className="deposit_stats">
        <div>
          <p>Daily ROI</p>
          <span>{!selectedPlan ? 0 : selectedPlan.percent}</span>
        </div>
        <div>
          <p>Total Profit</p>
          <span>{!selectedPlan ? "0%" : `${selectedPlan.time * selectedPlan.percent}%`}</span>
        </div>
        <div>
          <p>In 50 days you will earn</p>
          <span>{formatNumber(totalReturns, 4)} BNB</span>
        </div>
      </section>
      <Button variant="secondary" onClick={() => handleInvest()}>
        Invest
      </Button>
    </div>
  );
};

export default Depoist;
