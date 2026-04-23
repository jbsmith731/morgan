import { tv } from 'tailwind-variants';

export const box = tv({
  base: 'rounded-lg border border-ds-stroke bg-ds-background text-ds-text',
  variants: {
    variant: {
      default: 'border-ds-stroke-default bg-ds-primary-muted text-ds-primary',
      error: 'border-ds-stroke-error bg-ds-error text-ds-text-error-strong',
      success: 'border-ds-stroke-success bg-ds-success text-ds-text-success',
      accent: 'border-ds-accent bg-ds-accent-subtle text-ds-accent-hover',
    },
    size: {
      default: 'p-4 text-sm',
      sm: 'p-2 text-xs',
      lg: 'p-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
