import { BaseContract, ContractTransaction } from 'ethers';
import { getFeeData } from 'utils/getFeeData';
import { useCallback } from 'react';
import { useIsMultisig } from 'shared/hooks/useIsMultisig';
import { useWeb3 } from 'rnb-web3/web3-react';
import { useCurrentStaticRpcProvider } from 'shared/hooks';
import { Web3Provider } from '@ethersproject/providers';

type Args<T extends BaseContract, M extends keyof T['functions']> = {
  contractWeb3: T;
  providerWeb3: Web3Provider;
  method: M;
  params: Parameters<T['functions'][M]>;
};

export const useExecuteContractMethod = <T extends BaseContract>() => {
  const { isMultisig } = useIsMultisig();
  const { account } = useWeb3();
  const { staticRpcProvider } = useCurrentStaticRpcProvider();

  return useCallback(
    <M extends keyof T['functions']>({
      contractWeb3,
      providerWeb3,
      method,
      params,
    }: Args<T, M>) =>
      async (): Promise<string | ContractTransaction> => {
        if (isMultisig) {
          // @ts-expect-error https://stackoverflow.com/questions/33994559/typescript-generic-that-extends-a-type-with-a-generic-higher-kinded-types
          const tx = await contractWeb3.populateTransaction[method](...params, {
            from: account,
          });
          return providerWeb3.getSigner().sendUncheckedTransaction(tx);
        } else {
          const { maxFeePerGas, maxPriorityFeePerGas } =
            await getFeeData(staticRpcProvider);

          const options = {
            maxPriorityFeePerGas,
            maxFeePerGas,
          };

          // @ts-expect-error, generic bug
          const gasLimit = await contractWeb3.estimateGas[method](
            ...params,
            options,
          );

          // @ts-expect-error, generic bug
          return contractWeb3[method](...params, {
            ...options,
            gasLimit,
          });
        }
      },
    [account, isMultisig, staticRpcProvider],
  );
};
