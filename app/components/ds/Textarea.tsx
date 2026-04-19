import { twMerge } from 'tailwind-merge';
import { inputBase } from '../styles/input';

export function Textarea({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'textarea'>) {
  return <textarea className={twMerge(...inputBase, className)} {...rest} />;
}
