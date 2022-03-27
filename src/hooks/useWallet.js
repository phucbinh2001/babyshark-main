import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import { setupDefaultNetwork } from "../utils/web3React";

const useWallet = () => {
  const { activate, deactivate, error } = useWeb3React();
  const [currentConnector, setCurrentConnector] = useState();

  useEffect(() => {
    const catchError = async () => {
      if (error && activate && currentConnector) {
        let errMessage;
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupDefaultNetwork();
          if (hasSetup) {
            activate(currentConnector);
          }
        } else if (error instanceof NoEthereumProviderError) {
          errMessage =
            "NoEthereumProviderError: Please install metamask extension or visit website in app which has ethereum provider.";
        }
        if (errMessage) {
          alert(errMessage);
        }
      }
    };

    catchError();
  }, [activate, error, currentConnector]);

  const connect = useCallback((connector) => {
    setCurrentConnector(connector);
    return activate(connector);
  }, [activate]);

  const disconnect = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return {
    connect,
    disconnect,
    error,
  };
};

export default useWallet;
