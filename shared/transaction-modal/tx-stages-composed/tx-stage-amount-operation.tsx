import { TxStageSign } from '../tx-stages-basic';
import { TxStagePending } from '../tx-stages-basic';
import { TxAmount } from '../tx-stages-parts';

import type { BigNumber } from 'ethers';
import type { OptionsProps } from 'shared/transaction-modal/hooks';
import { ReactNode } from 'react';

type TxStageSignOperationAmountProps = {
  amount: BigNumber | number;
  willReceive?: BigNumber;
  willReceiveToken?: string;
  decimals?: number;
  willReceiveDecimals?: number;
  isPending?: boolean;
  txHash?: string;
  hideDefaultDescription?: boolean;
  description?: ReactNode;
} & Required<OptionsProps>;

export const TxStageSignOperationAmount = ({
  amount,
  token,
  willReceive,
  willReceiveToken,
  decimals,
  willReceiveDecimals,
  operationText,
  isPending,
  txHash,
  description,
  hideDefaultDescription = false,
}: TxStageSignOperationAmountProps) => {
  const amountEl = (
    <TxAmount amount={amount} symbol={token} decimals={decimals} />
  );
  const willReceiveEl = willReceive && willReceiveToken && (
    <TxAmount
      amount={willReceive}
      symbol={willReceiveToken}
      decimals={willReceiveDecimals}
    />
  );
  const Component = isPending ? TxStagePending : TxStageSign;

  const defaultSignOperationDescription = (
    <>
      {operationText} {amountEl}.{' '}
      {willReceiveEl && (
        <>
          <br />
          You will receive {willReceiveEl}.
        </>
      )}
    </>
  );

  return (
    <Component
      txHash={txHash}
      title={
        <>
          You are {operationText.toLowerCase()} {amountEl}
        </>
      }
      description={
        description ??
        (!isPending &&
          !hideDefaultDescription &&
          defaultSignOperationDescription)
      }
    />
  );
};
