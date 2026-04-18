import { Link } from 'react-router';
import { button } from './ds/button';
import { copy } from './ds/text';

export function Header() {
  return (
    <header>
      <div className="container py-4 sm:py-5 flex items-center justify-between">
        <span className={copy({ weight: 'bold', color: 'primary' })}>
          Morgan Smith
        </span>

        <Link
          to="/contact"
          className={button({ variant: 'outline', size: 'sm' })}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
