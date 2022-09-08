import React, { useCallback, useEffect, useState } from "react";
import { Button } from "components";
import telegram from "assets/icons/telegram.png";
import { ReactComponent as VerifiedIcon } from "assets/icons/verified.svg";
import { ReactComponent as ShareIcon } from "assets/icons/share.svg";
import token from "../../assets/images/cronos_token.png";
import { useWeb3React } from "@web3-react/core";
import { getContractInfo } from "utils/methods";
import { IContractInfo } from "constants/types";
import { formatNumber } from "helpers/utilities";

const YourFarm = () => {
  const { account, chainId, library } = useWeb3React();
  const [contractInfo, setContractInfo] = useState<IContractInfo | null>(null);

  const handleGetplansData = useCallback(async () => {
    if (!account || !chainId) return;
    const data = await getContractInfo(account, library?.provider, chainId);
    setContractInfo(data);
  }, [account, chainId, library]);

  useEffect(() => {
    handleGetplansData();
  }, [handleGetplansData]);

  return (
    <div className="your-farm-read pad">
      <div className="your-farm">
        <div className="tire-deposite">
          <img src={token} alt="" />
          <div className="total-deposite">
            <p>Total Value Deposited</p>
            <h3>{contractInfo ? formatNumber(contractInfo.totalDeposited, 2, 6) : 0} BNB</h3>
            <p>$ 6,412.43</p>
          </div>
          <div className="total-deposite">
            <p>Total Referral Earnings</p>
            <h3>{contractInfo ? formatNumber(contractInfo.totalBonus, 2, 6) : 0} BNB</h3>
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
            <Button variant="primary">
              <ShareIcon />
              <span>Affiliate Program</span>
            </Button>
            <Button variant="primary">
              <VerifiedIcon />
              <span>Verified Contract</span>
            </Button>
            <Button variant="primary">
              <img src={telegram} alt="" width={20} height={20} />
              <span>Telegram</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="read">
        <h3>Read before use</h3>
        <p>
          The principal deposit cannot be withdrawn, the only return users can get are daily
          dividends and referral rewards. Payments is possible only if contract balance have enough
          BNB. Please analyze the transaction history and balance of the smart contract before
          investing. High risk - high profit, DYOR
        </p>
      </div>
    </div>
  );
};

export default YourFarm;
