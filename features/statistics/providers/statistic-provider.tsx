import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react';
import invariant from 'tiny-invariant';
import {
  LSBaseData,
  useLiquidStakingBaseData,
} from 'providers/liquid-staking-base-info';
import {
  INodeOperatorBaseData,
  useNodeOperatorRegistryStats,
} from 'features/node-operator-registry/form/hooks';
import { useChainId } from 'shared/hooks';
import {
  useContractSWR,
  useNodeOperatorRegistryContractRPC,
  useWrapperSWR,
} from '@knine-sdk/react';
import { standardFetcher, STRATEGY_CONSTANT, STRATEGY_LAZY } from 'utils';
import { BigNumber } from 'ethers';
import { dynamics } from 'config';

export type OperatorStatuses = {
  activeNodeOperator?: BigNumber;
  ejectedNodeOperator?: BigNumber;
  inactiveNodeOperator?: BigNumber;
  jailedNodeOperator?: BigNumber;
  unstakedNodeOperator?: BigNumber;
};

type Validators = {
  id: number;
  validator_id: number;
  image_url?: string;
  address: string;
  name: string;
  total_staked: string;
};

type Apr = {
  sma_apr: string;
};

type StatisticContextValue = {
  operatorsStatuses: OperatorStatuses;
  isNodeOperatorPaused?: boolean;
  validators?: Validators[];
  apr?: string;
  loading: LSBaseData['loading'] & {
    isNodeOperatorStatusesLoading: boolean;
    isNodeOperatorStatisticLoading: boolean;
    isValidatorsLoading: boolean;
    isAprLoading: boolean;
  };
} & INodeOperatorBaseData &
  Omit<LSBaseData, 'loading'>;

const StatisticContext = createContext({} as StatisticContextValue);
StatisticContext.displayName = 'StatisticContext';
const basePath = dynamics.knineAPIBasePath;

const useStatisticNetworkData = () => {
  const { chainId } = useChainId();
  const contractRpc = useNodeOperatorRegistryContractRPC(chainId);

  const { loading: stakingStatsLoading, ...liquidStakingStatistic } =
    useLiquidStakingBaseData();
  const {
    data: nodeOperatorStatistic,
    initialLoading: isNodeOperatorStatisticLoading,
  } = useNodeOperatorRegistryStats();

  const { data: validatorsData, initialLoading: isValidatorsLoading } =
    useWrapperSWR<Validators[]>(`${basePath}/validators`, standardFetcher, {
      ...STRATEGY_CONSTANT,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    });

  const { data: apr, initialLoading: isAprLoading } = useWrapperSWR<Apr>(
    `${basePath}/apr/`,
    standardFetcher,
    {
      ...STRATEGY_CONSTANT,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    },
  );

  const { data, initialLoading: isNodeOperatorStatusesLoading } =
    useContractSWR({
      contract: contractRpc,
      method: 'getStats',
      config: STRATEGY_LAZY,
    });

  const {
    activeNodeOperator,
    ejectedNodeOperator,
    inactiveNodeOperator,
    jailedNodeOperator,
    unstakedNodeOperator,
  } = data ?? {};

  const loading = useMemo(
    () => ({
      ...stakingStatsLoading,
      unstakedNodeOperator,
      isNodeOperatorStatusesLoading,
      isNodeOperatorStatisticLoading,
      isAprLoading,
      isValidatorsLoading,
    }),
    [
      isNodeOperatorStatisticLoading,
      isNodeOperatorStatusesLoading,
      stakingStatsLoading,
      unstakedNodeOperator,
      isValidatorsLoading,
    ],
  );

  return {
    loading,
    ...nodeOperatorStatistic,
    ...liquidStakingStatistic,
    validators: validatorsData,
    apr: apr?.sma_apr,
    operatorsStatuses: {
      activeNodeOperator,
      ejectedNodeOperator,
      inactiveNodeOperator,
      jailedNodeOperator,
      unstakedNodeOperator,
    },
  };
};

export const StatisticProvider: FC<PropsWithChildren> = ({ children }) => {
  const { loading, ...data } = useStatisticNetworkData();

  const value = useMemo(() => {
    return {
      ...data,
      loading,
    };
  }, [data, loading]);

  return (
    <StatisticContext.Provider value={value}>
      {children}
    </StatisticContext.Provider>
  );
};

export const useStatistic = () => {
  const value = useContext(StatisticContext);
  invariant(
    value !== null,
    'useStatistic was used used outside of StatisticProvider',
  );
  return value;
};
