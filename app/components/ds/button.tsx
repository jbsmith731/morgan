import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex items-center justify-center rounded-full',
    'uppercase tracking-wider font-medium transition-colors',
  ],
  variants: {
    variant: {
      primary: 'bg-ds-accent text-slate-50 hover:bg-ds-accent-hover',
      secondary: 'bg-slate-900 text-slate-50 hover:bg-slate-800',
      outline:
        'bg-transparent border border-ds-accent text-indigo-600 hover:bg-indigo-100',
      ghost: 'bg-transparent text-ds-text-primary hover:bg-ds-surface-subtle',
    },
    size: {
      sm: 'px-3.5 h-8 text-[11px]',
      md: 'px-6 h-11 text-xs',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
