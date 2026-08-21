import { ReactNode } from 'react';
import Icons from 'shared/components/icons';
import {
  ACCESS_PATH,
  LIQUID_STAKING_PATH,
  NODE_OPERATOR_REGISTRY_PATH,
  SHIBARIUM_TOKEN_PATH,
  REAL_YIELD_STAKING_PATH,
  STATISTICS_PATH,
  FARMING_PATH,
  VESTING_PATH,
} from 'config/urls';

type SidebarItem = {
  key: number;
  label?: string;
  icon?: ReactNode;
  subitems: {
    name: string;
    path: string;
    query?: Record<string, string>;
    icon: ReactNode;
    iconActive?: ReactNode;
  }[];
};

export const sidebarNavItems: SidebarItem[] = [
  {
    key: 1,
    subitems: [
      {
        name: 'Statistics',
        path: STATISTICS_PATH,
        icon: <Icons.Statistics />,
        iconActive: <Icons.StatisticsActive />,
      },
    ],
  },
  {
    key: 2,
    label: 'Management',
    subitems: [
      {
        name: 'Access',
        path: ACCESS_PATH,
        icon: <Icons.Access />,
      },
      {
        name: 'Liquid Staking',
        path: LIQUID_STAKING_PATH,
        icon: <Icons.LiquidStaking />,
        iconActive: <Icons.LiquidStakingActive />,
      },
      {
        name: 'Node Operator Registry',
        path: NODE_OPERATOR_REGISTRY_PATH,
        icon: <Icons.NodeOperatorRegistry />,
      },
      {
        name: 'knBONE Shibarium token',
        path: SHIBARIUM_TOKEN_PATH,
        icon: <Icons.Coins />,
      },
    ],
  },
  {
    key: 3,
    label: 'Settings',
    subitems: [
      {
        name: 'Real Yield Staking',
        path: REAL_YIELD_STAKING_PATH,
        icon: <Icons.RealYieldStaking />,
        iconActive: <Icons.RealYieldStakingActive />,
      },
      {
        name: 'Farming',
        path: FARMING_PATH,
        icon: <Icons.Farming />,
      },
      {
        name: 'Vesting',
        path: VESTING_PATH,
        icon: <Icons.Vesting />,
      },
    ],
  },
];
