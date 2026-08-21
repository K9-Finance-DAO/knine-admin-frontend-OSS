import invariant from 'tiny-invariant';
import { createContext, useContext } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { EventSubsciption } from 'utils/event-subsciption';
import type { CustomElement } from 'react-hook-form/dist/types/fields';

type FormControllerContextFieldType<T extends FieldValues = any> = Omit<
  CustomElement<T>,
  'value'
> & {
  name: keyof T;
  value: T[keyof T];
};

export type FormControllerContextValueType<F extends FieldValues = any> = {
  isLocked?: boolean;
  onSubmit: (args: F) => Promise<boolean>;
  onReset?: (args: F) => void;
  retryEvent?: EventSubsciption;
  onSave?: (args: FormControllerContextFieldType<F>) => void;
};

export const FormControllerContext =
  createContext<FormControllerContextValueType | null>(null);
FormControllerContext.displayName = 'FormControllerContext';

export const useFormControllerContext = () => {
  const value = useContext(FormControllerContext);
  invariant(value, 'useFormControllerContext was used outside the provider');
  return value;
};
