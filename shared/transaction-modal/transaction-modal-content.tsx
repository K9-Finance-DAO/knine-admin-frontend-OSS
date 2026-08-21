import { memo, ReactNode } from 'react';
import { styled, Typography, Stack, StackProps } from '@mui/material';

export const WithStyledSpan = styled(Typography)(({ theme }) => ({
  span: {
    color: theme.palette.colorScheme.orangeMid,
  },
}));

export const Title = styled(WithStyledSpan)<{ component?: string }>(
  ({ theme }) => ({
    fontSize: '16px',
    fontWeight: 500,
    color: theme.palette.colorScheme.light,
    marginTop: theme.spacing(4),
    textAlign: 'center',
  }),
);

export const Description = styled(Typography)({
  marginTop: '12px',
  textAlign: 'center',
});

export const Footer = styled('div')({
  marginTop: '20px',
  width: '100%',
});

export const FooterHint = styled(WithStyledSpan)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(3.5),
  color: theme.palette.colorScheme.graySecondary,
}));

type TransactionModalContentProps = {
  icon: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footerHint?: ReactNode;
  footer?: ReactNode;
  forceSpacing?: number;
  sx?: StackProps['sx'];
};

export const TransactionModalContent = memo(
  (props: TransactionModalContentProps) => {
    const { icon, title, description, footerHint, footer, forceSpacing, sx } =
      props;

    return (
      <Stack
        alignItems="center"
        textAlign="center"
        spacing={forceSpacing}
        sx={sx}
      >
        {icon}
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
        {footerHint && <FooterHint>{footerHint}</FooterHint>}
        {footer && <Footer>{footer}</Footer>}
      </Stack>
    );
  },
);
