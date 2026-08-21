import React, { ChangeEvent, FC } from 'react';
import { useRnbWeb3Modal } from 'rnb-web3/core-react';
import { Checkbox, Typography, Link } from '@mui/material';
import { BorderedBox } from 'shared/components';
import { TERMS_LINK, PRIVACY_LINK } from 'config/external-links';

export type WalletModalConnectTermsProps = {
  termsLink?: string;
  privacyNoticeLink?: string;
};

export const Terms: FC<WalletModalConnectTermsProps> = ({
  termsLink = TERMS_LINK,
  privacyNoticeLink = PRIVACY_LINK,
}) => {
  const { setTermsChecked, termsChecked } = useRnbWeb3Modal();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.currentTarget.checked);
  };

  return (
    <BorderedBox
      direction="row"
      spacing={1.25}
      sx={(theme) => ({
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1.75),
        background: theme.palette.colorScheme.darkSecondary,
      })}
    >
      <Checkbox onChange={handleCheckboxChange} checked={termsChecked} />
      <Typography component="span" variant="caption" className="sm" flex={1}>
        I certify that I have read and accept the updated{' '}
        <Link
          href={termsLink}
          className="accent underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms&nbsp;of&nbsp;Use
        </Link>{' '}
        and{' '}
        <Link
          href={privacyNoticeLink}
          className="accent underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy&nbsp;Notice
        </Link>
        .
      </Typography>
    </BorderedBox>
  );
};
