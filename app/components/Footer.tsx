import { copy } from './styles/text';

export function Footer() {
  return (
    <footer className="constrain py-4">
      <span className={copy()}>
        &copy; {new Date().getFullYear()} Morgan Smith
      </span>
    </footer>
  );
}
