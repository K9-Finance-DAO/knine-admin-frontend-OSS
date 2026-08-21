import { getNetwork, Network } from '@ethersproject/providers';
import { useMemo } from 'react';
import { useConnectorError, helpers } from 'rnb-web3/web3-react';
import { useNetwork } from 'wagmi';
import { CHAINS } from '@knine-sdk/constants';

export const useSupportedChains = (
  forcedChainId?: CHAINS,
): {
  isUnsupported: boolean;
  supportedChains: Network[];
} => {
  const { chain, chains } = useNetwork();

  const isUnsupported = !!chain?.unsupported || forcedChainId !== chain?.id;

  const supportedChains = useMemo(() => {
    if (forcedChainId) {
      return [getNetwork(forcedChainId)];
    }

    return chains.map((c) => getNetwork(c.id));
  }, [chains, forcedChainId]);

  return {
    isUnsupported,
    supportedChains,
  };
};

export const useErrorMessage = (forcedChainId?: CHAINS): string | undefined => {
  const error = useConnectorError();
  const { isUnsupported } = useSupportedChains(forcedChainId);
  const { chains } = useNetwork();

  const supportedChains = useMemo(() => {
    if (forcedChainId) {
      return chains.filter((c) => c.id === forcedChainId);
    }

    return chains;
  }, [chains, forcedChainId]);

  // TODO: fix useConnectorError in reef-knot and remove this block
  if (isUnsupported) {
    return helpers.getUnsupportedChainError(supportedChains).message;
  }

  return error?.message;
};
