import { tv } from 'tailwind-variants';

export const copy = tv({
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-extrabold',
    },
    color: {
      primary: 'text-ds-text-primary',
      secondary: 'text-ds-text-secondary',
      muted: 'text-ds-text-muted',
      subtle: 'text-ds-text-subtle',
      accent: 'text-ds-accent',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    color: 'secondary',
  },
});

export function lede(args?: Parameters<typeof copy>[0]) {
  return copy({ size: 'lg', color: 'muted', ...args });
}

export const heading = tv({
  base: 'font-serif text-ds-text-primary',
  variants: {
    level: {
      mega: 'text-[5rem] leading-none',
      '1': 'text-[3.5rem] leading-none',
      '2': 'text-[2.5rem] leading-tight',
      '3': 'text-[2rem] leading-snug',
      '4': 'text-2xl leading-snug',
      '5': 'text-xl font-sans font-extrabold leading-snug',
      '6': 'text-base font-sans font-extrabold uppercase tracking-wide leading-snug',
    },
  },
  defaultVariants: {
    level: '2',
  },
});
