import {
  StatListCard,
  StatListItem,
  StatListTitle,
  StatListWithDivider,
  WithImage,
} from 'shared/components';
import BoneImg from 'public/bone.webp';
import { styled, Tooltip, Typography } from '@mui/material';
import KnineImg from 'public/favicon-192x192.png';
import { useRealYieldStakingInfo } from '../hooks';
import { InlineLoader } from '@lidofinance/lido-ui';
import { formatEther } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';
import { format } from 'date-fns';
import { Big } from 'features/liquid-staking/rewards/helpers';

const StatListItemStyled = styled(StatListItem)(({ theme }) => ({
  gap: theme.spacing(1),
  maxWidth: '20%',
}));

const AmountText = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ...theme.typography.h6,
}));

export const RealYieldStatistics = () => {
  const { data, initialLoading } = useRealYieldStakingInfo();

  return (
    <StatListCard sx={(theme) => ({ py: theme.spacing(3) })}>
      <StatListWithDivider sx={{ padding: 0 }}>
        <StatListItemStyled>
          <StatListTitle>BONE reward</StatListTitle>
          <WithImage
            imageProps={{
              width: 24,
              height: 24,
              src: BoneImg,
              alt: 'BONE',
              sizes: '100vw',
            }}
          >
            {initialLoading ? (
              <InlineLoader />
            ) : (
              <Tooltip title={formatEther(data?.totalRewards || Zero)}>
                <AmountText>
                  {formatEther(data?.totalRewards || Zero)}
                </AmountText>
              </Tooltip>
            )}
          </WithImage>
        </StatListItemStyled>
        <StatListItemStyled>
          <StatListTitle>Reward per second</StatListTitle>
          {initialLoading ? (
            <InlineLoader />
          ) : (
            <Tooltip title={new Big(data?.poolInfo?.rps || 0).toString()}>
              <AmountText>
                {new Big(data?.poolInfo?.rps || 0).toString()}
              </AmountText>
            </Tooltip>
          )}
        </StatListItemStyled>
        <StatListItemStyled>
          <StatListTitle>Staked token</StatListTitle>
          <WithImage
            imageProps={{
              width: 24,
              height: 24,
              src: KnineImg,
              alt: 'KNINE',
              sizes: '100vw',
            }}
          >
            <Typography variant="h6">KNINE</Typography>
          </WithImage>
        </StatListItemStyled>
        <StatListItemStyled>
          <StatListTitle>Reward token</StatListTitle>
          <WithImage
            imageProps={{
              width: 24,
              height: 24,
              src: BoneImg,
              alt: 'BONE',
              sizes: '100vw',
            }}
          >
            <Typography variant="h6">BONE</Typography>
          </WithImage>
        </StatListItemStyled>
        <StatListItemStyled>
          <StatListTitle>Start date</StatListTitle>
          {initialLoading ? (
            <InlineLoader />
          ) : (
            <Typography variant="h6">
              {data?.poolInfo?.startTime
                ? format(data.poolInfo.startTime * 1000, 'dd MMMM yyyy')
                : 'Not started'}
            </Typography>
          )}
        </StatListItemStyled>
      </StatListWithDivider>
    </StatListCard>
  );
};
