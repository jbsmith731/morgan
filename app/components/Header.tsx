import { Link } from 'react-router';
import { button } from './ds/button';
import { copy } from './ds/text';

export function Header() {
  return (
    <header>
      <div className="constrain py-4 sm:py-5 flex items-center justify-between">
        <Link
          to="/"
          className={copy({
            weight: 'bold',
            color: 'primary',
            className: 'hover:text-ds-accent transition-colors',
          })}
        >
          Morgan Smith
        </Link>

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
