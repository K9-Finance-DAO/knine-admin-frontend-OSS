import { BorderedBox, ImageWrapper } from 'shared/components';
import { Typography } from '@mui/material';
import { BigNumber } from 'ethers';
import { FormatToken } from 'shared/formatters';
import { DEFAULT_FALLBACK } from 'config';

type ValidatorCardProps = {
  id: number;
  imageUrl?: string;
  address: string;
  name: string;
  totalStaked: BigNumber;
  symbol?: string;
};

export const ValidatorCard = ({
  id,
  name,
  imageUrl,
  address,
  totalStaked,
  symbol = 'BONE',
}: ValidatorCardProps) => {
  const imageSource = imageUrl ?? '/mantra-dao.png';
  return (
    <BorderedBox
      direction="row"
      justifyContent="space-between"
      spacing={4}
      alignItems="center"
      px={3}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 2fr)', md: '1fr 2fr auto' },
      }}
    >
      <ImageWrapper
        stackProps={{ sx: { width: 'fit-content' } }}
        contentImg={{
          src: imageSource,
          alt: `validator-${id}`,
        }}
      >
        <Typography variant="body2">{name ?? DEFAULT_FALLBACK}</Typography>
      </ImageWrapper>
      <Typography variant="body2" noWrap>
        {address}
      </Typography>
      <Typography
        variant="body2"
        textAlign="end"
        sx={{ gridColumn: { xs: 'span 12', md: 'unset' } }}
      >
        <FormatToken symbol={symbol} amount={totalStaked} />
      </Typography>
    </BorderedBox>
  );
};
