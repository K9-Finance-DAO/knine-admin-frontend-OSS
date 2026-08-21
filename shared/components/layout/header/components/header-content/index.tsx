import { Stack, Typography, useTheme } from '@mui/material';
import { mapPathToHeaderContent } from './constants';
import { useRouter } from 'next/router';

const defaultHeaderContent = {
  icon: '',
  title: 'Unknown title',
  subtitle: 'Unknown subtitle',
};

export const HeaderContent = () => {
  const theme = useTheme();
  const { pathname } = useRouter();
  const { icon, subtitle, title } =
    mapPathToHeaderContent?.[pathname] || defaultHeaderContent;

  return (
    <Stack
      padding={{ xs: 2, md: 0 }}
      direction="row"
      spacing={1.75}
      width={{ xs: '100%', md: 'auto' }}
      borderBottom="1px solid"
      borderColor={{ xs: theme.palette.colorScheme.stroke, md: 'transparent' }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        minWidth={48}
        height={48}
        bgcolor={theme.palette.colorScheme.darkSecondary}
        border={`1px solid ${theme.palette.colorScheme.stroke}`}
        borderRadius="50%"
      >
        {icon}
      </Stack>
      <Stack spacing={0.5} justifyContent="center">
        <Typography variant="body2" className="lg medium">
          {title}
        </Typography>
        {subtitle && (
          <Typography color={theme.palette.colorScheme.gray}>
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
