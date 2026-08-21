import { InputDecoratorSelectRole } from '../input-decorator-select-role';
import { CustomInputHookForm } from 'shared/hook-form/controls';
import { useAccessDataContext } from '../../provider';
import { useFormContext, useWatch } from 'react-hook-form';
import { AddNewAdminFormFields } from '../helpers';
import { startCase } from 'lodash';

type Props = {
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  open: boolean;
};

export const AddNewAdminInput = ({ open, onOpenMenu, onCloseMenu }: Props) => {
  const { contractAdminRoles } = useAccessDataContext();
  const { setValue } = useFormContext();
  const role = useWatch<AddNewAdminFormFields, 'role'>({ name: 'role' });

  return (
    <CustomInputHookForm
      fieldName="address"
      placeholder="0x76F2a66D8Af418113725e3bAc20BFCb4F92d63b5"
      rightDecorator={
        contractAdminRoles && (
          <InputDecoratorSelectRole
            options={Object.entries(contractAdminRoles).map(
              ([role, value]) => ({
                label: startCase(role.toLowerCase()),
                value,
              }),
            )}
            currentOption={role}
            onSelectRole={(value) => setValue('role', value)}
            onOpenMenu={onOpenMenu}
            onCloseMenu={onCloseMenu}
            open={open}
          />
        )
      }
      sx={{ 'input, div': { top: '0px !important' } }}
    />
  );
};
