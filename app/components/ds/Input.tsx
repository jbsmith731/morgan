import { twMerge } from 'tailwind-merge';

export function Input({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={twMerge(
        'p-2 text-base rounded-lg',
        'border border-ds-border-strong',
        'focus:outline-none focus:ring-2 focus:ring-ds-accent focus:border-transparent',
        className,
      )}
      {...rest}
    />
  );
}
