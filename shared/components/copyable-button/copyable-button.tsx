import { useMemo } from 'react';
import { useCopyToClipboard } from 'shared/hooks';
import { Icons } from '..';
import { IconButton, IconButtonProps } from '@mui/material';

interface CopyableButtonProps extends IconButtonProps {
  address: string;
}

export const CopyableButton = ({ address, ...props }: CopyableButtonProps) => {
  const url = useMemo(() => {
    const { href } = location;

    const withoutQuery = href.split('?')[0];
    return `${withoutQuery}?address=${address}`;
  }, [address]);

  const handleCopy = useCopyToClipboard(url);

  return (
    <IconButton onClick={handleCopy} className="transparent" {...props}>
      <Icons.Copy />
    </IconButton>
  );
};
