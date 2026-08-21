import { useWrapperSWR, useKnBoneContractRPC } from '@knine-sdk/react';
import { useWeb3 } from 'rnb-web3/web3-react';
import {
  ESTIMATE_ACCOUNT,
  ESTIMATE_AMOUNT,
  WSTETH_APPROVE_GAS_LIMIT,
} from 'config';
import { BigNumber } from 'ethers';
import { STRATEGY_IMMUTABLE } from 'utils/swrStrategies';

// NOTE: Replace from feature/wrap because its used in transaction-info.tsx
export const useApproveGasLimit = () => {
  const knbone = useKnBoneContractRPC();
  const { chainId } = useWeb3();

  const { data } = useWrapperSWR(
    ['swr:approve-wrap-gas-limit', chainId],
    async (_key, chainId) => {
      if (!chainId) return;

      try {
        const gasLimit = await knbone.estimateGas.approve(
          knbone.address, // TODO: check this argument, now mocked to avoid errors
          ESTIMATE_AMOUNT,
          { from: ESTIMATE_ACCOUNT },
        );
        return gasLimit;
      } catch (error) {
        console.warn(_key, error);
        return BigNumber.from(WSTETH_APPROVE_GAS_LIMIT);
      }
    },
    STRATEGY_IMMUTABLE,
  );

  return data ?? WSTETH_APPROVE_GAS_LIMIT;
};
