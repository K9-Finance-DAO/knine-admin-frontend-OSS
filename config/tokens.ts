import BoneImg from 'public/bone.webp';
import KnBoneImg from 'public/kn-bone.webp';
import KnineImg from 'public/favicon-192x192.png';
import { TOKENS } from '@knine-sdk/constants';

export const tokenImagesMap = {
  [TOKENS.BONE]: BoneImg,
  [TOKENS.KNBONE]: KnBoneImg,
  KNINE: KnineImg,
} as const;
