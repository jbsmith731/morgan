import { twMerge } from 'tailwind-merge';

export function FieldRoot({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={twMerge('grid gap-1', className)} {...rest} />;
}

export function FieldLabel({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      className={twMerge(
        'block text-sm font-semibold text-gray-700',
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
