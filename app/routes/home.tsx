import { button } from '~/components/ds/button';
import { heading, lede } from '~/components/ds/text';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Morgan Smith' },
    { name: 'description', content: 'Content' },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container place-self-center grid items-center justify-center text-center gap-4">
      <section className="py-20 grid gap-5">
        <div className="grid gap-2">
          <h1 className={heading({ level: 'mega' })}>{loaderData.message}</h1>
          <p className={lede({ className: 'max-w-2xl' })}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <button className={button({ className: 'place-self-center' })}>
          Let&apos;s connect
        </button>
      </section>
    </main>
  );
}
