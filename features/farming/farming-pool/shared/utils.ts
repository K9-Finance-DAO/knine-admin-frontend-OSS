import { CreatePoolRequest, FarmingPoolFormFields } from './types';
import { transformDataForBackend } from 'utils';
import { BigNumber } from 'ethers';
import { MS_IN_SEC } from 'config';

export const formatBackendData = async (
  data: Partial<FarmingPoolFormFields>,
): Promise<CreatePoolRequest> => {
  try {
    // cringe quick solution, todo@ refactor,
    const backendObj = {
      ...(data?.endDate && { endTime: data.endDate }),
      ...(data?.startDate && { startTime: data.startDate }),
      ...(data?.tokenReward?.address && {
        rewardToken: data.tokenReward.address,
      }),
      ...(data?.token1?.address && { token1Address: data.token1.address }),
      ...(data?.token0?.address && { token0Address: data.token0.address }),
      ...(data?.rps && { rps: data.rps }),
      ...(data?.poolName && { poolName: data.poolName }),
      ...(data?.token0?.logo && { tokenALogo: data.token0.logo }),
      ...(data?.token1?.logo && { tokenBLogo: data.token1.logo }),
      ...(data?.poolLogo && { poolLogo: data.poolLogo }),
      ...(data?.tokenReward?.logo && {
        rewardTokenLogo: data.tokenReward?.logo,
      }),
    };

    return (await transformDataForBackend(backendObj)) as CreatePoolRequest;
  } catch (err: unknown) {
    console.error('Error serializing data for backend:', err);
    throw new Error('Failed to serialize data for backend');
  }
};

export const getBonusPoolReward = (
  rps: string | number,
  startDate: number,
  endDate: number,
) => {
  // totalReward = rewardPerSecond * [endDate - startDate]
  return BigNumber.from(rps).mul(endDate - startDate);
};
