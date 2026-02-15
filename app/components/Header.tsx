import { button } from './ds/button';

export function Header() {
  return (
    <header>
      <div className="container py-4 sm:py-6 flex items-center justify-between">
        <span className="font-extrabold">Morgan Smith</span>

        <a
          href="mailto:example@example.com"
          className={button({ variant: 'outline', size: 'sm' })}
        >
          Contact
        </a>
      </div>
    </header>
  );
}
