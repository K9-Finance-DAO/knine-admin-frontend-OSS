import { useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { showToastMessage } from 'utils';

export const useCopyToClipboard = (text: string): (() => void) => {
  return useCallback(() => {
    copy(text);
    showToastMessage('success', 'Copied to clipboard');
  }, [text]);
};
