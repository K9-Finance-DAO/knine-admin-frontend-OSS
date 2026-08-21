import { Stack, useTheme } from '@mui/material';
import { Icons } from 'shared/components';
import { CustomInputHookForm } from 'shared/hook-form/controls';
import { FormTitle } from './form-title';

export const BonusPoolFormSocials = () => {
  const theme = useTheme();

  return (
    <Stack spacing={1.25}>
      <FormTitle>Social links</FormTitle>

      <CustomInputHookForm
        fieldName="instagram"
        label="Instagram"
        placeholder="https://instagram.com/profile/"
        rightDecorator={
          <Icons.Instagram fill={theme.palette.colorScheme.gray} />
        }
      />

      <CustomInputHookForm
        fieldName="telegram"
        label="Telegram"
        placeholder="https://t.me/channel/"
        rightDecorator={
          <Icons.Telegram fill={theme.palette.colorScheme.gray} />
        }
      />

      <CustomInputHookForm
        fieldName="discord"
        label="Discord"
        placeholder="https://discord.com/channels/channel"
        rightDecorator={<Icons.Discord fill={theme.palette.colorScheme.gray} />}
      />

      <CustomInputHookForm
        fieldName="website"
        label="Website"
        placeholder="https://website.com"
        rightDecorator={<Icons.Browser fill={theme.palette.colorScheme.gray} />}
      />
    </Stack>
  );
};
