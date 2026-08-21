import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import {
  FarmingPoolItemColumn,
  getBonusPoolReward,
  EditButton,
} from '../../shared';
import { Icons, BorderedBox, WithImage } from 'shared/components';
import { FormatToken } from 'shared/formatters';
import { DateComponent } from 'shared/components/utility-components';
import type { BonusPoolItem } from '../types';
import { Zero } from '@ethersproject/constants';
import { Address, useToken } from 'wagmi';
import { CHAINS } from '@knine-sdk/constants';
import { DEFAULT_FALLBACK } from 'config';
import { BonusPoolStatuses } from '../types';

interface FarmingBonusPoolItemProps
  extends Pick<
    BonusPoolItem,
    'poolName' | 'startTime' | 'endTime' | 'rewardToken' | 'poolLogo' | 'rps'
  > {
  id: number;
  chainId: CHAINS;
  onEditClick?: (id: number) => void;
  status?: string;
}

export const FarmingBonusPoolItem = ({
  id,
  poolLogo,
  startTime,
  endTime,
  poolName,
  rewardToken,
  onEditClick,
  chainId,
  rps,
  status,
}: FarmingBonusPoolItemProps) => {
  const theme = useTheme();

  const amount =
    startTime && endTime ? getBonusPoolReward(rps, +startTime, +endTime) : Zero;
  const { data: bonusPoolRewardToken } = useToken({
    address: rewardToken as Address,
    chainId: chainId,
  });

  const disabledToEdit = status?.toLowerCase() !== BonusPoolStatuses.COMMITTED;

  return (
    <BorderedBox
      direction="row"
      justifyContent="space-between"
      flexWrap="wrap"
      sx={{
        display: 'grid',
        gridTemplateColumns: '0.75fr 1fr 1.5fr 2fr auto',
        gap: 4,
      }}
    >
      <FarmingPoolItemColumn
        title="Name"
        contentSlot={
          <WithImage
            imageProps={{
              src: poolLogo,
              alt: 'Shibarium',
              width: 24,
              height: 24,
            }}
            stackProps={{
              fontSize: 16,
              lineHeight: '24px',
              justifyContent: 'flex-start',
            }}
          >
            <Typography variant="body1" noWrap>
              {poolName}
            </Typography>
          </WithImage>
        }
      />

      <FarmingPoolItemColumn
        title="Amount"
        contentSlot={
          <FormatToken
            amount={amount}
            symbol={bonusPoolRewardToken?.symbol ?? DEFAULT_FALLBACK}
            trimEllipsis
          />
        }
        lineHeight="25px"
      />

      <FarmingPoolItemColumn
        title="🚀 Boost Period"
        contentSlot={
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Icons.Calendar fill={theme.palette.colorScheme.orangeMid} />
            <Typography className="gray-secondary" lineHeight="24px">
              <DateComponent utc blockTime={startTime?.toString() ?? ''} /> -{' '}
              <DateComponent utc blockTime={endTime?.toString() ?? ''} />
            </Typography>
          </Stack>
        }
      />

      <FarmingPoolItemColumn
        title="Reward Token address"
        contentSlot={
          <Typography className="gray-secondary" noWrap lineHeight="24px">
            {rewardToken}
          </Typography>
        }
      />

      <Tooltip
        placement="bottom-end"
        title="Only pools with status COMMITTED can be updated"
        disableHoverListener={!disabledToEdit}
      >
        <span>
          <EditButton
            disabled={disabledToEdit}
            endIcon={<Icons.Edit />}
            onClick={() => onEditClick?.(id)}
          >
            Edit
          </EditButton>
        </span>
      </Tooltip>
    </BorderedBox>
  );
};
