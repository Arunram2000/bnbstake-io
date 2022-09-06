import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import React, { ReactNode, useContext, useState } from "react"

import Button from "./Button"
import useUpdateEffect from "../hooks/useUpdateEffect"
import { WalletContext } from "../store/context/WalletContext"
import { switchNetwork } from "../utils/connectors"

import "./Button/Button.scss"

const UnlockWallet: React.FC<{ children?: ReactNode }> = () => {
  const { error } = useWeb3React()
  const { setOpenWallet } = useContext(WalletContext)
  const [wrongNetwork, setWrongNetwork] = useState(false)

  useUpdateEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      return setWrongNetwork(true)
    }

    return setWrongNetwork(false)
  }, [error])

  return (
    <Button
      variant={wrongNetwork ? "error" : "primary"}
      onClick={wrongNetwork ? () => switchNetwork() : () => setOpenWallet(true)}
    >
      {wrongNetwork ? "wrong Network" : "connect wallet"}
    </Button>
  )
}

export default UnlockWallet
