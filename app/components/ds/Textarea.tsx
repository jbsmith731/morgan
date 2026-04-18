import { twMerge } from 'tailwind-merge';

export function Textarea({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'textarea'>) {
  return (
    <textarea
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
