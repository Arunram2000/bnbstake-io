import React, { useCallback, useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import moment from "moment";

import { Button, Modal } from "components";
import telegram from "assets/icons/telegram.png";
import { ReactComponent as VerifiedIcon } from "assets/icons/verified.svg";
import { ReactComponent as ShareIcon } from "assets/icons/share.svg";
import token from "../../assets/images/cronos_token.png";
import { getContractInfo, getUserDepositStats } from "utils/methods";
import { IContractInfo, IDepositStats } from "constants/types";
import { formatNumber } from "helpers/utilities";
import { useUserData } from "hooks";
import { TransactionContext } from "store/context/TransactionContext";

const YourFarm = () => {
  const { account, chainId, library } = useWeb3React();
  const [contractInfo, setContractInfo] = useState<IContractInfo | null>(null);
  const { userDividends, totalDeposit } = useUserData();
  const { setTransaction } = useContext(TransactionContext);
  const [depositStats, setDepositStats] = useState<IDepositStats[]>([]);
  const [history, setHistory] = useState(false);

  const handleGetplansData = useCallback(async () => {
    if (!account || !chainId) return;
    try {
      const data = await getContractInfo(account, library?.provider, chainId);
      setDepositStats(await getUserDepositStats(account, library?.provider, chainId));
      setContractInfo(data);
    } catch (error) {
      console.log(error);
    }
  }, [account, chainId, library]);

  useEffect(() => {
    handleGetplansData();
  }, [handleGetplansData]);

  const handleWithdraw = async () => {
    try {
      if (!account || !chainId) return;
      setTransaction({ loading: true, status: "pending" });
      const { withdraw } = await import("utils/methods");
      await withdraw(account, library?.provider, chainId);
      setTransaction({ loading: true, status: "success" });
    } catch (error) {
      setTransaction({ loading: true, status: "error" });
    }
  };

  const renderTable = (
    <table>
      <thead>
        <tr>
          <th align="left">Date</th>
          <th>Plan</th>
          <th>Status</th>
          <th align="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {depositStats.map((d, index) => (
          <tr key={index.toString()}>
            <td>{moment(d.start * 1000).format("ll")}</td>
            <td align="center">{d.plan}</td>
            <td align="center">{"Success"}</td>
            <td align="right">{d.amount} CRO</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderDepositStats = (
    <div className="deposit_stats-table">{!depositStats.length ? null : renderTable}</div>
  );

  return (
    <div style={{ background: "#fff" }}>
      <div className="mx">
        <div className="your-farm-read pad">
          <div className="your-farm">
            <div className="tire-deposite">
              <img src={token} alt="" />
              <div className="total-deposite">
                <p>Total Value Deposited</p>
                <h3>{contractInfo ? formatNumber(contractInfo.totalDeposited, 2, 6) : 0} CRO</h3>
                {/* <p>$ 6,412.43</p> */}
              </div>
              <div className="total-deposite">
                <p>Total Referral Earnings</p>
                <h3>{contractInfo ? formatNumber(contractInfo.totalBonus, 2, 6) : 0} CRO</h3>
                {/* <p>$ 6,412.43</p> */}
              </div>
            </div>
            <div className="farm-deposits">
              <div className="farm">
                <div>
                  <h3>Your Farm</h3>
                </div>
                <div className="withdraw">
                  <div>
                    <p style={{ fontSize: "12px" }}>CRO to Harvest</p>
                    <p className="font-medium">{formatNumber(userDividends, 2, 6)} CRO</p>
                    {/* <p style={{ fontSize: "12px" }}>$ 0.00</p> */}
                  </div>
                  <Button children="Withdraw" variant="primary" onClick={() => handleWithdraw()} />
                </div>
                <div className="withdraw">
                  <div>
                    <p style={{ fontSize: "12px" }}>CRO in wallet</p>
                    <p className="font-medium">{formatNumber(totalDeposit, 2, 6)} CRO</p>
                    {/* <p style={{ fontSize: "12px" }}>$ 0.00</p> */}
                  </div>
                  <Button children="History" variant="primary" onClick={() => setHistory(true)} />
                </div>
              </div>
              <div className="last-deposits">
                <div>
                  <h3>Last Deposits</h3>
                  {renderDepositStats}
                </div>
              </div>
              <div className="farm-buttons">
                <a href="/#affiliate_program">
                  <Button variant="primary">
                    <ShareIcon />
                    <span>Affiliate Program</span>
                  </Button>
                </a>
                <a href="/">
                  <Button variant="primary">
                    <VerifiedIcon />
                    <span>Verified Contract</span>
                  </Button>
                </a>
                <a href="/">
                  <Button variant="primary">
                    <img src={telegram} alt="" width={20} height={20} />
                    <span>Telegram</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="read">
            <h3>Read before use</h3>
            <p>
              The principal deposit cannot be withdrawn, the only return users can get are daily
              dividends and referral rewards. Payments is possible only if contract balance have
              enough BNB. Please analyze the transaction history and balance of the smart contract
              before investing. High risk - high profit, DYOR
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={history} handleClose={() => setHistory(false)}>
        <div className="history_modal">
          <h3 className="mb-20">Deposit history</h3>
          {renderTable}
        </div>
      </Modal>
    </div>
  );
};

export default YourFarm;
