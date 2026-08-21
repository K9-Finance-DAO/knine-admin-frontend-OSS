import { useWeb3 } from 'rnb-web3/web3-react';
import { useIsContract } from 'shared/hooks';

export const useIsMultisig = () => {
  const { account } = useWeb3();
  const { isContract: isMultisig, isLoading } = useIsContract(
    account ?? undefined,
  );
  return { isMultisig, isLoading };
};
