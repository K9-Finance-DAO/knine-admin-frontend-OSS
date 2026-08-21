import { FC, useCallback } from 'react';
import { useSwitchNetwork } from 'wagmi';
import { Button, ButtonProps, Typography } from '@mui/material';
import { CHAINS } from '@knine-sdk/constants';
import { ButtonLoaderStyle } from 'shared/components';
import { capitalize } from 'utils';
import { setWeb3ProviderReloadFlag } from 'providers/sdk-legacy';

export interface SwitchNetworkArgs {
  onSuccess?: () => void;
  onAsyncClick?: () => Promise<void>;
  onError?: () => void;
  operationText?: string;
  loading?: boolean;
  chainId: CHAINS;
}

export type SwitchNetworkButtonProps = SwitchNetworkArgs & ButtonProps;

export const SwitchNetworkButton: FC<SwitchNetworkButtonProps> = ({
  chainId,
  onSuccess,
  loading,
  onAsyncClick,
  onError = console.error,
  operationText,
  ...props
}) => {
  const { chains, isLoading, switchNetworkAsync } = useSwitchNetwork({
    chainId,
    onError,
    onSuccess,
  });
  const chainName = chains.find((chain) => chain.id === chainId)?.name;

  const handleClick = useCallback(async () => {
    await switchNetworkAsync?.();
    setWeb3ProviderReloadFlag();
    await onAsyncClick?.();
  }, [onAsyncClick, switchNetworkAsync]);

  const isBtnLoading = isLoading || loading;

  return (
    <Button onClick={handleClick} color="secondary" {...props}>
      <Typography
        display={isBtnLoading ? 'none' : 'inline'}
        component="span"
        variant="inherit"
        sx={{ textTransform: 'none' }}
      >
        Switch to {capitalize(chainName ?? '')}{' '}
        {operationText && `to ${operationText}`}
      </Typography>
      {isBtnLoading && <ButtonLoaderStyle size="small" />}
    </Button>
  );
};
