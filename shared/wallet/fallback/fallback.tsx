import { useErrorMessage } from './useErrorMessage';
import { Alert, AlertProps, Stack, StackProps } from '@mui/material';
import { CHAINS } from '@knine-sdk/constants';
import { useWeb3 } from 'rnb-web3/web3-react';

interface FallbackProps extends StackProps {
  forcedChainId?: CHAINS;
  variant?: AlertProps['variant'];
  severity?: AlertProps['severity'];
}

export const Fallback = ({ forcedChainId, ...props }: FallbackProps) => {
  const { chainId: currentChainId } = useWeb3();
  const error = useErrorMessage(forcedChainId);

  // NOTE: condition for page fallback & login fallback
  const isChainIdMismatch = forcedChainId ? true : !currentChainId;

  if (error && isChainIdMismatch) {
    return (
      <Stack
        component={Alert}
        direction="row"
        variant="filled"
        severity="warning"
        role="alert"
        {...props}
      >
        {error}
      </Stack>
    );
  }

  return null;
};
