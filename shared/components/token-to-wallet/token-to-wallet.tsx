import { useTokenToWallet } from '@knine-sdk/react';
import { TokenToWalletStyle } from './styles';
import { IconButtonProps, Tooltip } from '@mui/material';
import { Icons } from 'shared/components';
import { COLOR_WH } from 'styles';
import { showToastMessage } from 'utils';

interface TokenToWalletProps extends IconButtonProps {
  address: string;
}

export const TokenToWallet = (props: TokenToWalletProps) => {
  const { address, ...rest } = props;
  const { addToken } = useTokenToWallet(address);

  if (!addToken) return null;

  const onClickHandler = async () => {
    const result = await addToken();
    if (!result) return;

    showToastMessage('info', 'Tokens were successfully added to your wallet');
  };

  return (
    <Tooltip placement="bottom-end" title="Add tokens to wallet">
      <TokenToWalletStyle
        tabIndex={-1}
        className="clear"
        onClick={onClickHandler}
        {...rest}
      >
        <Icons.Plus color={COLOR_WH} />
      </TokenToWalletStyle>
    </Tooltip>
  );
};
