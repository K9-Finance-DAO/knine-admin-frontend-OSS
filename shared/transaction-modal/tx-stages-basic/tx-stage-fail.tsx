import { MouseEventHandler, useCallback, useState, MouseEvent } from 'react';
import { ErrorMessage } from 'utils';

import { TransactionModalContent } from 'shared/transaction-modal';
import { Icons, Spinner } from 'shared/components';
import { Button } from '@mui/material';
import type { OptionsProps } from 'shared/transaction-modal/hooks';
import { TxAmount } from 'shared/transaction-modal/tx-stages-parts';

type TxStageFailProps = {
  failedText?: string | null;
  onRetry?: MouseEventHandler<HTMLSpanElement>;
} & OptionsProps;

export const TxStageFail = ({
  failedText,
  onRetry,
  operationText,
  token,
  amount,
}: TxStageFailProps) => {
  const [isLoading, setLoading] = useState(false);
  const handleRetry = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      setLoading(true);
      onRetry?.(e);
    },
    [onRetry],
  );

  const showRetryButton =
    failedText !== ErrorMessage.NOT_ENOUGH_ETHER && onRetry;

  const amountEl =
    amount && token ? <TxAmount amount={amount} symbol={token} /> : null;

  return (
    <TransactionModalContent
      title={
        <>
          {operationText} <wbr />
          {amountEl}
          Transaction Failed
        </>
      }
      icon={<Icons.Error />}
      description={failedText ?? 'Something went wrong'}
      footerHint={
        showRetryButton &&
        (!isLoading ? (
          <Button
            variant="contained"
            size="small"
            onClick={handleRetry}
            sx={{ padding: 1 }}
          >
            Retry
          </Button>
        ) : (
          <Spinner size="large" />
        ))
      }
    />
  );
};
