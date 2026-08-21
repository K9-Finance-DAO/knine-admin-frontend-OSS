import { isIOS, isAndroid } from 'react-device-detect';

export const openWindow = (url: string): void => {
  globalThis.window?.open(url, '_blank', 'noopener,noreferrer');
};

export const suggestApp = (urls: {
  default: string;
  android?: string;
  ios?: string;
}) => {
  if (urls.ios && isIOS) {
    openWindow(urls.ios);
    return;
  }

  if (urls.android && isAndroid) {
    openWindow(urls.android);
    return;
  }

  openWindow(urls.default);
};
