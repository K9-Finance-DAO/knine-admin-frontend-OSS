import { styled } from '@mui/material';
import Link from 'next/link';

export const BackLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  columnGap: 8,
  color: theme.palette.colorScheme.gray,
}));

export const BackLinkIcon = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  fill: theme.palette.colorScheme.gray,
  backgroundColor: theme.palette.colorScheme.stroke,
  borderRadius: '50%',
  transform: 'rotate(-90deg)',
}));
