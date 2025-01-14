import { Card } from "@mui/material";
import { LoanInfo } from "../UnwindComponents/LoanInfo";
import RepaySlider from "./RepaySlider";
import LoanBox from "./LoanBox";
import CollateralBox from "./CollateralBox";
import ClosePosition from "./ClosePosition";
import { useState, useEffect, useContext } from "react";
import PositionsBox from "../LoopComponents/PositionsBox";
import useLoanByAddress from "../hooks/useLoanByAddress";
import useAccountWithBalance from "../hooks/useAccountWithBalance";
import { GlobalContext } from "../providers/global-provider";
import LoadingScreen from "./LoadingScreen.tsx";
import useWriteContractAndWaitForConfirm from "../hooks/useWriteContractAndWaitForConfirm.tsx";

const LoanWidget = () => {
  const { status, setStatus } = useContext(GlobalContext);
  const {
    writeContract,
    hash,
    isPending,
    isConfirming,
    isError,
    isUserError,
    isSuccess,
  } = useWriteContractAndWaitForConfirm();
  console.log(hash);

  const [showPosition, setShowPosition] = useState(false);
  const { isConnected } = useAccountWithBalance();
  const { data } = useLoanByAddress();
  //@ts-expect-error

  const endDate = data ? data?.endDate.toString() : "--";

  useEffect(() => {
    setShowPosition(false);
    if (isConnected) {
      if (Number(endDate) !== 0) {
        setShowPosition(true);
      }
    }
  }, [endDate, isConnected]);

  const [isTransactionOccuring, setIsTransactionOccuring] = useState(false);

  useEffect(() => {
    setStatus(
      isError
        ? "ERROR"
        : isUserError
        ? "ERROR"
        : isSuccess
        ? "SUCCESS"
        : isConfirming
        ? "CONFIRMING"
        : isPending
        ? "PENDING"
        : "NONE",
      isError
        ? `There was an error with your transaction on the blockchain`
        : isUserError
        ? "There was an error with your transaction. "
        : isSuccess
        ? `Success`
        : isConfirming
        ? `Blockchain transaction is confirming`
        : isPending
        ? `Your transaction is pending`
        : ""
    );
  }, [isError, isUserError, isSuccess, isConfirming, isPending]);

  useEffect(() => {
    if (status !== "NONE") {
      setIsTransactionOccuring(true);
    } else {
      setIsTransactionOccuring(false);
    }
  }, [status]);

  return showPosition ? (
    <Card>
      {!isTransactionOccuring ? (
        <>
          <LoanInfo />

          <RepaySlider writeContract={writeContract} />

          <LoanBox writeContract={writeContract} />

          <CollateralBox writeContract={writeContract} />

          <ClosePosition writeContract={writeContract} />
        </>
      ) : (
        <LoadingScreen />
      )}
    </Card>
  ) : (
    <PositionsBox />
  );
};

export default LoanWidget;
