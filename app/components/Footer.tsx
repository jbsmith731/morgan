import { copy } from './ds/text';

export function Footer() {
  return (
    <footer className="container py-4">
      <span className={copy()}>
        &copy; {new Date().getFullYear()} Morgan Smith
      </span>
    </footer>
  );
}
