import styled from 'styled-components';

import { InlineLoader } from '@lidofinance/lido-ui';
import { TxAmount } from '../tx-stages-parts/tx-amount';
import { TxStageSuccess } from '../tx-stages-basic';

import type { BigNumber } from 'ethers';
import type { OptionsProps } from 'shared/transaction-modal/hooks';

export const SkeletonBalance = styled(InlineLoader).attrs({
  color: 'text',
})`
  margin-left: ${({ theme }) => theme.spaceMap.xs}px;
  width: 100px;
`;

type TxStageOperationSucceedBalanceShownProps = {
  balance?: BigNumber;
  balanceToken: string;
  txHash?: string;
} & Required<Pick<OptionsProps, 'operationText'>>;

export const TxStageOperationSucceedBalanceShown = ({
  balance,
  balanceToken,
  operationText,
  txHash,
}: TxStageOperationSucceedBalanceShownProps) => {
  const balanceEl = balance && (
    <TxAmount amount={balance} symbol={balanceToken} />
  );

  return (
    <TxStageSuccess
      txHash={txHash}
      title={
        <>
          Your new balance is <wbr />
          {balance ? balanceEl : <SkeletonBalance />}
        </>
      }
      description={
        <>
          {operationText} operation was successful. <br />
        </>
      }
    />
  );
};
