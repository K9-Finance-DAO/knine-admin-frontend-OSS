import { FC, useCallback } from 'react';
import { useConnect } from 'rnb-web3/core-react';
import { Button, ButtonProps } from '@mui/material';

export const Connect: FC<ButtonProps> = (props) => {
  const { onClick, ...rest } = props;
  const { connect } = useConnect();

  const handleClick = useCallback(() => {
    void connect();
  }, [connect]);

  return (
    <Button color="secondary" onClick={handleClick} {...rest}>
      Connect wallet
    </Button>
  );
};
