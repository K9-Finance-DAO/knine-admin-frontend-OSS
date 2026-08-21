import Icons from 'shared/components/icons';
import { ReactNode } from 'react';
import {
  ACCESS_PATH,
  LIQUID_STAKING_PATH,
  NODE_OPERATOR_REGISTRY_PATH,
  SHIBARIUM_TOKEN_PATH,
  REAL_YIELD_STAKING_PATH,
  STATISTICS_PATH,
  FARMING_PATH,
  FARMING_CREATE_PATH,
  FARMING_EDIT_PATH,
  VESTING_PATH,
} from 'config/urls';

type HeaderContentProps = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
};

// TODO: add paths when other pages will be ready
export const mapPathToHeaderContent: Record<string, HeaderContentProps> = {
  [STATISTICS_PATH]: {
    icon: <Icons.StatisticsGradient />,
    title: 'Statistics',
  },
  [ACCESS_PATH]: {
    icon: <Icons.AccessGradient />,
    title: 'Access',
    subtitle: 'Admins management',
  },
  [LIQUID_STAKING_PATH]: {
    icon: <Icons.LiquidStakingGradient />,
    title: 'Liquid Staking',
    subtitle: 'Stake BONE and receive knBone while staking.',
  },
  [NODE_OPERATOR_REGISTRY_PATH]: {
    icon: <Icons.NodeOperatorRegistryGradient />,
    title: 'Node Operator Registry',
    subtitle: 'NodeOperatorRegistry contract management',
  },
  [SHIBARIUM_TOKEN_PATH]: {
    icon: <Icons.LiquidStakingGradient />,
    title: 'knBONE Shibarium token',
    subtitle: 'Shibarium knBONE token management',
  },
  [REAL_YIELD_STAKING_PATH]: {
    icon: <Icons.RealYieldStakingGradient />,
    title: 'Real Yield Staking',
    subtitle: 'Settings',
  },
  [FARMING_PATH]: {
    icon: <Icons.FarmingGradient />,
    title: 'Farming',
    subtitle: 'Settings',
  },
  [FARMING_CREATE_PATH]: {
    icon: <Icons.FarmingGradient />,
    title: 'Farming',
    subtitle: 'Settings',
  },
  [FARMING_EDIT_PATH]: {
    icon: <Icons.FarmingGradient />,
    title: 'Farming',
    subtitle: 'Settings',
  },
  [VESTING_PATH]: {
    icon: <Icons.VestingGradient />,
    title: 'Vesting',
    subtitle: 'Settings',
  },
};
