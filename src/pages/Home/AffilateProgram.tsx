import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "components";
import { formatNumber, getSlicedValue } from "helpers/utilities";
import { useUserData } from "hooks";

const AffilateProgram = () => {
  const { isDeposited, address, totalReferralCount, totalReferrals } = useUserData();
  const [copied, setCopied] = useState(false);

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
        <p className="font-medium mb-15">Your personal link</p>
        <div>
          <p>
            {isDeposited ? (
              <span>{`${window.location.origin}?ref_address=${getSlicedValue(address)}`}</span>
            ) : (
              <span>Not activated yet!</span>
            )}
          </p>
          {copied ? (
            <Button variant="secondary">Copied</Button>
          ) : (
            <CopyToClipboard
              text={`${window.location.origin}${address ? `?ref_address=${address}` : ""}`}
              onCopy={() => setCopied(true)}
            >
              <Button>Copy</Button>
            </CopyToClipboard>
          )}
        </div>
      </section>
      <div className="flex-between">
        <p>
          Invited Users <b>{totalReferralCount}</b>
        </p>
        <p>
          Total Earnings <b>{formatNumber(totalReferrals, 0, 8)} CRO</b>
        </p>
      </div>
    </div>
  );
};

export default AffilateProgram;
