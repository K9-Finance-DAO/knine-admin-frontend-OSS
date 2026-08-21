export type RewardPerSecondFormData = {
  rewardPerSecond: number | string;
  revalidate: () => Promise<void>;
  isMultisig?: boolean;
  loading: {
    isRealYieldStakingLoading: boolean;
    isMultisigLoading: boolean;
  };
};

export type RewardPerSecondFormInput = {
  rewardPerSecond: number | string;
};

export type RewardPerSecondFormValidationContext = {
  isWalletActive: boolean;
  rewardPerSecond: number | string;
  isMultisig: boolean;
};
