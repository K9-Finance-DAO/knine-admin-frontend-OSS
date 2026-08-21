import { Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Lightning from 'assets/lightning.png';
import Icons from 'shared/components/icons';
import { SidebarBottomBlockButton, SidebarBottomBlockStyle } from './styles';

export const SidebarBottomBlock = () => {
  const theme = useTheme();

  return (
    <SidebarBottomBlockStyle>
      <SidebarBottomBlockButton>
        <Stack direction="row" alignItems="center" spacing={theme.spacing(1)}>
          <Image src={Lightning} alt="lightning" width={20} height={20} />
          <Typography
            className="medium"
            color={theme.palette.colorScheme.graySecondary}
          >
            K9 DAO
          </Typography>
        </Stack>
        <Icons.ArrowLink />
      </SidebarBottomBlockButton>
      <Stack spacing={theme.spacing(1)}>
        <Typography variant="caption" className="xs medium gray">
          Terms of Service
        </Typography>
        <Typography variant="caption" className="xs medium gray">
          © Copyright K9 2024
        </Typography>
      </Stack>
    </SidebarBottomBlockStyle>
  );
};
