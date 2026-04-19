import { twMerge } from 'tailwind-merge';

export function Background({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div
        className={twMerge(
          'absolute inset-x-0 top-0 -z-1 size-screen h-lvh',
          'bg-ds-surface-app',
          'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_oklch,var(--color-ds-accent)_35%,transparent),var(--color-ds-surface-app))]',
        )}
      />

      {children}
    </>
  );
}
