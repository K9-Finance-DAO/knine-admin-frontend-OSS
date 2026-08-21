import { Dialog, DialogProps, IconButton, Typography } from '@mui/material';
import Icons from '../icons';
import { ModalHeader } from './styles';
import { ReactNode } from 'react';
import { FontWeights } from 'styles';

enum TitleSizes {
  sm = 'body2',
  md = 'subtitle1',
}

export type ModalWrapperProps = {
  onClose?: () => void;
  closable?: boolean;
  title?: ReactNode | string;
  titleSize?: 'sm' | 'md';
  titleClassname?: string;
  borderedHeader?: boolean;
  centeredTitle?: boolean;
  contentSpacing?: number;
} & Omit<DialogProps, 'title'>;

export const ModalWrapper = ({
  onClose,
  closable = true,
  title,
  titleSize = 'md',
  titleClassname,
  borderedHeader = true,
  centeredTitle = true,
  contentSpacing = 4,
  children,
  ...rest
}: ModalWrapperProps) => {
  return (
    <Dialog onClose={onClose} {...rest}>
      <ModalHeader
        $borderedHeader={!!title && borderedHeader}
        marginBottom={contentSpacing}
        $title={!!title}
      >
        {title && (
          <Typography
            variant={TitleSizes[titleSize]}
            className={titleClassname}
            textAlign={centeredTitle ? 'center' : 'left'}
            fontWeight={FontWeights.Medium}
          >
            {title}
          </Typography>
        )}
        {closable && (
          <IconButton
            onClick={onClose}
            className="transparent"
            sx={{ position: 'absolute', right: 0, top: 0, p: 0 }}
          >
            <Icons.Close />
          </IconButton>
        )}
      </ModalHeader>
      {children}
    </Dialog>
  );
};
