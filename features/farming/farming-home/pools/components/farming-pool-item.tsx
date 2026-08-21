import { NumberFormat, BorderedBox } from 'shared/components';
import { Stack, Typography } from '@mui/material';
import { WithImage, WithImageMultiple } from 'shared/components';
import { FormatPrice, FormatToken } from 'shared/formatters';
import {
  BottomInfo,
  FarmingAddress,
  FarmingBonusTypography,
  FarmingImageWithFallback,
} from './styles';
import { useToken } from 'wagmi';
import { useMemo } from 'react';
import { Zero } from '@ethersproject/constants';
import { useErc20TokensStaticData, useChainId } from 'shared/hooks';
import { EditPoolButton } from './edit-pool-button';
import { FarmingCountdown } from './farming-pool-item-countdown';
import { FarmingPool } from '../types';
import { DEFAULT_FALLBACK } from 'config';
import {
  FarmingPoolItemColumn,
  getBonusPoolReward,
} from 'features/farming/farming-pool/shared';

const iconsSizes = {
  width: 18,
  height: 18,
  sizes: '100vw',
};

export const FarmingPoolItem = ({
  address,
  poolLogo,
  token0Address,
  token1Address,
  tokenALogo,
  tokenBLogo,
  bonusPools,
  rewardToken: rewardTokenAddress,
  rewardTokenLogo,
  endTime,
  estimatedApr,
  stakedLiquidityUsd,
}: FarmingPool) => {
  const { defaultChain } = useChainId();
  const bonusPoolRewardAmount = useMemo(() => {
    if (bonusPools.length > 0) {
      const { rps, startTime, endTime } = bonusPools[0];
      return getBonusPoolReward(rps, startTime, endTime);
    }
    return Zero;
  }, [bonusPools]);

  const { data: bonusPoolRewardToken } = useToken({
    address: bonusPools?.[0]?.rewardToken,
    chainId: defaultChain,
  });

  const { data } = useErc20TokensStaticData(
    [token0Address, token1Address, rewardTokenAddress],
    'symbol',
  );
  const [token0Symbol, token1Symbol, rewardTokenSymbol] =
    (data as string[]) ?? [];

  const tokensImagesProps = [
    {
      src: tokenALogo,
      alt: token0Symbol,
      text: token0Symbol,
      ...iconsSizes,
    },
    {
      src: tokenBLogo,
      alt: token1Symbol,
      text: token1Symbol,
      ...iconsSizes,
    },
  ];

  return (
    <BorderedBox direction="row" spacing={3}>
      <FarmingImageWithFallback src={poolLogo} alt="Farming" />

      <Stack spacing={3} flex={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={(theme) => ({
            paddingBottom: 3,
            borderBottom: `1px solid ${theme.palette.colorScheme.stroke}`,
          })}
        >
          <FarmingPoolItemColumn
            title="Tokens"
            contentSlot={
              <WithImageMultiple
                imagesProps={tokensImagesProps}
                stackProps={{
                  fontSize: 16,
                  lineHeight: '24px',
                }}
              />
            }
          />

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <FarmingAddress variant="body1">{address}</FarmingAddress>
            <FarmingCountdown loading={false} timeLeft={endTime * 1000} />
          </Stack>
        </Stack>

        <BottomInfo>
          <FarmingPoolItemColumn
            title="APR"
            contentSlot={
              <Typography variant="body2" className="green-shamrock">
                <NumberFormat
                  number={estimatedApr}
                  percent
                  fallback={DEFAULT_FALLBACK}
                />
              </Typography>
            }
          />

          <FarmingPoolItemColumn
            title="Staked liquidity"
            contentSlot={
              <Typography
                variant="body2"
                className="white"
                noWrap
                maxWidth={200}
              >
                <FormatPrice
                  noWrap
                  variant="body2"
                  amount={stakedLiquidityUsd}
                />
              </Typography>
            }
          />

          <FarmingPoolItemColumn
            title="Bonus"
            contentSlot={
              <FarmingBonusTypography className="accent">
                <FormatToken
                  amount={bonusPoolRewardAmount}
                  fallback={DEFAULT_FALLBACK}
                  symbol={bonusPoolRewardToken?.symbol ?? ''}
                  decimals={bonusPoolRewardToken?.decimals}
                  trimEllipsis
                />
              </FarmingBonusTypography>
            }
          />

          <FarmingPoolItemColumn
            title="Main reward"
            contentSlot={
              <WithImage
                imageProps={{
                  src: rewardTokenLogo,
                  alt: rewardTokenSymbol,
                  ...iconsSizes,
                }}
                stackProps={{
                  justifyContent: 'flex-start',
                }}
              >
                {rewardTokenSymbol ?? DEFAULT_FALLBACK}
              </WithImage>
            }
          />
          <EditPoolButton id={address} />
        </BottomInfo>
      </Stack>
    </BorderedBox>
  );
};
