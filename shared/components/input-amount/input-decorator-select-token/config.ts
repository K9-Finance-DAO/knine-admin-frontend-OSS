import BoneImg from 'public/bone.webp';
import KnBoneImg from 'public/kn-bone.webp';
// TODO: think to move this this global config of tokens somewhere else

export enum TOKENS {
  Bone = 'Bone',
  KnBone = 'KnBone',
}

export const iconsMap = {
  [TOKENS.Bone]: BoneImg,
  [TOKENS.KnBone]: KnBoneImg,
} as const;
