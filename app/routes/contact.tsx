import { button } from '~/components/ds/button';
import { FieldLabel, FieldRoot } from '~/components/ds/Field';
import { Input } from '~/components/ds/Input';
import { copy, heading } from '~/components/ds/text';
import { Textarea } from '~/components/ds/Textarea';

export default function Contact() {
  return (
    <main className="container py-20">
      <title>Contact</title>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-2 self-start">
          <h1 className={heading({ level: '2' })}>Contact</h1>
          <p className={copy({ className: 'max-w-[40ch]' })}>
            If you have any questions or would like to get in touch, please fill
            out blah blah blah. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <form className="grid gap-4 w-full">
          <FieldRoot>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" name="name" placeholder="Jane Doe" />
          </FieldRoot>

          <FieldRoot>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane.doe@example.com"
            />
          </FieldRoot>

          <FieldRoot>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" name="company" placeholder="Acme Inc." />
          </FieldRoot>

          <FieldRoot>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Write your message here..."
            />
          </FieldRoot>

          <button
            type="submit"
            className={button({ className: 'place-self-start' })}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
