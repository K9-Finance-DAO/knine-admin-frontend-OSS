import {
  Title,
  TransactionModalContent,
} from 'shared/transaction-modal/transaction-modal-content';
import { NetworkAlert, TxAmount } from '../tx-stages-parts';
import { CHAINS } from '@knine-sdk/constants';
import { useNetwork } from 'wagmi';
import { SwitchNetworkButton } from 'shared/wallet';
import { ReactNode } from 'react';
import { BigNumber } from 'ethers';
import { capitalize, getChainDisplayName } from 'utils';
import { Big } from 'features/liquid-staking/rewards/helpers';
import { BorderedBox, DataTableRow } from 'shared/components';

interface TxStageSwitchProps {
  chainId: CHAINS;
  onSuccessSwitch?: () => Promise<void>;
  description?: ReactNode;
  title?: ReactNode;
  withTitle?: boolean;
  footerSlot?: ReactNode;
}

export const TxStageSwitch = ({
  chainId,
  onSuccessSwitch,
  withTitle = true,
  description,
  title,
  footerSlot,
}: TxStageSwitchProps) => {
  const { chains } = useNetwork();

  const newChainName = chains?.find((chain) => chain.id === chainId);
  const modalTitle = title
    ? title
    : `Switch network to ${newChainName?.name} to proceed`;

  return (
    <TransactionModalContent
      icon={<NetworkAlert network={chainId} mb={1} />}
      title={withTitle ? modalTitle : ''}
      description={description}
      footer={
        <>
          {footerSlot ?? null}
          <SwitchNetworkButton
            fullWidth
            chainId={chainId}
            onAsyncClick={onSuccessSwitch}
          />
        </>
      }
    />
  );
};

export type TxStageSwitchToBridgeProps = {
  bridgedAmount: BigNumber;
  totalAmount: BigNumber;
  feeAmount?: string;
} & Pick<TxStageSwitchProps, 'chainId' | 'onSuccessSwitch' | 'title'>;

export const TxStageSwitchToBridge = ({
  bridgedAmount,
  chainId,
  feeAmount,
  onSuccessSwitch,
  totalAmount,
}: TxStageSwitchToBridgeProps) => {
  const isFeeToShow = feeAmount && new Big(feeAmount).gt(0);

  return (
    <TxStageSwitch
      chainId={chainId}
      withTitle={false}
      onSuccessSwitch={onSuccessSwitch}
      description={
        <Title
          component="span"
          className="gray"
          lineHeight="24px"
          textAlign="center"
          pt={2}
          letterSpacing="-0.06px"
        >
          {capitalize(getChainDisplayName(chainId))}{' '}
          <TxAmount
            amount={bridgedAmount}
            maxDecimalDigits={3}
            trimEllipsis={false}
            symbol="knBONE"
          />{' '}
          will be transferred to Ethereum. <wbr /> To unstake the requested
          amount of {<TxAmount amount={totalAmount} symbol="knBONE" />}. Please
          connect to Shibarium and then press “Unstake” to proceed.
        </Title>
      }
      footerSlot={
        isFeeToShow && (
          <BorderedBox component="span" mb={2}>
            <DataTableRow textAlign="left" title="Bridging fee:">
              <TxAmount
                amount={BigNumber.from(feeAmount?.toString())}
                maxDecimalDigits={5}
                symbol="knBONE"
              />
            </DataTableRow>
          </BorderedBox>
        )
      }
    />
  );
};
