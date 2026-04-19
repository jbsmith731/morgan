import { isRouteErrorResponse, Link } from 'react-router';
import { Background } from './Background';
import { button } from './styles/button';
import { copy, heading } from './styles/text';

export function ErrorPage({ error }: { error: unknown }) {
  let message = 'An unexpected error occurred.';
  let title = 'Error';

  if (isRouteErrorResponse(error) && error.status in ERROR_MESSAGES) {
    const errorInfo = ERROR_MESSAGES[error.status as Status];

    title = errorInfo.title;
    message = errorInfo.message;
  }

  return (
    <Background>
      <main className="constrain grid items-center justify-center text-center gap-4 content-center">
        <div className="grid gap-1">
          <h1 className={heading({ level: '1' })}>{title}</h1>
          <p className={copy()}>{message}</p>
        </div>

        <Link to="/" className={button({ className: 'place-self-center' })}>
          Go back home
        </Link>
      </main>
    </Background>
  );
}

const ERROR_MESSAGES = {
  404: {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
  },
  500: {
    title: 'Server Error',
    message: 'An unexpected error occurred on the server.',
  },
} as const;

type Status = keyof typeof ERROR_MESSAGES;
