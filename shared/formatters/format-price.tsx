import { DATA_UNAVAILABLE, LOCALE } from 'config';
import { TypographyProps, Tooltip, Typography } from '@mui/material';

interface FormatPriceProps extends TypographyProps {
  amount: number | null | undefined;
  currency?: string;
}

export const FormatPrice = (props: FormatPriceProps) => {
  const { amount, currency = 'USD', ...rest } = props;
  const actual =
    amount == null
      ? DATA_UNAVAILABLE
      : amount.toLocaleString(LOCALE, {
          style: 'currency',
          currency,
        });

  if (amount && amount < 0.01) {
    return (
      <Tooltip
        placement="top-end"
        title={
          <span>
            {amount.toLocaleString(LOCALE, {
              style: 'currency',
              currency,
              maximumFractionDigits: 10,
            })}
          </span>
        }
      >
        <Typography component="span" variant="inherit" {...rest}>
          {actual}
        </Typography>
      </Tooltip>
    );
  }

  return (
    <Typography component="span" variant="inherit" {...rest}>
      {actual}
    </Typography>
  );
};
