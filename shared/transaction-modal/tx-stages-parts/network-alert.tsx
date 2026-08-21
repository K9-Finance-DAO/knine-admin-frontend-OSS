import { CHAINS } from '@knine-sdk/constants';
import { chainToChainInfoHashMap } from 'shared/wallet';
import Image from 'next/image';
import { Stack, StackProps, styled } from '@mui/material';
import { Icons } from 'shared/components';

const WarningDefaultWrap = styled(Stack, {
  shouldForwardProp: (prop) => prop !== '$size',
})<{ $size: number }>(({ theme, $size }) => ({
  width: $size,
  height: $size,
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.colorScheme.blackout,
  border: '2px solid',
  borderColor: theme.palette.colorScheme.orangeMid,
  borderRadius: '50%',
  svg: {
    color: theme.palette.colorScheme.orangeBase,
    width: $size / 2,
    height: $size / 2,
  },
}));

export const WarningDefault = ({ size = 80 }) => {
  return (
    <WarningDefaultWrap $size={size}>
      <Icons.Warning />
    </WarningDefaultWrap>
  );
};

type NetworkVariantToShow = CHAINS | 'default';

interface NetworkAlertProps {
  network?: NetworkVariantToShow;
}

export const NetworkAlert = ({
  network,
  ...rest
}: NetworkAlertProps & StackProps) => {
  const displayDefaultNetworkComponent = !network || network === 'default';
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      spacing={1}
      {...rest}
    >
      <Icons.NetworkWire style={{ transform: 'rotate(180deg)' }} />

      {displayDefaultNetworkComponent ? (
        <WarningDefault />
      ) : (
        <Image
          src={chainToChainInfoHashMap?.[network]?.logo}
          alt={`chain-logo-${network}`}
          width={80}
          height={80}
        />
      )}
      <Icons.NetworkWire />
    </Stack>
  );
};
