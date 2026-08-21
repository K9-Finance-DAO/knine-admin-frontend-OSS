export enum ErrorMessage {
  NOT_ENOUGH_ETHER = 'Not enough ether for gas.',
  DENIED_SIG = 'User denied the transaction signature.',
  SOMETHING_WRONG = 'Something went wrong.',
  ENABLE_BLIND_SIGNING = 'Please enable blind signing on your Ledger hardware wallet.',
  LIMIT_REACHED = 'Transaction could not be completed because stake limit is exhausted. Please wait until the stake limit restores and try again. Otherwise, you can swap your Ethereum on 1inch platform instantly.',
  DEVICE_LOCKED = 'Please unlock your Ledger hardware wallet',
  INVALID_REFERRAL = 'Invalid referral address or ENS',
  INVALID_SIGNATURE = 'Invalid Permit signature. Perhaps it has expired or already been used. Try submitting a withdrawal request again.',
  BRIDGE_UNAVAILABLE = 'Bridge currently unavailable. Please repeat the request in a while.',
  DEPOSIT_FAILED = 'Unfortunately, your unstake request failed due to network issues. Please change the amount or try “Unstake” later.',
  EXECUTION_FAILED = 'Unfortunately, your unstake request failed due to network issues, but knBONE tokens were successfully transferred to Ethereum. Please connect to Ethereum and try “Unstake” again.',
}

const extractContractRevertErrorMessage = (str: string): string => {
  if (str.startsWith('ContractLogicError')) {
    const contractMsgRegExp = /'([^']*)'/;

    const match = str?.toLowerCase().match(contractMsgRegExp);

    return match?.[1] ?? 'Execution error';
  }

  return '';
};

export const getErrorMessage = (error: unknown): ErrorMessage | string => {
  try {
    console.error('TX_ERROR:', { error, error_string: JSON.stringify(error) });
  } catch (e) {
    console.error('TX_ERROR:', e);
  }

  const code = extractCodeFromError(error);
  switch (code) {
    case -32000:
    case 3:
    case 'UNPREDICTABLE_GAS_LIMIT':
    case 'INSUFFICIENT_FUNDS':
      return ErrorMessage.NOT_ENOUGH_ETHER;
    case 'INVALID_SIGNATURE':
      return ErrorMessage.INVALID_SIGNATURE;
    case 'CONTRACT_LOGIC_ERROR':
      // @ts-expect-error we've ensured the error message
      return extractContractRevertErrorMessage(error?.message);
    case 'ACTION_REJECTED':
    case 4001:
      return ErrorMessage.DENIED_SIG;
    case 'LIMIT_REACHED':
      return ErrorMessage.LIMIT_REACHED;
    case 'INVALID_REFERRAL':
      return ErrorMessage.INVALID_REFERRAL;
    case 'ENABLE_BLIND_SIGNING':
      return ErrorMessage.ENABLE_BLIND_SIGNING;
    case 'DEVICE_LOCKED':
      return ErrorMessage.DEVICE_LOCKED;
    case 'BRIDGE_UNAVAILABLE':
      return ErrorMessage.BRIDGE_UNAVAILABLE;
    case 'EXECUTION_FAILED':
      return ErrorMessage.EXECUTION_FAILED;
    case 'DEPOSIT_FAILED':
      return ErrorMessage.DEPOSIT_FAILED;
    default:
      return ErrorMessage.SOMETHING_WRONG;
  }
};

// type safe error code extractor
export const extractCodeFromError = (
  error: unknown,
  shouldDig = true,
): number | string => {
  // early exit on non object error
  if (!error || typeof error != 'object') return 0;

  if ('reason' in error && typeof error.reason == 'string') {
    if (error.reason.includes('STAKE_LIMIT')) return 'LIMIT_REACHED';
    if (error.reason.includes('INVALID_REFERRAL')) return 'INVALID_REFERRAL';
    if (error.reason.includes('INVALID_SIGNATURE')) return 'INVALID_SIGNATURE';
  }

  // sometimes we have error message but bad error code
  if ('message' in error && typeof error.message == 'string') {
    const normalizedMessage = error.message.toLowerCase();
    if (
      normalizedMessage.includes('denied message signature') ||
      normalizedMessage.includes('transaction was rejected') ||
      normalizedMessage.includes('rejected the transaction') ||
      normalizedMessage.includes('rejected the request') ||
      normalizedMessage.includes('reject this request') ||
      normalizedMessage.includes('rejected methods') ||
      normalizedMessage.includes('transaction declined')
    )
      return 'ACTION_REJECTED';

    if (extractContractRevertErrorMessage(error?.message)) {
      return 'CONTRACT_LOGIC_ERROR';
    }
  }

  // Ledger live errors
  if (
    'data' in error &&
    typeof error.data === 'object' &&
    Array.isArray(error.data) &&
    typeof error.data['0'] === 'object' &&
    typeof error.data['0'].message === 'string' &&
    error.data['0'].message.toLowerCase().includes('rejected')
  ) {
    return 'ACTION_REJECTED';
  }

  if ('name' in error && typeof error.name == 'string') {
    const error_name = error.name.toLowerCase();
    if (error_name === 'EthAppPleaseEnableContractData'.toLowerCase())
      return 'ENABLE_BLIND_SIGNING';
    if (error_name === 'LockedDeviceError'.toLowerCase()) {
      return 'DEVICE_LOCKED';
    }
  }
  if ('code' in error) {
    if (typeof error.code === 'string') return error.code.toUpperCase();
    if (typeof error.code == 'number') return error.code;
  }

  // errors are sometimes nested :(
  if ('error' in error && shouldDig && error.error) {
    return extractCodeFromError(error.error, false);
  }

  return 0;
};
