export type MaxLockupMultiplierFormData = {
  multiplier?: number;
  revalidate: () => Promise<void>;
  isMultisig?: boolean;
  loading: {
    isRealYieldStakingLoading: boolean;
    isMultisigLoading: boolean;
  };
};

export type MaxLockupMultiplierFormInput = {
  multiplier: number;
};

export type MaxLockupMultiplierFormValidationContext = {
  isWalletActive: boolean;
  multiplier: number;
  isMultisig: boolean;
};
