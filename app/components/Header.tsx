import { button } from './ds/button';
import { copy } from './ds/text';

export function Header() {
  return (
    <header>
      <div className="container py-4 sm:py-5 flex items-center justify-between">
        <span className={copy({ weight: 'bold', color: 'primary' })}>
          Morgan Smith
        </span>

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
