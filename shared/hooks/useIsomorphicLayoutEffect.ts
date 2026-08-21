import { useEffect, useLayoutEffect } from 'react';
import { isClientSide } from 'utils/isClientSide';

export const useIsomorphicLayoutEffect = isClientSide()
  ? useLayoutEffect
  : useEffect;
