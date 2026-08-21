import { useState } from 'react';
import {
  getUnsupportedChainError,
  useRnbWeb3Context,
} from 'rnb-web3/core-react';
import { ModalWrapper } from 'shared/components';
import { IModal } from '../types';
import { Alert, Box, Button } from '@mui/material';
import { Terms } from '../terms';

interface EagerModalProps extends IModal {
  payload: {
    tryConnection: () => Promise<any>;
    initialError?: Error;
  };
}

export const EagerModal = ({
  open,
  onSuccess,
  onReject,
  payload,
}: EagerModalProps) => {
  const { tryConnection, initialError } = payload;
  const { chains: supportedChains } = useRnbWeb3Context();
  const [error, setError] = useState(initialError);

  const handleTryConnect = async () => {
    try {
      await tryConnection();
      onSuccess();
    } catch (e) {
      setError(e as Error);
    }
  };

  let errorMessage = error?.message;
  if (error && error.name == 'UnsupportedChainIdError') {
    errorMessage = getUnsupportedChainError(supportedChains).message;
  }

  return (
    <ModalWrapper open={open} title="Confirm connection" onClose={onReject}>
      <Box>
        <Terms />
        {error && (
          <Alert variant="filled" severity="warning" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button fullWidth onClick={handleTryConnect}>
          Connect
        </Button>
      </Box>
    </ModalWrapper>
  );
};
