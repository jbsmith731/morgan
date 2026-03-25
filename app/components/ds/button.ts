import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex items-center justify-center rounded-full',
    'uppercase tracking-wider font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
  ],
  variants: {
    variant: {
      primary:
        'bg-ds-accent text-slate-50 hover:bg-ds-accent-hover focus-visible:outline-ds-accent',
      secondary:
        'bg-slate-900 text-slate-50 hover:bg-slate-800 focus-visible:outline-slate-900',
      outline:
        'bg-transparent border border-ds-accent text-indigo-600 hover:bg-ds-accent/5 focus-visible:outline-ds-accent',
      ghost:
        'bg-transparent text-ds-text-primary hover:bg-ds-surface-subtle focus-visible:outline-ds-accent',
    },
    size: {
      sm: 'px-3.5 h-8 text-[11px]',
      md: 'px-6 h-11 text-xs tracking-[0.075em]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
