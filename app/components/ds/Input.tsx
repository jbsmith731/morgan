import type { AnyFieldApi } from '@tanstack/react-form';
import { twMerge } from 'tailwind-merge';
import { inputBase } from '../styles/input';

export function Input({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return <input className={twMerge(...inputBase, className)} {...rest} />;
}

export function getInputProps(field: AnyFieldApi) {
  return {
    id: field.name,
    name: field.name,
    value: field.state.value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      field.handleChange(e.target.value),
    'aria-invalid': !field.state.meta.isValid,
  };
}
