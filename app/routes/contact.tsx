import { formOptions, useForm } from '@tanstack/react-form';
import {
  createServerValidate,
  ServerValidateError,
} from '@tanstack/react-form-remix';
import { data, Form } from 'react-router';
import z from 'zod';
import { FieldInfo, FieldLabel, FieldRoot } from '~/components/ds/Field';
import { getInputProps, Input } from '~/components/ds/Input';
import { Textarea } from '~/components/ds/Textarea';
import { button } from '~/components/styles/button';
import { copy, heading } from '~/components/styles/text';
import { createMetaTitle } from '~/helpers/seo.helpers';
import type { Route } from './+types/contact';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  try {
    const validated = await serverValidate(formData);

    return data(validated);
  } catch (error) {
    // Handle validation errors

    if (error instanceof ServerValidateError) {
      return data(error.formState, { status: 400 });
    }

    return new Response('Form submission failed', { status: 400 });
  }
}

export default function Contact() {
  const form = useForm({
    ...contactOptions,
    validators: {
      onSubmit: ContactSchema,
    },
  });

  return (
    <main className="constrain py-20">
      <title>{createMetaTitle('Contact')}</title>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-2 self-start">
          <h1 className={heading({ level: '1' })}>Contact</h1>
          <p className={copy({ className: 'max-w-[40ch]' })}>
            If you have any questions or would like to get in touch, please fill
            out blah blah blah. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <Form
          className="grid gap-4 w-full"
          method="POST"
          onSubmit={() => form.handleSubmit()}
        >
          <form.Field name="name">
            {(field) => {
              return (
                <FieldRoot>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input {...getInputProps(field)} placeholder="Jane Doe" />
                  <FieldInfo field={field} />
                </FieldRoot>
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              return (
                <FieldRoot>
                  <FieldLabel htmlFor="email">Business email</FieldLabel>
                  <Input
                    {...getInputProps(field)}
                    type="email"
                    placeholder="jane.doe@acme.com"
                  />
                  <FieldInfo field={field} />
                </FieldRoot>
              );
            }}
          </form.Field>

          <form.Field name="company">
            {(field) => {
              return (
                <FieldRoot>
                  <FieldLabel htmlFor="company">Company</FieldLabel>
                  <Input {...getInputProps(field)} placeholder="Acme Inc." />
                  <FieldInfo field={field} />
                </FieldRoot>
              );
            }}
          </form.Field>

          <form.Field name="message">
            {(field) => {
              return (
                <FieldRoot>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={!field.state.meta.isValid}
                    rows={4}
                    placeholder="Write your message here..."
                  />
                  <FieldInfo field={field} />
                </FieldRoot>
              );
            }}
          </form.Field>

          <button
            type="submit"
            className={button({ className: 'place-self-start' })}
          >
            Submit
          </button>
        </Form>
      </div>
    </main>
  );
}

const contactOptions = formOptions({
  defaultValues: {
    name: '',
    email: '',
    company: '',
    message: '',
  },
});

const serverValidate = createServerValidate({
  ...contactOptions,
  onServerValidate: ({ value }) => {
    try {
      ContactSchema.parse(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
    }
  },
});

const BLOCKED_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
];

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .email('Invalid email address')
    .refine(
      (email) => !BLOCKED_DOMAINS.includes(email.split('@')[1]?.toLowerCase()),
      'Please use a business email address',
    ),
  company: z.string().transform((val) => (val === '' ? undefined : val)),
  message: z.string().transform((val) => (val === '' ? undefined : val)),
});
