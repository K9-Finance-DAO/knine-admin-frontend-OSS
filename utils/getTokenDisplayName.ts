import { TOKENS } from '@knine-sdk/constants';

export const TOKEN_DISPLAY_NAMES = {
  ETH: 'ETH',
  [TOKENS.KNBONE]: 'knBONE',
  [TOKENS.BONE]: 'BONE',
};

export const getTokenDisplayName = (token: keyof typeof TOKEN_DISPLAY_NAMES) =>
  TOKEN_DISPLAY_NAMES[token];
